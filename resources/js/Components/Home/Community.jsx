import { images } from '@/data';

export default function Community() {
    return (
        <section
            id="contact"
            className="relative overflow-hidden border-y border-black/5 bg-[#FFFBF0] py-20 lg:py-28"
        >
            <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 lg:grid-cols-2">
                <div className="relative">
                    <div className="grid rotate-[-1deg] grid-cols-3 gap-3">
                        <div className="space-y-3 pt-10">
                            <div className="aspect-[3/4] overflow-hidden rounded-[18px]">
                                <img
                                    src={images.joy}
                                    className="h-full w-full object-cover"
                                    alt=""
                                />
                            </div>
                            <div className="font-hand aspect-square rotate-2 overflow-hidden rounded-[18px] bg-[#FDE047] p-4 text-[20px] leading-none">
                                we laugh loud
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="aspect-[4/5] overflow-hidden rounded-[18px]">
                                <img
                                    src={images.folk}
                                    className="h-full w-full object-cover"
                                    alt=""
                                />
                            </div>
                            <div className="aspect-[4/3] overflow-hidden rounded-[18px]">
                                <img
                                    src={images.community}
                                    className="h-full w-full object-cover"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="space-y-3 pt-6">
                            <div className="aspect-[4/3] overflow-hidden rounded-[18px] bg-[#A78BFA]/30 p-4">
                                <div className="font-display text-[20px] leading-[0.9]">
                                    Community = Home
                                </div>
                            </div>
                            <div className="aspect-[3/4] overflow-hidden rounded-[18px]">
                                <img
                                    src={images.hero}
                                    className="h-full w-full object-cover"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-[18%] top-[-12px] grid h-12 w-12 rotate-12 place-items-center rounded-full bg-[#FF6B9D] text-white">
                        ♥
                    </div>
                    <div className="absolute bottom-[6%] left-[-8px] -rotate-2 rounded-full bg-black px-4 py-2 text-[12px] font-bold tracking-wide text-white">
                        YOU BELONG HERE
                    </div>
                </div>

                <div>
                    <div className="mb-6 text-[12px] font-bold tracking-[0.2em] opacity-60">
                        — COMMUNITY IS MEDICINE
                    </div>
                    <h2 className="font-display text-[48px] leading-[0.85] tracking-tight lg:text-[64px]">
                        YOU DON'T HAVE <br /> TO DO IT{' '}
                        <span className="font-hand text-[#A78BFA]">ALONE.</span>
                    </h2>
                    <p className="mt-8 max-w-[500px] text-[17px] leading-[1.65] text-black/70">
                        Wellness becomes more meaningful when we experience it
                        together. The Adorable Savage brings people together through
                        shared experiences, creativity, education, sobriety, music,
                        and community.
                    </p>
                    <div className="mt-10 flex gap-3">
                        <a
                            href="#home"
                            className="rounded-full bg-black px-7 py-3 text-[13px] font-bold tracking-wide text-white transition hover:bg-[#FF6B9D]"
                        >
                            JOIN OUR COMMUNITY ↗
                        </a>
                        <div className="hidden items-center gap-2 text-[13px] opacity-60 sm:flex">
                            <span className="h-[1px] w-8 bg-black/30" /> No fee • No
                            judgement • All you
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
