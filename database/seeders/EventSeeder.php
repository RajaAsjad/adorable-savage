<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventCategory;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            [
                'category_slug' => 'music',
                'title' => 'Verses & Vibes: Open Mic Night',
                'slug' => 'verses-vibes-open-mic-night',
                'event_date' => '2026-11-14',
                'image_url' => '/images/36092411-pexels-photo-36092411.jpeg',
                'description' => 'Bring your words, your voice, your whole self. No gatekeeping.',
                'status' => Event::STATUS_PUBLISHED,
            ],
            [
                'category_slug' => 'wellness',
                'title' => 'Unapologetic Wellness Circle',
                'slug' => 'unapologetic-wellness-circle',
                'event_date' => '2026-11-19',
                'image_url' => '/images/5046356-pexels-photo-5046356.jpeg',
                'description' => 'Breathwork, boundary-setting, and joy as practice.',
                'status' => Event::STATUS_PUBLISHED,
            ],
            [
                'category_slug' => 'education',
                'title' => 'Oils & Crystals 101',
                'slug' => 'oils-crystals-101',
                'event_date' => '2026-11-24',
                'image_url' => '/images/11435367-pexels-photo-11435367.jpeg',
                'description' => 'Hands-on exploration of scent, stone, and intention.',
                'status' => Event::STATUS_PUBLISHED,
            ],
            [
                'category_slug' => 'sobriety',
                'title' => 'Sobriety Social: Game Night',
                'slug' => 'sobriety-social-game-night',
                'event_date' => '2026-12-02',
                'image_url' => '/images/4880405-pexels-photo-4880405.jpeg',
                'description' => 'Laughter is the best medicine, but we have snacks too.',
                'status' => Event::STATUS_PUBLISHED,
            ],
            [
                'category_slug' => 'community',
                'title' => 'Community Market',
                'slug' => 'community-market',
                'event_date' => '2026-12-07',
                'image_url' => '/images/16934835-pexels-photo-16934835.jpeg',
                'description' => 'Artists, healers, makers — all savage, all adorable.',
                'status' => Event::STATUS_PUBLISHED,
            ],
        ];

        foreach ($events as $attributes) {
            $category = EventCategory::query()
                ->where('slug', $attributes['category_slug'])
                ->first();

            if (! $category) {
                continue;
            }

            unset($attributes['category_slug']);

            Event::query()->updateOrCreate(
                ['slug' => $attributes['slug']],
                array_merge($attributes, [
                    'event_category_id' => $category->id,
                ])
            );
        }
    }
}
