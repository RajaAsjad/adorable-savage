<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\GalleryRequest;
use App\Models\Gallery;
use App\Models\GalleryCategory;
use App\Services\GalleryService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function __construct(
        private readonly GalleryService $galleries,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => Gallery::query()
                ->with('category:id,title')
                ->latest()
                ->paginate(15)
                ->through(fn (Gallery $gallery) => [
                    'id' => $gallery->id,
                    'title' => $gallery->title,
                    'slug' => $gallery->slug,
                    'image_url' => $gallery->image_url,
                    'category_title' => $gallery->category?->title,
                    'status' => $gallery->status,
                    'updated_at' => $gallery->updated_at?->format('M j, Y'),
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Galleries/Create', [
            'categories' => $this->categoryOptions(),
        ]);
    }

    public function store(GalleryRequest $request): RedirectResponse
    {
        $this->galleries->create($request->validated(), $request->file('image'));

        return redirect()
            ->route('admin.galleries.index')
            ->with('success', 'Gallery item created.');
    }

    public function edit(Gallery $gallery): Response
    {
        return Inertia::render('Admin/Galleries/Edit', [
            'gallery' => [
                'id' => $gallery->id,
                'gallery_category_id' => $gallery->gallery_category_id,
                'title' => $gallery->title,
                'slug' => $gallery->slug,
                'image_url' => $gallery->image_url,
                'description' => $gallery->description,
                'status' => $gallery->status,
                'seo_title' => $gallery->seo_title,
                'seo_description' => $gallery->seo_description,
            ],
            'categories' => $this->categoryOptions(),
        ]);
    }

    public function update(GalleryRequest $request, Gallery $gallery): RedirectResponse
    {
        $this->galleries->update(
            $gallery,
            $request->validated(),
            $request->file('image'),
            $request->boolean('remove_image'),
        );

        return redirect()
            ->route('admin.galleries.index')
            ->with('success', 'Gallery item updated.');
    }

    public function destroy(Gallery $gallery): RedirectResponse
    {
        $this->galleries->delete($gallery);

        return redirect()
            ->route('admin.galleries.index')
            ->with('success', 'Gallery item moved to trash.');
    }

    /**
     * @return list<array{id: int, title: string}>
     */
    private function categoryOptions(): array
    {
        return GalleryCategory::query()
            ->orderBy('title')
            ->get(['id', 'title'])
            ->map(fn (GalleryCategory $category) => [
                'id' => $category->id,
                'title' => $category->title,
            ])
            ->all();
    }
}
