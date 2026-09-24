import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Home/Footer';
import Header from '@/Components/Home/Header';

export default function AboutPost({ post }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const title = post?.seo_title || post?.title || 'Pillar';

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FFFBF0] text-[#131313] selection:bg-[#FF6B9D] selection:text-white">
            <Head>
                <title>{title}</title>
                {post?.seo_description && (
                    <meta name="description" content={post.seo_description} />
                )}
            </Head>
            <div className="page-grain" />

            <Header
                scrolled={scrolled}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
            />

            <main className="mx-auto max-w-4xl px-6 pb-16 pt-32">
                <Link
                    href="/#about"
                    className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-black/45 transition hover:text-black"
                >
                    ← Back to About
                </Link>

                {post?.image_url && (
                    <img
                        src={post.image_url}
                        alt=""
                        className="mt-6 h-64 w-full rounded-[28px] object-cover md:h-80"
                    />
                )}

                <div className="mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                    {post?.slogan_text || post?.slug || 'Pillar'}
                </div>
                <h1 className="mt-3 font-display text-[42px] leading-none tracking-tight md:text-[56px]">
                    {post?.title}
                </h1>

                {post?.description ? (
                    <div
                        className="prose prose-neutral mt-8 max-w-none text-[16px] leading-7 text-black/75"
                        dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                ) : (
                    <p className="mt-8 text-[15px] text-black/45">
                        This pillar has no content yet.
                    </p>
                )}
            </main>

            <Footer />
        </div>
    );
}
