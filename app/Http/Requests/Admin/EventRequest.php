<?php

namespace App\Http\Requests\Admin;

use App\Models\EventCategory;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EventRequest extends FormRequest
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
            'event_date' => ['nullable', 'date'],
            'image' => ['nullable', 'image', 'max:2048'],
            'remove_image' => ['sometimes', 'boolean'],
            'description' => ['nullable', 'string'],
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
            'event_category_id.required' => 'Please select an event category.',
            'event_category_id.exists' => 'The selected event category is not valid.',
            'title.required' => 'Please enter a title.',
            'title.max' => 'The title may not be longer than 255 characters.',
            'event_date.date' => 'Please enter a valid event date.',
            'image.image' => 'The image must be a valid image file.',
            'image.max' => 'The image may not be larger than 2MB.',
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
            'event_category_id' => 'event category',
            'event_date' => 'event date',
            'seo_title' => 'SEO title',
            'seo_description' => 'SEO description',
        ];
    }
}
