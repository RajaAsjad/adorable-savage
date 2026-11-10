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
                'heading' => 'Music Highlights',
                'slug' => 'music',
                'description' => 'Music highlights, local venues, upcoming shows, and announcements.',
                'status' => EventCategory::STATUS_PUBLISHED,
            ],
            [
                'title' => 'WELLNESS',
                'heading' => 'Wellness',
                'slug' => 'wellness',
                'description' => 'Wellness-related information, updates, and announcements.',
                'status' => EventCategory::STATUS_PUBLISHED,
            ],
            [
                'title' => 'COMMUNITY',
                'heading' => 'Community',
                'slug' => 'community',
                'description' => 'Community activities, updates, and announcements.',
                'status' => EventCategory::STATUS_PUBLISHED,
            ],
            [
                'title' => 'EDUCATION',
                'heading' => 'Education',
                'slug' => 'education',
                'description' => 'Educational information, resources, updates, and announcements.',
                'status' => EventCategory::STATUS_PUBLISHED,
            ],
        ];

        foreach ($categories as $attributes) {
            EventCategory::query()->updateOrCreate(
                ['slug' => $attributes['slug']],
                $attributes
            );
        }

        EventCategory::query()
            ->where('slug', 'sobriety')
            ->update(['status' => EventCategory::STATUS_DRAFT]);
    }
}
