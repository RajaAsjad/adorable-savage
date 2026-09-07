<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\EventCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->sentence(3);

        return [
            'event_category_id' => EventCategory::factory(),
            'title' => $title,
            'event_date' => fake()->dateTimeBetween('now', '+3 months'),
            'description' => fake()->paragraph(),
            'status' => Event::STATUS_DRAFT,
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => [
            'status' => Event::STATUS_PUBLISHED,
        ]);
    }
}
