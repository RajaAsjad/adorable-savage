import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Home/Footer';
import Header from '@/Components/Home/Header';

export default function Index({ blogs }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FFFBF0] text-[#131313] selection:bg-[#FF6B9D] selection:text-white">
            <Head>
                <title>Blog</title>
                <meta
                    name="description"
                    content="Stories, notes, and updates from The Adorable Savage."
                />
            </Head>
            <div className="page-grain" />

            <Header
                scrolled={scrolled}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
            />

            <main className="mx-auto max-w-[1280px] px-6 pb-20 pt-32">
                <div className="mb-12 max-w-2xl">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                        — Blog
                    </div>
                    <h1 className="mt-4 font-display text-[48px] leading-none tracking-tight md:text-[64px]">
                        Stay in the{' '}
                        <span className="font-hand text-[#FF6B9D]">vibe</span>
                    </h1>
                    <p className="mt-5 text-[16px] leading-[1.6] text-black/60">
                        Stories, notes, and updates from our community —
                        healing, wellness, music, and real life.
                    </p>
                </div>

                {blogs.data.length === 0 ? (
                    <p className="rounded-[28px] border border-black/5 bg-white px-8 py-16 text-center text-[15px] text-black/45">
                        No blog posts published yet.
                    </p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {blogs.data.map((blog) => (
                            <Link
                                key={blog.id}
                                href={route('blog.show', blog.slug)}
                                className="group overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-18px_rgba(0,0,0,0.3)]"
                            >
                                <div className="relative h-[200px] overflow-hidden bg-[#F6F1E8]">
                                    {blog.image_url ? (
                                        <img
                                            src={blog.image_url}
                                            alt=""
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="grid h-full place-items-center font-hand text-[28px] text-black/25">
                                            blog
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    {blog.published_at && (
                                        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/40">
                                            {blog.published_at}
                                        </div>
                                    )}
                                    <h2 className="mt-2 font-display text-[26px] leading-[1.05]">
                                        {blog.title}
                                    </h2>
                                    {blog.excerpt && (
                                        <p className="mt-3 line-clamp-3 text-[14px] leading-[1.5] text-black/60">
                                            {blog.excerpt}
                                        </p>
                                    )}
                                    <div className="mt-5 text-[12px] font-bold tracking-widest">
                                        READ MORE →
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {blogs.links?.length > 3 && (
                    <div className="mt-10 flex flex-wrap justify-center gap-2">
                        {blogs.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || ''}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`rounded-full px-4 py-2 text-[12px] font-semibold ${
                                    link.active
                                        ? 'bg-ink text-white'
                                        : 'bg-white text-ink'
                                } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
