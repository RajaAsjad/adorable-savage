import { images } from '@/data';

const avatars = [images.joy, images.folk, images.community];

export default function Hero({ playing }) {
    return (
        <section
            id="home"
            className="relative overflow-hidden px-6 pb-16 pt-[128px] lg:px-0 lg:pb-24"
        >
            <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-0">
                <div className="relative z-10 lg:pr-12">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[11px] font-medium tracking-[0.18em] shadow-sm">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF6B9D]" />
                        WELLNESS • EXPRESSION • CONNECTION • JOY
                    </div>

                    <h1 className="font-display text-[14vw] leading-[0.85] tracking-[-0.04em] lg:text-[108px] xl:text-[118px]">
                        <span className="block">FIND YOUR</span>
                        <span className="relative block">
                            <span className="font-hand inline-block translate-y-1 rotate-[-2deg] text-[1.15em] text-[#FF6B9D]">
                                Adorable
                            </span>
                            <span className="absolute left-[-10px] right-0 top-[55%] -z-10 h-[18px] -rotate-1 bg-[#FDE047]/60" />
                        </span>
                        <span className="flex items-center gap-4">
                            SAVAGE
                            <span className="mt-6 hidden h-[2px] w-[84px] bg-black lg:inline-flex" />
                            <span className="hidden -translate-y-2 font-display font-sans text-[18px] leading-none tracking-[0.2em] lg:block">
                                WITHIN.
                            </span>
                        </span>
                        <span className="mt-3 block font-sans text-[22px] font-bold tracking-[0.28em] lg:hidden">
                            WITHIN.
                        </span>
                    </h1>

                    <p className="mt-8 max-w-[460px] text-[17px] font-[450] leading-[1.55] text-black/70">
                        We inspire joy, wellness, self-expression, sobriety, and
                        authentic living for all. A nonprofit that feels like your
                        favorite community.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <a
                            href="#programs"
                            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#131313] py-2 pl-7 pr-2 text-[13px] font-bold tracking-wide text-white"
                        >
                            <span className="relative z-10">EXPLORE OUR PROGRAMS</span>
                            <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-black transition-transform group-hover:rotate-45">
                                ↗
                            </span>
                            <span className="absolute inset-0 translate-y-full bg-[#FF6B9D] transition-transform duration-500 group-hover:translate-y-0" />
                        </a>
                        <a
                            href="#philosophy"
                            className="inline-flex items-center gap-2 rounded-full border border-black px-7 py-3 text-[13px] font-bold tracking-wide transition hover:bg-black hover:text-white"
                        >
                            FIND YOUR SAVAGE <span className="text-[16px]">↗</span>
                        </a>
                    </div>

                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {avatars.map((src) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt=""
                                    className="h-10 w-10 rounded-full border-2 border-[#FFFBF0] object-cover"
                                />
                            ))}
                            <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#FFFBF0] bg-[#FDE047] text-[11px] font-bold">
                                +2k
                            </div>
                        </div>
                        <p className="max-w-[180px] text-[13px] leading-tight text-black/60">
                            Join 2,400+ humans finding their adorable savage daily.
                        </p>
                    </div>
                </div>

                <div className="relative flex items-center justify-center lg:h-[760px]">
                    <div className="animate-float absolute right-[8%] top-[6%] h-[72%] w-[68%] rounded-[40%_60%_55%_45%/55%_45%_60%_40%] bg-gradient-to-br from-[#FF6B9D] via-[#FF8A3D] to-[#FDE047] opacity-90 blur-[0.5px]" />
                    <div className="animate-float-alt absolute left-[4%] top-[18%] h-[60%] w-[56%] rounded-[60%_40%_45%_55%/45%_55%_40%_60%] bg-[#A78BFA] opacity-80" />
                    <div className="absolute bottom-[0%] left-[16%] h-[38%] w-[52%] rounded-[50%] bg-[#2DD4BF] opacity-70" />
                    <div className="animate-float-slow absolute right-[18%] top-[2%] hidden text-[42px] rotate-12 lg:block">
                        ✦
                    </div>
                    <div className="absolute -left-2 top-[28%] -rotate-12 text-[28px] text-[#FF6B9D]">
                        ♥
                    </div>
                    <div className="absolute bottom-[20%] right-[2%] grid h-12 w-12 rotate-6 place-items-center rounded-full border-[2.5px] border-black bg-white text-[20px]">
                        ♔
                    </div>
                    <div className="font-hand absolute bottom-[2%] left-[-10px] rotate-[-8deg] text-[28px]">
                        you belong here
                    </div>
                    <div className="font-hand absolute right-[-14px] top-[44%] hidden rotate-[10deg] text-[22px] text-[#A78BFA] lg:block">
                        energy!
                    </div>

                    <div className="relative aspect-[4/5] w-[86%] rotate-[-1.5deg] overflow-hidden rounded-[2.8rem] border-[8px] border-white bg-[#E9E5DE] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] lg:w-[84%]">
                        <img
                            src={images.hero}
                            alt="Joyful authentic expression"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 rounded-[2.2rem] ring-[1px] ring-inset ring-black/10" />
                        <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-[18px] bg-white/90 p-4 shadow-lg backdrop-blur">
                            <div className="grid h-10 w-10 place-items-center rounded-full bg-black text-white">
                                ▶
                            </div>
                            <div>
                                <div className="text-[11px] font-bold tracking-widest opacity-60">
                                    NOW PLAYING
                                </div>
                                <div className="text-[13px] font-semibold leading-tight">
                                    Verses & Vibes — Episode 24
                                </div>
                            </div>
                            <div className="ml-auto flex h-6 items-end gap-[3px]">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="wave-bar w-[3px] rounded-full bg-[#FF6B9D]"
                                        style={{
                                            animationDelay: `${index * 0.08}s`,
                                            height: playing ? undefined : '8px',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <svg
                        className="pointer-events-none absolute left-[-8%] top-[78%] hidden h-[120px] w-[120%] lg:block"
                        viewBox="0 0 400 30"
                    >
                        <path
                            d="M5 18 Q 100 5, 200 18 T 395 12"
                            stroke="#131313"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="6 6"
                            opacity="0.25"
                        />
                    </svg>
                </div>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[140px] bg-gradient-to-t from-[#FFFBF0] to-transparent" />
        </section>
    );
}
