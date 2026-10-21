import { useEffect, useMemo, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Footer from '@/Components/Home/Footer';
import Header from '@/Components/Home/Header';
import ScrollingTicker from '@/Components/Home/ScrollingTicker';
import { parseTickerText } from '@/data/tickerContent';

function getCustomField(page, name, defaultValue = '') {
    if (!Array.isArray(page?.custom_fields)) {
        return defaultValue;
    }

    const field = page.custom_fields.find(
        (item) => (item?.name || '').trim().toLowerCase() === name.toLowerCase(),
    );

    return field?.value ?? defaultValue;
}

/** Last word in pink handwritten font — brand title style */
function TitleHeading({ title }) {
    const text = (title || '').trim();

    if (!text) {
        return null;
    }

    const words = text.split(/\s+/);

    if (words.length < 2) {
        return text;
    }

    const lastWord = words.pop();

    return (
        <>
            {words.join(' ')}{' '}
            <span className="font-hand text-[#FF6B9D]">{lastWord}</span>
        </>
    );
}

function InfoRow({ label, value, href }) {
    if (!value) {
        return null;
    }

    const content = href ? (
        <a href={href} className="transition hover:text-[#FF6B9D]">
            {value}
        </a>
    ) : (
        value
    );

    return (
        <div className="border-b border-black/5 py-4 last:border-0">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                {label}
            </div>
            <div className="mt-1.5 text-[16px] leading-snug text-ink">{content}</div>
        </div>
    );
}

export default function Contact({ page }) {
    const { flash } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const seoTitle = page?.seo_title || page?.title || 'Contact';
    const eyebrow = getCustomField(page, 'eyebrow', 'SAY HELLO');
    const email = getCustomField(page, 'email') || getCustomField(page, 'contact_email');
    const phone = getCustomField(page, 'phone');
    const location = getCustomField(page, 'location') || getCustomField(page, 'address');
    const hours = getCustomField(page, 'hours');
    const formHeading = getCustomField(page, 'form_heading', 'Send a note');
    const formButton = getCustomField(page, 'form_button', 'SEND MESSAGE');
    const formNote = getCustomField(
        page,
        'form_note',
        'No spam. Just real humans reading real messages.',
    );
    const instagram = getCustomField(page, 'instagram');
    const featuredImage = page?.image || '';
    const tickerItems = useMemo(
        () => parseTickerText(page?.ticker_text) || [],
        [page?.ticker_text],
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => reset('name', 'email', 'subject', 'message'),
        });
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FFFBF0] text-[#131313] selection:bg-[#FF6B9D] selection:text-white">
            <Head>
                <title>{seoTitle}</title>
                {page?.seo_description && (
                    <meta name="description" content={page.seo_description} />
                )}
            </Head>
            <div className="page-grain" />

            <Header
                scrolled={scrolled}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
            />

            <section className="relative overflow-hidden pt-24">
                <div className="pointer-events-none absolute -right-[12%] top-20 h-[420px] w-[420px] rounded-full bg-[#FF6B9D]/15 blur-[90px]" />
                <div className="pointer-events-none absolute -left-[10%] bottom-0 h-[360px] w-[360px] rounded-full bg-[#FDE047]/20 blur-[90px]" />

                <div className="relative mx-auto max-w-[1280px] px-6 py-16 lg:py-24">
                    <div className="max-w-2xl">
                        {eyebrow && (
                            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em]">
                                <span className="h-[2px] w-6 bg-black" />
                                {eyebrow}
                            </div>
                        )}

                        <h1 className="mt-6 font-display text-[48px] leading-[0.95] tracking-tight md:text-[64px] lg:text-[72px]">
                            <TitleHeading title={page?.title || 'Get in touch'} />
                        </h1>

                        {page?.description ? (
                            <div
                                className="prose prose-neutral mt-6 max-w-xl text-[17px] leading-[1.65] text-black/70"
                                dangerouslySetInnerHTML={{
                                    __html: page.description,
                                }}
                            />
                        ) : (
                            <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-black/70">
                                Questions, partnerships, or just saying hi — we&apos;d
                                love to hear from you.
                            </p>
                        )}
                    </div>

                    <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
                        <div className="space-y-6">
                            {featuredImage ? (
                                <div className="relative overflow-hidden rounded-[32px] bg-[#F6F1E8]">
                                    <img
                                        src={featuredImage}
                                        alt={page?.title || 'Contact'}
                                        className="aspect-[4/5] h-full w-full object-cover lg:aspect-[5/6]"
                                    />
                                    <div className="absolute bottom-5 left-5 rounded-full bg-black px-4 py-2 text-[11px] font-bold tracking-wide text-white">
                                        YOU BELONG HERE
                                    </div>
                                </div>
                            ) : (
                                <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#FF6B9D]/25 via-[#FDE047]/20 to-[#A78BFA]/25 p-10">
                                    <div className="font-display text-[40px] leading-none tracking-tight">
                                        Soft.{' '}
                                        <span className="font-hand text-[#FF6B9D]">
                                            Wild.
                                        </span>{' '}
                                        Here.
                                    </div>
                                    <p className="mt-4 max-w-xs text-[15px] text-black/60">
                                        Drop a line anytime — community starts with a
                                        conversation.
                                    </p>
                                </div>
                            )}

                            <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.12)]">
                                <InfoRow
                                    label="Email"
                                    value={email}
                                    href={email ? `mailto:${email}` : undefined}
                                />
                                <InfoRow
                                    label="Phone"
                                    value={phone}
                                    href={
                                        phone
                                            ? `tel:${phone.replace(/[^\d+]/g, '')}`
                                            : undefined
                                    }
                                />
                                <InfoRow label="Location" value={location} />
                                <InfoRow label="Hours" value={hours} />
                                {instagram && (
                                    <InfoRow
                                        label="Instagram"
                                        value={instagram.replace(/^@/, '')}
                                        href={
                                            instagram.startsWith('http')
                                                ? instagram
                                                : `https://instagram.com/${instagram.replace(/^@/, '')}`
                                        }
                                    />
                                )}

                                {!email && !phone && !location && !hours && !instagram && (
                                    <p className="py-2 text-[14px] text-black/45">
                                        Add contact details in Custom Fields
                                        (email, phone, location, hours).
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.15)] lg:p-10">
                            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                                Message
                            </div>
                            <h2 className="mt-3 font-display text-[32px] leading-none tracking-tight md:text-[40px]">
                                {formHeading}
                            </h2>

                            {flash?.success && (
                                <div className="mt-6 rounded-2xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 px-4 py-3 text-[14px] text-[#0F766E]">
                                    {flash.success}
                                </div>
                            )}
                            {flash?.error && (
                                <div className="mt-6 rounded-2xl border border-[#FF6B9D]/30 bg-[#FF6B9D]/10 px-4 py-3 text-[14px] text-[#BE123C]">
                                    {flash.error}
                                </div>
                            )}

                            <form onSubmit={submit} className="mt-8 space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="contact_name"
                                            className="text-[12px] font-bold uppercase tracking-wide text-black/50"
                                        >
                                            Name
                                        </label>
                                        <input
                                            id="contact_name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className="mt-2 w-full rounded-full border-black/10 bg-[#FFFBF0] px-5 py-3 text-[15px] shadow-sm focus:border-[#FF6B9D] focus:ring-[#FF6B9D]"
                                            placeholder="Your name"
                                        />
                                        {errors.name && (
                                            <p className="mt-1.5 text-[13px] text-[#BE123C]">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="contact_email"
                                            className="text-[12px] font-bold uppercase tracking-wide text-black/50"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="contact_email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className="mt-2 w-full rounded-full border-black/10 bg-[#FFFBF0] px-5 py-3 text-[15px] shadow-sm focus:border-[#FF6B9D] focus:ring-[#FF6B9D]"
                                            placeholder="you@email.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1.5 text-[13px] text-[#BE123C]">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="contact_subject"
                                        className="text-[12px] font-bold uppercase tracking-wide text-black/50"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        id="contact_subject"
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) =>
                                            setData('subject', e.target.value)
                                        }
                                        className="mt-2 w-full rounded-full border-black/10 bg-[#FFFBF0] px-5 py-3 text-[15px] shadow-sm focus:border-[#FF6B9D] focus:ring-[#FF6B9D]"
                                        placeholder="What's this about?"
                                    />
                                    {errors.subject && (
                                        <p className="mt-1.5 text-[13px] text-[#BE123C]">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="contact_message"
                                        className="text-[12px] font-bold uppercase tracking-wide text-black/50"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="contact_message"
                                        rows={6}
                                        value={data.message}
                                        onChange={(e) =>
                                            setData('message', e.target.value)
                                        }
                                        className="mt-2 w-full rounded-[24px] border-black/10 bg-[#FFFBF0] px-5 py-4 text-[15px] shadow-sm focus:border-[#FF6B9D] focus:ring-[#FF6B9D]"
                                        placeholder="Tell us what's on your mind..."
                                    />
                                    {errors.message && (
                                        <p className="mt-1.5 text-[13px] text-[#BE123C]">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-[13px] font-bold tracking-wide text-white transition hover:bg-[#FF6B9D] disabled:opacity-60"
                                    >
                                        {processing ? 'SENDING…' : formButton}{' '}
                                        <span>↗</span>
                                    </button>
                                    {formNote && (
                                        <p className="max-w-xs text-[12px] text-black/45">
                                            {formNote}
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {tickerItems.length > 0 && (
                <ScrollingTicker items={tickerItems} label="Contact ticker" />
            )}

            <Footer />
        </div>
    );
}
