<?php

namespace App\Services;

use App\Models\AboutPost;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class AboutPostService
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, ?UploadedFile $image = null): AboutPost
    {
        $post = new AboutPost;
        $post->fill($this->attributes($data));
        $post->slug = AboutPost::uniqueSlug($post->title);
        $post->sort_order = $data['sort_order'] ?? $this->nextSortOrder();

        if ($image) {
            $post->image_url = $this->storeImage($image);
        }

        $post->save();

        return $post;
    }

    public function moveUp(AboutPost $post): void
    {
        $neighbor = AboutPost::query()
            ->where('sort_order', '<', $post->sort_order)
            ->orderByDesc('sort_order')
            ->first();

        if (! $neighbor) {
            return;
        }

        $this->swapSortOrder($post, $neighbor);
    }

    public function moveDown(AboutPost $post): void
    {
        $neighbor = AboutPost::query()
            ->where('sort_order', '>', $post->sort_order)
            ->orderBy('sort_order')
            ->first();

        if (! $neighbor) {
            return;
        }

        $this->swapSortOrder($post, $neighbor);
    }

    private function swapSortOrder(AboutPost $a, AboutPost $b): void
    {
        $temp = $a->sort_order;
        $a->sort_order = $b->sort_order;
        $b->sort_order = $temp;
        $a->save();
        $b->save();
    }

    private function nextSortOrder(): int
    {
        return (int) AboutPost::query()->max('sort_order') + 1;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(AboutPost $post, array $data, ?UploadedFile $image = null, bool $removeImage = false): AboutPost
    {
        $post->fill($this->attributes($data));

        if ($removeImage) {
            $this->deleteStoredFile($post->image_url);
            $post->image_url = null;
        }

        if ($image) {
            $this->deleteStoredFile($post->image_url);
            $post->image_url = $this->storeImage($image);
        }

        $post->save();

        return $post;
    }

    public function delete(AboutPost $post): void
    {
        $post->delete();
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function attributes(array $data): array
    {
        $attributes = [
            'title' => $data['title'],
            'slogan_text' => $data['slogan_text'] ?? null,
            'description' => $data['description'] ?? null,
            'ticker_text' => $data['ticker_text'] ?? null,
            'status' => $data['status'],
            'seo_title' => $data['seo_title'] ?? null,
            'seo_description' => $data['seo_description'] ?? null,
        ];

        if (array_key_exists('sort_order', $data) && $data['sort_order'] !== null && $data['sort_order'] !== '') {
            $attributes['sort_order'] = (int) $data['sort_order'];
        }

        return $attributes;
    }

    private function storeImage(UploadedFile $image): string
    {
        $path = $image->store('about-posts', 'public');

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
