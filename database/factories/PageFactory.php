<?php

namespace Database\Factories;

use App\Models\Page;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Page>
 */
class PageFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->sentence(3);

        return [
            'title' => $title,
            'page_template' => 'default',
            'description' => '<p>'.fake()->paragraph().'</p>',
            'status' => Page::STATUS_DRAFT,
            'seo_title' => $title,
            'seo_description' => fake()->sentence(),
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => [
            'status' => Page::STATUS_PUBLISHED,
        ]);
    }
}
