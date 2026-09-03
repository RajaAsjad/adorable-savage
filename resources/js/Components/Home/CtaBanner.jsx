import { weekSchedule } from '@/data';

export default function CtaBanner() {
    return (
        <section className="relative px-6 pb-12">
            <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[36px] bg-[#131313] p-10 text-[#FFFBF0] lg:p-16">
                <div className="absolute inset-0">
                    <div className="absolute -right-[10%] -top-[30%] h-[90%] w-[55%] rounded-full bg-[#FF6B9D]/40 blur-[70px]" />
                    <div className="absolute -bottom-[30%] -left-[10%] h-[80%] w-[60%] rounded-full bg-[#FDE047]/30 blur-[70px]" />
                </div>

                <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                        <div className="font-display text-[44px] leading-[0.9] tracking-tight lg:text-[66px]">
                            READY TO FIND YOUR{' '}
                            <span className="font-hand text-[#FDE047]">
                                ADORABLE SAVAGE?
                            </span>
                        </div>
                        <p className="mt-6 max-w-[520px] text-[16px] leading-[1.6] text-white/60">
                            Explore our programs, join our community, attend an event,
                            or simply come say hello. No perfect entry — just you.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#programs"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[13px] font-bold tracking-wide text-black transition hover:bg-[#FF6B9D] hover:text-white"
                            >
                                EXPLORE PROGRAMS <span>↗</span>
                            </a>
                            <a
                                href="#contact"
                                className="rounded-full border border-white/20 px-7 py-3 text-[13px] font-bold tracking-wide transition hover:bg-white hover:text-black"
                            >
                                CONNECT WITH US
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rotate-[1deg] rounded-[22px] bg-white p-5 text-black shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
                            <div className="text-[11px] font-bold tracking-widest opacity-60">
                                THIS WEEK AT ADORABLE SAVAGE
                            </div>
                            <div className="mt-4 space-y-3">
                                {weekSchedule.map(([when, what]) => (
                                    <div
                                        key={what}
                                        className="flex items-center justify-between border-b border-black/5 pb-3 last:border-0"
                                    >
                                        <div className="text-[12px] font-bold tracking-wide opacity-60">
                                            {when}
                                        </div>
                                        <div className="text-[14px] font-semibold">
                                            {what}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="font-hand mt-4 text-[18px] opacity-70">
                                come as you are → leave more you
                            </div>
                        </div>
                        <div className="font-hand absolute -right-2 -top-4 rotate-12 text-[22px] text-[#FF6B9D]">
                            you belong ☆
                        </div>
                    </div>
                </div>

                <div className="font-hand absolute bottom-3 right-8 hidden text-[22px] opacity-30 lg:block">
                    find your savage within →→→
                </div>
            </div>
        </section>
    );
}
