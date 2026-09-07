import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navItemClass = (active) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-[13px] font-semibold tracking-wide transition ${
        active
            ? 'bg-blush text-white'
            : 'text-white/70 hover:bg-white/5 hover:text-white'
    }`;

function NavItem({ href, active, children, icon }) {
    return (
        <Link href={href} className={navItemClass(active)}>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm">
                {icon}
            </span>
            <span>{children}</span>
        </Link>
    );
}

export default function AdminLayout({ title, children }) {
    const { auth, branding, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [programsOpen, setProgramsOpen] = useState(
        route().current('admin.program-categories.*') ||
            route().current('admin.program-posts.*'),
    );
    const [eventsOpen, setEventsOpen] = useState(
        route().current('admin.event-categories.*') ||
            route().current('admin.events.*'),
    );
    const [galleryOpen, setGalleryOpen] = useState(
        route().current('admin.gallery-categories.*') ||
            route().current('admin.galleries.*'),
    );

    const programCategoriesActive = route().current(
        'admin.program-categories.*',
    );
    const programPostsActive = route().current('admin.program-posts.*');
    const eventCategoriesActive = route().current('admin.event-categories.*');
    const eventsActive = route().current('admin.events.*');
    const galleryCategoriesActive = route().current(
        'admin.gallery-categories.*',
    );
    const galleriesActive = route().current('admin.galleries.*');

    return (
        <div className="min-h-screen bg-cream text-ink">
            {sidebarOpen && (
                <button
                    type="button"
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-ink text-cream transition-transform duration-300 lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="border-b border-white/10 px-6 py-6">
                    <Link href={route('admin.dashboard')} className="flex items-center gap-3">
                        {branding?.site_logo ? (
                            <img
                                src={branding.site_logo}
                                alt=""
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-[12px] font-bold text-ink">
                                AS
                            </div>
                        )}
                        <div>
                            <div className="font-display text-[20px] leading-none">
                                Admin
                            </div>
                            <div className="mt-1 font-hand text-[18px] text-blush">
                                {branding?.site_title || 'Adorable Savage'}
                            </div>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
                    <NavItem
                        href={route('admin.dashboard')}
                        active={route().current('admin.dashboard')}
                        icon="⌂"
                    >
                        Dashboard
                    </NavItem>

                    <NavItem
                        href={route('admin.pages.index')}
                        active={route().current('admin.pages.*')}
                        icon="☰"
                    >
                        Pages
                    </NavItem>

                    <NavItem
                        href={route('admin.about-posts.index')}
                        active={route().current('admin.about-posts.*')}
                        icon="◎"
                    >
                        About Posts
                    </NavItem>

                    <div>
                        <button
                            type="button"
                            onClick={() => setProgramsOpen((open) => !open)}
                            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-[13px] font-semibold tracking-wide transition ${
                                programCategoriesActive || programPostsActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <span className="flex items-center gap-3">
                                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm">
                                    ▦
                                </span>
                                Programs Management
                            </span>
                            <span
                                className={`text-xs transition ${
                                    programsOpen ? 'rotate-180' : ''
                                }`}
                            >
                                ▾
                            </span>
                        </button>

                        {programsOpen && (
                            <div className="mt-2 space-y-1 border-l border-white/10 ms-8 ps-3">
                                <Link
                                    href={route('admin.program-categories.index')}
                                    className={`block rounded-xl px-3 py-2 text-[12px] font-medium transition ${
                                        programCategoriesActive
                                            ? 'bg-blush text-white'
                                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    Program Category
                                </Link>
                                <Link
                                    href={route('admin.program-posts.index')}
                                    className={`block rounded-xl px-3 py-2 text-[12px] font-medium transition ${
                                        programPostsActive
                                            ? 'bg-blush text-white'
                                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    Programs Post
                                </Link>
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={() => setEventsOpen((open) => !open)}
                            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-[13px] font-semibold tracking-wide transition ${
                                eventCategoriesActive || eventsActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <span className="flex items-center gap-3">
                                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm">
                                    ◷
                                </span>
                                Event Management
                            </span>
                            <span
                                className={`text-xs transition ${
                                    eventsOpen ? 'rotate-180' : ''
                                }`}
                            >
                                ▾
                            </span>
                        </button>

                        {eventsOpen && (
                            <div className="mt-2 space-y-1 border-l border-white/10 ms-8 ps-3">
                                <Link
                                    href={route('admin.event-categories.index')}
                                    className={`block rounded-xl px-3 py-2 text-[12px] font-medium transition ${
                                        eventCategoriesActive
                                            ? 'bg-blush text-white'
                                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    Event Category
                                </Link>
                                <Link
                                    href={route('admin.events.index')}
                                    className={`block rounded-xl px-3 py-2 text-[12px] font-medium transition ${
                                        eventsActive
                                            ? 'bg-blush text-white'
                                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    Events
                                </Link>
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={() => setGalleryOpen((open) => !open)}
                            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-[13px] font-semibold tracking-wide transition ${
                                galleryCategoriesActive || galleriesActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <span className="flex items-center gap-3">
                                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm">
                                    ▣
                                </span>
                                Gallery Management
                            </span>
                            <span
                                className={`text-xs transition ${
                                    galleryOpen ? 'rotate-180' : ''
                                }`}
                            >
                                ▾
                            </span>
                        </button>

                        {galleryOpen && (
                            <div className="mt-2 space-y-1 border-l border-white/10 ms-8 ps-3">
                                <Link
                                    href={route('admin.gallery-categories.index')}
                                    className={`block rounded-xl px-3 py-2 text-[12px] font-medium transition ${
                                        galleryCategoriesActive
                                            ? 'bg-blush text-white'
                                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    Gallery Category
                                </Link>
                                <Link
                                    href={route('admin.galleries.index')}
                                    className={`block rounded-xl px-3 py-2 text-[12px] font-medium transition ${
                                        galleriesActive
                                            ? 'bg-blush text-white'
                                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    Gallery
                                </Link>
                            </div>
                        )}
                    </div>

                    <NavItem
                        href={route('admin.settings.site')}
                        active={route().current('admin.settings.site')}
                        icon="✦"
                    >
                        Site Setting
                    </NavItem>

                    <NavItem
                        href={route('admin.settings.email')}
                        active={route().current('admin.settings.email')}
                        icon="✉"
                    >
                        Email Settings
                    </NavItem>

                    <NavItem href={route('home')} active={false} icon="↗">
                        View Website
                    </NavItem>
                </nav>

                <div className="border-t border-white/10 p-4">
                    <div className="mb-3 rounded-2xl bg-white/5 px-4 py-3">
                        <div className="mb-3 flex items-center gap-3">
                            {auth.user.profile_image ? (
                                <img
                                    src={auth.user.profile_image}
                                    alt=""
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-[11px] font-bold text-ink">
                                    {auth.user.name
                                        ?.split(' ')
                                        .map((part) => part[0])
                                        .join('')
                                        .slice(0, 2)
                                        .toUpperCase() || 'AS'}
                                </div>
                            )}
                            <div className="text-sm font-semibold text-white">
                                {auth.user.name}
                            </div>
                        </div>
                        <div className="text-[12px] text-white/50">
                            {auth.user.email}
                        </div>
                        <div className="mt-2 inline-flex rounded-full bg-blush/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blush">
                            {auth.user.role}
                        </div>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full rounded-full border border-white/15 px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white/80 transition hover:bg-white hover:text-ink"
                    >
                        Log Out
                    </Link>
                </div>
            </aside>

            <div className="lg:pl-72">
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/5 bg-cream/90 px-4 py-4 backdrop-blur sm:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            ☰
                        </button>
                        <div>
                            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                                Admin
                            </div>
                            <h1 className="font-display text-[28px] leading-none tracking-tight">
                                {title}
                            </h1>
                        </div>
                    </div>
                    <Link
                        href={route('profile.edit')}
                        className="hidden rounded-full border border-black/10 bg-white px-4 py-2 text-[12px] font-bold tracking-wide sm:inline-flex"
                    >
                        Profile
                    </Link>
                </header>

                <main className="px-4 py-8 sm:px-8">
                    {(flash?.success || flash?.error) && (
                        <div
                            className={`mb-6 rounded-2xl px-4 py-3 text-sm font-medium ${
                                flash.success
                                    ? 'bg-teal/20 text-ink'
                                    : 'bg-blush/15 text-ink'
                            }`}
                        >
                            {flash.success || flash.error}
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
