import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import EventCategoryPostForm from './EventCategoryPostForm';

export default function Edit({ post, categories }) {
    return (
        <AdminLayout title="Edit Calendar Category Post">
            <Head title={`Edit ${post.title}`} />
            <EventCategoryPostForm
                post={post}
                categories={categories}
                method="put"
                submitRoute={route(
                    'admin.event-category-posts.update',
                    post.id,
                )}
            />
        </AdminLayout>
    );
}
