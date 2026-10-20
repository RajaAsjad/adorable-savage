/** Fallback Home ticker if CMS field is empty */
export const HOME_TICKER_LINES = [
    "YOU'RE SOFT.",
    "YOU'RE WILD.",
    "YOU'RE THE VIBE.",
    "YOU'RE ALLOWED TO REST.",
    "YOU'RE STILL HERE. THAT COUNTS.",
    "WHAT IF YOU'RE ALREADY ENOUGH?",
    "YOU'RE WONDERFUL.",
    "YOU'RE SAVAGE.",
    "YOU'RE ADORABLE.",
];

/** Fallback About tickers if CMS field is empty */
export const ABOUT_TICKERS = {
    'verses-and-vibes': [
        "YOU'RE THE BEAT.",
        "YOU'RE THE CHORUS.",
        "YOU'RE OFF-KEY AND STILL BEAUTIFUL.",
        "YOU'RE LOUDER THAN YOUR DOUBTS.",
        "YOU'RE THE VIBE.",
        "YOU'RE A REMIX, NOT A MISTAKE.",
        'WHAT SONG WOULD YOUR HEART PLAY RIGHT NOW?',
        'PLAY IT.',
        'PLAY IT TWICE.',
        "YOU'RE THE SONG STUCK IN SOMEONE'S HEAD.",
        "YOU'RE SAVAGE.",
        "YOU'RE ADORABLE.",
    ],
    'unapologetic-wellness': [
        "YOU'RE ALLOWED TO REST.",
        "YOU'RE ALLOWED TO PLAY.",
        "YOU'RE ALLOWED TO FEEL.",
        "YOU'RE ALLOWED TO GROW.",
        'WHAT ARE YOU WAITING FOR?',
        'PERMISSION GRANTED.',
        "YOU'RE NOT LAZY.",
        "YOU'RE TIRED.",
        'WHO TOLD YOU REST HAD TO BE EARNED?',
        "YOU'RE WORTHY OF YOUR OWN CARE.",
        'NO APOLOGY REQUIRED.',
        'NO EXPLANATION OWED.',
        "YOU'RE SAVAGE.",
        "YOU'RE ADORABLE.",
    ],
    'real-raw-relatable': [
        "YOU'RE NOT YOUR WORST DAY.",
        "YOU'RE STILL HERE.",
        'THAT COUNTS.',
        "YOU'RE STARTING OVER, NOT STARTING FROM SCRATCH.",
        "WHAT IF YOUR STORY ISN'T OVER?",
        "IT'S NOT.",
        "YOU'RE MESSY.",
        "YOU'RE MAGNIFICENT.",
        "YOU'RE NOT A BURDEN.",
        "YOU'RE A BLESSING.",
        'WHO WOULD YOU BE WITHOUT THE SHAME?',
        "YOU'RE A SURVIVOR.",
        "YOU'RE SAVAGE.",
        "YOU'RE ADORABLE.",
    ],
};

/** Parse CMS ticker text: one statement per line (or • separated). */
export function parseTickerText(text) {
    if (!text || !String(text).trim()) {
        return null;
    }

    const lines = String(text)
        .split(/\r?\n|•/)
        .map((line) => line.trim())
        .filter(Boolean);

    return lines.length > 0 ? lines : null;
}

export function resolveHomeTickerLines(tickerText) {
    return parseTickerText(tickerText) || HOME_TICKER_LINES;
}

/**
 * Prefer CMS ticker_text; else slug/title fallback defaults.
 */
export function resolveAboutTickerLines(slug = '', title = '', tickerText = '') {
    const fromCms = parseTickerText(tickerText);
    if (fromCms) {
        return fromCms;
    }

    const haystack = `${slug} ${title}`.toLowerCase().replace(/[,&]+/g, ' ');

    if (haystack.includes('verses') && haystack.includes('vibes')) {
        return ABOUT_TICKERS['verses-and-vibes'];
    }

    if (haystack.includes('unapologetic') && haystack.includes('wellness')) {
        return ABOUT_TICKERS['unapologetic-wellness'];
    }

    if (
        haystack.includes('real') &&
        haystack.includes('raw') &&
        haystack.includes('relat')
    ) {
        return ABOUT_TICKERS['real-raw-relatable'];
    }

    return null;
}
