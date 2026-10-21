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

/** Turn plain text / light HTML into paragraph HTML */
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

function ContentColumn({ eyebrow, heading, html, accent, signature }) {
    if (!html && !heading) {
        return null;
    }

    return (
        <article className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-black/5 bg-white p-8 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.16)] lg:p-10">
            <div
                className={`absolute left-0 top-0 h-full w-1.5 ${accent}`}
                aria-hidden="true"
            />

            {eyebrow && (
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                    {eyebrow}
                </div>
            )}

            <h2 className="mt-3 font-display text-[32px] leading-[0.95] tracking-tight md:text-[36px]">
                {heading}
            </h2>

            {html ? (
                <div
                    className="prose prose-neutral mt-6 max-w-none flex-1 text-[15.5px] leading-[1.75] text-black/70 prose-p:my-4 prose-p:first:mt-0 prose-strong:text-ink"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            ) : null}

            {signature && (
                <p className="mt-8 border-t border-black/5 pt-6 font-hand text-[22px] leading-snug text-[#FF6B9D] md:text-[26px]">
                    {signature}
                </p>
            )}
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
    const pageEyebrow = getCustomField(page, 'eyebrow', 'OUR STORY');
    const leftEyebrow = getCustomField(page, 'left_eyebrow');
    const leftHeading = getCustomField(page, 'left_heading', 'The Concept');
    const rightEyebrow = getCustomField(page, 'right_eyebrow');
    const rightHeading = getCustomField(
        page,
        'right_heading',
        'A Note from the Founder',
    );
    const founderSignature = getCustomField(
        page,
        'founder_signature',
        '— Lyann Noe, The Adorable Savage, Founder',
    );

    const leftHtml = useMemo(
        () => toHtml(page?.description || ''),
        [page?.description],
    );
    const rightHtml = useMemo(
        () => toHtml(getCustomField(page, 'founder_note')),
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
                <div className="pointer-events-none absolute bottom-20 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#FDE047]/20 blur-[80px]" />

                <div className="relative mx-auto max-w-[1200px] px-6 py-16 lg:py-24">
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

                        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-black/55">
                            Soft enough to feel it all. Savage enough to keep going.
                        </p>
                    </div>

                    <div className="mt-14 grid items-stretch gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
                        <ContentColumn
                            eyebrow={leftEyebrow}
                            heading={leftHeading}
                            html={leftHtml}
                            accent="bg-[#FF6B9D]"
                        />
                        <ContentColumn
                            eyebrow={rightEyebrow}
                            heading={rightHeading}
                            html={rightHtml}
                            accent="bg-[#A78BFA]"
                            signature={
                                rightHtml ? founderSignature : ''
                            }
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
