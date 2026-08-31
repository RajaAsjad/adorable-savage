import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

function StatCard({ label, value, hint, tone = 'bg-white' }) {
    return (
        <div
            className={`rounded-[24px] border border-black/5 ${tone} p-6 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.2)]`}
        >
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/45">
                {label}
            </div>
            <div className="mt-3 font-display text-[40px] leading-none tracking-tight">
                {value}
            </div>
            {hint && (
                <div className="mt-3 text-[13px] text-black/55">{hint}</div>
            )}
        </div>
    );
}

export default function Dashboard({ stats }) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="mb-8 rounded-[28px] bg-ink p-8 text-cream">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                    Welcome back
                </div>
                <h2 className="mt-3 max-w-2xl font-display text-[42px] leading-[0.95] tracking-tight">
                    Manage your{' '}
                    <span className="font-hand text-blush">adorable</span> world
                    from one place.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] text-white/60">
                    Update branding, configure email delivery, and keep the
                    community experience soft, bold, and savage.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Users" value={stats.users} hint="Total accounts" />
                <StatCard
                    label="Admins"
                    value={stats.admins}
                    hint="Privileged access"
                    tone="bg-soft/40"
                />
                <StatCard
                    label="Site Title"
                    value={
                        <span className="block truncate text-[28px]">
                            {stats.site_title}
                        </span>
                    }
                    hint="Current branding"
                    tone="bg-lilac/20"
                />
                <StatCard
                    label="SMTP"
                    value={stats.mail_configured ? 'Ready' : 'Setup'}
                    hint={
                        stats.mail_configured
                            ? 'Mail host configured'
                            : 'Add SMTP in Email Settings'
                    }
                    tone="bg-blush/15"
                />
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
                <Link
                    href={route('admin.settings.branding')}
                    className="group rounded-[28px] border border-black/5 bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-18px_rgba(0,0,0,0.25)]"
                >
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                        Site Settings
                    </div>
                    <h3 className="mt-3 font-display text-[32px] leading-none">
                        Branding
                    </h3>
                    <p className="mt-3 text-[14px] text-black/55">
                        Update website title, logo, and favicon.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold tracking-wide">
                        Open <span className="transition group-hover:translate-x-1">→</span>
                    </div>
                </Link>

                <Link
                    href={route('admin.settings.email')}
                    className="group rounded-[28px] border border-black/5 bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-18px_rgba(0,0,0,0.25)]"
                >
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                        Site Settings
                    </div>
                    <h3 className="mt-3 font-display text-[32px] leading-none">
                        Email Settings
                    </h3>
                    <p className="mt-3 text-[14px] text-black/55">
                        Configure SMTP without editing .env files.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold tracking-wide">
                        Open <span className="transition group-hover:translate-x-1">→</span>
                    </div>
                </Link>
            </div>
        </AdminLayout>
    );
}
