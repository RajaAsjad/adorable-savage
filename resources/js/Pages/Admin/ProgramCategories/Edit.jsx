import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import ProgramCategoryForm from './ProgramCategoryForm';

export default function Edit({ category }) {
    return (
        <AdminLayout title="Edit Program Category">
            <Head title={`Edit ${category.title}`} />
            <ProgramCategoryForm
                category={category}
                method="put"
                submitRoute={route(
                    'admin.program-categories.update',
                    category.id,
                )}
            />
        </AdminLayout>
    );
}
