import { useState } from 'react';
import { eventFilters, events } from '@/data';

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

function EventsTitle({ title }) {
    const text = title || 'COME FIND US IRL';

    if (!/\bUS\b/.test(text)) {
        return text;
    }

    const parts = text.split(/(\bUS\b)/);

    return parts.map((part, index) =>
        part === 'US' ? (
            <span key={index} className="font-hand text-[#FF6B9D]">
                {part}
            </span>
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

function resolveFilters(eventCategories) {
    if (Array.isArray(eventCategories) && eventCategories.length > 0) {
        return ['ALL', ...eventCategories];
    }

    return eventFilters;
}

function resolveEvents(eventsList) {
    if (Array.isArray(eventsList) && eventsList.length > 0) {
        return eventsList.map((event, index) => {
            const fallback = events[index] || events[0];

            return {
                title: event.title,
                cat: event.category_title || fallback.cat,
                loc: fallback.loc,
                desc: stripHtml(event.description) || fallback.desc,
                day: event.day || fallback.day,
                month: event.month
                    ? String(event.month).toUpperCase()
                    : fallback.month,
                color: fallback.color,
            };
        });
    }

    return events;
}

export default function Events({
    page = null,
    eventCategories = [],
    eventsList = [],
}) {
    const [filter, setFilter] = useState('ALL');
    const filters = resolveFilters(eventCategories);
    const items = resolveEvents(eventsList);
    const visible =
        filter === 'ALL'
            ? items
            : items.filter((event) => event.cat === filter);

    const title =
        stripHtml(getCustomField(page, 'title slogan')) ||
        page?.title ||
        'COME FIND US IRL';
    const intro =
        stripHtml(page?.description) ||
        "See where The Adorable Savage is showing up next — from community gatherings and wellness experiences to music and special events.";

    return (
        <section
            id="events"
            className="relative mx-auto max-w-[1280px] px-6 py-20 lg:py-28"
        >
            <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                    <div className="mb-4 text-[12px] font-bold tracking-[0.2em] opacity-60">
                        — WHERE WE'LL BE
                    </div>
                    <h2 className="font-display text-[56px] leading-[0.9] tracking-tight lg:text-[72px]">
                        <EventsTitle title={title} />
                    </h2>
                    <p className="mt-4 max-w-[520px] leading-[1.6] text-black/60">
                        {intro}
                    </p>
                </div>
                <a
                    href="#events"
                    className="hidden rounded-full border border-black px-6 py-3 text-[12px] font-bold tracking-wide transition hover:bg-black hover:text-white md:inline-flex"
                >
                    VIEW ALL EVENTS →
                </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
                {filters.map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => setFilter(item)}
                        className={`rounded-full border px-5 py-2 text-[12px] font-bold tracking-wide transition ${
                            filter === item
                                ? 'border-black bg-black text-white'
                                : 'border-black/10 bg-white hover:border-black'
                        }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {visible.map((event) => (
                    <div
                        key={event.title}
                        className="group flex gap-4 rounded-[22px] border border-black/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.25)]"
                    >
                        <div
                            className={`grid h-[68px] w-[58px] shrink-0 place-items-center rounded-[16px] text-black ${event.color}`}
                        >
                            <div className="text-center leading-[0.9]">
                                <div className="text-[11px] font-bold tracking-widest">
                                    {event.month}
                                </div>
                                <div className="font-display text-[28px]">
                                    {event.day}
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold tracking-widest opacity-60">
                                    {event.cat}
                                </span>
                                <span className="h-1 w-1 rounded-full bg-black/20" />
                                <span className="text-[11px] opacity-60">
                                    {event.loc}
                                </span>
                            </div>
                            <h4 className="mt-2 text-[16px] font-semibold leading-tight">
                                {event.title}
                            </h4>
                            <p className="mt-1 text-[13px] leading-[1.4] opacity-60">
                                {event.desc}
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-[12px] font-bold tracking-wide">
                                VIEW EVENT{' '}
                                <span className="grid h-6 w-6 place-items-center rounded-full bg-black text-white transition group-hover:rotate-45">
                                    ↗
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
