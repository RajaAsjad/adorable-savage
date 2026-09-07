import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import GalleryCategoryForm from './GalleryCategoryForm';

export default function Create() {
    return (
        <AdminLayout title="Add Gallery Category">
            <Head title="Add Gallery Category" />
            <GalleryCategoryForm
                submitRoute={route('admin.gallery-categories.store')}
            />
        </AdminLayout>
    );
}
