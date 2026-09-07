import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SimpleEditor from '@/Components/SimpleEditor';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const emptyCustomField = () => ({ name: '', value: '' });

export default function PageForm({
    templates,
    page = null,
    submitRoute,
    method = 'post',
}) {
    const [imagePreview, setImagePreview] = useState(page?.image || null);

    const { data, setData, post, processing, errors, transform } = useForm({
        title: page?.title || '',
        page_template: page?.page_template || templates[0]?.value || '',
        image: null,
        remove_image: false,
        description: page?.description || '',
        status: page?.status || 'draft',
        seo_title: page?.seo_title || '',
        seo_description: page?.seo_description || '',
        custom_fields:
            page?.custom_fields?.length > 0
                ? page.custom_fields
                : [emptyCustomField()],
        _method: method === 'put' ? 'put' : 'post',
    });

    transform((formData) => ({
        ...formData,
        custom_fields: JSON.stringify(formData.custom_fields ?? []),
    }));

    const updateCustomField = (index, key, value) => {
        const fields = [...data.custom_fields];
        fields[index] = { ...fields[index], [key]: value };
        setData('custom_fields', fields);
    };

    const addCustomField = () => {
        setData('custom_fields', [...data.custom_fields, emptyCustomField()]);
    };

    const removeCustomField = (index) => {
        const fields = data.custom_fields.filter((_, i) => i !== index);
        setData(
            'custom_fields',
            fields.length > 0 ? fields : [emptyCustomField()],
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(submitRoute, {
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
                            placeholder="Add title"
                        />
                        <InputError className="mt-2" message={errors.title} />
                    </div>

                    {page?.slug && (
                        <p className="mt-3 text-[13px] text-black/45">
                            Permalink:{' '}
                            <span className="font-medium text-ink">/{page.slug}</span>
                        </p>
                    )}

                    <div className="mt-8">
                        <InputLabel
                            htmlFor="description"
                            value={
                                data.page_template === 'home'
                                    ? 'Left Side Content (Hero)'
                                    : data.page_template === 'about-us'
                                      ? 'About Header Content'
                                      : data.page_template === 'programs'
                                        ? 'Optional Notes'
                                        : data.page_template === 'events'
                                          ? 'Events Intro'
                                          : data.page_template === 'stay-vibe'
                                            ? 'Stay Vibe Intro'
                                            : 'Content'
                            }
                        />
                        {data.page_template === 'home' && (
                            <p className="mt-1 text-[13px] text-black/45">
                                Entire left hero is dynamic from this editor
                                (kicker, headings, intro, buttons). Featured
                                image is the right-side photo. Tip: keep
                                &quot;Adorable&quot; in italics for the pink
                                script style.
                            </p>
                        )}
                        {data.page_template === 'about-us' && (
                            <p className="mt-1 text-[13px] text-black/45">
                                The page Title above is the About heading.
                                This editor is the intro paragraph under it.
                                Pillar cards stay the same.
                            </p>
                        )}
                        {data.page_template === 'programs' && (
                            <p className="mt-1 text-[13px] text-black/45">
                                The page Title above is the Programs section
                                heading. Include &quot;WELLNESS AND&quot; for
                                the lilac script style. Program cards stay the
                                same.
                            </p>
                        )}
                        {data.page_template === 'events' && (
                            <p className="mt-1 text-[13px] text-black/45">
                                The page Title above is the Events heading.
                                Include &quot;US&quot; for the pink script
                                style. This editor is the intro under it.
                                Event cards stay the same.
                            </p>
                        )}
                        {data.page_template === 'stay-vibe' && (
                            <p className="mt-1 text-[13px] text-black/45">
                                The page Title above is the Stay Vibe heading.
                                Include &quot;vibe&quot; for the pink script
                                style. This editor is the intro under it.
                                Social images stay the same.
                            </p>
                        )}
                        <div className="mt-2 overflow-hidden rounded-2xl border border-black/10 bg-cream">
                            <SimpleEditor
                                id="description"
                                value={data.description}
                                onChange={(value) => setData('description', value)}
                            />
                        </div>
                        <InputError className="mt-2" message={errors.description} />
                    </div>
                </div>

                <div className="rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                        Custom Fields
                    </div>
                    <p className="mt-2 text-[14px] text-black/55">
                        Add extra metadata to this page, same as WordPress custom
                        fields. Use a Name and Value for each field.
                    </p>

                    <div className="mt-6 space-y-4">
                        <div className="hidden grid-cols-[1fr_1.4fr_auto] gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-black/40 sm:grid">
                            <span>Name</span>
                            <span>Value</span>
                            <span className="w-20" />
                        </div>

                        {data.custom_fields.map((field, index) => (
                            <div
                                key={index}
                                className="grid gap-3 rounded-2xl border border-black/10 bg-cream p-4 sm:grid-cols-[1fr_1.4fr_auto] sm:items-start"
                            >
                                <div>
                                    <InputLabel
                                        htmlFor={`custom_field_name_${index}`}
                                        value="Name"
                                        className="sm:sr-only"
                                    />
                                    <TextInput
                                        id={`custom_field_name_${index}`}
                                        className="mt-2 block w-full sm:mt-0"
                                        value={field.name}
                                        onChange={(e) =>
                                            updateCustomField(
                                                index,
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. kicker"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={
                                            errors[`custom_fields.${index}.name`]
                                        }
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor={`custom_field_value_${index}`}
                                        value="Value"
                                        className="sm:sr-only"
                                    />
                                    <textarea
                                        id={`custom_field_value_${index}`}
                                        rows={2}
                                        className="mt-2 block w-full rounded-3xl border-black/10 bg-white shadow-sm focus:border-blush focus:ring-blush sm:mt-0"
                                        value={field.value}
                                        onChange={(e) =>
                                            updateCustomField(
                                                index,
                                                'value',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Field value"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={
                                            errors[`custom_fields.${index}.value`]
                                        }
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeCustomField(index)}
                                    className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-[11px] font-bold uppercase tracking-wide text-black/55 transition hover:border-blush hover:text-blush"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addCustomField}
                        className="mt-5 inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide text-ink transition hover:border-blush hover:text-blush"
                    >
                        Add Custom Field
                    </button>
                    <InputError className="mt-2" message={errors.custom_fields} />
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
                        <InputError className="mt-2" message={errors.seo_title} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="seo_description" value="SEO Description" />
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
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                        <InputError className="mt-2" message={errors.status} />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <PrimaryButton disabled={processing}>
                            {page ? 'Update' : 'Publish'}
                        </PrimaryButton>
                        <Link
                            href={route('admin.pages.index')}
                            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-ink"
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
                        Templates come from Blade files in{' '}
                        <span className="font-medium">views/page-templates</span>.
                    </p>
                    <InputError className="mt-2" message={errors.page_template} />
                </div>

                <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.15)]">
                    <InputLabel value="Featured Image" />
                    <div className="mt-2 rounded-[22px] border border-dashed border-black/15 bg-cream p-5">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Featured preview"
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
