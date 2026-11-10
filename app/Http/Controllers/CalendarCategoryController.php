<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventCategoryPost;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CalendarCategoryController extends Controller
{
    private const ALLOWED_SLUGS = ['music', 'wellness', 'community', 'education'];

    public function show(string $slug): Response
    {
        if (! in_array($slug, self::ALLOWED_SLUGS, true)) {
            throw new NotFoundHttpException;
        }

        $category = EventCategory::query()
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        $posts = EventCategoryPost::query()
            ->published()
            ->where('event_category_id', $category->id)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (EventCategoryPost $post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'image_url' => $post->image_url,
                'video_url' => $post->video_url,
                'description' => $post->description,
            ])
            ->values()
            ->all();

        $events = Event::query()
            ->published()
            ->where('event_category_id', $category->id)
            ->orderBy('event_date')
            ->orderBy('id')
            ->get()
            ->map(fn (Event $event) => [
                'id' => $event->id,
                'title' => $event->title,
                'slug' => $event->slug,
                'event_date' => $event->event_date?->format('Y-m-d'),
                'day' => $event->event_date?->format('d'),
                'month' => $event->event_date?->format('M'),
                'image_url' => $event->image_url,
                'description' => $event->description,
            ])
            ->values()
            ->all();

        $categories = EventCategory::query()
            ->published()
            ->whereIn('slug', self::ALLOWED_SLUGS)
            ->get(['id', 'title', 'slug', 'heading'])
            ->sortBy(fn (EventCategory $item) => array_search($item->slug, self::ALLOWED_SLUGS, true))
            ->values()
            ->map(fn (EventCategory $item) => [
                'title' => $item->title,
                'slug' => $item->slug,
                'heading' => $item->pageHeading(),
            ])
            ->all();

        return Inertia::render('Templates/CalendarCategory', [
            'category' => [
                'id' => $category->id,
                'title' => $category->title,
                'heading' => $category->pageHeading(),
                'slug' => $category->slug,
                'image_url' => $category->image_url,
                'description' => $category->description,
                'seo_title' => $category->seo_title,
                'seo_description' => $category->seo_description,
            ],
            'posts' => $posts,
            'events' => $events,
            'categories' => $categories,
        ]);
    }
}
