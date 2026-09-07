<?php

namespace Database\Factories;

use App\Models\Gallery;
use App\Models\GalleryCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Gallery>
 */
class GalleryFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->sentence(3);

        return [
            'gallery_category_id' => GalleryCategory::factory(),
            'title' => $title,
            'description' => fake()->paragraph(),
            'status' => Gallery::STATUS_DRAFT,
            'seo_title' => $title,
            'seo_description' => fake()->sentence(),
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => [
            'status' => Gallery::STATUS_PUBLISHED,
        ]);
    }
}
