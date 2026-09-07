<?php

namespace App\Services;

use App\Models\Gallery;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class GalleryService
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, ?UploadedFile $image = null): Gallery
    {
        $gallery = new Gallery;
        $gallery->fill($this->attributes($data));
        $gallery->slug = Gallery::uniqueSlug($gallery->title);

        if ($image) {
            $gallery->image_url = $this->storeImage($image);
        }

        $gallery->save();

        return $gallery;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(
        Gallery $gallery,
        array $data,
        ?UploadedFile $image = null,
        bool $removeImage = false,
    ): Gallery {
        $gallery->fill($this->attributes($data));

        if ($removeImage) {
            $this->deleteStoredFile($gallery->image_url);
            $gallery->image_url = null;
        }

        if ($image) {
            $this->deleteStoredFile($gallery->image_url);
            $gallery->image_url = $this->storeImage($image);
        }

        $gallery->save();

        return $gallery;
    }

    public function delete(Gallery $gallery): void
    {
        $gallery->delete();
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function attributes(array $data): array
    {
        return [
            'gallery_category_id' => $data['gallery_category_id'],
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'],
            'seo_title' => $data['seo_title'] ?? null,
            'seo_description' => $data['seo_description'] ?? null,
        ];
    }

    private function storeImage(UploadedFile $image): string
    {
        $path = $image->store('galleries', 'public');

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
