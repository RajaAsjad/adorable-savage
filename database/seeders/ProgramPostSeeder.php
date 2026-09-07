<?php

namespace Database\Seeders;

use App\Models\ProgramCategory;
use App\Models\ProgramPost;
use Illuminate\Database\Seeder;

class ProgramPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'category_slug' => 'music-culture',
                'title' => 'Verses & Vibes',
                'slug' => 'verses-vibes',
                'image_url' => '/images/36092411-pexels-photo-36092411.jpeg',
                'description' => 'Open mics, artist spotlights, and soulful gatherings where every voice matters.',
                'status' => ProgramPost::STATUS_PUBLISHED,
                'seo_title' => 'Verses & Vibes',
                'seo_description' => 'Open mics, artist spotlights, and soulful gatherings.',
            ],
            [
                'category_slug' => 'wellness-lab',
                'title' => 'Unapologetic Wellness',
                'slug' => 'unapologetic-wellness',
                'image_url' => '/images/5046356-pexels-photo-5046356.jpeg',
                'description' => 'Workshops that reclaim wellness as joyful, accessible, and radically inclusive.',
                'status' => ProgramPost::STATUS_PUBLISHED,
                'seo_title' => 'Unapologetic Wellness',
                'seo_description' => 'Workshops that reclaim wellness as joyful and inclusive.',
            ],
            [
                'category_slug' => 'education',
                'title' => 'Oils & Crystals',
                'slug' => 'oils-crystals',
                'image_url' => '/images/11435367-pexels-photo-11435367.jpeg',
                'description' => 'Learn the stories, science, and sensory ritual of plants and minerals.',
                'status' => ProgramPost::STATUS_PUBLISHED,
                'seo_title' => 'Oils & Crystals',
                'seo_description' => 'Learn the stories, science, and sensory ritual of plants and minerals.',
            ],
            [
                'category_slug' => 'community',
                'title' => 'Sobriety Interconnect',
                'slug' => 'sobriety-interconnect',
                'image_url' => '/images/4880405-pexels-photo-4880405.jpeg',
                'description' => 'Support circles, sober socials, and creative outlets for clear living.',
                'status' => ProgramPost::STATUS_PUBLISHED,
                'seo_title' => 'Sobriety Interconnect',
                'seo_description' => 'Support circles, sober socials, and creative outlets.',
            ],
            [
                'category_slug' => 'irl-magic',
                'title' => 'Community Experiences',
                'slug' => 'community-experiences',
                'image_url' => '/images/16934835-pexels-photo-16934835.jpeg',
                'description' => 'Pop-ups, markets, retreats — real-life moments of weird, wonderful connection.',
                'status' => ProgramPost::STATUS_PUBLISHED,
                'seo_title' => 'Community Experiences',
                'seo_description' => 'Pop-ups, markets, retreats and real-life connection.',
            ],
        ];

        foreach ($posts as $attributes) {
            $category = ProgramCategory::query()
                ->where('slug', $attributes['category_slug'])
                ->first();

            if (! $category) {
                continue;
            }

            unset($attributes['category_slug']);

            ProgramPost::query()->updateOrCreate(
                ['slug' => $attributes['slug']],
                array_merge($attributes, [
                    'program_category_id' => $category->id,
                ])
            );
        }
    }
}
