import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SimpleEditor from '@/Components/SimpleEditor';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function PageForm({
    templates,
    page = null,
    submitUrl,
    method = 'post',
}) {
    const [imagePreview, setImagePreview] = useState(page?.image || null);

    const { data, setData, post, processing, errors } = useForm({
        title: page?.title || '',
        page_template: page?.page_template || templates[0]?.value || '',
        image: null,
        remove_image: false,
        description: page?.description || '',
        status: page?.status || 'draft',
        seo_title: page?.seo_title || '',
        seo_description: page?.seo_description || '',
        _method: method === 'put' ? 'put' : undefined,
    });

    const submit = (e) => {
        e.preventDefault();
        post(submitUrl, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
                <div className="rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]">
                    <div>
                        <InputLabel htmlFor="title" value="Title" />
                        <TextInput
                            id="title"
                            className="mt-2 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            autoComplete="off"
                        />
                        <InputError message={errors.title} className="mt-2" />
                        {page?.slug && (
                            <p className="mt-2 text-[12px] text-black/45">
                                Permalink: /{page.slug}
                            </p>
                        )}
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="description" value="Description" />
                        <div className="mt-2 overflow-hidden rounded-[22px] border border-black/10 bg-cream">
                            <SimpleEditor
                                id="description"
                                value={data.description}
                                onChange={(value) => setData('description', value)}
                            />
                        </div>
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                </div>

                <div className="rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                        SEO
                    </div>
                    <p className="mt-2 text-[14px] text-black/55">
                        Optional search engine title and description.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="seo_title" value="SEO Title" />
                        <TextInput
                            id="seo_title"
                            className="mt-2 block w-full"
                            value={data.seo_title}
                            onChange={(e) => setData('seo_title', e.target.value)}
                        />
                        <InputError message={errors.seo_title} className="mt-2" />
                    </div>

                    <div className="mt-5">
                        <InputLabel htmlFor="seo_description" value="SEO Description" />
                        <textarea
                            id="seo_description"
                            rows={4}
                            className="mt-2 block w-full rounded-[22px] border-black/10 bg-cream shadow-sm focus:border-blush focus:ring-blush"
                            value={data.seo_description}
                            onChange={(e) =>
                                setData('seo_description', e.target.value)
                            }
                        />
                        <InputError
                            message={errors.seo_description}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                        Publish
                    </div>

                    <div className="mt-5">
                        <InputLabel htmlFor="status" value="Status" />
                        <select
                            id="status"
                            className="mt-2 w-full rounded-full border-black/10 bg-cream focus:border-blush focus:ring-blush"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="">Select status</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <PrimaryButton disabled={processing}>
                            {page ? 'Update Page' : 'Save Page'}
                        </PrimaryButton>
                        <Link
                            href={route('admin.pages.index')}
                            className="text-[12px] font-bold uppercase tracking-wide text-black/50 hover:text-ink"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>

                <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]">
                    <InputLabel htmlFor="page_template" value="Page Template" />
                    <select
                        id="page_template"
                        className="mt-2 w-full rounded-full border-black/10 bg-cream focus:border-blush focus:ring-blush"
                        value={data.page_template}
                        onChange={(e) => setData('page_template', e.target.value)}
                    >
                        <option value="">Select template</option>
                        {templates.map((template) => (
                            <option key={template.value} value={template.value}>
                                {template.label}
                            </option>
                        ))}
                    </select>
                    <p className="mt-2 text-[12px] text-black/45">
                        Templates come from Blade files in
                        resources/views/page-templates.
                    </p>
                    <InputError message={errors.page_template} className="mt-2" />
                </div>

                <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]">
                    <InputLabel value="Featured Image" />
                    <div className="mt-2 rounded-[22px] border border-dashed border-black/15 bg-cream p-5">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Featured preview"
                                className="mx-auto mb-4 h-28 w-full rounded-2xl object-cover"
                            />
                        ) : (
                            <div className="mb-4 grid h-20 place-items-center font-hand text-[22px] text-black/40">
                                No image
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setData('image', file);
                                setData('remove_image', false);
                                if (file) {
                                    setImagePreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                        {imagePreview && (
                            <button
                                type="button"
                                className="mt-3 text-[12px] font-bold uppercase tracking-wide text-blush"
                                onClick={() => {
                                    setData('image', null);
                                    setData('remove_image', true);
                                    setImagePreview(null);
                                }}
                            >
                                Remove image
                            </button>
                        )}
                    </div>
                    <InputError message={errors.image} className="mt-2" />
                </div>
            </div>
        </form>
    );
}
