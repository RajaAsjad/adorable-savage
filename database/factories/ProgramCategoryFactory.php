<?php

namespace Database\Factories;

use App\Models\ProgramCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProgramCategory>
 */
class ProgramCategoryFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->words(2, true);

        return [
            'title' => strtoupper($title),
            'description' => fake()->paragraph(),
            'status' => ProgramCategory::STATUS_DRAFT,
            'seo_title' => strtoupper($title),
            'seo_description' => fake()->sentence(),
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => [
            'status' => ProgramCategory::STATUS_PUBLISHED,
        ]);
    }
}
