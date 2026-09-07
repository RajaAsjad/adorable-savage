import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import GalleryForm from './GalleryForm';

export default function Create({ categories }) {
    return (
        <AdminLayout title="Add Gallery Item">
            <Head title="Add Gallery Item" />
            <GalleryForm
                categories={categories}
                submitRoute={route('admin.galleries.store')}
            />
        </AdminLayout>
    );
}
