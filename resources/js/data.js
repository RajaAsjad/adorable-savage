export const images = {
    hero: '/images/20169846-pexels-photo-20169846.jpeg',
    crystals: '/images/7947796-pexels-photo-7947796.jpeg',
    joy: '/images/5046356-pexels-photo-5046356.jpeg',
    folk: '/images/16934835-pexels-photo-16934835.jpeg',
    community: '/images/4880405-pexels-photo-4880405.jpeg',
    verses: '/images/36092411-pexels-photo-36092411.jpeg',
    botanicals: '/images/11435367-pexels-photo-11435367.jpeg',
    ritual: '/images/6694177-pexels-photo-6694177.jpeg',
    healer: '/images/29072916-pexels-photo-29072916.jpeg',
};

export const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/the-adorable-savage' },
    { label: 'Our Pillars', href: '/#programs' },
    { label: 'Events', href: '/#events' },
    { label: 'Contact', href: '/#contact' },
];

export function sectionHref(labelOrLink) {
    let href;

    if (typeof labelOrLink === 'object' && labelOrLink?.href) {
        href = labelOrLink.href;
    } else {
        href = `#${String(labelOrLink).toLowerCase().replace(/[^a-z]+/g, '')}`;
    }

    // Section hashes live on the home page — prefix so they work from any route.
    if (href.startsWith('#')) {
        return `/${href}`;
    }

    return href;
}

export const aboutPillars = [
    {
        id: '01',
        title: 'ADORABLY HUMAN',
        sub: 'Healing • Addiction • Grief • Health',
        long: 'Adorably Human is our healing space: a tender, judgment-free place for anyone facing addiction, grief, or health struggles. Here, you\'re not fixed or broken. You\'re human, and that\'s more than enough.',
        color: 'from-[#A78BFA] to-[#2DD4BF]',
        img: images.community,
    },
    {
        id: '02',
        title: 'UNFILTERED WELLNESS',
        sub: 'Essential Oils • Sound • Crystals • Self-Care',
        long: 'Unfiltered Wellness is where self-care goes deeper. Using essential oils, sound frequencies, and crystals, we help you tap into life-changing tools for balance, energy, and self-empowerment; no masks, no filters, just real self-care that works with your body and spirit.',
        color: 'from-[#FDE047] to-[#14B8A6]',
        img: images.crystals,
    },
    {
        id: '03',
        title: 'VERSES AND VIBES',
        sub: 'Music • Artists • Songwriters • Care',
        long: 'Verses and Vibes is where we care for the creators behind the music: the artists and songwriters who pour themselves into every note. Because those who give us so much through their art deserve care in return.',
        color: 'from-[#FF6B9D] to-[#FF8A3D]',
        img: images.verses,
    },
];

export const programs = [
    {
        name: 'Verses & Vibes',
        cat: 'MUSIC & CULTURE',
        desc: 'Open mics, artist spotlights, and soulful gatherings where every voice matters.',
        img: images.verses,
        color: 'bg-[#FF6B9D]',
    },
    {
        name: 'Unapologetic Wellness',
        cat: 'WELLNESS LAB',
        desc: 'Workshops that reclaim wellness as joyful, accessible, and radically inclusive.',
        img: images.joy,
        color: 'bg-[#A78BFA]',
    },
    {
        name: 'Oils & Crystals',
        cat: 'EDUCATION',
        desc: 'Learn the stories, science, and sensory ritual of plants and minerals.',
        img: images.botanicals,
        color: 'bg-[#FACC15]',
    },
    {
        name: 'Sobriety Interconnect',
        cat: 'COMMUNITY',
        desc: 'Support circles, sober socials, and creative outlets for clear living.',
        img: images.community,
        color: 'bg-[#FB7185]',
    },
    {
        name: 'Community Experiences',
        cat: 'IRL MAGIC',
        desc: 'Pop-ups, markets, retreats — real-life moments of weird, wonderful connection.',
        img: images.folk,
        color: 'bg-[#2DD4BF]',
    },
];

