import { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
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

function toHtml(content) {
    const raw = (content || '').trim();

    if (!raw) {
        return '';
    }

    if (/<[a-z][\s\S]*>/i.test(raw)) {
        return raw;
    }

    return raw
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .filter(Boolean)
        .map((block) => `<p>${block.replace(/\n/g, '<br />')}</p>`)
        .join('');
}

function Prose({ html, className = '' }) {
    if (!html) {
        return null;
    }

    return (
        <div
            className={`cms-content max-w-none ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

function SectionCard({ eyebrow, heading, html, accent = 'bg-[#FF6B9D]', children }) {
    if (!html && !children && !heading) {
        return null;
    }

    return (
        <article className="relative overflow-hidden rounded-[32px] border border-black/5 bg-white p-8 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.14)] lg:p-10">
            <div
                className={`absolute left-0 top-0 h-full w-1.5 ${accent}`}
                aria-hidden="true"
            />

            {eyebrow && (
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                    {eyebrow}
                </div>
            )}

            {heading && (
                <h2
                    className={`font-display text-[32px] leading-[0.95] tracking-tight md:text-[40px] ${
                        eyebrow ? 'mt-3' : ''
                    }`}
                >
                    {heading}
                </h2>
            )}

            {html && <Prose html={html} className={heading ? 'mt-6' : ''} />}
            {children}
        </article>
    );
}

export default function AdorableSavage({ page }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const seoTitle = page?.seo_title || page?.title || 'The Adorable Savage';
    const pageEyebrow = getCustomField(page, 'eyebrow', 'ABOUT ME');
    const tagline = getCustomField(
        page,
        'tagline',
        'Cute is given. Adorable is earned.',
    );
    const introHtml = useMemo(
        () => toHtml(page?.description || ''),
        [page?.description],
    );

    const meetHeading = getCustomField(
        page,
        'meet_heading',
        'Meet The Adorable Savage',
    );
    const meetHtml = useMemo(
        () => toHtml(getCustomField(page, 'meet_body')),
        [page],
    );

    const pullQuote = getCustomField(
        page,
        'pull_quote',
        'Adorable Savage. Both. Always.',
    );

    const originHeading = getCustomField(
        page,
        'origin_heading',
        'How I Became The Adorable Savage',
    );
    const originHtml = useMemo(
        () => toHtml(getCustomField(page, 'origin_body')),
        [page],
    );

    const todayHeading = getCustomField(
        page,
        'today_heading',
        'Who I Am Today',
    );
    const todayHtml = useMemo(
        () => toHtml(getCustomField(page, 'today_body')),
        [page],
    );

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
                <div className="pointer-events-none absolute -left-[10%] top-24 h-[360px] w-[360px] rounded-full bg-[#FF6B9D]/15 blur-[90px]" />
                <div className="pointer-events-none absolute -right-[8%] top-10 h-[320px] w-[320px] rounded-full bg-[#A78BFA]/20 blur-[90px]" />
                <div className="pointer-events-none absolute bottom-40 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#FDE047]/20 blur-[80px]" />

                <div className="relative mx-auto max-w-[1100px] px-6 py-16 lg:py-24">
                    {/* Hero */}
                    <div className="mx-auto max-w-3xl text-center">
                        {pageEyebrow && (
                            <div className="inline-flex items-center justify-center gap-2 text-[11px] font-bold tracking-[0.2em]">
                                <span className="h-[2px] w-6 bg-black" />
                                {pageEyebrow}
                                <span className="h-[2px] w-6 bg-black" />
                            </div>
                        )}

                        <h1 className="mt-6 font-display text-[48px] leading-[0.92] tracking-tight md:text-[64px] lg:text-[76px]">
                            <TitleHeading
                                title={page?.title || 'The Adorable Savage'}
                            />
                        </h1>

                        {tagline && (
                            <p className="mx-auto mt-6 max-w-xl font-hand text-[28px] font-bold leading-snug text-[#FF6B9D] md:text-[34px]">
                                {tagline}
                            </p>
                        )}

                        {introHtml && (
                            <div
                                className="about-intro mx-auto mt-10 max-w-2xl text-center"
                                dangerouslySetInnerHTML={{ __html: introHtml }}
                            />
                        )}
                    </div>

                    {/* Meet */}
                    {(meetHeading || meetHtml) && (
                        <div id="meet-section" className="mt-14 scroll-mt-28 lg:mt-16">
                            <SectionCard
                                heading={meetHeading}
                                html={meetHtml}
                                accent="bg-[#FF6B9D]"
                            />
                        </div>
                    )}

                    {/* Pull quote */}
                    {pullQuote && (
                        <div className="mt-10 overflow-hidden rounded-[32px] bg-[#131313] px-8 py-12 text-center text-[#FFFBF0] lg:px-12 lg:py-14">
                            <p className="font-display text-[28px] leading-tight tracking-tight md:text-[44px]">
                                <TitleHeading title={pullQuote} />
                            </p>
                        </div>
                    )}

                    {/* Origin + Today */}
                    <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
                        <SectionCard
                            heading={originHeading}
                            html={originHtml}
                            accent="bg-[#A78BFA]"
                        />
                        <SectionCard
                            heading={todayHeading}
                            html={todayHtml}
                            accent="bg-[#FDE047]"
                        />
                    </div>
                </div>
            </section>

            {tickerItems.length > 0 && (
                <ScrollingTicker
                    items={tickerItems}
                    label="Adorable Savage ticker"
                />
            )}

            <Footer />
        </div>
    );
}
