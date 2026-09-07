<?php

namespace Database\Seeders;

use App\Models\GalleryCategory;
use Illuminate\Database\Seeder;

class GalleryCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'title' => 'IG',
                'slug' => 'ig',
                'description' => 'Instagram gallery posts.',
                'status' => GalleryCategory::STATUS_PUBLISHED,
                'seo_title' => 'Instagram',
                'seo_description' => 'Instagram moments from The Adorable Savage.',
            ],
            [
                'title' => 'TT',
                'slug' => 'tt',
                'description' => 'TikTok gallery posts.',
                'status' => GalleryCategory::STATUS_PUBLISHED,
                'seo_title' => 'TikTok',
                'seo_description' => 'TikTok moments from The Adorable Savage.',
            ],
        ];

        foreach ($categories as $attributes) {
            GalleryCategory::query()->updateOrCreate(
                ['slug' => $attributes['slug']],
                $attributes
            );
        }
    }
}
