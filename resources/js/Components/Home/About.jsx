import { aboutPillars } from '@/data';

export default function About() {
    return (
        <section
            id="about"
            className="relative mx-auto max-w-[1280px] px-6 py-20 lg:py-28"
        >
            <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
                <div>
                    <div className="mb-4 text-[12px] font-bold tracking-[0.2em] opacity-60">
                        — WHAT WE DO
                    </div>
                    <h2 className="font-display text-[48px] leading-[0.9] tracking-[-0.03em] lg:text-[68px]">
                    About The{' '}
                        <span className="font-hand text-[1.1em] text-[#FF6B9D]">
                        Adorable Savage
                        </span>
                    </h2>
                </div>
                <p className="max-w-[480px] text-[16px] leading-[1.6] text-black/60">
                    We're Adorably Savage: a place where healing, honesty, and
                    resilience come together, no matter what you're walking through.
                    Real. Raw. Relatable. We believe self-love and self-empowerment
                    aren't one size fits all. That's why we built three spaces, each
                    meeting you exactly where you are:
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {aboutPillars.map((pillar) => (
                    <div
                        key={pillar.id}
                        className={`group relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.35)] ${pillar.color}`}
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
                    </div>
                ))}
            </div>

            <p className="mx-auto mt-12 max-w-[720px] text-center text-[17px] leading-[1.6] text-black/60">
                Whatever brought you here, you're welcome exactly as you are. We're
                not here to apologize for who we are. We're here to be savage, soft,
                and unstoppable — together.
            </p>
        </section>
    );
}