export const events = [
    {
        date: 'NOV 14',
        day: '14',
        month: 'NOV',
        title: 'Verses & Vibes: Open Mic Night',
        loc: 'Denver, CO • HQ Studio',
        cat: 'MUSIC',
        desc: 'Bring your words, your voice, your whole self. No gatekeeping.',
        color: 'bg-[#FF6B9D]',
    },
    {
        date: 'NOV 19',
        day: '19',
        month: 'NOV',
        title: 'Unapologetic Wellness Circle',
        loc: 'Virtual • Zoom',
        cat: 'WELLNESS',
        desc: 'Breathwork, boundary-setting, and joy as practice.',
        color: 'bg-[#A78BFA]',
    },
    {
        date: 'NOV 24',
        day: '24',
        month: 'NOV',
        title: 'Oils & Crystals 101',
        loc: 'Boulder, CO • The Nook',
        cat: 'EDUCATION',
        desc: 'Hands-on exploration of scent, stone, and intention.',
        color: 'bg-[#FACC15]',
    },
    {
        date: 'DEC 02',
        day: '02',
        month: 'DEC',
        title: 'Sobriety Social: Game Night',
        loc: 'Denver, CO • Community Lab',
        cat: 'SOBRIETY',
        desc: 'Laughter is the best medicine, but we have snacks too.',
        color: 'bg-[#FB7185]',
    },
    {
        date: 'DEC 07',
        day: '07',
        month: 'DEC',
        title: 'Community Market',
        loc: 'RiNo District • Denver',
        cat: 'COMMUNITY',
        desc: 'Artists, healers, makers — all savage, all adorable.',
        color: 'bg-[#2DD4BF]',
    },
];

export const eventFilters = [
    'ALL',
    'WELLNESS',
    'MUSIC',
    'COMMUNITY',
    'SOBRIETY',
    'EDUCATION',
];

export const wellnessHotspots = [
    {
        x: 34,
        y: 28,
        title: 'Amethyst Cluster',
        text: 'Used for centuries as a symbol of calm focus. We explore story, not medical claims.',
    },
    {
        x: 68,
        y: 42,
        title: 'Lavender Oil',
        text: 'Bright, herbaceous. Learn how scent links to memory and ritual.',
    },
    {
        x: 48,
        y: 75,
        title: 'Palo & Raw Crystals',
        text: 'Textures, origins, ethics — wellness education rooted in respect.',
    },
];

export const wellnessLabs = [
    { k: 'Scent Library', v: '12 botanicals decoded' },
    { k: 'Crystal Ethics', v: 'Sourcing, respect, story' },
    { k: 'Ritual Kits', v: 'DIY self-care to go' },
    { k: 'Community Lab', v: 'Ask anything, no judgement' },
];

export const featuredArtists = [
    { n: 'Ama Luna', s: 'Spoken word / Soul', img: images.joy },
    { n: 'Jules & The Wild', s: 'Indie Folk Collective', img: images.folk },
    { n: 'Mira Sol', s: 'Producer + Healer', img: images.healer },
];

export const manifestoPills = [
    { t: 'YOUR WEIRD.', r: '-2deg', c: 'bg-white', cl: 'text-black' },
    { t: 'YOUR WONDERFUL.', r: '1deg', c: 'bg-black', cl: 'text-white' },
    { t: 'YOUR WILD.', r: '-1deg', c: 'bg-[#FDE047]', cl: 'text-black' },
    { t: 'YOUR SOFT.', r: '2deg', c: 'bg-white', cl: 'text-black' },
    { t: 'YOUR SAVAGE.', r: '-1.5deg', c: 'bg-[#FF6B9D]', cl: 'text-white' },
];

export const socialImages = [
    images.joy,
    images.folk,
    images.community,
    images.hero,
    images.verses,
    images.healer,
    images.botanicals,
    images.joy,
];

export const weekSchedule = [
    ['TONIGHT 7PM', 'Verses & Vibes Open Mic'],
    ['THU 6PM', 'Sobriety Social: Tea & Truth'],
    ['SAT 10AM', 'Crystal Curiosity Lab'],
];
