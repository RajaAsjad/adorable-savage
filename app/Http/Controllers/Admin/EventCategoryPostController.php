<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EventCategoryPostRequest;
use App\Models\EventCategory;
use App\Models\EventCategoryPost;
use App\Services\EventCategoryPostService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EventCategoryPostController extends Controller
{
    public function __construct(
        private readonly EventCategoryPostService $posts,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/EventCategoryPosts/Index', [
            'posts' => EventCategoryPost::query()
                ->with('category:id,title,slug')
                ->orderBy('sort_order')
                ->latest()
                ->paginate(15)
                ->through(fn (EventCategoryPost $post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'image_url' => $post->image_url,
                    'category_title' => $post->category?->title,
                    'status' => $post->status,
                    'updated_at' => $post->updated_at?->format('M j, Y'),
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/EventCategoryPosts/Create', [
            'categories' => $this->categoryOptions(),
        ]);
    }

    public function store(EventCategoryPostRequest $request): RedirectResponse
    {
        $this->posts->create(
            $request->validated(),
            $request->file('image'),
            $request->file('video'),
        );

        return redirect()
            ->route('admin.event-category-posts.index')
            ->with('success', 'Calendar category post created.');
    }

    public function edit(EventCategoryPost $eventCategoryPost): Response
    {
        return Inertia::render('Admin/EventCategoryPosts/Edit', [
            'post' => [
                'id' => $eventCategoryPost->id,
                'event_category_id' => $eventCategoryPost->event_category_id,
                'title' => $eventCategoryPost->title,
                'slug' => $eventCategoryPost->slug,
                'image_url' => $eventCategoryPost->image_url,
                'video_url' => $eventCategoryPost->video_url,
                'description' => $eventCategoryPost->description,
                'sort_order' => $eventCategoryPost->sort_order,
                'status' => $eventCategoryPost->status,
                'seo_title' => $eventCategoryPost->seo_title,
                'seo_description' => $eventCategoryPost->seo_description,
            ],
            'categories' => $this->categoryOptions(),
        ]);
    }

    public function update(
        EventCategoryPostRequest $request,
        EventCategoryPost $eventCategoryPost,
    ): RedirectResponse {
        $this->posts->update(
            $eventCategoryPost,
            $request->validated(),
            $request->file('image'),
            $request->boolean('remove_image'),
            $request->file('video'),
            $request->boolean('remove_video'),
        );

        return redirect()
            ->route('admin.event-category-posts.index')
            ->with('success', 'Calendar category post updated.');
    }

    public function destroy(EventCategoryPost $eventCategoryPost): RedirectResponse
    {
        $this->posts->delete($eventCategoryPost);

        return redirect()
            ->route('admin.event-category-posts.index')
            ->with('success', 'Calendar category post moved to trash.');
    }

    /**
     * @return list<array{id: int, title: string}>
     */
    private function categoryOptions(): array
    {
        return EventCategory::query()
            ->whereIn('slug', ['music', 'wellness', 'community', 'education'])
            ->orderBy('title')
            ->get(['id', 'title'])
            ->map(fn (EventCategory $category) => [
                'id' => $category->id,
                'title' => $category->title,
            ])
            ->values()
            ->all();
    }
}
