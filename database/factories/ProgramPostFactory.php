<?php

namespace Database\Factories;

use App\Models\ProgramCategory;
use App\Models\ProgramPost;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProgramPost>
 */
class ProgramPostFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->words(3, true);

        return [
            'program_category_id' => ProgramCategory::factory(),
            'title' => $title,
            'description' => fake()->paragraph(),
            'status' => ProgramPost::STATUS_DRAFT,
            'seo_title' => $title,
            'seo_description' => fake()->sentence(),
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => [
            'status' => ProgramPost::STATUS_PUBLISHED,
        ]);
    }
}
