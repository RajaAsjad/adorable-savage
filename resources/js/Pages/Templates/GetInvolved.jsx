import { useEffect, useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Home/Footer';
import Header from '@/Components/Home/Header';
import ScrollingTicker from '@/Components/Home/ScrollingTicker';
import { parseTickerText } from '@/data/tickerContent';

function getCustomField(page, name, defaultValue = '') {
    if (!Array.isArray(page?.custom_fields)) {
        return defaultValue;
    }

    const field = page.custom_fields.find(
        (item) => (item?.name || '').trim().toLowerCase() === name.toLowerCase(),
    );

    return field?.value ?? defaultValue;
}

function TitleHeading({ title }) {
    const text = (title || '').trim();

    if (!text) {
        return null;
    }

    const words = text.split(/\s+/);

    if (words.length < 2) {
        return text;
    }

    const lastWord = words.pop();

    return (
        <>
            {words.join(' ')}{' '}
            <span className="font-hand text-[#FF6B9D]">{lastWord}</span>
        </>
    );
}

const CARD_ACCENTS = [
    {
        accent: 'bg-[#FF6B9D]',
        soft: 'from-[#FF6B9D]/15 to-transparent',
        number: '01',
    },
    {
        accent: 'bg-[#A78BFA]',
        soft: 'from-[#A78BFA]/20 to-transparent',
        number: '02',
    },
    {
        accent: 'bg-[#FDE047]',
        soft: 'from-[#FDE047]/30 to-transparent',
        number: '03',
    },
    {
        accent: 'bg-[#2DD4BF]',
        soft: 'from-[#2DD4BF]/20 to-transparent',
        number: '04',
    },
];

function InvolvementCard({ card, index }) {
    if (!card?.title && !card?.text) {
        return null;
    }

    const style = CARD_ACCENTS[index % CARD_ACCENTS.length];
    const isExternal =
        card.url?.startsWith('http://') || card.url?.startsWith('https://');
    const isHash = card.url?.startsWith('#');
    const isMailto = card.url?.startsWith('mailto:');

    const ctaClass =
        'mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[12px] font-bold tracking-wide text-white transition hover:bg-[#FF6B9D]';

    const ctaLabel = (
        <>
            {card.cta || 'LEARN MORE'} <span>↗</span>
        </>
    );

    let cta = null;

    if (card.url) {
        if (isExternal || isMailto || isHash) {
            cta = (
                <a href={card.url} className={ctaClass}>
                    {ctaLabel}
                </a>
            );
        } else {
            cta = (
                <Link href={card.url} className={ctaClass}>
                    {ctaLabel}
                </Link>
            );
        }
    }

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_14px_40px_-20px_rgba(0,0,0,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-18px_rgba(0,0,0,0.2)] lg:p-8">
            <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${style.soft}`}
            />
            <div className="relative flex items-start justify-between gap-4">
                <span
                    className={`grid h-11 w-11 place-items-center rounded-full text-[13px] font-bold text-black ${style.accent}`}
                >
                    {style.number}
                </span>
                <span className="font-hand text-[22px] leading-none text-black/25 transition group-hover:text-[#FF6B9D]/70">
                    join
                </span>
            </div>

            <h2 className="relative mt-6 font-display text-[28px] leading-[0.95] tracking-tight md:text-[32px]">
                {card.title}
            </h2>

            {card.text && (
                <p className="relative mt-4 flex-1 text-[15px] leading-[1.65] text-black/70">
                    {card.text}
                </p>
            )}

            {card.note && (
                <p className="relative mt-4 rounded-2xl bg-[#FFFBF0] px-4 py-3 text-[12px] leading-relaxed text-black/55">
                    {card.note}
                </p>
            )}

            {cta}
        </article>
    );
}

const PILLAR_ACCENTS = [
    'bg-[#FF6B9D]',
    'bg-[#A78BFA]',
    'bg-[#FDE047]',
];

function buildPillars(page) {
    const defaults = [
        {
            key: 'pillar_1',
            name: 'Real, Raw, Relatable',
            tagline: 'Where truth hits the pavement.',
        },
        {
            key: 'pillar_2',
            name: 'Verses And Vibes',
            tagline: 'Every lyric holds a story.',
        },
        {
            key: 'pillar_3',
            name: 'Unapologetic Wellness',
            tagline: 'You just needed someone to go first.',
        },
    ];

    return defaults
        .map((item) => {
            const name = getCustomField(page, `${item.key}_name`, item.name);
            const tagline = getCustomField(
                page,
                `${item.key}_tagline`,
                item.tagline,
            );

            if (!name && !tagline) {
                return null;
            }

            return { name, tagline };
        })
        .filter(Boolean);
}

function PillarsStrip({ pillars }) {
    if (!pillars.length) {
        return null;
    }

    return (
        <div className="mt-12 overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_12px_40px_-20px_rgba(0,0,0,0.12)]">
            <div className="grid border-b border-black/5 bg-[#FFFBF0] px-6 py-4 sm:grid-cols-[1.1fr_1.4fr]">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                    Pillar
                </div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-black/40 sm:mt-0">
                    Tagline
                </div>
            </div>

            {pillars.map((pillar, index) => (
                <div
                    key={pillar.name}
                    className="grid items-center gap-2 border-b border-black/5 px-6 py-5 last:border-0 sm:grid-cols-[1.1fr_1.4fr] sm:gap-6"
                >
                    <div className="flex items-center gap-3">
                        <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-full ${PILLAR_ACCENTS[index % PILLAR_ACCENTS.length]}`}
                        />
                        <h3 className="font-display text-[22px] leading-none tracking-tight md:text-[26px]">
                            {pillar.name}
                        </h3>
                    </div>
                    <p className="pl-5 font-hand text-[22px] leading-snug text-[#FF6B9D] sm:pl-0 md:text-[26px]">
                        {pillar.tagline}
                    </p>
                </div>
            ))}
        </div>
    );
}

