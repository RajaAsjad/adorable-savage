import { useState } from 'react';
import { images, wellnessHotspots, wellnessLabs } from '@/data';

export default function Wellness() {
    const [activeSpot, setActiveSpot] = useState(0);

    return (
        <section
            id="wellness"
            className="relative overflow-hidden border-y border-black/5 bg-white"
        >
            <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#F6F1E8]">
                    <img
                        src={images.crystals}
                        alt="crystals"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute right-4 top-4 aspect-[4/3] w-[36%] rotate-3 overflow-hidden rounded-[20px] border-[6px] border-white shadow-xl">
                        <img
                            src={images.botanicals}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="absolute bottom-4 left-4 hidden aspect-square w-[38%] -rotate-3 overflow-hidden rounded-[20px] border-[6px] border-white shadow-xl md:block">
                        <img
                            src={images.ritual}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {wellnessHotspots.map((spot, index) => (
                        <button
                            key={spot.title}
                            type="button"
                            onClick={() => setActiveSpot(index)}
                            className="absolute grid h-8 w-8 place-items-center rounded-full border-[3px] border-black bg-white shadow-lg transition hover:scale-110"
                            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        >
                            <span
                                className={`h-3 w-3 rounded-full ${
                                    activeSpot === index
                                        ? 'animate-ping bg-[#FF6B9D]'
                                        : 'bg-black'
                                }`}
                            />
                            {activeSpot === index && (
                                <div className="absolute left-[130%] top-1/2 z-10 w-[200px] -translate-y-1/2 rounded-[14px] bg-black p-3 text-left text-[12px] leading-[1.4] text-white shadow-xl">
                                    <div className="mb-1 text-[13px] font-bold">
                                        {spot.title}
                                    </div>
                                    <div className="opacity-70">{spot.text}</div>
                                    <div className="absolute right-full top-1/2 h-0 w-0 -translate-y-1/2 border-b-4 border-r-4 border-t-4 border-transparent border-r-black" />
                                </div>
                            )}
                        </button>
                    ))}

                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-[40%] border border-black/5" />
                </div>

                <div>
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em]">
                        <span className="h-[2px] w-6 bg-black" /> OILS & CRYSTALS •
                        EDUCATION
                    </div>
                    <h2 className="font-display mt-6 text-[52px] leading-[0.9] tracking-tight lg:text-[64px]">
                        Explore.{' '}
                        <span className="font-hand text-[#14B8A6]">Learn.</span>{' '}
                        Discover.
                    </h2>
                    <p className="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-black/65">
                        Explore essential oils, crystals, self-care, and holistic
                        wellness through education, curiosity, and personal
                        experience. No medical claims, just honest learning + ritual.
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {wellnessLabs.map((lab) => (
                            <div
                                key={lab.k}
                                className="rounded-[18px] border border-black/10 bg-[#FFFBF0] p-4"
                            >
                                <div className="text-[12px] font-bold tracking-widest opacity-60">
                                    {lab.k.toUpperCase()}
                                </div>
                                <div className="mt-1 text-[14px] font-medium">
                                    {lab.v}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 flex gap-3">
                        <a
                            href="#programs"
                            className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 text-[13px] font-bold tracking-wide text-white transition hover:bg-[#FF6B9D]"
                        >
                            EXPLORE OILS & CRYSTALS <span>↗</span>
                        </a>
                    </div>
                    <div className="font-hand mt-10 rotate-[-2deg] text-[22px] opacity-60">
                        remember: wellness is yours to define ♡
                    </div>
                </div>
            </div>
        </section>
    );
}
