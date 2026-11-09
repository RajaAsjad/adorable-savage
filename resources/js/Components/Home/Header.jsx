import { useState } from 'react';
import { navLinks, sectionHref } from '@/data';

function isExternal(href) {
    return (
        typeof href === 'string' &&
        (href.startsWith('http://') || href.startsWith('https://'))
    );
}

function NavItem({ link }) {
    const hasChildren = Array.isArray(link.children) && link.children.length > 0;

    if (!hasChildren) {
        return (
            <a href={sectionHref(link)} className="group relative py-1">
                <span className="relative z-10">{link.label.toUpperCase()}</span>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF6B9D] transition-all duration-300 group-hover:w-full" />
            </a>
        );
    }

    return (
        <div className="group relative py-1">
            <button
                type="button"
                className="inline-flex items-center gap-1.5"
                aria-haspopup="true"
            >
                <span className="relative z-10">{link.label.toUpperCase()}</span>
                <svg
                    className="h-3 w-3 opacity-50 transition duration-300 group-hover:rotate-180 group-hover:opacity-100"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M2.5 4.5L6 8l3.5-3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF6B9D] transition-all duration-300 group-hover:w-full" />
            </button>

            <div className="invisible absolute left-1/2 top-full z-50 w-[280px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-[18px] border border-black/5 bg-white p-2 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.25)]">
                    {link.children.map((child) => (
                        <a
                            key={child.label}
                            href={child.href}
                            target={isExternal(child.href) ? '_blank' : undefined}
                            rel={
                                isExternal(child.href)
                                    ? 'noopener noreferrer'
                                    : undefined
                            }
                            className="block rounded-[12px] px-4 py-3 text-[12px] font-medium leading-snug tracking-wide text-ink transition hover:bg-[#FFFBF0] hover:text-[#FF6B9D]"
                        >
                            {child.label}
                            {isExternal(child.href) && (
                                <span className="ml-1 opacity-40">↗</span>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MobileNavItem({ link, onNavigate }) {
    const [open, setOpen] = useState(false);
    const hasChildren = Array.isArray(link.children) && link.children.length > 0;

    if (!hasChildren) {
        return (
            <a
                href={sectionHref(link)}
                onClick={onNavigate}
                className="border-b border-black/5 py-2 last:border-0"
            >
                {link.label.toUpperCase()}
            </a>
        );
    }

    return (
        <div className="border-b border-black/5 py-2 last:border-0">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="flex w-full items-center justify-between text-left"
            >
                <span>{link.label.toUpperCase()}</span>
                <span className="text-[12px] opacity-50">{open ? '−' : '+'}</span>
            </button>

            {open && (
                <div className="mt-2 space-y-1 pl-3">
                    {link.children.map((child) => (
                        <a
                            key={child.label}
                            href={child.href}
                            target={isExternal(child.href) ? '_blank' : undefined}
                            rel={
                                isExternal(child.href)
                                    ? 'noopener noreferrer'
                                    : undefined
                            }
                            onClick={onNavigate}
                            className="block rounded-xl py-2 text-[13px] leading-snug text-black/70 transition hover:text-[#FF6B9D]"
                        >
                            {child.label}{' '}
                            {isExternal(child.href) && (
                                <span className="opacity-40">↗</span>
                            )}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

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
                <a href="#" className="flex items-center gap-3">
                    {/* logo placeholder */}
                </a>

                <nav className="hidden items-center gap-5 text-[13px] font-medium tracking-[0.08em] xl:gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <NavItem key={link.label} link={link} />
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <a
                        href="/contact"
                        className="group relative hidden overflow-hidden rounded-full bg-[#131313] px-7 py-[11px] text-[13px] font-bold tracking-wide text-white md:inline-flex"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            CONTACT
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
                    <nav className="flex flex-col gap-1 text-sm font-medium">
                        {navLinks.map((link) => (
                            <MobileNavItem
                                key={link.label}
                                link={link}
                                onNavigate={() => setMenuOpen(false)}
                            />
                        ))}
                        <a
                            href="/contact"
                            className="mt-3 rounded-full bg-[#131313] px-6 py-3 text-center font-bold text-white"
                        >
                           CONTACT
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
