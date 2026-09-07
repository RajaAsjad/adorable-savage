<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EventCategoryRequest;
use App\Models\EventCategory;
use App\Services\EventCategoryService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EventCategoryController extends Controller
{
    public function __construct(
        private readonly EventCategoryService $categories,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/EventCategories/Index', [
            'categories' => EventCategory::query()
                ->latest()
                ->paginate(15)
                ->through(fn (EventCategory $category) => [
                    'id' => $category->id,
                    'title' => $category->title,
                    'slug' => $category->slug,
                    'image_url' => $category->image_url,
                    'status' => $category->status,
                    'updated_at' => $category->updated_at?->format('M j, Y'),
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/EventCategories/Create');
    }

    public function store(EventCategoryRequest $request): RedirectResponse
    {
        $this->categories->create($request->validated(), $request->file('image'));

        return redirect()
            ->route('admin.event-categories.index')
            ->with('success', 'Event category created.');
    }

    public function edit(EventCategory $eventCategory): Response
    {
        return Inertia::render('Admin/EventCategories/Edit', [
            'category' => [
                'id' => $eventCategory->id,
                'title' => $eventCategory->title,
                'slug' => $eventCategory->slug,
                'image_url' => $eventCategory->image_url,
                'description' => $eventCategory->description,
                'status' => $eventCategory->status,
                'seo_title' => $eventCategory->seo_title,
                'seo_description' => $eventCategory->seo_description,
            ],
        ]);
    }

    public function update(
        EventCategoryRequest $request,
        EventCategory $eventCategory,
    ): RedirectResponse {
        $this->categories->update(
            $eventCategory,
            $request->validated(),
            $request->file('image'),
            $request->boolean('remove_image'),
        );

        return redirect()
            ->route('admin.event-categories.index')
            ->with('success', 'Event category updated.');
    }

    public function destroy(EventCategory $eventCategory): RedirectResponse
    {
        $this->categories->delete($eventCategory);

        return redirect()
            ->route('admin.event-categories.index')
            ->with('success', 'Event category moved to trash.');
    }
}
