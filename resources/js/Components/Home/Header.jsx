import { navLinks, sectionHref } from '@/data';

export default function Header({ scrolled, menuOpen, setMenuOpen }) {
    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${
                scrolled ? 'py-3' : 'py-6'
            }`}
        >
            <div
                className={`mx-auto flex max-w-[1280px] items-center justify-between px-6 transition-all duration-500 ${
                    scrolled
                        ? 'rounded-full border border-black/5 bg-white/80 px-7 py-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl'
                        : 'bg-transparent'
                }`}
            >
                <a href="#home" className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-[#131313] text-[13px] font-bold text-[#FFFBF0]">
                        AS
                    </div>
                    <span className="font-display text-[22px] leading-none tracking-tight">
                        The Adorable{' '}
                        <span className="font-hand -ml-1 text-[26px] text-[#FF6B9D]">
                            Savage
                        </span>
                    </span>
                </a>

                <nav className="hidden items-center gap-5 text-[13px] font-medium tracking-[0.08em] xl:gap-8 lg:flex">
                    {navLinks.map((label) => (
                        <a
                            key={label}
                            href={sectionHref(label)}
                            className="group relative py-1"
                        >
                            <span className="relative z-10">{label.toUpperCase()}</span>
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF6B9D] transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <a
                        href="#donate"
                        className="group relative hidden overflow-hidden rounded-full bg-[#131313] px-7 py-[11px] text-[13px] font-bold tracking-wide text-white md:inline-flex"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            DONATE
                            <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-black transition-transform group-hover:rotate-45">
                                ↗
                            </span>
                        </span>
                        <span className="absolute inset-0 translate-y-full bg-[#FF6B9D] transition-transform duration-300 group-hover:translate-y-0" />
                    </a>
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="grid h-10 w-10 place-items-center rounded-full bg-black text-white lg:hidden"
                    >
                        <span className="text-xl leading-none">
                            {menuOpen ? '✕' : '☰'}
                        </span>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="mx-6 mt-3 rounded-[24px] border border-black/5 bg-white p-6 shadow-xl lg:hidden">
                    <nav className="flex flex-col gap-4 text-sm font-medium">
                        {navLinks.map((label) => (
                            <a
                                key={label}
                                href={sectionHref(label)}
                                onClick={() => setMenuOpen(false)}
                                className="border-b border-black/5 py-2 last:border-0"
                            >
                                {label.toUpperCase()}
                            </a>
                        ))}
                        <a
                            href="#donate"
                            className="mt-2 rounded-full bg-[#131313] px-6 py-3 text-center font-bold text-white"
                        >
                            DONATE
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
