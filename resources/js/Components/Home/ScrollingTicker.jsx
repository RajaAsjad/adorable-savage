const LINE_STYLES = [
    'font-display text-ink',
    'font-hand text-[#FF6B9D]',
    'font-display text-ink',
    'font-hand text-[#FDE047]',
    'font-display text-ink',
];

function lineClassName(index) {
    return LINE_STYLES[index % LINE_STYLES.length];
}

function TickerTrack({ items }) {
    return (
        <div className="flex shrink-0 items-center gap-8 whitespace-nowrap px-4 lg:gap-12 lg:px-6">
            {items.map((line, index) => (
                <span
                    key={`${line}-${index}`}
                    className="inline-flex items-center gap-8 lg:gap-12"
                >
                    <span
                        className={`text-[18px] tracking-[0.04em] md:text-[22px] lg:text-[26px] ${lineClassName(index)}`}
                    >
                        {line}
                    </span>
                    <span
                        className="text-[14px] text-black/35 md:text-[16px]"
                        aria-hidden="true"
                    >
                        •
                    </span>
                </span>
            ))}
        </div>
    );
}

export default function ScrollingTicker({ items = [], label = 'Affirmations' }) {
    if (!Array.isArray(items) || items.length === 0) {
        return null;
    }

    return (
        <section
            aria-label={label}
            className="relative overflow-hidden border-y border-black/5 bg-cream"
        >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent md:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent md:w-24" />

            <div className="hero-ticker flex w-max items-center py-4 md:py-5">
                <TickerTrack items={items} />
                <TickerTrack items={items} />
            </div>
        </section>
    );
}
