import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Home/Footer';
import Header from '@/Components/Home/Header';

export default function Default({ page }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const title = page?.seo_title || page?.title || 'Page';

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FFFBF0] text-[#131313] selection:bg-[#FF6B9D] selection:text-white">
            <Head>
                <title>{title}</title>
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

            <main className="mx-auto max-w-4xl px-6 pb-16 pt-32">
                {page?.image && (
                    <img
                        src={page.image}
                        alt=""
                        className="mb-8 h-64 w-full rounded-[28px] object-cover"
                    />
                )}

                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                    {page?.slug || 'page'}
                </div>
                <h1 className="mt-3 font-display text-[48px] leading-none tracking-tight">
                    {page?.title}
                </h1>

                {page?.description ? (
                    <div
                        className="prose prose-neutral mt-8 max-w-none text-[16px] leading-7 text-black/75"
                        dangerouslySetInnerHTML={{ __html: page.description }}
                    />
                ) : (
                    <p className="mt-8 text-[15px] text-black/45">
                        This page has no content yet.
                    </p>
                )}
            </main>

            <Footer />
        </div>
    );
}
