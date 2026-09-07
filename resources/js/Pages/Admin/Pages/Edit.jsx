import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import PageForm from './PageForm';

export default function Edit({ page, templates }) {
    return (
        <AdminLayout title="Edit Page">
            <Head title={`Edit ${page.title}`} />
            <PageForm
                page={page}
                templates={templates}
                method="put"
                submitRoute={route('admin.pages.update', page.id)}
            />
        </AdminLayout>
    );
}
