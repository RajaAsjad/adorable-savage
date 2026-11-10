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

export default function PhilosophyMarquee({ className = '' }) {
    return (
        <div
            className={`relative overflow-hidden border-y border-white/10 bg-[#131313] py-4 text-[#FFFBF0] ${className}`}
        >
            <div className="flex w-max">
                <div className="marquee font-display flex items-center gap-10 whitespace-nowrap text-[26px] tracking-tight lg:text-[34px]">
                    {[0, 1].map((copy) => (
                        <MarqueeCopy key={copy} />
                    ))}
                </div>
            </div>
        </div>
    );
}
