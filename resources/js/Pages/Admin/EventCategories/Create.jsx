import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import EventCategoryForm from './EventCategoryForm';

export default function Create() {
    return (
        <AdminLayout title="Add Event Category">
            <Head title="Add Event Category" />
            <EventCategoryForm
                submitRoute={route('admin.event-categories.store')}
            />
        </AdminLayout>
    );
}
