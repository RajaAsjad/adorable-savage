import { featuredArtists, images } from '@/data';

export default function VersesVibes({ playing, setPlaying }) {
    return (
        <section
            id="versesvibes"
            className="relative overflow-hidden bg-[#0F0F0F] px-6 py-20 text-[#FFFBF0] lg:py-28"
        >
            <div className="absolute inset-0">
                <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute right-[10%] top-[20%] h-[28%] w-[28%] rounded-full bg-[#FF6B9D]/20 blur-[60px]" />
            </div>

            <div className="relative mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <div className="mb-6 text-[11px] tracking-[0.22em] opacity-50">
                        — VERSES & VIBES • MUSIC PLATFORM
                    </div>
                    <h2 className="font-display text-[56px] leading-[0.85] tracking-[-0.04em] lg:text-[84px]">
                        WHERE MUSIC <br /> MEETS THE{' '}
                        <span className="font-hand text-[#FF6B9D]">SOUL</span>
                    </h2>
                    <p className="mt-8 max-w-[460px] text-[16px] leading-[1.6] text-white/60">
                        A stage for raw verses, real stories, and vibrations that stay
                        with you. Listen, watch, and connect with artists redefining
                        community through sound.
                    </p>

                    <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                        <div className="flex items-center gap-4">
                            <div className="relative h-[86px] w-[86px] overflow-hidden rounded-[18px] bg-white/10">
                                <img
                                    src={images.verses}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-[10px] tracking-widest opacity-60">
                                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF6B9D]" />
                                    LIVE RECORDING
                                </div>
                                <div className="font-display mt-1 text-[20px] leading-tight">
                                    Unapologetically Me — Live at HQ
                                </div>
                                <div className="mt-1 text-[13px] opacity-60">
                                    Ama Luna • Verses & Vibes Vol. 4
                                </div>
                                <div className="mt-3 h-[2px] overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full w-[42%] bg-[#FF6B9D]" />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPlaying(!playing)}
                                className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-black transition hover:bg-[#FF6B9D] hover:text-white"
                            >
                                <span className="ml-[2px] text-[18px]">
                                    {playing ? '❚❚' : '▶'}
                                </span>
                            </button>
                        </div>

                        <div className="mt-6 flex h-[48px] items-end gap-[3px]">
                            {Array.from({ length: 48 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="wave-bar flex-1 rounded-full bg-gradient-to-t from-[#FF6B9D] to-[#FDE047]"
                                    style={{
                                        animationDelay: `${index * 0.05}s`,
                                        height: playing
                                            ? `${10 + Math.sin(index) * 10 + 12}px`
                                            : '10px',
                                        opacity: 0.7 + (index % 5) * 0.06,
                                    }}
                                />
                            ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="#programs"
                                className="rounded-full bg-white px-6 py-2.5 text-[12px] font-bold tracking-wide text-black"
                            >
                                DISCOVER THE VIBES ↗
                            </a>
                            <a
                                href="#contact"
                                className="rounded-full border border-white/20 px-6 py-2.5 text-[12px] font-bold tracking-wide transition hover:bg-white hover:text-black"
                            >
                                WATCH ON YOUTUBE
                            </a>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="rounded-[20px] border border-white/10 bg-white/[0.06] p-5">
                        <div className="mb-4 text-[11px] tracking-widest opacity-50">
                            FEATURED ARTISTS
                        </div>
                        {featuredArtists.map((artist) => (
                            <div
                                key={artist.n}
                                className="group -mx-2 flex items-center gap-3 rounded-xl border-b border-white/5 px-2 py-3 transition last:border-0 hover:bg-white/5"
                            >
                                <img
                                    src={artist.img}
                                    alt=""
                                    className="h-11 w-11 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="text-[15px] font-semibold tracking-tight">
                                        {artist.n}
                                    </div>
                                    <div className="text-[12px] opacity-50">
                                        {artist.s}
                                    </div>
                                </div>
                                <span className="opacity-30 transition group-hover:rotate-45 group-hover:opacity-100">
                                    ↗
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-[20px] bg-[#FF6B9D] p-5 text-black">
                            <div className="text-[11px] font-bold tracking-widest">
                                PLAYLISTS
                            </div>
                            <div className="font-display mt-2 text-[22px] leading-[0.95]">
                                Savage Softness
                            </div>
                            <div className="mt-3 text-[13px] leading-[1.4] opacity-80">
                                Songs to cry, dance, and be fully you.
                            </div>
                            <div className="mt-4 grid h-8 w-8 place-items-center rounded-full bg-black text-white">
                                →
                            </div>
                        </div>
                        <div className="rounded-[20px] bg-[#FDE047] p-5 text-black">
                            <div className="text-[11px] font-bold tracking-widest">
                                COMMUNITY STORIES
                            </div>
                            <div className="font-display mt-2 text-[22px] leading-[0.95]">
                                Voices Unfiltered
                            </div>
                            <div className="mt-3 text-[13px] leading-[1.4] opacity-80">
                                Real humans, raw courage, joyful truth.
                            </div>
                            <div className="mt-4 grid h-8 w-8 place-items-center rounded-full bg-black text-white">
                                →
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
