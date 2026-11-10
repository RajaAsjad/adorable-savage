import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Home/Footer';
import Header from '@/Components/Home/Header';
import PhilosophyMarquee from '@/Components/Home/PhilosophyMarquee';

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

function isEmbeddableVideo(url) {
    if (!url) {
        return false;
    }

    return (
        url.includes('youtube.com') ||
        url.includes('youtu.be') ||
        url.includes('vimeo.com')
    );
}

function toEmbedUrl(url) {
    if (!url) {
        return null;
    }

    if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split(/[?&]/)[0];
        return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (url.includes('youtube.com/watch')) {
        try {
            const id = new URL(url).searchParams.get('v');
            return id ? `https://www.youtube.com/embed/${id}` : null;
        } catch {
            return null;
        }
    }

    if (url.includes('vimeo.com/')) {
        const id = url.split('vimeo.com/')[1]?.split(/[?&/]/)[0];
        return id ? `https://player.vimeo.com/video/${id}` : null;
    }

    return null;
}

function MediaBlock({ imageUrl, videoUrl, title }) {
    if (videoUrl && isEmbeddableVideo(videoUrl)) {
        const embed = toEmbedUrl(videoUrl);

        if (embed) {
            return (
                <div className="aspect-video overflow-hidden rounded-[22px] border border-black/10 bg-black/5">
                    <iframe
                        src={embed}
                        title={title || 'Video'}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            );
        }
    }

    if (videoUrl && (videoUrl.startsWith('/storage/') || videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm'))) {
        return (
            <div className="overflow-hidden rounded-[22px] border border-black/10 bg-black/5">
                <video
                    src={videoUrl}
                    controls
                    className="h-auto w-full"
                    poster={imageUrl || undefined}
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }

    if (imageUrl) {
        return (
            <div className="overflow-hidden rounded-[22px] border border-black/10">
                <img
                    src={imageUrl}
                    alt={title || ''}
                    className="h-auto w-full object-cover"
                />
            </div>
        );
    }

    return null;
}

export default function CalendarCategory({
    category,
    posts = [],
    events = [],
    categories = [],
}) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const heading = category?.heading || category?.title || 'Calendar';
    const pageTitle = category?.seo_title || heading;
    const intro = stripHtml(category?.description);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FFFBF0] text-[#131313] selection:bg-[#FF6B9D] selection:text-white">
            <Head>
                <title>{pageTitle}</title>
                {category?.seo_description && (
                    <meta name="description" content={category.seo_description} />
                )}
            </Head>
            <div className="page-grain" />

            <Header
                scrolled={scrolled}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
            />

            <main className="relative pt-24">
                <PhilosophyMarquee />

                <section className="relative mx-auto max-w-[1280px] px-6 pb-10 pt-12 lg:pt-16">
                    <div className="mb-4 text-[12px] font-bold tracking-[0.2em] opacity-60">
                        — CALENDAR
                    </div>
                    <h1 className="font-display text-[48px] leading-[0.95] tracking-tight lg:text-[72px]">
                        {heading}
                    </h1>
                    {intro ? (
                        <p className="mt-5 max-w-[640px] text-[16px] leading-[1.65] text-black/60">
                            {intro}
                        </p>
                    ) : null}

                    {category?.image_url ? (
                        <div className="mt-10 overflow-hidden rounded-[28px] border border-black/10">
                            <img
                                src={category.image_url}
                                alt={heading}
                                className="max-h-[420px] w-full object-cover"
                            />
                        </div>
                    ) : null}

                    <div className="mt-8 flex flex-wrap gap-2">
                        {categories.map((item) => {
                            const active = item.slug === category?.slug;

                            return (
                                <Link
                                    key={item.slug}
                                    href={route('calendar.show', item.slug)}
                                    className={`rounded-full border px-5 py-2 text-[12px] font-bold tracking-wide transition ${
                                        active
                                            ? 'border-black bg-black text-white'
                                            : 'border-black/10 bg-white hover:border-black'
                                    }`}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <section className="relative mx-auto max-w-[1280px] px-6 py-12 lg:py-16">
                    <div className="mb-4 text-[12px] font-bold tracking-[0.2em] opacity-60">
                        — UPDATES
                    </div>
                    <h2 className="font-display text-[36px] leading-none tracking-tight lg:text-[48px]">
                        Latest
                    </h2>

                    {posts.length === 0 ? (
                        <p className="mt-6 max-w-[520px] text-[15px] leading-[1.6] text-black/50">
                            New updates for this category will appear here as
                            they are published.
                        </p>
                    ) : (
                        <div className="mt-10 grid gap-8 lg:gap-12">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="grid gap-6 border-b border-black/10 pb-10 last:border-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start"
                                >
                                    <div>
                                        <h3 className="font-display text-[28px] leading-tight tracking-tight lg:text-[36px]">
                                            {post.title}
                                        </h3>
                                        {post.description ? (
                                            <div
                                                className="cms-content mt-4 max-w-none text-[15px]"
                                                dangerouslySetInnerHTML={{
                                                    __html: post.description,
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                    <MediaBlock
                                        imageUrl={post.image_url}
                                        videoUrl={post.video_url}
                                        title={post.title}
                                    />
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <section className="relative mx-auto max-w-[1280px] px-6 pb-20 pt-4 lg:pb-28">
                    <div className="mb-4 text-[12px] font-bold tracking-[0.2em] opacity-60">
                        — UPCOMING
                    </div>
                    <h2 className="font-display text-[36px] leading-none tracking-tight lg:text-[48px]">
                        Events
                    </h2>

                    {events.length === 0 ? (
                        <p className="mt-6 max-w-[520px] text-[15px] leading-[1.6] text-black/50">
                            Upcoming events for this category will appear here.
                        </p>
                    ) : (
                        <div className="mt-10 grid gap-5 md:grid-cols-2">
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex gap-4 rounded-[22px] border border-black/10 bg-white p-5"
                                >
                                    <div className="grid h-[68px] w-[58px] shrink-0 place-items-center rounded-[16px] bg-[#FF6B9D] text-black">
                                        <div className="text-center leading-[0.9]">
                                            <div className="text-[11px] font-bold tracking-widest">
                                                {event.month
                                                    ? String(event.month).toUpperCase()
                                                    : ''}
                                            </div>
                                            <div className="font-display text-[28px]">
                                                {event.day}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[16px] font-semibold leading-tight">
                                            {event.title}
                                        </h4>
                                        {event.description ? (
                                            <p className="mt-1 text-[13px] leading-[1.4] opacity-60">
                                                {stripHtml(event.description)}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-10">
                        <Link
                            href="/#events"
                            className="inline-flex rounded-full border border-black px-6 py-3 text-[12px] font-bold tracking-wide transition hover:bg-black hover:text-white"
                        >
                            BACK TO CALENDAR →
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
