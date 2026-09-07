import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import ProgramPostForm from './ProgramPostForm';

export default function Create({ categories }) {
    return (
        <AdminLayout title="Add Program Post">
            <Head title="Add Program Post" />
            <ProgramPostForm
                categories={categories}
                submitRoute={route('admin.program-posts.store')}
            />
        </AdminLayout>
    );
}
