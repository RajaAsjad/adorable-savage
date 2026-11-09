import { navLinks, sectionHref } from '@/data';
import { usePage } from '@inertiajs/react';

const exploreLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/the-adorable-savage' },
    { label: 'Come Find Me', href: '#' },
    // { label: 'YOUTUBE', href: '#' },
    { label: 'Blog', href: '/blog' },
];
const programLinks = [
  
];

const youtubeLinks =
    navLinks.find((link) => link.label.toUpperCase() === 'YOUTUBE')?.children ||
    [];

const socialLinks = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/theadorablesavage143/',
    },
    {
        label: 'YouTube',
        href: '#',
        children: youtubeLinks,
    },
    { label: 'Facebook', href: '#' },
];

function isExternal(href) {
    return (
        typeof href === 'string' &&
        (href.startsWith('http://') || href.startsWith('https://'))
    );
}

function FooterSocialLink({ link }) {
    const hasChildren =
        Array.isArray(link.children) && link.children.length > 0;
    const external = isExternal(link.href);

    if (!hasChildren) {
        return (
            <a
                href={link.href || '#'}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="block transition hover:text-white"
            >
                {link.label}
            </a>
        );
    }

    return (
        <div className="group relative">
            <button
                type="button"
                className="inline-flex items-center gap-1.5 transition hover:text-white"
                aria-haspopup="true"
            >
                {link.label}
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
            </button>

            <div className="invisible absolute bottom-full left-0 z-50 mb-2 w-[260px] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-[16px] border border-white/10 bg-[#161616] p-2 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.55)]">
                    {link.children.map((child) => (
                        <a
                            key={child.label}
                            href={child.href}
                            target={
                                isExternal(child.href) ? '_blank' : undefined
                            }
                            rel={
                                isExternal(child.href)
                                    ? 'noopener noreferrer'
                                    : undefined
                            }
                            className="block rounded-[12px] px-3 py-2.5 text-[13px] leading-snug text-white/70 transition hover:bg-white/5 hover:text-white"
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

export default function Footer() {
    const { branding } = usePage().props;
    // const footerLogo = branding?.footer_logo || branding?.site_logo;
    const copyright =
        branding?.copyright ||
        '© 2026 The Adorable Savage • Made with joy in Denver, CO';

    return (
        <footer className="relative mt-8 overflow-hidden rounded-t-[36px] bg-[#0A0A0A] px-6 pb-8 pt-16 text-white/70">
            <div className="pointer-events-none absolute -bottom-[10%] left-0 right-0 z-0 select-none text-center font-display text-[22vw] leading-none tracking-[-0.06em] text-white/[0.03]">
                ADORABLE
            </div>

            <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="relative z-10 mx-auto max-w-[1280px]">
                <div className="grid gap-10 lg:grid-cols-[0.8fr_0.8fr_0.8fr_1.2fr]">
                    {/* Left brand / logo / description — temporarily hidden
                    <div>
                        <div className="flex items-center gap-2 text-white">
                            {footerLogo ? (
                                <img
                                    src={footerLogo}
                                    alt=""
                                    className="h-9 w-9 rounded-full object-cover"
                                />
                            ) : (
                                <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-[13px] font-bold text-black">
                                    AS
                                </div>
                            )}
                            <span className="font-display text-[22px]">
                                The Adorable{' '}
                                <span className="font-hand text-[26px] text-[#FF6B9D]">
                                    Savage
                                </span>
                            </span>
                        </div>
                        <p className="mt-5 max-w-[320px] text-[14px] leading-[1.6]">
                            A nonprofit promoting joy, wellness, inspiring
                            self-expression, sobriety, and authentic connection. Not
                            charity-chic — culture.
                        </p>
                    </div>
                    */}

                    <div>
                        <div className="mb-4 text-[12px] font-bold tracking-[0.2em] text-white">
                            EXPLORE
                        </div>
                        <div className="space-y-2 text-[14px]">
                            {exploreLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={sectionHref(link)}
                                    className="block transition hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 text-[12px] font-bold tracking-[0.2em] text-white uppercase">
                        My People
                        </div>
                        <div className="space-y-2 text-[14px]">
                            {programLinks.map((name) => (
                                <a
                                    key={name}
                                    href="/#programs"
                                    className="block transition hover:text-white"
                                >
                                    {name}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 text-[12px] font-bold tracking-[0.2em] text-white">
                            CONNECT
                        </div>
                        <div className="space-y-2 text-[14px]">
                            {socialLinks.map((link) => (
                                <FooterSocialLink
                                    key={link.label}
                                    link={link}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 text-[12px] font-bold tracking-[0.2em] text-white">
                            JOIN OUR COMMUNITY
                        </div>
                        <div className="mt-2 flex gap-2">
                            <input
                                placeholder="your email"
                                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[13px] outline-none placeholder:text-white/40 focus:border-white/30"
                            />
                            <button
                                type="button"
                                className="rounded-full bg-[#FF6B9D] px-6 py-3 text-[12px] font-bold tracking-wide text-white transition hover:bg-white hover:text-black"
                            >
                                SUBSCRIBE
                            </button>
                        </div>
                        <div className="mt-3 text-[11px] opacity-50">
                            No spam. Just vibes, events, and real notes from humans.
                        </div>

                        {/* <div className="mt-8 flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.04] p-3">
                            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#FDE047] text-black">
                                ♔
                            </div>

                            <div className="text-[12px] leading-tight">
                                <div className="font-semibold text-white">
                                    501(c)(3) Status Pending
                                </div>

                                <div className="opacity-60">
                                    Tax-exempt status application pending.
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[12px]">
                    <div className="opacity-50">{copyright}</div>
                    <div className="flex gap-6 opacity-50">
                        <a href="#" className="hover:opacity-100">
                            Privacy
                        </a>
                        <a href="#" className="hover:opacity-100">
                            Terms
                        </a>
                        <a href="/contact" className="hover:opacity-100">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
