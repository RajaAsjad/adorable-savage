import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import ProgramPostForm from './ProgramPostForm';

export default function Edit({ post, categories }) {
    return (
        <AdminLayout title="Edit Program Post">
            <Head title={`Edit ${post.title}`} />
            <ProgramPostForm
                post={post}
                categories={categories}
                method="put"
                submitRoute={route('admin.program-posts.update', post.id)}
            />
        </AdminLayout>
    );
}
