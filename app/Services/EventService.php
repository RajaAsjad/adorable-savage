<?php

namespace App\Services;

use App\Models\Event;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class EventService
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, ?UploadedFile $image = null): Event
    {
        $event = new Event;
        $event->fill($this->attributes($data));
        $event->slug = Event::uniqueSlug($event->title);

        if ($image) {
            $event->image_url = $this->storeImage($image);
        }

        $event->save();

        return $event;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(
        Event $event,
        array $data,
        ?UploadedFile $image = null,
        bool $removeImage = false,
    ): Event {
        $event->fill($this->attributes($data));

        if ($removeImage) {
            $this->deleteStoredFile($event->image_url);
            $event->image_url = null;
        }

        if ($image) {
            $this->deleteStoredFile($event->image_url);
            $event->image_url = $this->storeImage($image);
        }

        $event->save();

        return $event;
    }

    public function delete(Event $event): void
    {
        $event->delete();
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
            'event_date' => $data['event_date'] ?? null,
            'description' => $data['description'] ?? null,
            'status' => $data['status'],
            'seo_title' => $data['seo_title'] ?? null,
            'seo_description' => $data['seo_description'] ?? null,
        ];
    }

    private function storeImage(UploadedFile $image): string
    {
        $path = $image->store('events', 'public');

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
