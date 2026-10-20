<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AboutPostRequest;
use App\Models\AboutPost;
use App\Services\AboutPostService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AboutPostController extends Controller
{
    public function __construct(
        private readonly AboutPostService $aboutPosts,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/AboutPosts/Index', [
            'posts' => AboutPost::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->paginate(50)
                ->through(fn (AboutPost $post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'slogan_text' => $post->slogan_text,
                    'image_url' => $post->image_url,
                    'status' => $post->status,
                    'sort_order' => $post->sort_order,
                    'updated_at' => $post->updated_at?->format('M j, Y'),
                ]),
        ]);
    }

    public function moveUp(AboutPost $aboutPost): RedirectResponse
    {
        $this->aboutPosts->moveUp($aboutPost);

        return redirect()
            ->route('admin.about-posts.index')
            ->with('success', 'About post moved up.');
    }

    public function moveDown(AboutPost $aboutPost): RedirectResponse
    {
        $this->aboutPosts->moveDown($aboutPost);

        return redirect()
            ->route('admin.about-posts.index')
            ->with('success', 'About post moved down.');
    }

    public function create(): Response
    {
        return Inertia::render('Admin/AboutPosts/Create');
    }

    public function store(AboutPostRequest $request): RedirectResponse
    {
        $this->aboutPosts->create($request->validated(), $request->file('image'));

        return redirect()
            ->route('admin.about-posts.index')
            ->with('success', 'About post created.');
    }

    public function edit(AboutPost $aboutPost): Response
    {
        return Inertia::render('Admin/AboutPosts/Edit', [
            'post' => [
                'id' => $aboutPost->id,
                'title' => $aboutPost->title,
                'slug' => $aboutPost->slug,
                'slogan_text' => $aboutPost->slogan_text,
                'image_url' => $aboutPost->image_url,
                'description' => $aboutPost->description,
                'ticker_text' => $aboutPost->ticker_text,
                'status' => $aboutPost->status,
                'sort_order' => $aboutPost->sort_order,
                'seo_title' => $aboutPost->seo_title,
                'seo_description' => $aboutPost->seo_description,
            ],
        ]);
    }

    public function update(AboutPostRequest $request, AboutPost $aboutPost): RedirectResponse
    {
        $this->aboutPosts->update(
            $aboutPost,
            $request->validated(),
            $request->file('image'),
            $request->boolean('remove_image'),
        );

        return redirect()
            ->route('admin.about-posts.index')
            ->with('success', 'About post updated.');
    }

    public function destroy(AboutPost $aboutPost): RedirectResponse
    {
        $this->aboutPosts->delete($aboutPost);

        return redirect()
            ->route('admin.about-posts.index')
            ->with('success', 'About post moved to trash.');
    }
}
