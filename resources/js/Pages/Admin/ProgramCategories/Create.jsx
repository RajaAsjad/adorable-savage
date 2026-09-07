import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import ProgramCategoryForm from './ProgramCategoryForm';

export default function Create() {
    return (
        <AdminLayout title="Add Program Category">
            <Head title="Add Program Category" />
            <ProgramCategoryForm
                submitRoute={route('admin.program-categories.store')}
            />
        </AdminLayout>
    );
}
