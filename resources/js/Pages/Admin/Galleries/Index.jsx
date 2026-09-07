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

export default function Index({ galleries }) {
    const destroyGallery = (id) => {
        if (! window.confirm('Move this gallery item to trash?')) {
            return;
        }

        router.delete(route('admin.galleries.destroy', id));
    };

    return (
        <AdminLayout title="Gallery">
            <Head title="Gallery" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                        Gallery Management
                    </div>
                    <p className="mt-1 text-[14px] text-black/55">
                        Manage social gallery images on the homepage.
                    </p>
                </div>
                <Link
                    href={route('admin.galleries.create')}
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
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Updated</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {galleries.data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-12 text-center text-sm text-black/45"
                                >
                                    No gallery items yet. Add your first item.
                                </td>
                            </tr>
                        )}
                        {galleries.data.map((gallery) => (
                            <tr
                                key={gallery.id}
                                className="border-b border-black/5 last:border-0"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {gallery.image_url && (
                                            <img
                                                src={gallery.image_url}
                                                alt=""
                                                className="h-10 w-10 rounded-xl object-cover"
                                            />
                                        )}
                                        <div>
                                            <Link
                                                href={route(
                                                    'admin.galleries.edit',
                                                    gallery.id,
                                                )}
                                                className="font-semibold text-ink hover:text-blush"
                                            >
                                                {gallery.title}
                                            </Link>
                                            <div className="mt-1 text-[12px] text-black/40">
                                                {gallery.slug}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-black/65">
                                    {gallery.category_title || '—'}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={gallery.status} />
                                </td>
                                <td className="px-6 py-4 text-sm text-black/55">
                                    {gallery.updated_at}
                                </td>
                                <td className="px-6 py-4 text-right text-[12px] font-bold uppercase tracking-wide">
                                    <Link
                                        href={route(
                                            'admin.galleries.edit',
                                            gallery.id,
                                        )}
                                        className="text-ink hover:text-blush"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        className="ms-4 text-blush"
                                        onClick={() =>
                                            destroyGallery(gallery.id)
                                        }
                                    >
                                        Trash
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {galleries.links?.length > 3 && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {galleries.links.map((link, index) => (
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
