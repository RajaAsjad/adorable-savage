<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $homeDescription = <<<'HTML'
<p><strong>WELLNESS • EXPRESSION • CONNECTION • JOY</strong></p>
<h2>FIND YOUR</h2>
<h2><em>Adorable</em></h2>
<h2>SAVAGE — WITHIN.</h2>
<p>Welcome to The Adorable Savage — a culture of wellness, music, and community.</p>
<p><a href="#programs">EXPLORE OUR PROGRAMS</a> <a href="#philosophy">FIND YOUR SAVAGE</a></p>
HTML;

        $aboutDescription = <<<'HTML'
<p>— WHAT WE DO</p>
<h2>About The <em>Adorable Savage</em></h2>
<p>We're Adorably Savage: a place where healing, honesty, and resilience come together, no matter what you're walking through. Real. Raw. Relatable. We believe self-love and self-empowerment aren't one size fits all. That's why we built three spaces, each meeting you exactly where you are:</p>
HTML;

        $pages = [
            [
                'title' => 'Home',
                'slug' => 'home',
                'page_template' => 'home',
                'description' => $homeDescription,
                'status' => Page::STATUS_PUBLISHED,
                'seo_title' => 'The Adorable Savage',
                'seo_description' => 'A culture platform for authentic voices, unapologetic wellness, and community connection.',
            ],
            [
                'title' => 'About Us',
                'slug' => 'about',
                'page_template' => 'about-us',
                'description' => $aboutDescription,
                'status' => Page::STATUS_PUBLISHED,
                'seo_title' => 'About — The Adorable Savage',
                'seo_description' => 'Learn about The Adorable Savage community, programs, and philosophy.',
            ],
            [
                'title' => 'Programs',
                'slug' => 'programs',
                'page_template' => 'programs',
                'description' => null,
                'status' => Page::STATUS_PUBLISHED,
                'seo_title' => 'Programs — The Adorable Savage',
                'seo_description' => 'Explore Unfiltered Wellness and Adorably Human programs.',
            ],
            [
                'title' => 'Events',
                'slug' => 'events',
                'page_template' => 'events',
                'description' => '<p>See where The Adorable Savage is showing up next — from community gatherings and wellness experiences to music and special events.</p>',
                'status' => Page::STATUS_PUBLISHED,
                'seo_title' => 'Events — The Adorable Savage',
                'seo_description' => 'See where The Adorable Savage is showing up next.',
            ],
            [
                'title' => 'Stay in the vibe',
                'slug' => 'stay-vibe',
                'page_template' => 'stay-vibe',
                'description' => '<p>Follow The Adorable Savage for inspiration, wellness conversations, music, events, community moments, and everyday doses of joy.</p>',
                'status' => Page::STATUS_PUBLISHED,
                'seo_title' => 'Stay Vibe — The Adorable Savage',
                'seo_description' => 'Follow The Adorable Savage for inspiration, wellness, music, and community.',
            ],
        ];

        foreach ($pages as $attributes) {
            Page::query()->updateOrCreate(
                ['slug' => $attributes['slug']],
                $attributes
            );
        }
    }
}
