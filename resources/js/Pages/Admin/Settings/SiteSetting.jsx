import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function SiteSetting({ branding }) {
    const { flash } = usePage().props;
    const [logoPreview, setLogoPreview] = useState(branding.site_logo);
    const [footerLogoPreview, setFooterLogoPreview] = useState(
        branding.footer_logo,
    );
    const [faviconPreview, setFaviconPreview] = useState(branding.site_favicon);

    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            site_title: branding.site_title || '',
            copyright: branding.copyright || '',
            site_logo: null,
            footer_logo: null,
            site_favicon: null,
            remove_logo: false,
            remove_footer_logo: false,
            remove_favicon: false,
            _method: 'post',
        });

    useEffect(() => {
        setLogoPreview(branding.site_logo);
        setFooterLogoPreview(branding.footer_logo);
        setFaviconPreview(branding.site_favicon);
    }, [branding]);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.site.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Site Setting">
            <Head title="Site Setting" />

            <form
                onSubmit={submit}
                className="mx-auto max-w-3xl space-y-6 rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]"
            >
                <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                        Site Setting
                    </div>
                    <p className="mt-2 text-[14px] text-black/55">
                        Manage website title, logos, favicon, and copyright text
                        used across the site and admin panel.
                    </p>
                </div>

                <div>
                    <InputLabel htmlFor="site_title" value="Website Title" />
                    <TextInput
                        id="site_title"
                        className="mt-2 block w-full"
                        value={data.site_title}
                        onChange={(e) => setData('site_title', e.target.value)}
                    />
                    <InputError message={errors.site_title} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="copyright" value="Copyright Text" />
                    <TextInput
                        id="copyright"
                        className="mt-2 block w-full"
                        value={data.copyright}
                        onChange={(e) => setData('copyright', e.target.value)}
                        placeholder="© 2026 The Adorable Savage Organization • Made with joy in Denver, CO"
                    />
                    <InputError message={errors.copyright} className="mt-2" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <InputLabel value="Logo" />
                        <div className="mt-2 rounded-[22px] border border-dashed border-black/15 bg-cream p-5">
                            {logoPreview ? (
                                <img
                                    src={logoPreview}
                                    alt="Logo preview"
                                    className="mx-auto mb-4 h-20 w-auto object-contain"
                                />
                            ) : (
                                <div className="mb-4 grid h-20 place-items-center font-hand text-[22px] text-black/40">
                                    No logo yet
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="block w-full text-sm"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setData('site_logo', file);
                                    setData('remove_logo', false);
                                    if (file) {
                                        setLogoPreview(URL.createObjectURL(file));
                                    }
                                }}
                            />
                            {logoPreview && (
                                <button
                                    type="button"
                                    className="mt-3 text-[12px] font-bold uppercase tracking-wide text-blush"
                                    onClick={() => {
                                        setData('site_logo', null);
                                        setData('remove_logo', true);
                                        setLogoPreview(null);
                                    }}
                                >
                                    Remove logo
                                </button>
                            )}
                        </div>
                        <InputError message={errors.site_logo} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel value="Footer Logo" />
                        <div className="mt-2 rounded-[22px] border border-dashed border-black/15 bg-cream p-5">
                            {footerLogoPreview ? (
                                <img
                                    src={footerLogoPreview}
                                    alt="Footer logo preview"
                                    className="mx-auto mb-4 h-20 w-auto object-contain"
                                />
                            ) : (
                                <div className="mb-4 grid h-20 place-items-center font-hand text-[22px] text-black/40">
                                    No footer logo
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="block w-full text-sm"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setData('footer_logo', file);
                                    setData('remove_footer_logo', false);
                                    if (file) {
                                        setFooterLogoPreview(
                                            URL.createObjectURL(file),
                                        );
                                    }
                                }}
                            />
                            {footerLogoPreview && (
                                <button
                                    type="button"
                                    className="mt-3 text-[12px] font-bold uppercase tracking-wide text-blush"
                                    onClick={() => {
                                        setData('footer_logo', null);
                                        setData('remove_footer_logo', true);
                                        setFooterLogoPreview(null);
                                    }}
                                >
                                    Remove footer logo
                                </button>
                            )}
                        </div>
                        <InputError
                            message={errors.footer_logo}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div>
                    <InputLabel value="Favicon" />
                    <div className="mt-2 max-w-sm rounded-[22px] border border-dashed border-black/15 bg-cream p-5">
                        {faviconPreview ? (
                            <img
                                src={faviconPreview}
                                alt="Favicon preview"
                                className="mx-auto mb-4 h-16 w-16 object-contain"
                            />
                        ) : (
                            <div className="mb-4 grid h-16 place-items-center font-hand text-[22px] text-black/40">
                                No favicon
                            </div>
                        )}
                        <input
                            type="file"
                            accept=".ico,.png,.jpg,.jpeg,.svg,.webp,image/*"
                            className="block w-full text-sm"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setData('site_favicon', file);
                                setData('remove_favicon', false);
                                if (file) {
                                    setFaviconPreview(
                                        URL.createObjectURL(file),
                                    );
                                }
                            }}
                        />
                        {faviconPreview && (
                            <button
                                type="button"
                                className="mt-3 text-[12px] font-bold uppercase tracking-wide text-blush"
                                onClick={() => {
                                    setData('site_favicon', null);
                                    setData('remove_favicon', true);
                                    setFaviconPreview(null);
                                }}
                            >
                                Remove favicon
                            </button>
                        )}
                    </div>
                    <InputError message={errors.site_favicon} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Save Site Setting
                    </PrimaryButton>
                    {(recentlySuccessful || flash?.success) && (
                        <span className="text-sm font-medium text-teal">
                            Saved.
                        </span>
                    )}
                </div>
            </form>
        </AdminLayout>
    );
}
