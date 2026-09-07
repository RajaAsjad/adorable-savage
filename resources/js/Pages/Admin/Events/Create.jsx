import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import EventForm from './EventForm';

export default function Create({ categories }) {
    return (
        <AdminLayout title="Add Event">
            <Head title="Add Event" />
            <EventForm
                categories={categories}
                submitRoute={route('admin.events.store')}
            />
        </AdminLayout>
    );
}
