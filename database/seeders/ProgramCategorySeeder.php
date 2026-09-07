<?php

namespace Database\Seeders;

use App\Models\ProgramCategory;
use Illuminate\Database\Seeder;

class ProgramCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'title' => 'MUSIC & CULTURE',
                'slug' => 'music-culture',
                'image_url' => '/images/36092411-pexels-photo-36092411.jpeg',
                'description' => 'Open mics, artist spotlights, and soulful gatherings where every voice matters.',
                'status' => ProgramCategory::STATUS_PUBLISHED,
                'seo_title' => 'MUSIC & CULTURE',
                'seo_description' => 'Music and culture programs from The Adorable Savage.',
            ],
            [
                'title' => 'WELLNESS LAB',
                'slug' => 'wellness-lab',
                'image_url' => '/images/5046356-pexels-photo-5046356.jpeg',
                'description' => 'Workshops that reclaim wellness as joyful, accessible, and radically inclusive.',
                'status' => ProgramCategory::STATUS_PUBLISHED,
                'seo_title' => 'WELLNESS LAB',
                'seo_description' => 'Wellness lab programs from The Adorable Savage.',
            ],
            [
                'title' => 'EDUCATION',
                'slug' => 'education',
                'image_url' => '/images/11435367-pexels-photo-11435367.jpeg',
                'description' => 'Learn the stories, science, and sensory ritual of plants and minerals.',
                'status' => ProgramCategory::STATUS_PUBLISHED,
                'seo_title' => 'EDUCATION',
                'seo_description' => 'Education programs from The Adorable Savage.',
            ],
            [
                'title' => 'COMMUNITY',
                'slug' => 'community',
                'image_url' => '/images/4880405-pexels-photo-4880405.jpeg',
                'description' => 'Support circles, sober socials, and creative outlets for clear living.',
                'status' => ProgramCategory::STATUS_PUBLISHED,
                'seo_title' => 'COMMUNITY',
                'seo_description' => 'Community programs from The Adorable Savage.',
            ],
            [
                'title' => 'IRL MAGIC',
                'slug' => 'irl-magic',
                'image_url' => '/images/16934835-pexels-photo-16934835.jpeg',
                'description' => 'Pop-ups, markets, retreats — real-life moments of weird, wonderful connection.',
                'status' => ProgramCategory::STATUS_PUBLISHED,
                'seo_title' => 'IRL MAGIC',
                'seo_description' => 'IRL magic experiences from The Adorable Savage.',
            ],
        ];

        foreach ($categories as $attributes) {
            ProgramCategory::query()->updateOrCreate(
                ['slug' => $attributes['slug']],
                $attributes
            );
        }
    }
}
