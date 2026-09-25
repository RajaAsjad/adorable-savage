import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Home/Footer';
import Header from '@/Components/Home/Header';

function getCustomField(page, name, defaultValue = '') {
    if (!Array.isArray(page?.custom_fields)) {
        return defaultValue;
    }

    const field = page.custom_fields.find(
        (item) => (item?.name || '').trim().toLowerCase() === name.toLowerCase(),
    );

    return field?.value ?? defaultValue;
}

/** "Stay in the vibe" style — last word in pink handwritten font */
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

export default function TwoColumn({ page }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const seoTitle = page?.seo_title || page?.title || 'Page';
    const eyebrow = getCustomField(page, 'eyebrow');
    const heading = page?.title || '';
    const content = page?.description || '';
    const featuredImage = page?.image || '';

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

            <section className="relative overflow-hidden bg-white pt-24">
                <div className="mx-auto grid max-w-[1280px] items-start gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
                    {featuredImage ? (
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#F6F1E8] lg:sticky lg:top-28">
                            <img
                                src={featuredImage}
                                alt={heading}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="aspect-[4/5] rounded-[32px] bg-[#F6F1E8]" />
                    )}

                    <div>
                        {eyebrow && (
                            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em]">
                                <span className="h-[2px] w-6 bg-black" />{' '}
                                {eyebrow}
                            </div>
                        )}

                        {heading && (
                            <h1
                                className={`font-display text-[48px] leading-[0.95] tracking-tight md:text-[56px] lg:text-[64px] ${
                                    eyebrow ? 'mt-6' : ''
                                }`}
                            >
                                <TitleHeading title={heading} />
                            </h1>
                        )}

                        {content ? (
                            <div
                                className="prose prose-neutral mt-8 max-w-none text-[16px] leading-7 text-black/75"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        ) : (
                            <p className="mt-8 text-[15px] text-black/45">
                                This page has no content yet.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
