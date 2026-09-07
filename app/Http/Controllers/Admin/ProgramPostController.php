<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProgramPostRequest;
use App\Models\ProgramCategory;
use App\Models\ProgramPost;
use App\Services\ProgramPostService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProgramPostController extends Controller
{
    public function __construct(
        private readonly ProgramPostService $programPosts,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/ProgramPosts/Index', [
            'posts' => ProgramPost::query()
                ->with('category:id,title')
                ->latest()
                ->paginate(15)
                ->through(fn (ProgramPost $post) => [
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
        return Inertia::render('Admin/ProgramPosts/Create', [
            'categories' => $this->categoryOptions(),
        ]);
    }

    public function store(ProgramPostRequest $request): RedirectResponse
    {
        $this->programPosts->create($request->validated(), $request->file('image'));

        return redirect()
            ->route('admin.program-posts.index')
            ->with('success', 'Program post created.');
    }

    public function edit(ProgramPost $programPost): Response
    {
        return Inertia::render('Admin/ProgramPosts/Edit', [
            'post' => [
                'id' => $programPost->id,
                'program_category_id' => $programPost->program_category_id,
                'title' => $programPost->title,
                'slug' => $programPost->slug,
                'image_url' => $programPost->image_url,
                'description' => $programPost->description,
                'status' => $programPost->status,
                'seo_title' => $programPost->seo_title,
                'seo_description' => $programPost->seo_description,
            ],
            'categories' => $this->categoryOptions(),
        ]);
    }

    public function update(
        ProgramPostRequest $request,
        ProgramPost $programPost,
    ): RedirectResponse {
        $this->programPosts->update(
            $programPost,
            $request->validated(),
            $request->file('image'),
            $request->boolean('remove_image'),
        );

        return redirect()
            ->route('admin.program-posts.index')
            ->with('success', 'Program post updated.');
    }

    public function destroy(ProgramPost $programPost): RedirectResponse
    {
        $this->programPosts->delete($programPost);

        return redirect()
            ->route('admin.program-posts.index')
            ->with('success', 'Program post moved to trash.');
    }

    /**
     * @return list<array{id: int, title: string}>
     */
    private function categoryOptions(): array
    {
        return ProgramCategory::query()
            ->orderBy('title')
            ->get(['id', 'title'])
            ->map(fn (ProgramCategory $category) => [
                'id' => $category->id,
                'title' => $category->title,
            ])
            ->all();
    }
}
