<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EventRequest;
use App\Models\Event;
use App\Models\EventCategory;
use App\Services\EventService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function __construct(
        private readonly EventService $events,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Events/Index', [
            'events' => Event::query()
                ->with('category:id,title')
                ->latest()
                ->paginate(15)
                ->through(fn (Event $event) => [
                    'id' => $event->id,
                    'title' => $event->title,
                    'slug' => $event->slug,
                    'event_date' => $event->event_date?->format('M j, Y'),
                    'image_url' => $event->image_url,
                    'category_title' => $event->category?->title,
                    'status' => $event->status,
                    'updated_at' => $event->updated_at?->format('M j, Y'),
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Events/Create', [
            'categories' => $this->categoryOptions(),
        ]);
    }

    public function store(EventRequest $request): RedirectResponse
    {
        $this->events->create($request->validated(), $request->file('image'));

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event created.');
    }

    public function edit(Event $event): Response
    {
        return Inertia::render('Admin/Events/Edit', [
            'event' => [
                'id' => $event->id,
                'event_category_id' => $event->event_category_id,
                'title' => $event->title,
                'slug' => $event->slug,
                'event_date' => $event->event_date?->format('Y-m-d'),
                'image_url' => $event->image_url,
                'description' => $event->description,
                'status' => $event->status,
                'seo_title' => $event->seo_title,
                'seo_description' => $event->seo_description,
            ],
            'categories' => $this->categoryOptions(),
        ]);
    }

    public function update(EventRequest $request, Event $event): RedirectResponse
    {
        $this->events->update(
            $event,
            $request->validated(),
            $request->file('image'),
            $request->boolean('remove_image'),
        );

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event updated.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $this->events->delete($event);

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event moved to trash.');
    }

    /**
     * @return list<array{id: int, title: string}>
     */
    private function categoryOptions(): array
    {
        return EventCategory::query()
            ->orderBy('title')
            ->get(['id', 'title'])
            ->map(fn (EventCategory $category) => [
                'id' => $category->id,
                'title' => $category->title,
            ])
            ->all();
    }
}
