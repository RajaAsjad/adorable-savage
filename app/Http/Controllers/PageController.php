<?php

namespace App\Http\Controllers;

use App\Models\AboutPost;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Gallery;
use App\Models\Page;
use App\Models\ProgramPost;
use App\Services\PageTemplateService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PageController extends Controller
{
    public function __construct(
        private readonly PageTemplateService $templates,
    ) {}

    public function home(Request $request): Response
    {
        $page = Page::query()
            ->where(function ($query) {
                $query->where('slug', 'home')
                    ->orWhere('page_template', 'home');
            })
            ->orderByRaw("CASE WHEN slug = 'home' THEN 0 ELSE 1 END")
            ->first();

        if ($page && ! $this->canView($request, $page)) {
            throw new NotFoundHttpException;
        }

        if (! $page) {
            return Inertia::render('Home', [
                'page' => null,
                'aboutPage' => $this->aboutPagePayload($request),
                'aboutPosts' => $this->aboutPostsPayload(),
                'programsPage' => $this->programsPagePayload($request),
                'programPosts' => $this->programPostsPayload(),
                'eventsPage' => $this->eventsPagePayload($request),
                'eventCategories' => $this->eventCategoriesPayload(),
                'eventsList' => $this->eventsListPayload(),
                'stayVibePage' => $this->stayVibePagePayload($request),
                'galleryItems' => $this->galleryItemsPayload(),
            ]);
        }

        return $this->renderPage($request, $page);
    }

    public function show(Request $request, string $slug): Response
    {
        $page = Page::query()->where('slug', $slug)->firstOrFail();

        if (! $this->canView($request, $page)) {
            throw new NotFoundHttpException;
        }

        return $this->renderPage($request, $page);
    }

    private function renderPage(Request $request, Page $page): Response
    {
        $component = $this->templates->inertiaComponent($page->page_template);

        $props = [
            'page' => $this->pagePayload($page),
        ];

        if ($component === 'Home' || $component === 'Templates/AboutUs') {
            $props['aboutPosts'] = $this->aboutPostsPayload();
        }

        if ($component === 'Home') {
            $props['aboutPage'] = $this->aboutPagePayload($request);
            $props['programsPage'] = $this->programsPagePayload($request);
            $props['programPosts'] = $this->programPostsPayload();
            $props['eventsPage'] = $this->eventsPagePayload($request);
            $props['eventCategories'] = $this->eventCategoriesPayload();
            $props['eventsList'] = $this->eventsListPayload();
            $props['stayVibePage'] = $this->stayVibePagePayload($request);
            $props['galleryItems'] = $this->galleryItemsPayload();
        }

        if ($component === 'Templates/Programs') {
            $props['programPosts'] = $this->programPostsPayload();
        }

        if ($component === 'Templates/Events') {
            $props['eventCategories'] = $this->eventCategoriesPayload();
            $props['eventsList'] = $this->eventsListPayload();
        }

        if ($component === 'Templates/StayVibe') {
            $props['galleryItems'] = $this->galleryItemsPayload();
        }

        return Inertia::render($component, $props);
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function aboutPostsPayload(): array
    {
        return AboutPost::query()
            ->published()
            ->orderBy('id')
            ->get()
            ->values()
            ->map(fn (AboutPost $post, int $index) => [
                'id' => str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT),
                'title' => $post->title,
                'slug' => $post->slug,
                'slogan_text' => $post->slogan_text,
                'image_url' => $post->image_url,
                'description' => $post->description,
            ])
            ->all();
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function programPostsPayload(): array
    {
        return ProgramPost::query()
            ->published()
            ->with(['category' => fn ($query) => $query->published()])
            ->orderBy('id')
            ->get()
            ->values()
            ->map(fn (ProgramPost $post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'image_url' => $post->image_url,
                'description' => $post->description,
                'category_title' => $post->category?->title,
            ])
            ->all();
    }

    /**
     * @return list<string>
     */
    private function eventCategoriesPayload(): array
    {
        return EventCategory::query()
            ->published()
            ->orderBy('title')
            ->pluck('title')
            ->all();
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function eventsListPayload(): array
    {
        return Event::query()
            ->published()
            ->with(['category' => fn ($query) => $query->published()])
            ->orderBy('event_date')
            ->orderBy('id')
            ->get()
            ->values()
            ->map(fn (Event $event) => [
                'id' => $event->id,
                'title' => $event->title,
                'slug' => $event->slug,
                'event_date' => $event->event_date?->format('Y-m-d'),
                'day' => $event->event_date?->format('d'),
                'month' => $event->event_date?->format('M'),
                'image_url' => $event->image_url,
                'description' => $event->description,
                'category_title' => $event->category?->title,
            ])
            ->all();
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function galleryItemsPayload(): array
    {
        return Gallery::query()
            ->published()
            ->with(['category' => fn ($query) => $query->published()])
            ->orderBy('id')
            ->get()
            ->values()
            ->map(fn (Gallery $gallery) => [
                'id' => $gallery->id,
                'title' => $gallery->title,
                'slug' => $gallery->slug,
                'image_url' => $gallery->image_url,
                'description' => $gallery->description,
                'category_title' => $gallery->category?->title,
            ])
            ->all();
    }

    /**
     * @return array<string, mixed>|null
     */
    private function programsPagePayload(Request $request): ?array
    {
        $programs = Page::query()
            ->where(function ($query) {
                $query->where('page_template', 'programs')
                    ->orWhere('slug', 'programs');
            })
            ->orderByRaw("CASE WHEN page_template = 'programs' THEN 0 ELSE 1 END")
            ->first();

        if (! $programs || ! $this->canView($request, $programs)) {
            return null;
        }

        return $this->pagePayload($programs);
    }

    /**
     * @return array<string, mixed>|null
     */
    private function eventsPagePayload(Request $request): ?array
    {
        $events = Page::query()
            ->where(function ($query) {
                $query->where('page_template', 'events')
                    ->orWhere('slug', 'events');
            })
            ->orderByRaw("CASE WHEN page_template = 'events' THEN 0 ELSE 1 END")
            ->first();

        if (! $events || ! $this->canView($request, $events)) {
            return null;
        }

        return $this->pagePayload($events);
    }

    /**
     * @return array<string, mixed>|null
     */
    private function stayVibePagePayload(Request $request): ?array
    {
        $stayVibe = Page::query()
            ->where(function ($query) {
                $query->where('page_template', 'stay-vibe')
                    ->orWhere('slug', 'stay-vibe');
            })
            ->orderByRaw("CASE WHEN page_template = 'stay-vibe' THEN 0 ELSE 1 END")
            ->first();

        if (! $stayVibe || ! $this->canView($request, $stayVibe)) {
            return null;
        }

        return $this->pagePayload($stayVibe);
    }

    /**
     * @return array<string, mixed>|null
     */
    private function aboutPagePayload(Request $request): ?array
    {
        $about = Page::query()
            ->where(function ($query) {
                $query->where('page_template', 'about-us')
                    ->orWhere('slug', 'about');
            })
            ->orderByRaw("CASE WHEN page_template = 'about-us' THEN 0 ELSE 1 END")
            ->first();

        if (! $about || ! $this->canView($request, $about)) {
            return null;
        }

        return $this->pagePayload($about);
    }

    /**
     * @return array<string, mixed>
     */
    private function pagePayload(Page $page): array
    {
        return [
            'id' => $page->id,
            'title' => $page->title,
            'slug' => $page->slug,
            'page_template' => $page->page_template,
            'image' => $page->image,
            'description' => $page->description,
            'status' => $page->status,
            'seo_title' => $page->seo_title ?: $page->title,
            'seo_description' => $page->seo_description,
            'custom_fields' => $page->custom_fields ?? [],
        ];
    }

    private function canView(Request $request, Page $page): bool
    {
        if ($page->isPublished()) {
            return true;
        }

        return $request->user()?->isAdmin() ?? false;
    }
}
