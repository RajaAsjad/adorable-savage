import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import PageForm from './PageForm';

export default function Create({ templates }) {
    return (
        <AdminLayout title="Add New Page">
            <Head title="Add New Page" />
            <PageForm
                templates={templates}
                submitRoute={route('admin.pages.store')}
            />
        </AdminLayout>
    );
}
