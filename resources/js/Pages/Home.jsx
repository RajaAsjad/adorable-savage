import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import About from '@/Components/Home/About';
import Community from '@/Components/Home/Community';
import CtaBanner from '@/Components/Home/CtaBanner';
import Events from '@/Components/Home/Events';
import Footer from '@/Components/Home/Footer';
import Header from '@/Components/Home/Header';
import Hero from '@/Components/Home/Hero';
import Manifesto from '@/Components/Home/Manifesto';
import Philosophy from '@/Components/Home/Philosophy';
import Programs from '@/Components/Home/Programs';
import Social from '@/Components/Home/Social';
import VersesVibes from '@/Components/Home/VersesVibes';
import Wellness from '@/Components/Home/Wellness';

export default function Home({
    page,
    aboutPage = null,
    aboutPosts = [],
    programsPage = null,
    programPosts = [],
    eventsPage = null,
    eventCategories = [],
    eventsList = [],
    stayVibePage = null,
    galleryItems = [],
}) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setPlaying((value) => !value);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const title = page?.seo_title || page?.title || 'The Adorable Savage';

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FFFBF0] text-[#131313] selection:bg-[#FF6B9D] selection:text-white">
            <Head>
                <title>{title}</title>
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
            <Hero playing={playing} page={page} />
            <About page={aboutPage} aboutPosts={aboutPosts} />
            <Philosophy />
            <Programs page={programsPage} programPosts={programPosts} />
            <Wellness />
            <VersesVibes playing={playing} setPlaying={setPlaying} />
            <Events
                page={eventsPage}
                eventCategories={eventCategories}
                eventsList={eventsList}
            />
            <Community />
            <Manifesto />
            <Social page={stayVibePage} galleryItems={galleryItems} />
            <CtaBanner />
            <Footer />
        </div>
    );
}
