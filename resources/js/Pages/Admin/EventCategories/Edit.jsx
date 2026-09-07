import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import EventCategoryForm from './EventCategoryForm';

export default function Edit({ category }) {
    return (
        <AdminLayout title="Edit Event Category">
            <Head title={`Edit ${category.title}`} />
            <EventCategoryForm
                category={category}
                method="put"
                submitRoute={route(
                    'admin.event-categories.update',
                    category.id,
                )}
            />
        </AdminLayout>
    );
}
