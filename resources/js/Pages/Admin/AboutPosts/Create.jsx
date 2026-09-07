import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import AboutPostForm from './AboutPostForm';

export default function Create() {
    return (
        <AdminLayout title="Add About Post">
            <Head title="Add About Post" />
            <AboutPostForm submitRoute={route('admin.about-posts.store')} />
        </AdminLayout>
    );
}
