<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\GalleryCategoryRequest;
use App\Models\GalleryCategory;
use App\Services\GalleryCategoryService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GalleryCategoryController extends Controller
{
    public function __construct(
        private readonly GalleryCategoryService $categories,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/GalleryCategories/Index', [
            'categories' => GalleryCategory::query()
                ->latest()
                ->paginate(15)
                ->through(fn (GalleryCategory $category) => [
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
        return Inertia::render('Admin/GalleryCategories/Create');
    }

    public function store(GalleryCategoryRequest $request): RedirectResponse
    {
        $this->categories->create($request->validated(), $request->file('image'));

        return redirect()
            ->route('admin.gallery-categories.index')
            ->with('success', 'Gallery category created.');
    }

    public function edit(GalleryCategory $galleryCategory): Response
    {
        return Inertia::render('Admin/GalleryCategories/Edit', [
            'category' => [
                'id' => $galleryCategory->id,
                'title' => $galleryCategory->title,
                'slug' => $galleryCategory->slug,
                'image_url' => $galleryCategory->image_url,
                'description' => $galleryCategory->description,
                'status' => $galleryCategory->status,
                'seo_title' => $galleryCategory->seo_title,
                'seo_description' => $galleryCategory->seo_description,
            ],
        ]);
    }

    public function update(
        GalleryCategoryRequest $request,
        GalleryCategory $galleryCategory,
    ): RedirectResponse {
        $this->categories->update(
            $galleryCategory,
            $request->validated(),
            $request->file('image'),
            $request->boolean('remove_image'),
        );

        return redirect()
            ->route('admin.gallery-categories.index')
            ->with('success', 'Gallery category updated.');
    }

    public function destroy(GalleryCategory $galleryCategory): RedirectResponse
    {
        $this->categories->delete($galleryCategory);

        return redirect()
            ->route('admin.gallery-categories.index')
            ->with('success', 'Gallery category moved to trash.');
    }
}
