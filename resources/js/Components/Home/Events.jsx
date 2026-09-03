import { useState } from 'react';
import { eventFilters, events } from '@/data';

export default function Events() {
    const [filter, setFilter] = useState('ALL');
    const visible =
        filter === 'ALL' ? events : events.filter((event) => event.cat === filter);

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
                        COME FIND{' '}
                        <span className="font-hand text-[#FF6B9D]">US</span> IRL
                    </h2>
                    <p className="mt-4 max-w-[520px] leading-[1.6] text-black/60">
                        See where The Adorable Savage is showing up next — from
                        community gatherings and wellness experiences to music and
                        special events.
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
                {eventFilters.map((item) => (
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
