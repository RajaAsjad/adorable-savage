<?php

namespace App\Services;

use App\Models\ProgramCategory;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProgramCategoryService
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, ?UploadedFile $image = null): ProgramCategory
    {
        $category = new ProgramCategory;
        $category->fill($this->attributes($data));
        $category->slug = ProgramCategory::uniqueSlug($category->title);

        if ($image) {
            $category->image_url = $this->storeImage($image);
        }

        $category->save();

        return $category;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(
        ProgramCategory $category,
        array $data,
        ?UploadedFile $image = null,
        bool $removeImage = false,
    ): ProgramCategory {
        $category->fill($this->attributes($data));

        if ($removeImage) {
            $this->deleteStoredFile($category->image_url);
            $category->image_url = null;
        }

        if ($image) {
            $this->deleteStoredFile($category->image_url);
            $category->image_url = $this->storeImage($image);
        }

        $category->save();

        return $category;
    }

    public function delete(ProgramCategory $category): void
    {
        $category->delete();
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function attributes(array $data): array
    {
        return [
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'],
            'seo_title' => $data['seo_title'] ?? null,
            'seo_description' => $data['seo_description'] ?? null,
        ];
    }

    private function storeImage(UploadedFile $image): string
    {
        $path = $image->store('program-categories', 'public');

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
