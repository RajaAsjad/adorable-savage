import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

function StatusBadge({ status }) {
    const published = status === 'published';

    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                published ? 'bg-teal/20 text-ink' : 'bg-black/5 text-black/55'
            }`}
        >
            {status}
        </span>
    );
}

export default function Index({ events }) {
    const destroyEvent = (id) => {
        if (! window.confirm('Move this event to trash?')) {
            return;
        }

        router.delete(route('admin.events.destroy', id));
    };

    return (
        <AdminLayout title="Events">
            <Head title="Events" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                        Event Management
                    </div>
                    <p className="mt-1 text-[14px] text-black/55">
                        Manage event cards shown on the homepage.
                    </p>
                </div>
                <Link
                    href={route('admin.events.create')}
                    className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-white transition hover:bg-blush"
                >
                    Add New
                </Link>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]">
                <table className="min-w-full text-left">
                    <thead className="border-b border-black/5 bg-cream/60 text-[11px] font-bold uppercase tracking-[0.16em] text-black/40">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-12 text-center text-sm text-black/45"
                                >
                                    No events yet. Add your first event.
                                </td>
                            </tr>
                        )}
                        {events.data.map((event) => (
                            <tr
                                key={event.id}
                                className="border-b border-black/5 last:border-0"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {event.image_url && (
                                            <img
                                                src={event.image_url}
                                                alt=""
                                                className="h-10 w-10 rounded-xl object-cover"
                                            />
                                        )}
                                        <div>
                                            <Link
                                                href={route(
                                                    'admin.events.edit',
                                                    event.id,
                                                )}
                                                className="font-semibold text-ink hover:text-blush"
                                            >
                                                {event.title}
                                            </Link>
                                            <div className="mt-1 text-[12px] text-black/40">
                                                {event.slug}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-black/65">
                                    {event.category_title || '—'}
                                </td>
                                <td className="px-6 py-4 text-sm text-black/55">
                                    {event.event_date || '—'}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={event.status} />
                                </td>
                                <td className="px-6 py-4 text-right text-[12px] font-bold uppercase tracking-wide">
                                    <Link
                                        href={route(
                                            'admin.events.edit',
                                            event.id,
                                        )}
                                        className="text-ink hover:text-blush"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        className="ms-4 text-blush"
                                        onClick={() => destroyEvent(event.id)}
                                    >
                                        Trash
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {events.links?.length > 3 && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {events.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || ''}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`rounded-full px-4 py-2 text-[12px] font-semibold ${
                                link.active
                                    ? 'bg-ink text-white'
                                    : 'bg-white text-ink'
                            } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
