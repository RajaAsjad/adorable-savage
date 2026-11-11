<?php

namespace App\Services;

use App\Models\Blog;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class BlogService
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, ?UploadedFile $image = null): Blog
    {
        $blog = new Blog;
        $blog->fill($this->attributes($data));
        $blog->slug = Blog::uniqueSlug($blog->title);
        $blog->sort_order = $data['sort_order'] ?? $this->nextSortOrder();

        if ($image) {
            $blog->image_url = $this->storeImage($image);
        }

        $blog->save();

        return $blog;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(Blog $blog, array $data, ?UploadedFile $image = null, bool $removeImage = false): Blog
    {
        $blog->fill($this->attributes($data));

        if ($removeImage) {
            $this->deleteStoredFile($blog->image_url);
            $blog->image_url = null;
        }

        if ($image) {
            $this->deleteStoredFile($blog->image_url);
            $blog->image_url = $this->storeImage($image);
        }

        $blog->save();

        return $blog;
    }

    public function delete(Blog $blog): void
    {
        $blog->delete();
    }

    public function publishDueScheduled(): int
    {
        $count = 0;

        Blog::query()
            ->dueForPublish()
            ->orderBy('id')
            ->each(function (Blog $blog) use (&$count) {
                $blog->status = Blog::STATUS_PUBLISHED;
                $blog->save();
                $count++;
            });

        return $count;
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function attributes(array $data): array
    {
        $status = $data['status'];
        $publishedAt = $data['published_at'] ?? null;

        if ($status === Blog::STATUS_PUBLISHED && blank($publishedAt)) {
            $publishedAt = now();
        }

        if ($status === Blog::STATUS_DRAFT) {
            $publishedAt = null;
        }

        // If schedule time already passed, go live immediately.
        if ($status === Blog::STATUS_SCHEDULED && $publishedAt && now()->gte($publishedAt)) {
            $status = Blog::STATUS_PUBLISHED;
        }

        $attributes = [
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $status,
            'seo_title' => $data['seo_title'] ?? null,
            'seo_description' => $data['seo_description'] ?? null,
            'published_at' => $publishedAt,
        ];

        if (array_key_exists('sort_order', $data) && $data['sort_order'] !== null && $data['sort_order'] !== '') {
            $attributes['sort_order'] = (int) $data['sort_order'];
        }

        return $attributes;
    }

    private function nextSortOrder(): int
    {
        return (int) Blog::query()->max('sort_order') + 1;
    }

    private function storeImage(UploadedFile $image): string
    {
        $path = $image->store('blogs', 'public');

        return '/storage/'.$path;
    }

    private function deleteStoredFile(?string $url): void
    {
        if (! $url || ! str_starts_with($url, '/storage/')) {
            return;
        }

        Storage::disk('public')->delete(str_replace('/storage/', '', $url));
    }
}
