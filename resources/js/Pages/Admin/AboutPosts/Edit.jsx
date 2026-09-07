import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import AboutPostForm from './AboutPostForm';

export default function Edit({ post }) {
    return (
        <AdminLayout title="Edit About Post">
            <Head title={`Edit ${post.title}`} />
            <AboutPostForm
                post={post}
                method="put"
                submitRoute={route('admin.about-posts.update', post.id)}
            />
        </AdminLayout>
    );
}
