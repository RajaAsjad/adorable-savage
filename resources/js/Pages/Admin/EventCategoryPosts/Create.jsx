import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import EventCategoryPostForm from './EventCategoryPostForm';

export default function Create({ categories }) {
    return (
        <AdminLayout title="Add Calendar Category Post">
            <Head title="Add Calendar Category Post" />
            <EventCategoryPostForm
                categories={categories}
                submitRoute={route('admin.event-category-posts.store')}
            />
        </AdminLayout>
    );
}
