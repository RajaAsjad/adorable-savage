import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Home/Footer';
import Header from '@/Components/Home/Header';

function stripHtml(html) {
    if (!html) {
        return '';
    }

    return html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export default function Community({ page }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const heading = page?.title || 'Community';
    const pageTitle = page?.seo_title || heading;
    const intro =
        stripHtml(page?.description) ||
        'A space for connection, creativity, and showing up as yourself — more soon.';

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FFFBF0] text-[#131313] selection:bg-[#FF6B9D] selection:text-white">
            <Head>
                <title>{pageTitle}</title>
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

            <main className="relative pt-24">
                <section className="relative isolate min-h-[72vh] overflow-hidden lg:min-h-[78vh]">
                    <div className="absolute inset-0 bg-[#131313]" />
                    <div className="pointer-events-none absolute inset-0 opacity-90">
                        <div className="animate-float absolute -left-[12%] -top-[18%] h-[70%] w-[70%] rounded-full bg-[#2DD4BF]/35 blur-[90px]" />
                        <div className="animate-float-alt absolute -bottom-[22%] -right-[8%] h-[65%] w-[65%] rounded-full bg-[#FF6B9D]/30 blur-[90px]" />
                        <div className="animate-float-slow absolute left-[35%] top-[42%] h-[40%] w-[40%] rounded-full bg-[#FDE047]/25 blur-[80px]" />
                    </div>

                    <div className="relative mx-auto flex min-h-[72vh] max-w-[1280px] flex-col items-center justify-center px-6 py-20 text-center text-[#FFFBF0] lg:min-h-[78vh] lg:py-28">
                        <div className="mb-6 text-[12px] font-bold tracking-[0.28em] text-white/55">
                            — THE ADORABLE SAVAGE
                        </div>

                        <h1 className="font-display text-[14vw] leading-[0.85] tracking-[-0.05em] lg:text-[120px]">
                            {heading}
                        </h1>

                        <div className="mt-8 inline-flex items-center gap-3">
                            <span className="h-px w-10 bg-white/25" />
                            <p className="font-hand text-[42px] leading-none text-[#FDE047] md:text-[56px]">
                                Coming Soon
                            </p>
                            <span className="h-px w-10 bg-white/25" />
                        </div>

                        <p className="mt-8 max-w-[520px] text-[16px] leading-[1.65] text-white/65 md:text-[18px]">
                            {intro}
                        </p>

                        <div className="mt-12 rounded-full border border-white/15 px-6 py-3 text-[12px] font-bold tracking-[0.2em] text-white/70">
                            MORE SOON
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
