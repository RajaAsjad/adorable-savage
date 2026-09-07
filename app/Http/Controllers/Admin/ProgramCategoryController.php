<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProgramCategoryRequest;
use App\Models\ProgramCategory;
use App\Services\ProgramCategoryService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProgramCategoryController extends Controller
{
    public function __construct(
        private readonly ProgramCategoryService $categories,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/ProgramCategories/Index', [
            'categories' => ProgramCategory::query()
                ->latest()
                ->paginate(15)
                ->through(fn (ProgramCategory $category) => [
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
        return Inertia::render('Admin/ProgramCategories/Create');
    }

    public function store(ProgramCategoryRequest $request): RedirectResponse
    {
        $this->categories->create($request->validated(), $request->file('image'));

        return redirect()
            ->route('admin.program-categories.index')
            ->with('success', 'Program category created.');
    }

    public function edit(ProgramCategory $programCategory): Response
    {
        return Inertia::render('Admin/ProgramCategories/Edit', [
            'category' => [
                'id' => $programCategory->id,
                'title' => $programCategory->title,
                'slug' => $programCategory->slug,
                'image_url' => $programCategory->image_url,
                'description' => $programCategory->description,
                'status' => $programCategory->status,
                'seo_title' => $programCategory->seo_title,
                'seo_description' => $programCategory->seo_description,
            ],
        ]);
    }

    public function update(
        ProgramCategoryRequest $request,
        ProgramCategory $programCategory,
    ): RedirectResponse {
        $this->categories->update(
            $programCategory,
            $request->validated(),
            $request->file('image'),
            $request->boolean('remove_image'),
        );

        return redirect()
            ->route('admin.program-categories.index')
            ->with('success', 'Program category updated.');
    }

    public function destroy(ProgramCategory $programCategory): RedirectResponse
    {
        $this->categories->delete($programCategory);

        return redirect()
            ->route('admin.program-categories.index')
            ->with('success', 'Program category moved to trash.');
    }
}
