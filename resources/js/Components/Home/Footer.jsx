import { programs, sectionHref } from '@/data';
import { usePage } from '@inertiajs/react';

const exploreLinks = ['Home', 'About', 'Programs', 'Events'];
const socialLinks = ['Instagram', 'YouTube', 'Facebook', 'TikTok'];

export default function Footer() {
    const { branding } = usePage().props;
    const footerLogo = branding?.footer_logo || branding?.site_logo;
    const copyright =
        branding?.copyright ||
        '© 2026 The Adorable Savage Organization • Made with joy in Denver, CO';

    return (
        <footer className="relative mt-8 overflow-hidden rounded-t-[36px] bg-[#0A0A0A] px-6 pb-8 pt-16 text-white/70">
            <div className="pointer-events-none absolute -bottom-[10%] left-0 right-0 z-0 select-none text-center font-display text-[22vw] leading-none tracking-[-0.06em] text-white/[0.03]">
                ADORABLE
            </div>

            <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="relative z-10 mx-auto max-w-[1280px]">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1.2fr]">
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
                        <div className="mt-8">
                            <a
                                id="donate"
                                href="#donate"
                                className="inline-flex gap-2 rounded-full bg-white px-6 py-3 text-[12px] font-bold tracking-wide text-black transition hover:bg-[#FF6B9D] hover:text-white"
                            >
                                DONATE TODAY <span>♥</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 text-[12px] font-bold tracking-[0.2em] text-white">
                            EXPLORE
                        </div>
                        <div className="space-y-2 text-[14px]">
                            {exploreLinks.map((label) => (
                                <a
                                    key={label}
                                    href={sectionHref(label)}
                                    className="block transition hover:text-white"
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 text-[12px] font-bold tracking-[0.2em] text-white">
                            PROGRAMS
                        </div>
                        <div className="space-y-2 text-[14px]">
                            {programs.slice(0, 4).map((program) => (
                                <a
                                    key={program.name}
                                    href="#programs"
                                    className="block transition hover:text-white"
                                >
                                    {program.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 text-[12px] font-bold tracking-[0.2em] text-white">
                            CONNECT
                        </div>
                        <div className="space-y-2 text-[14px]">
                            {socialLinks.map((label) => (
                                <a
                                    key={label}
                                    href="#"
                                    className="block transition hover:text-white"
                                >
                                    {label}
                                </a>
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
                        <div className="mt-8 flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.04] p-3">
                            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#FDE047] text-black">
                                ♔
                            </div>
                            <div className="text-[12px] leading-tight">
                                <div className="font-semibold text-white">
                                    We’re a 501(c)(3) nonprofit
                                </div>
                                <div className="opacity-60">
                                    EIN: 84-123456 • All donations tax-deductible
                                </div>
                            </div>
                        </div>
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
                        <a href="#" className="hover:opacity-100">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