function buildCards(page) {
    const defaults = [
        {
            key: 'donate',
            title: 'Donate',
            text: "Your gift keeps the mic on, the classes free or low-cost, and the door open for someone who's ready to change.",
            cta: 'DONATE TODAY',
            url: '/donate',
            note: 'Every donation is tax-deductible to the extent allowed by law — 501(c)(3) is pending.',
        },
        {
            key: 'volunteer',
            title: 'Volunteer',
            text: 'Help run events, host a circle, teach a class, or share a skill. If you have a gift, we have a place for it.',
            cta: 'APPLY TO VOLUNTEER',
            url: '/contact',
            note: '',
        },
        {
            key: 'sponsor',
            title: 'Sponsor or Partner',
            text: 'Local businesses and venues: partner with us on an open mic, a wellness event, or a yoga series and put your name behind something that matters.',
            cta: 'PARTNER WITH US',
            url: '/contact',
            note: '',
        },
        {
            key: 'artists',
            title: 'Artists & Practitioners',
            text: 'Want to be interviewed, perform, or lead a workshop? Reach out.',
            cta: 'GET IN TOUCH',
            url: '/contact',
            note: '',
        },
    ];

    return defaults
        .map((item) => {
            const title = getCustomField(page, `${item.key}_title`, item.title);
            const text = getCustomField(page, `${item.key}_text`, item.text);
            const cta = getCustomField(page, `${item.key}_cta`, item.cta);
            const url = getCustomField(page, `${item.key}_url`, item.url);
            const note = getCustomField(page, `${item.key}_note`, item.note);

            if (!title && !text) {
                return null;
            }

            return { title, text, cta, url, note };
        })
        .filter(Boolean);
}

