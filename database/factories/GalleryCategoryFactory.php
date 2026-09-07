<?php

namespace Database\Factories;

use App\Models\GalleryCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<GalleryCategory>
 */
class GalleryCategoryFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->words(2, true);

        return [
            'title' => strtoupper($title),
            'description' => fake()->paragraph(),
            'status' => GalleryCategory::STATUS_DRAFT,
            'seo_title' => strtoupper($title),
            'seo_description' => fake()->sentence(),
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => [
            'status' => GalleryCategory::STATUS_PUBLISHED,
        ]);
    }
}
