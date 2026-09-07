<?php

namespace App\Services;

use App\Models\Page;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PageService
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, ?UploadedFile $image = null): Page
    {
        $page = new Page;
        $page->fill($this->attributes($data));
        $page->slug = Page::uniqueSlug($page->title);

        if ($image) {
            $page->image = $this->storeImage($image);
        }

        $page->save();

        return $page;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(Page $page, array $data, ?UploadedFile $image = null, bool $removeImage = false): Page
    {
        $page->fill($this->attributes($data));

        if ($removeImage) {
            $this->deleteStoredFile($page->image);
            $page->image = null;
        }

        if ($image) {
            $this->deleteStoredFile($page->image);
            $page->image = $this->storeImage($image);
        }

        $page->save();

        return $page;
    }

    public function delete(Page $page): void
    {
        $page->delete();
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function attributes(array $data): array
    {
        return [
            'title' => $data['title'],
            'page_template' => $data['page_template'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'],
            'seo_title' => $data['seo_title'] ?? null,
            'seo_description' => $data['seo_description'] ?? null,
            'custom_fields' => $this->normalizeCustomFields($data['custom_fields'] ?? []),
        ];
    }

    /**
     * @param  mixed  $fields
     * @return list<array{name: string, value: string}>
     */
    private function normalizeCustomFields(mixed $fields): array
    {
        if (! is_array($fields)) {
            return [];
        }

        $normalized = [];

        foreach ($fields as $field) {
            if (! is_array($field)) {
                continue;
            }

            $name = trim((string) ($field['name'] ?? ''));

            if ($name === '') {
                continue;
            }

            $normalized[] = [
                'name' => $name,
                'value' => (string) ($field['value'] ?? ''),
            ];
        }

        return array_values($normalized);
    }

    private function storeImage(UploadedFile $image): string
    {
        $path = $image->store('pages', 'public');

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