export default function GetInvolved({ page }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const seoTitle = page?.seo_title || page?.title || 'Get Involved';
    const eyebrow = getCustomField(page, 'eyebrow', 'BE PART OF IT');
    const closing = getCustomField(
        page,
        'closing',
        'No perfect entry — just you, showing up.',
    );
    const featuredImage = page?.image || '';
    const pillars = useMemo(() => buildPillars(page), [page]);
    const cards = useMemo(() => buildCards(page), [page]);
    const tickerItems = useMemo(
        () => parseTickerText(page?.ticker_text) || [],
        [page?.ticker_text],
    );

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FFFBF0] text-[#131313] selection:bg-[#FF6B9D] selection:text-white">
            <Head>
                <title>{seoTitle}</title>
                {page?.seo_description && (
                    <meta name="description" content={page.seo_description} />
                )}
            </Head>
            <div className="page-grain" />

            <Header
                scrolled={scrolled}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
            />

            <section className="relative overflow-hidden pt-24">
                <div className="pointer-events-none absolute -left-[8%] top-16 h-[380px] w-[380px] rounded-full bg-[#A78BFA]/20 blur-[90px]" />
                <div className="pointer-events-none absolute -right-[10%] top-40 h-[420px] w-[420px] rounded-full bg-[#FF6B9D]/15 blur-[90px]" />
                <div className="pointer-events-none absolute bottom-0 left-1/3 h-[280px] w-[280px] rounded-full bg-[#FDE047]/20 blur-[80px]" />

                <div className="relative mx-auto max-w-[1280px] px-6 py-16 lg:py-24">
                    <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
                        <div>
                            {eyebrow && (
                                <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em]">
                                    <span className="h-[2px] w-6 bg-black" />
                                    {eyebrow}
                                </div>
                            )}

                            <h1 className="mt-6 font-display text-[48px] leading-[0.92] tracking-tight md:text-[64px] lg:text-[76px]">
                                <TitleHeading
                                    title={page?.title || 'Get Involved'}
                                />
                            </h1>

                            {page?.description ? (
                                <div
                                    className="cms-content mt-7 max-w-2xl text-[17px]"
                                    dangerouslySetInnerHTML={{
                                        __html: page.description,
                                    }}
                                />
                            ) : (
                                <p className="mt-7 max-w-2xl text-[17px] leading-[1.7] text-black/70">
                                    The Adorable Savage is the belief that every
                                    person walks into this life already carrying
                                    what they need to live it — the tenderness and
                                    the grit, the tears and the fight.
                                </p>
                            )}
                        </div>

                        {featuredImage ? (
                            <div className="relative overflow-hidden rounded-[32px] bg-[#F6F1E8]">
                                <img
                                    src={featuredImage}
                                    alt={page?.title || 'Get Involved'}
                                    className="aspect-[5/4] w-full object-cover lg:aspect-[4/5]"
                                />
                                <div className="absolute bottom-5 left-5 rotate-[-2deg] rounded-full bg-[#FDE047] px-4 py-2 text-[12px] font-bold tracking-wide text-black">
                                    YOUR GIFT MATTERS
                                </div>
                            </div>
                        ) : (
                            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#FF6B9D]/20 via-white to-[#FDE047]/30 p-8 lg:p-10">
                                <div className="font-display text-[36px] leading-[0.95] tracking-tight lg:text-[44px]">
                                    Show up.{' '}
                                    <span className="font-hand text-[#FF6B9D]">
                                        Softly.
                                    </span>{' '}
                                    Wildly.
                                </div>
                                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-black/60">
                                    Donate, volunteer, partner, or share your craft —
                                    there&apos;s a seat for every kind of heart.
                                </p>
                                <div className="mt-8 flex flex-wrap gap-2">
                                    {['Give', 'Help', 'Partner', 'Create'].map(
                                        (chip, i) => (
                                            <span
                                                key={chip}
                                                className={`rounded-full px-4 py-1.5 text-[11px] font-bold tracking-wide ${
                                                    i % 2 === 0
                                                        ? 'bg-black text-white'
                                                        : 'bg-white text-black'
                                                }`}
                                            >
                                                {chip}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <PillarsStrip pillars={pillars} />

                    <div className="mt-16 grid gap-6 md:grid-cols-2 xl:gap-7">
                        {cards.map((card, index) => (
                            <InvolvementCard
                                key={card.title}
                                card={card}
                                index={index}
                            />
                        ))}
                    </div>

                    {closing && (
                        <div className="mt-16 overflow-hidden rounded-[32px] bg-[#131313] px-8 py-10 text-center text-[#FFFBF0] lg:px-12 lg:py-14">
                            <p className="font-display text-[28px] leading-tight tracking-tight md:text-[40px]">
                                {closing.includes('—') ? (
                                    <>
                                        {closing.split('—')[0].trim()} —{' '}
                                        <span className="font-hand text-[#FDE047]">
                                            {closing.split('—').slice(1).join('—').trim()}
                                        </span>
                                    </>
                                ) : (
                                    closing
                                )}
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <Link
                                    href="/donate"
                                    className="rounded-full bg-white px-7 py-3 text-[13px] font-bold tracking-wide text-black transition hover:bg-[#FF6B9D] hover:text-white"
                                >
                                    DONATE TODAY ♥
                                </Link>
                                <Link
                                    href="/contact"
                                    className="rounded-full border border-white/20 px-7 py-3 text-[13px] font-bold tracking-wide transition hover:bg-white hover:text-black"
                                >
                                    TALK TO US
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {tickerItems.length > 0 && (
                <ScrollingTicker
                    items={tickerItems}
                    label="Get Involved ticker"
                />
            )}

            <Footer />
        </div>
    );
}
