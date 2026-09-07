<?php

namespace App\Services;

use App\Models\ProgramPost;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProgramPostService
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, ?UploadedFile $image = null): ProgramPost
    {
        $post = new ProgramPost;
        $post->fill($this->attributes($data));
        $post->slug = ProgramPost::uniqueSlug($post->title);

        if ($image) {
            $post->image_url = $this->storeImage($image);
        }

        $post->save();

        return $post;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(
        ProgramPost $post,
        array $data,
        ?UploadedFile $image = null,
        bool $removeImage = false,
    ): ProgramPost {
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

    public function delete(ProgramPost $post): void
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
            'program_category_id' => $data['program_category_id'],
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'],
            'seo_title' => $data['seo_title'] ?? null,
            'seo_description' => $data['seo_description'] ?? null,
        ];
    }

    private function storeImage(UploadedFile $image): string
    {
        $path = $image->store('program-posts', 'public');

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
