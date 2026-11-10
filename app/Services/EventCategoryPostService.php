<?php

namespace App\Services;

use App\Models\EventCategoryPost;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class EventCategoryPostService
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(
        array $data,
        ?UploadedFile $image = null,
        ?UploadedFile $video = null,
    ): EventCategoryPost {
        $post = new EventCategoryPost;
        $post->fill($this->attributes($data));
        $post->slug = EventCategoryPost::uniqueSlug($post->title);

        if ($image) {
            $post->image_url = $this->storeFile($image, 'event-category-posts');
        }

        if ($video) {
            $post->video_url = $this->storeFile($video, 'event-category-posts/videos');
        } elseif (filled($data['video_url'] ?? null)) {
            $post->video_url = $data['video_url'];
        }

        $post->save();

        return $post;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(
        EventCategoryPost $post,
        array $data,
        ?UploadedFile $image = null,
        bool $removeImage = false,
        ?UploadedFile $video = null,
        bool $removeVideo = false,
    ): EventCategoryPost {
        $post->fill($this->attributes($data));

        if ($removeImage) {
            $this->deleteStoredFile($post->image_url);
            $post->image_url = null;
        }

        if ($image) {
            $this->deleteStoredFile($post->image_url);
            $post->image_url = $this->storeFile($image, 'event-category-posts');
        }

        if ($removeVideo) {
            $this->deleteStoredFile($post->video_url);
            $post->video_url = null;
        } elseif ($video) {
            $this->deleteStoredFile($post->video_url);
            $post->video_url = $this->storeFile($video, 'event-category-posts/videos');
        } elseif (filled($data['video_url'] ?? null)) {
            if ($post->video_url && str_starts_with($post->video_url, '/storage/')) {
                $this->deleteStoredFile($post->video_url);
            }
            $post->video_url = $data['video_url'];
        }

        $post->save();

        return $post;
    }

    public function delete(EventCategoryPost $post): void
    {
        $post->delete();
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function attributes(array $data): array
    {
        return [
            'event_category_id' => $data['event_category_id'],
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'],
            'sort_order' => (int) ($data['sort_order'] ?? 0),
            'seo_title' => $data['seo_title'] ?? null,
            'seo_description' => $data['seo_description'] ?? null,
        ];
    }

    private function storeFile(UploadedFile $file, string $directory): string
    {
        $path = $file->store($directory, 'public');

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
