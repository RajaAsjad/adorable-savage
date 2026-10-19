import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import BlogForm from './BlogForm';

export default function Edit({ blog }) {
    return (
        <AdminLayout title="Edit Blog">
            <Head title={`Edit ${blog.title}`} />
            <BlogForm
                blog={blog}
                method="put"
                submitRoute={route('admin.blogs.update', blog.id)}
            />
        </AdminLayout>
    );
}
