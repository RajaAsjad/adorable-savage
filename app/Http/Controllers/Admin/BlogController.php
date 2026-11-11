<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BlogRequest;
use App\Models\Blog;
use App\Services\BlogService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function __construct(
        private readonly BlogService $blogs,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => Blog::query()
                ->orderByDesc('published_at')
                ->orderByDesc('id')
                ->paginate(15)
                ->through(fn (Blog $blog) => [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'slug' => $blog->slug,
                    'image_url' => $blog->image_url,
                    'status' => $blog->status,
                    'published_at' => $blog->published_at?->format('M j, Y'),
                    'updated_at' => $blog->updated_at?->format('M j, Y'),
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Blogs/Create');
    }

    public function store(BlogRequest $request): RedirectResponse
    {
        $this->blogs->create($request->validated(), $request->file('image'));

        return redirect()
            ->route('admin.blogs.index')
            ->with('success', 'Blog post created.');
    }

    public function edit(Blog $blog): Response
    {
        return Inertia::render('Admin/Blogs/Edit', [
            'blog' => [
                'id' => $blog->id,
                'title' => $blog->title,
                'slug' => $blog->slug,
                'image_url' => $blog->image_url,
                'description' => $blog->description,
                'status' => $blog->status,
                'sort_order' => $blog->sort_order,
                'published_at' => $blog->published_at?->format('Y-m-d\TH:i'),
                'seo_title' => $blog->seo_title,
                'seo_description' => $blog->seo_description,
            ],
        ]);
    }

    public function update(BlogRequest $request, Blog $blog): RedirectResponse
    {
        $this->blogs->update(
            $blog,
            $request->validated(),
            $request->file('image'),
            $request->boolean('remove_image'),
        );

        return redirect()
            ->route('admin.blogs.index')
            ->with('success', 'Blog post updated.');
    }

    public function destroy(Blog $blog): RedirectResponse
    {
        $this->blogs->delete($blog);

        return redirect()
            ->route('admin.blogs.index')
            ->with('success', 'Blog post moved to trash.');
    }
}
