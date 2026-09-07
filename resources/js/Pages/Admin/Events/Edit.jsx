import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import EventForm from './EventForm';

export default function Edit({ event, categories }) {
    return (
        <AdminLayout title="Edit Event">
            <Head title={`Edit ${event.title}`} />
            <EventForm
                event={event}
                categories={categories}
                method="put"
                submitRoute={route('admin.events.update', event.id)}
            />
        </AdminLayout>
    );
}
