function MarqueeCopy() {
    return (
        <div className="flex items-center gap-10">
            <span>YOUR WEIRD •</span>
            <span className="font-hand text-[#FF6B9D]">YOUR WONDERFUL •</span>
            <span>YOUR WILD •</span>
            <span className="font-hand text-[#FDE047]">YOUR SOFT •</span>
            <span>YOUR SAVAGE •</span>
            <span>YOUR WEIRD •</span>
            <span className="font-hand text-[#FF6B9D]">YOUR WONDERFUL •</span>
            <span>YOUR WILD •</span>
            <span className="font-hand text-[#FDE047]">YOUR SOFT •</span>
            <span>YOUR SAVAGE •</span>
        </div>
    );
}

export default function Philosophy() {
    return (
        <section
            id="philosophy"
            className="grain relative overflow-hidden bg-[#131313] py-20 text-[#FFFBF0] lg:py-32"
        >
            <div className="absolute inset-0 opacity-60">
                <div className="absolute -left-[10%] -top-[20%] h-[70%] w-[70%] rounded-full bg-[#FF6B9D]/30 blur-[80px]" />
                <div className="absolute -bottom-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-[#A78BFA]/30 blur-[80px]" />
            </div>

            <div className="relative mx-auto max-w-[1280px] px-6 text-center">
                <div className="mb-10 inline-flex gap-2 text-[11px] tracking-[0.2em] opacity-50">
                    OUR PHILOSOPHY • EST. 2020 • NONPROFIT
                </div>
                <h2 className="font-display text-[18vw] leading-[0.85] tracking-[-0.05em] lg:text-[132px]">
                    <span className="block opacity-90">BE SOFT.</span>
                    <span className="font-hand block rotate-[-1deg] text-[1.1em] text-[#FDE047]">
                        BE BOLD.
                    </span>
                    <span className="block">
                        BE{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10">SAVAGE.</span>
                            <span className="absolute bottom-2 left-0 right-0 h-[18%] -rotate-1 bg-[#FF6B9D]" />
                        </span>
                    </span>
                </h2>
                <p className="mx-auto mt-12 max-w-[640px] text-[18px] leading-[1.6] text-white/70">
                    Being an Adorable Savage means embracing every part of who you
                    are — finding joy, expressing yourself without fear, exploring
                    wellness on your own terms, and connecting with people who
                    inspire you to become more of yourself.
                </p>
                <div className="mt-16 flex justify-center">
                    <div className="rounded-full border border-white/15 px-5 py-2 text-[12px] tracking-[0.2em]">
                        WELLNESS • MUSIC • COMMUNITY • SOBRIETY • MAGIC
                    </div>
                </div>
            </div>

            <div className="relative mt-20 overflow-hidden border-y border-white/10 py-4">
                <div className="flex w-max">
                    <div className="marquee font-display flex items-center gap-10 whitespace-nowrap text-[26px] tracking-tight lg:text-[34px]">
                        {[0, 1].map((copy) => (
                            <MarqueeCopy key={copy} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
