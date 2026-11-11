<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class BlogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Blog/Index', [
            'blogs' => Blog::query()
                ->published()
                ->orderByDesc('published_at')
                ->orderByDesc('id')
                ->paginate(9)
                ->through(fn (Blog $blog) => [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'slug' => $blog->slug,
                    'snippet' => $blog->contentSnippet(),
                    'image_url' => $blog->image_url,
                    'published_at' => $blog->published_at?->format('M j, Y'),
                ]),
        ]);
    }

    public function show(Request $request, string $slug): Response
    {
        $blog = Blog::query()->where('slug', $slug)->firstOrFail();

        if (! $blog->isLive() && ! $request->user()?->isAdmin()) {
            throw new NotFoundHttpException;
        }

        return Inertia::render('Blog/Show', [
            'blog' => [
                'id' => $blog->id,
                'title' => $blog->title,
                'slug' => $blog->slug,
                'image_url' => $blog->image_url,
                'description' => $blog->description,
                'published_at' => $blog->published_at?->format('M j, Y'),
                'seo_title' => $blog->seo_title,
                'seo_description' => $blog->seo_description
                    ?: $blog->contentSnippet(160),
            ],
        ]);
    }
}
