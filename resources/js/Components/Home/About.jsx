import { Link } from '@inertiajs/react';
import { aboutPillars } from '@/data';

const defaultIntro =
    "We're Adorably Savage: a place where healing, honesty, and resilience come together, no matter what you're walking through. Real. Raw. Relatable. We believe self-love and self-empowerment aren't one size fits all. That's why we built three spaces, each meeting you exactly where you are:";

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

const CARD_EXCERPT_LENGTH = 120;

function truncateText(text, maxLength = CARD_EXCERPT_LENGTH) {
    if (!text || text.length <= maxLength) {
        return text || '';
    }

    const clipped = text.slice(0, maxLength).replace(/\s+\S*$/, '').trim();

    return `${clipped}…`;
}

function resolveIntro(description) {
    if (!description || !stripHtml(description)) {
        return defaultIntro;
    }

    const paragraphs = [...description.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
        .map((match) => stripHtml(match[1]))
        .filter(Boolean);

    if (paragraphs.length === 0) {
        return stripHtml(description);
    }

    const intro = paragraphs.find(
        (text) =>
            text.length > 40 &&
            !text.includes('WHAT WE DO') &&
            !/^—/.test(text),
    );

    return intro || paragraphs[paragraphs.length - 1] || defaultIntro;
}

function TitleText({ title }) {
    const text = title || 'About The Adorable Savage';

    if (!text.includes('Adorable Savage')) {
        return text;
    }

    const parts = text.split(/(Adorable Savage)/g);

    return parts.map((part, index) =>
        part === 'Adorable Savage' ? (
            <em key={index}>{part}</em>
        ) : (
            <span key={index}>{part}</span>
        ),
    );
}

function getCustomField(page, name, defaultValue = '') {
    if (!Array.isArray(page?.custom_fields)) {
        return defaultValue;
    }

    const field = page.custom_fields.find(
        (item) => (item?.name || '').trim() === name,
    );

    return field?.value ?? defaultValue;
}

function resolvePillars(aboutPosts) {
    if (Array.isArray(aboutPosts) && aboutPosts.length > 0) {
        return aboutPosts.map((post, index) => {
            const fallback = aboutPillars[index] || aboutPillars[0];

            return {
                id: String(index + 1).padStart(2, '0'),
                title: post.title,
                slug: post.slug || fallback.slug,
                sub: post.slogan_text || '',
                long: truncateText(stripHtml(post.description) || fallback.long),
                img: post.image_url || fallback.img,
                color: fallback.color,
            };
        });
    }

    return aboutPillars.map((pillar) => ({
        ...pillar,
        long: truncateText(pillar.long),
    }));
}

export default function About({ page = null, aboutPosts = [] }) {
    const slogan = getCustomField(page, 'title slogan');
    const title = page?.title
        ? [page.title, slogan].filter(Boolean).join(' ').trim()
        : 'About The Adorable Savage';
    const intro = resolveIntro(page?.description);
    const pillars = resolvePillars(aboutPosts);

    return (
        <section
            id="about"
            className="relative mx-auto max-w-[1280px] px-6 py-20 lg:py-28"
        >
            <div className="about-copy mb-12">
                <p>— WHAT WE DO</p>
                <h2>
                    <TitleText title={title} />
                </h2>
                <p>{intro}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {pillars.map((pillar) => {
                    const href = pillar.slug
                        ? route('pillars.show', pillar.slug)
                        : null;
                    const CardTag = href ? Link : 'div';
                    const cardProps = href ? { href } : {};

                    return (
                        <CardTag
                            key={pillar.id}
                            {...cardProps}
                            className={`group relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.35)] ${pillar.color} ${href ? 'cursor-pointer' : ''}`}
                        >
                            <img
                                src={pillar.img}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-multiply transition-all duration-700 group-hover:scale-[1.05] group-hover:opacity-30"
                            />
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-[0px] transition group-hover:backdrop-blur-[1px]" />
                            <div className="relative z-10 flex h-full flex-col">
                                <div className="flex items-start justify-between">
                                    <span className="grid h-11 w-11 place-items-center rounded-full bg-black text-[12px] font-bold text-white">
                                        {pillar.id}
                                    </span>
                                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white transition-transform duration-500 group-hover:rotate-45">
                                        ↗
                                    </span>
                                </div>
                                <div className="mt-auto">
                                    <h3 className="font-display text-[28px] leading-[0.95] tracking-tight text-black">
                                        {pillar.title}
                                    </h3>
                                    <div className="mt-3 text-[11px] font-bold tracking-[0.18em] opacity-70">
                                        {pillar.sub}
                                    </div>
                                    <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                                        <div className="overflow-hidden">
                                            <p className="pt-4 text-[14px] leading-[1.5] text-black/80 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                                                {pillar.long}
                                            </p>
                                            <div className="flex flex-wrap gap-2 pt-4">
                                                <span className="rounded-full bg-black px-3 py-1 text-[11px] text-white">
                                                    JOIN
                                                </span>
                                                <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium">
                                                    LEARN MORE
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="font-hand absolute bottom-3 right-4 rotate-[-6deg] text-[22px] opacity-40">
                                wild & soft
                            </div>
                        </CardTag>
                    );
                })}
            </div>

            <p className="mx-auto mt-12 max-w-[720px] text-center text-[17px] leading-[1.6] text-black/60">
            {getCustomField(page, 'Short Description')}
            </p>
        </section>
    );
}
