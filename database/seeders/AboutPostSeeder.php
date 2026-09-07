<?php

namespace Database\Seeders;

use App\Models\AboutPost;
use Illuminate\Database\Seeder;

class AboutPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'ADORABLY HUMAN',
                'slug' => 'adorably-human',
                'slogan_text' => 'Healing • Addiction • Grief • Health',
                'image_url' => '/images/4880405-pexels-photo-4880405.jpeg',
                'description' => 'Adorably Human is our healing space: a tender, judgment-free place for anyone facing addiction, grief, or health struggles. Here, you\'re not fixed or broken. You\'re human, and that\'s more than enough.',
                'status' => AboutPost::STATUS_PUBLISHED,
            ],
            [
                'title' => 'UNFILTERED WELLNESS',
                'slug' => 'unfiltered-wellness',
                'slogan_text' => 'Essential Oils • Sound • Crystals • Self-Care',
                'image_url' => '/images/7947796-pexels-photo-7947796.jpeg',
                'description' => 'Unfiltered Wellness is where self-care goes deeper. Using essential oils, sound frequencies, and crystals, we help you tap into life-changing tools for balance, energy, and self-empowerment; no masks, no filters, just real self-care that works with your body and spirit.',
                'status' => AboutPost::STATUS_PUBLISHED,
            ],
            [
                'title' => 'VERSES AND VIBES',
                'slug' => 'verses-and-vibes',
                'slogan_text' => 'Music • Artists • Songwriters • Care',
                'image_url' => '/images/36092411-pexels-photo-36092411.jpeg',
                'description' => 'Verses and Vibes is where we care for the creators behind the music: the artists and songwriters who pour themselves into every note. Because those who give us so much through their art deserve care in return.',
                'status' => AboutPost::STATUS_PUBLISHED,
            ],
        ];

        foreach ($posts as $attributes) {
            AboutPost::query()->updateOrCreate(
                ['slug' => $attributes['slug']],
                $attributes
            );
        }
    }
}
