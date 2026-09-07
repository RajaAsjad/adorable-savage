<?php

namespace Database\Factories;

use App\Models\AboutPost;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AboutPost>
 */
class AboutPostFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->words(3, true);

        return [
            'title' => strtoupper($title),
            'slogan_text' => fake()->words(4, true),
            'description' => fake()->paragraph(),
            'status' => AboutPost::STATUS_DRAFT,
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => [
            'status' => AboutPost::STATUS_PUBLISHED,
        ]);
    }
}
