import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function UpdateProfileInformation({
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [imagePreview, setImagePreview] = useState(user.profile_image);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            profile_image: null,
            remove_profile_image: false,
            _method: 'patch',
        });

    useEffect(() => {
        setImagePreview(user.profile_image);
    }, [user.profile_image]);

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const initials = user.name
        ?.split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <section className={className}>
            <header>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                    Account
                </div>
                <h2 className="mt-2 font-display text-[32px] leading-none tracking-tight">
                    Profile Information
                </h2>
                <p className="mt-2 text-[14px] text-black/55">
                    Update your display name and profile photo.
                </p>
            </header>

            <form onSubmit={submit} className="mt-8 space-y-6">
                <div>
                    <InputLabel value="Profile Photo" />
                    <div className="mt-2 rounded-[22px] border border-dashed border-black/15 bg-cream p-5">
                        <div className="mb-4 flex items-center gap-4">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Profile preview"
                                    className="h-20 w-20 rounded-full object-cover"
                                />
                            ) : (
                                <div className="grid h-20 w-20 place-items-center rounded-full bg-ink text-[18px] font-bold text-white">
                                    {initials || 'AS'}
                                </div>
                            )}
                            <div className="text-[13px] text-black/55">
                                Upload a square image for best results.
                            </div>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setData('profile_image', file);
                                setData('remove_profile_image', false);
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
                                    setData('profile_image', null);
                                    setData('remove_profile_image', true);
                                    setImagePreview(null);
                                }}
                            >
                                Remove photo
                            </button>
                        )}
                    </div>
                    <InputError message={errors.profile_image} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-2 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-2 block w-full cursor-not-allowed opacity-60"
                        value={user.email}
                        readOnly
                        autoComplete="username"
                    />

                    <p className="mt-2 text-[12px] text-black/45">
                        Email cannot be changed from this page.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Save Profile
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-medium text-teal">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
