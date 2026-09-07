import { images } from '@/data';

export const defaultHeroLeftHtml = `
<p><strong>WELLNESS • EXPRESSION • CONNECTION • JOY</strong></p>
<h2>FIND YOUR</h2>
<h2><em>Adorable</em></h2>
<h2>SAVAGE — WITHIN.</h2>
<p>Welcome to The Adorable Savage — a culture of wellness, music, and community.</p>
<p><a href="#programs">EXPLORE OUR PROGRAMS</a> <a href="#philosophy">FIND YOUR SAVAGE</a></p>
`;

function hasContent(html) {
    if (!html) {
        return false;
    }

    return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').trim().length > 0;
}

export default function Hero({ playing, page = null }) {
    const leftHtml = hasContent(page?.description)
        ? page.description
        : defaultHeroLeftHtml;
    const heroImage = page?.image || images.hero;
    const avatars = page?.image
        ? [page.image]
        : [images.joy, images.folk, images.community];

    return (
        <section
            id="home"
            className="relative overflow-hidden px-6 pb-16 pt-[128px] lg:px-0 lg:pb-24"
        >
            <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-0">
                <div className="relative z-10 lg:pr-12">
                    <div
                        className="hero-copy"
                        dangerouslySetInnerHTML={{ __html: leftHtml }}
                    />

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
                            src={heroImage}
                            alt={page?.title || 'Joyful authentic expression'}
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
