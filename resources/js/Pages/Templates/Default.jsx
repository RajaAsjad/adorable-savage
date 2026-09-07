import { Head, Link } from '@inertiajs/react';

export default function Default({ page }) {
    const title = page?.seo_title || page?.title || 'Page';

    return (
        <div className="min-h-screen bg-cream text-ink">
            <Head>
                <title>{title}</title>
                {page?.seo_description && (
                    <meta name="description" content={page.seo_description} />
                )}
            </Head>

            <header className="border-b border-black/5 bg-white/70 backdrop-blur">
                <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
                    <Link href={route('home')} className="font-display text-[24px] tracking-tight">
                        The Adorable{' '}
                        <span className="font-hand text-[28px] text-blush">Savage</span>
                    </Link>
                    <Link
                        href={route('home')}
                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-wide"
                    >
                        Home
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-6 py-12">
                {page?.image && (
                    <img
                        src={page.image}
                        alt=""
                        className="mb-8 h-64 w-full rounded-[28px] object-cover"
                    />
                )}

                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                    Page
                </div>
                <h1 className="mt-3 font-display text-[48px] leading-none tracking-tight">
                    {page?.title}
                </h1>

                {page?.description ? (
                    <div
                        className="prose prose-neutral mt-8 max-w-none text-[16px] leading-7 text-black/75"
                        dangerouslySetInnerHTML={{ __html: page.description }}
                    />
                ) : (
                    <p className="mt-8 text-[15px] text-black/45">
                        This page has no content yet.
                    </p>
                )}
            </main>
        </div>
    );
}
