<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use Illuminate\Database\Seeder;

class EventCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'title' => 'MUSIC',
                'slug' => 'music',
                'description' => 'Music and performance events.',
                'status' => EventCategory::STATUS_PUBLISHED,
            ],
            [
                'title' => 'WELLNESS',
                'slug' => 'wellness',
                'description' => 'Wellness circles and practices.',
                'status' => EventCategory::STATUS_PUBLISHED,
            ],
            [
                'title' => 'EDUCATION',
                'slug' => 'education',
                'description' => 'Workshops and learning experiences.',
                'status' => EventCategory::STATUS_PUBLISHED,
            ],
            [
                'title' => 'SOBRIETY',
                'slug' => 'sobriety',
                'description' => 'Sober socials and support gatherings.',
                'status' => EventCategory::STATUS_PUBLISHED,
            ],
            [
                'title' => 'COMMUNITY',
                'slug' => 'community',
                'description' => 'Community markets and shared experiences.',
                'status' => EventCategory::STATUS_PUBLISHED,
            ],
        ];

        foreach ($categories as $attributes) {
            EventCategory::query()->updateOrCreate(
                ['slug' => $attributes['slug']],
                $attributes
            );
        }
    }
}
