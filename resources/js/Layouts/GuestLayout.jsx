import { Link, usePage } from '@inertiajs/react';

export default function GuestLayout({ children, title, subtitle }) {
    const branding = usePage().props.branding || {};

    return (
        <div className="relative min-h-screen overflow-hidden bg-cream text-ink selection:bg-blush selection:text-white">
            <div className="pointer-events-none absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full bg-blush/20 blur-[80px]" />
            <div className="pointer-events-none absolute -right-[10%] -bottom-[20%] h-[60%] w-[60%] rounded-full bg-lilac/20 blur-[80px]" />
            <div className="pointer-events-none absolute top-[40%] right-[20%] h-[30%] w-[30%] rounded-full bg-soft/30 blur-[60px]" />

            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
                <Link href="/" className="mb-8 flex items-center gap-3">
                    {branding.site_logo ? (
                        <img
                            src={branding.site_logo}
                            alt={branding.site_title || 'Logo'}
                            className="h-12 w-auto object-contain"
                        />
                    ) : (
                        <div className="grid h-11 w-11 place-items-center rounded-full bg-ink text-[13px] font-bold text-cream">
                            AS
                        </div>
                    )}
                    <span className="font-display text-[26px] leading-none tracking-tight">
                        The Adorable{' '}
                        <span className="font-hand text-[30px] text-blush">Savage</span>
                    </span>
                </Link>

                <div className="w-full max-w-md rounded-[28px] border border-black/10 bg-white/90 p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] backdrop-blur">
                    {(title || subtitle) && (
                        <div className="mb-8 text-center">
                            {title && (
                                <h1 className="font-display text-[36px] leading-none tracking-tight">
                                    {title}
                                </h1>
                            )}
                            {subtitle && (
                                <p className="mt-3 text-[14px] leading-relaxed text-black/60">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    )}
                    {children}
                </div>

                <p className="mt-8 font-hand text-[20px] text-black/50">
                    you belong here ♡
                </p>
            </div>
        </div>
    );
}
