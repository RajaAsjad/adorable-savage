import { manifestoPills } from '@/data';

export default function Manifesto() {
    return (
        <section className="relative overflow-hidden">
            <div className="manifesto-wash absolute inset-0" />
            <div className="manifesto-noise absolute inset-0" />
            <div className="relative mx-auto max-w-[1280px] px-6 py-24 text-center lg:py-36">
                <div className="mb-10 inline-flex rounded-full bg-black px-5 py-2 text-[11px] font-bold tracking-[0.2em] text-white">
                    MANIFESTO DROP • 2026
                </div>
                <h2 className="font-display mx-auto max-w-[980px] text-[38px] leading-[0.9] tracking-[-0.04em] text-black lg:text-[72px]">
                    FIND THE COURAGE TO BE COMPLETELY,
                    <br />
                    <span className="font-hand inline-block rotate-[-1deg] text-[1.2em]">
                        UNAPOLOGETICALLY YOU.
                    </span>
                </h2>
                <div className="mt-16 flex flex-wrap justify-center gap-3 lg:gap-5">
                    {manifestoPills.map((pill) => (
                        <div
                            key={pill.t}
                            className={`rounded-full px-8 py-4 font-display text-[18px] tracking-tight shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] lg:text-[22px] ${pill.c} ${pill.cl}`}
                            style={{ rotate: pill.r }}
                        >
                            {pill.t}
                        </div>
                    ))}
                </div>
                <div className="font-hand mt-20 flex justify-center gap-6 text-[26px] text-black/70">
                    <span>★</span>
                    <span>made for humans, not algorithms</span>
                    <span>★</span>
                </div>
            </div>
        </section>
    );
}
