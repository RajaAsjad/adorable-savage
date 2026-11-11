import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SimpleEditor from '@/Components/SimpleEditor';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function BlogForm({
    blog = null,
    submitRoute,
    method = 'post',
}) {
    const [imagePreview, setImagePreview] = useState(blog?.image_url || null);

    const { data, setData, post: submitForm, processing, errors } = useForm({
        title: blog?.title || '',
        image: null,
        remove_image: false,
        description: blog?.description || '',
        status: blog?.status || 'draft',
        sort_order: blog?.sort_order ?? '',
        published_at: blog?.published_at || '',
        seo_title: blog?.seo_title || '',
        seo_description: blog?.seo_description || '',
        _method: method === 'put' ? 'put' : 'post',
    });

    const submit = (e) => {
        e.preventDefault();
        submitForm(submitRoute, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <form
            onSubmit={submit}
            className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]"
        >
            <div className="space-y-6">
                <div className="rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]">
                    <div>
                        <InputLabel htmlFor="title" value="Title" />
                        <TextInput
                            id="title"
                            className="mt-2 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Blog post title"
                        />
                        <InputError className="mt-2" message={errors.title} />
                    </div>

                    {blog?.slug && (
                        <p className="mt-3 text-[13px] text-black/45">
                            Slug:{' '}
                            <span className="font-medium text-ink">
                                {blog.slug}
                            </span>
                        </p>
                    )}

                    <div className="mt-8">
                        <InputLabel htmlFor="description" value="Content" />
                        <div className="mt-2 overflow-visible rounded-2xl border border-black/10 bg-cream">
                            <SimpleEditor
                                id="description"
                                value={data.description}
                                onChange={(value) =>
                                    setData('description', value)
                                }
                            />
                        </div>
                        <InputError
                            className="mt-2"
                            message={errors.description}
                        />
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
                            onChange={(e) =>
                                setData('seo_title', e.target.value)
                            }
                        />
                        <InputError
                            className="mt-2"
                            message={errors.seo_title}
                        />
                    </div>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="seo_description"
                            value="SEO Description"
                        />
                        <textarea
                            id="seo_description"
                            rows={4}
                            className="mt-2 block w-full rounded-3xl border-black/10 bg-cream shadow-sm focus:border-blush focus:ring-blush"
                            value={data.seo_description}
                            onChange={(e) =>
                                setData('seo_description', e.target.value)
                            }
                        />
                        <InputError
                            className="mt-2"
                            message={errors.seo_description}
                        />
                    </div>
                </div>
            </div>

            <aside className="space-y-6">
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
                            onChange={(e) => {
                                const next = e.target.value;
                                setData('status', next);
                                if (next !== 'scheduled') {
                                    setData('published_at', '');
                                }
                            }}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="scheduled">Schedule</option>
                        </select>
                        <InputError className="mt-2" message={errors.status} />
                    </div>

                    {data.status === 'scheduled' && (
                        <div className="mt-5">
                            <InputLabel
                                htmlFor="published_at"
                                value="Schedule Date & Time"
                            />
                            <TextInput
                                id="published_at"
                                type="datetime-local"
                                className="mt-2 block w-full"
                                value={data.published_at}
                                onChange={(e) =>
                                    setData('published_at', e.target.value)
                                }
                                required
                            />
                            <p className="mt-2 text-[12px] text-black/45">
                                Blog will go live automatically at this date and
                                time.
                            </p>
                            <InputError
                                className="mt-2"
                                message={errors.published_at}
                            />
                        </div>
                    )}

                    <div className="mt-5">
                        <InputLabel htmlFor="sort_order" value="Sort Order" />
                        <TextInput
                            id="sort_order"
                            type="number"
                            min="0"
                            className="mt-2 block w-full"
                            value={data.sort_order}
                            onChange={(e) =>
                                setData('sort_order', e.target.value)
                            }
                            placeholder="Auto"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.sort_order}
                        />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <PrimaryButton disabled={processing}>
                            {blog
                                ? 'Update'
                                : data.status === 'scheduled'
                                  ? 'Schedule'
                                  : 'Publish'}
                        </PrimaryButton>
                        <Link
                            href={route('admin.blogs.index')}
                            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-ink"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>

                <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]">
                    <InputLabel value="Featured Image" />
                    <div className="mt-2 rounded-[22px] border border-dashed border-black/15 bg-cream p-5">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mx-auto mb-4 h-32 w-full rounded-2xl object-cover"
                            />
                        ) : (
                            <div className="mb-4 grid h-24 place-items-center font-hand text-[22px] text-black/40">
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
                    <InputError className="mt-2" message={errors.image} />
                </div>
            </aside>
        </form>
    );
}
