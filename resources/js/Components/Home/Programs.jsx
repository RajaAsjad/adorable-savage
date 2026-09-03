import { useRef } from 'react';
import { programs } from '@/data';

export default function Programs() {
    const scroller = useRef(null);

    const scrollBy = (direction) => {
        if (!scroller.current) {
            return;
        }

        scroller.current.scrollBy({
            left: direction === 'left' ? -360 : 360,
            behavior: 'smooth',
        });
    };

    return (
        <section
            id="programs"
            className="relative mx-auto max-w-[1280px] px-6 py-20 lg:py-28"
        >
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <div className="mb-4 text-[12px] font-bold tracking-[0.2em] opacity-60">
                        — PROGRAMS
                    </div>
                    <h2 className="font-display text-[40px] leading-[0.9] tracking-tight lg:text-[58px] max-w-[700px]">
                    UNFILTERED{' '}
                        <span className="font-hand text-[1.15em] text-[#A78BFA]">
                        WELLNESS AND 
                        </span>{' '}
                        ADORABLY HUMAN
                    </h2>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => scrollBy('left')}
                        className="grid h-11 w-11 place-items-center rounded-full border border-black transition hover:bg-black hover:text-white"
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollBy('right')}
                        className="grid h-11 w-11 place-items-center rounded-full bg-black text-white transition hover:bg-[#FF6B9D]"
                    >
                        →
                    </button>
                </div>
            </div>

            <div
                ref={scroller}
                className="no-scrollbar flex snap-x gap-5 overflow-x-auto scroll-smooth pb-6"
            >
                {programs.map((program) => (
                    <div
                        key={program.name}
                        className="group max-w-[340px] min-w-[320px] snap-start overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-18px_rgba(0,0,0,0.3)]"
                    >
                        <div className="relative h-[220px] overflow-hidden">
                            <img
                                src={program.img}
                                alt={program.name}
                                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                            <div
                                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-black ${program.color}`}
                            >
                                {program.cat}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-display text-[24px] leading-[0.95]">
                                {program.name}
                            </h3>
                            <p className="mt-3 text-[14px] leading-[1.5] text-black/60">
                                {program.desc}
                            </p>
                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-[12px] font-bold tracking-widest">
                                    EXPLORE
                                </span>
                                <span className="grid h-9 w-9 place-items-center rounded-full bg-black text-white transition-all group-hover:rotate-45 group-hover:bg-[#FF6B9D]">
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
