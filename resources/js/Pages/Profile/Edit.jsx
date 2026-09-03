import AdminLayout from '@/Layouts/AdminLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit() {
    const { auth } = usePage().props;
    const isAdmin = auth.user?.role === 'admin';

    const content = (
        <>
            <Head title="Profile" />

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]">
                    <UpdateProfileInformationForm />
                </div>

                <div className="rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]">
                    <UpdatePasswordForm />
                </div>
            </div>
        </>
    );

    if (isAdmin) {
        return <AdminLayout title="Profile">{content}</AdminLayout>;
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{content}</div>
            </div>
        </AuthenticatedLayout>
    );
}
