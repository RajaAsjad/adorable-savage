import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout
            title="Verify email"
            subtitle="One quick click in your inbox and you're fully in."
        >
            <Head title="Email Verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 rounded-full bg-teal/20 px-4 py-2 text-sm font-medium text-ink">
                    A new verification link has been sent to your email.
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <PrimaryButton className="w-full" disabled={processing}>
                    Resend Verification Email
                </PrimaryButton>

                <div className="text-center">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm font-medium text-black/50 hover:text-blush"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
