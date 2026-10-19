import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import BlogForm from './BlogForm';

export default function Create() {
    return (
        <AdminLayout title="Add Blog">
            <Head title="Add Blog" />
            <BlogForm submitRoute={route('admin.blogs.store')} />
        </AdminLayout>
    );
}
