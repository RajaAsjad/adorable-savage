<?php

namespace Database\Factories;

use App\Models\Blog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Blog>
 */
class BlogFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->sentence(4);

        return [
            'title' => rtrim($title, '.'),
            'excerpt' => fake()->sentence(12),
            'description' => '<p>'.fake()->paragraphs(3, true).'</p>',
            'status' => Blog::STATUS_DRAFT,
            'sort_order' => 0,
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => [
            'status' => Blog::STATUS_PUBLISHED,
            'published_at' => now(),
        ]);
    }
}
