import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import GalleryForm from './GalleryForm';

export default function Edit({ gallery, categories }) {
    return (
        <AdminLayout title="Edit Gallery Item">
            <Head title={`Edit ${gallery.title}`} />
            <GalleryForm
                gallery={gallery}
                categories={categories}
                method="put"
                submitRoute={route('admin.galleries.update', gallery.id)}
            />
        </AdminLayout>
    );
}
