<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PageRequest;
use App\Models\Page;
use App\Services\PageService;
use App\Services\PageTemplateService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function __construct(
        private readonly PageService $pages,
        private readonly PageTemplateService $templates,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Pages/Index', [
            'pages' => Page::query()
                ->latest()
                ->paginate(15)
                ->through(fn (Page $page) => [
                    'id' => $page->id,
                    'title' => $page->title,
                    'slug' => $page->slug,
                    'page_template' => $page->page_template,
                    'status' => $page->status,
                    'updated_at' => $page->updated_at?->format('M j, Y'),
                    'url' => route('pages.show', $page->slug),
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Pages/Create', [
            'templates' => $this->templates->options(),
        ]);
    }

    public function store(PageRequest $request): RedirectResponse
    {
        $this->pages->create($request->validated(), $request->file('image'));

        return redirect()
            ->route('admin.pages.index')
            ->with('success', 'Page created.');
    }

    public function edit(Page $page): Response
    {
        return Inertia::render('Admin/Pages/Edit', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'page_template' => $page->page_template,
                'image' => $page->image,
                'description' => $page->description,
                'status' => $page->status,
                'seo_title' => $page->seo_title,
                'seo_description' => $page->seo_description,
                'custom_fields' => $page->custom_fields ?? [],
            ],
            'templates' => $this->templates->options(),
        ]);
    }

    public function update(PageRequest $request, Page $page): RedirectResponse
    {
        $this->pages->update(
            $page,
            $request->validated(),
            $request->file('image'),
            $request->boolean('remove_image'),
        );

        return redirect()
            ->route('admin.pages.index')
            ->with('success', 'Page updated.');
    }

    public function destroy(Page $page): RedirectResponse
    {
        $this->pages->delete($page);

        return redirect()
            ->route('admin.pages.index')
            ->with('success', 'Page moved to trash.');
    }
}
