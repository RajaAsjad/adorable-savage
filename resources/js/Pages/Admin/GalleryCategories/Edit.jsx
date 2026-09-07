import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import GalleryCategoryForm from './GalleryCategoryForm';

export default function Edit({ category }) {
    return (
        <AdminLayout title="Edit Gallery Category">
            <Head title={`Edit ${category.title}`} />
            <GalleryCategoryForm
                category={category}
                method="put"
                submitRoute={route(
                    'admin.gallery-categories.update',
                    category.id,
                )}
            />
        </AdminLayout>
    );
}
