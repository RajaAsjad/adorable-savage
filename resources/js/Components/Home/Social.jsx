import { socialImages } from '@/data';

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

function VibeTitle({ title }) {
    const text = title || 'Stay in the vibe';

    if (!/\bvibe\b/i.test(text)) {
        return text;
    }

    const parts = text.split(/(vibe)/i);

    return parts.map((part, index) =>
        /^vibe$/i.test(part) ? (
            <span key={index} className="font-hand text-[#FF6B9D]">
                {part}
            </span>
        ) : (
            <span key={index}>{part}</span>
        ),
    );
}

function resolveGalleryItems(galleryItems) {
    if (Array.isArray(galleryItems) && galleryItems.length > 0) {
        return galleryItems.map((item, index) => {
            const fallbackSrc = socialImages[index] || socialImages[0];

            return {
                src: item.image_url || fallbackSrc,
                caption:
                    item.title ||
                    (index % 2 === 0
                        ? 'joy is a practice.'
                        : 'soft power is real.'),
                badge: item.category_title || (index % 2 ? 'IG' : 'TT'),
            };
        });
    }

    return socialImages.map((src, index) => ({
        src,
        caption:
            index % 2 === 0 ? 'joy is a practice.' : 'soft power is real.',
        badge: index % 2 ? 'IG' : 'TT',
    }));
}

export default function Social({ page = null, galleryItems = [] }) {
    const title = page?.title || 'Stay in the vibe';
    const intro =
        stripHtml(page?.description) ||
        'Follow The Adorable Savage for inspiration, wellness conversations, music, events, community moments, and everyday doses of joy.';
    const items = resolveGalleryItems(galleryItems);

    return (
        <section className="mx-auto max-w-[1280px] px-6 py-20 lg:py-28">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <div className="mb-4 text-[12px] font-bold tracking-[0.2em] opacity-60">
                        — STAY IN THE VIBE
                    </div>
                    <h2 className="font-display text-[44px] leading-[0.9] tracking-tight lg:text-[60px]">
                        <VibeTitle title={title} />
                    </h2>
                    <p className="mt-3 max-w-[460px] text-black/60">{intro}</p>
                </div>
                <div className="flex gap-2 text-[11px] font-bold tracking-widest">
                    <span className="rounded-full bg-black px-4 py-2 text-white">
                        @ADORABLESAVAGE
                    </span>
                    <span className="rounded-full border border-black/10 px-4 py-2">
                        INSTAGRAM • YOUTUBE • TIKTOK
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
                {items.map((item, index) => (
                    <div
                        key={`${item.src}-${index}`}
                        className={`group relative overflow-hidden rounded-[22px] bg-[#EEE] ${
                            index === 0
                                ? 'aspect-[3/4] md:row-span-2'
                                : 'aspect-square'
                        }`}
                    >
                        <img
                            src={item.src}
                            alt=""
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition group-hover:opacity-100" />
                        <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="text-[12px] font-bold tracking-wide text-white">
                                {item.caption}
                            </div>
                            <div className="mt-2 flex gap-2">
                                <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[12px] text-black">
                                    ♥
                                </span>
                                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 text-white backdrop-blur">
                                    ↗
                                </span>
                            </div>
                        </div>
                        <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold tracking-widest">
                            @{item.badge}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
