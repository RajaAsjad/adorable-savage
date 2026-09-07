<?php

namespace Database\Seeders;

use App\Models\Gallery;
use App\Models\GalleryCategory;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'category_slug' => 'tt',
                'title' => 'joy is a practice.',
                'slug' => 'joy-is-a-practice',
                'image_url' => '/images/5046356-pexels-photo-5046356.jpeg',
            ],
            [
                'category_slug' => 'ig',
                'title' => 'soft power is real.',
                'slug' => 'soft-power-is-real',
                'image_url' => '/images/16934835-pexels-photo-16934835.jpeg',
            ],
            [
                'category_slug' => 'tt',
                'title' => 'joy is a practice.',
                'slug' => 'joy-is-a-practice-2',
                'image_url' => '/images/4880405-pexels-photo-4880405.jpeg',
            ],
            [
                'category_slug' => 'ig',
                'title' => 'soft power is real.',
                'slug' => 'soft-power-is-real-2',
                'image_url' => '/images/20169846-pexels-photo-20169846.jpeg',
            ],
            [
                'category_slug' => 'tt',
                'title' => 'joy is a practice.',
                'slug' => 'joy-is-a-practice-3',
                'image_url' => '/images/36092411-pexels-photo-36092411.jpeg',
            ],
            [
                'category_slug' => 'ig',
                'title' => 'soft power is real.',
                'slug' => 'soft-power-is-real-3',
                'image_url' => '/images/29072916-pexels-photo-29072916.jpeg',
            ],
            [
                'category_slug' => 'tt',
                'title' => 'joy is a practice.',
                'slug' => 'joy-is-a-practice-4',
                'image_url' => '/images/11435367-pexels-photo-11435367.jpeg',
            ],
            [
                'category_slug' => 'ig',
                'title' => 'soft power is real.',
                'slug' => 'soft-power-is-real-4',
                'image_url' => '/images/5046356-pexels-photo-5046356.jpeg',
            ],
        ];

        foreach ($items as $attributes) {
            $category = GalleryCategory::query()
                ->where('slug', $attributes['category_slug'])
                ->first();

            if (! $category) {
                continue;
            }

            unset($attributes['category_slug']);

            Gallery::query()->updateOrCreate(
                ['slug' => $attributes['slug']],
                array_merge($attributes, [
                    'gallery_category_id' => $category->id,
                    'description' => $attributes['title'],
                    'status' => Gallery::STATUS_PUBLISHED,
                    'seo_title' => $attributes['title'],
                    'seo_description' => $attributes['title'],
                ])
            );
        }
    }
}
