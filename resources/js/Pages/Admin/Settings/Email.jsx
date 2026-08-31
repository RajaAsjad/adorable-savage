import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Email({ mail }) {
    const { auth, flash } = usePage().props;

    const form = useForm({
        mail_mailer: mail.mail_mailer || 'smtp',
        mail_host: mail.mail_host || '',
        mail_port: mail.mail_port || '587',
        mail_username: mail.mail_username || '',
        mail_password: '',
        mail_encryption: mail.mail_encryption || 'tls',
        mail_from_address: mail.mail_from_address || '',
        mail_from_name: mail.mail_from_name || '',
    });

    const testForm = useForm({
        test_email: auth.user.email || '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.settings.email.update'), {
            preserveScroll: true,
        });
    };

    const sendTest = (e) => {
        e.preventDefault();
        testForm.post(route('admin.settings.email.test'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Email Settings">
            <Head title="Email Settings" />

            <div className="mx-auto grid max-w-4xl gap-6">
                <form
                    onSubmit={submit}
                    className="space-y-6 rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]"
                >
                    <div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                            Site Settings → Email
                        </div>
                        <p className="mt-2 text-[14px] text-black/55">
                            Configure SMTP here. These values override .env mail
                            settings at runtime.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <InputLabel htmlFor="mail_mailer" value="Mailer" />
                            <select
                                id="mail_mailer"
                                className="mt-2 w-full rounded-full border-black/10 bg-cream focus:border-blush focus:ring-blush"
                                value={form.data.mail_mailer}
                                onChange={(e) =>
                                    form.setData('mail_mailer', e.target.value)
                                }
                            >
                                <option value="smtp">SMTP</option>
                                <option value="log">Log (local testing)</option>
                                <option value="sendmail">Sendmail</option>
                            </select>
                            <InputError
                                message={form.errors.mail_mailer}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="mail_encryption"
                                value="Encryption"
                            />
                            <select
                                id="mail_encryption"
                                className="mt-2 w-full rounded-full border-black/10 bg-cream focus:border-blush focus:ring-blush"
                                value={form.data.mail_encryption || 'null'}
                                onChange={(e) =>
                                    form.setData(
                                        'mail_encryption',
                                        e.target.value,
                                    )
                                }
                            >
                                <option value="tls">TLS</option>
                                <option value="ssl">SSL</option>
                                <option value="null">None</option>
                            </select>
                            <InputError
                                message={form.errors.mail_encryption}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="mail_host" value="SMTP Host" />
                            <TextInput
                                id="mail_host"
                                className="mt-2 block w-full"
                                value={form.data.mail_host}
                                onChange={(e) =>
                                    form.setData('mail_host', e.target.value)
                                }
                                placeholder="smtp.mailgun.org"
                            />
                            <InputError
                                message={form.errors.mail_host}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="mail_port" value="Port" />
                            <TextInput
                                id="mail_port"
                                type="number"
                                className="mt-2 block w-full"
                                value={form.data.mail_port}
                                onChange={(e) =>
                                    form.setData('mail_port', e.target.value)
                                }
                            />
                            <InputError
                                message={form.errors.mail_port}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="mail_username"
                                value="Username"
                            />
                            <TextInput
                                id="mail_username"
                                className="mt-2 block w-full"
                                value={form.data.mail_username}
                                onChange={(e) =>
                                    form.setData(
                                        'mail_username',
                                        e.target.value,
                                    )
                                }
                            />
                            <InputError
                                message={form.errors.mail_username}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="mail_password"
                                value="Password"
                            />
                            <TextInput
                                id="mail_password"
                                type="password"
                                className="mt-2 block w-full"
                                value={form.data.mail_password}
                                onChange={(e) =>
                                    form.setData(
                                        'mail_password',
                                        e.target.value,
                                    )
                                }
                                placeholder={
                                    mail.mail_password_set
                                        ? 'Leave blank to keep current'
                                        : 'SMTP password'
                                }
                            />
                            <InputError
                                message={form.errors.mail_password}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="mail_from_address"
                                value="From Address"
                            />
                            <TextInput
                                id="mail_from_address"
                                type="email"
                                className="mt-2 block w-full"
                                value={form.data.mail_from_address}
                                onChange={(e) =>
                                    form.setData(
                                        'mail_from_address',
                                        e.target.value,
                                    )
                                }
                            />
                            <InputError
                                message={form.errors.mail_from_address}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="mail_from_name"
                                value="From Name"
                            />
                            <TextInput
                                id="mail_from_name"
                                className="mt-2 block w-full"
                                value={form.data.mail_from_name}
                                onChange={(e) =>
                                    form.setData(
                                        'mail_from_name',
                                        e.target.value,
                                    )
                                }
                            />
                            <InputError
                                message={form.errors.mail_from_name}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={form.processing}>
                            Save Email Settings
                        </PrimaryButton>
                        {(form.recentlySuccessful || flash?.success) && (
                            <span className="text-sm font-medium text-teal">
                                Saved.
                            </span>
                        )}
                    </div>
                </form>

                <form
                    onSubmit={sendTest}
                    className="rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]"
                >
                    <h3 className="font-display text-[28px] leading-none">
                        Send Test Email
                    </h3>
                    <p className="mt-2 text-[14px] text-black/55">
                        Verify your SMTP configuration with a quick test
                        message.
                    </p>
                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
                        <div className="flex-1">
                            <InputLabel
                                htmlFor="test_email"
                                value="Recipient"
                            />
                            <TextInput
                                id="test_email"
                                type="email"
                                className="mt-2 block w-full"
                                value={testForm.data.test_email}
                                onChange={(e) =>
                                    testForm.setData(
                                        'test_email',
                                        e.target.value,
                                    )
                                }
                            />
                            <InputError
                                message={testForm.errors.test_email}
                                className="mt-2"
                            />
                        </div>
                        <PrimaryButton
                            className="sm:mb-0.5"
                            disabled={testForm.processing}
                        >
                            Send Test
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
