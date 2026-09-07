import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import About from '@/Components/Home/About';
import Footer from '@/Components/Home/Footer';
import Header from '@/Components/Home/Header';

export default function AboutUs({ page, aboutPosts = [] }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const title = page?.seo_title || page?.title || 'About';

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

            <div className="pt-24">
                <About page={page} aboutPosts={aboutPosts} />
            </div>

            <Footer />
        </div>
    );
}
