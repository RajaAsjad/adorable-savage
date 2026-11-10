<?php

namespace App\Http\Requests\Admin;

use App\Models\EventCategory;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EventCategoryPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'event_category_id' => [
                'required',
                'integer',
                Rule::exists(EventCategory::class, 'id'),
            ],
            'title' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:4096'],
            'remove_image' => ['sometimes', 'boolean'],
            'video' => ['nullable', 'file', 'mimetypes:video/mp4,video/webm,video/quicktime', 'max:51200'],
            'remove_video' => ['sometimes', 'boolean'],
            'video_url' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string', 'max:500'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'event_category_id.required' => 'Please select a calendar category.',
            'event_category_id.exists' => 'The selected calendar category is not valid.',
            'title.required' => 'Please enter a title.',
            'title.max' => 'The title may not be longer than 255 characters.',
            'image.image' => 'The image must be a valid image file.',
            'image.max' => 'The image may not be larger than 4MB.',
            'video.mimetypes' => 'The video must be an MP4, WebM, or QuickTime file.',
            'video.max' => 'The video may not be larger than 50MB.',
            'status.required' => 'Please choose a status.',
            'status.in' => 'Status must be either Draft or Published.',
            'seo_title.max' => 'The SEO title may not be longer than 255 characters.',
            'seo_description.max' => 'The SEO description may not be longer than 500 characters.',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'event_category_id' => 'calendar category',
            'seo_title' => 'SEO title',
            'seo_description' => 'SEO description',
            'video_url' => 'video URL',
        ];
    }
}
