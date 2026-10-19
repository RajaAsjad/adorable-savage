<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BlogRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'image' => ['nullable', 'image', 'max:2048'],
            'remove_image' => ['sometimes', 'boolean'],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['draft', 'published', 'scheduled'])],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'published_at' => [
                Rule::requiredIf(fn () => $this->input('status') === 'scheduled'),
                'nullable',
                'date',
                Rule::when(
                    $this->input('status') === 'scheduled',
                    ['after:now'],
                ),
            ],
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
            'title.required' => 'Please enter a title.',
            'title.max' => 'The title may not be longer than 255 characters.',
            'excerpt.max' => 'The excerpt may not be longer than 500 characters.',
            'image.image' => 'The image must be a valid image file.',
            'image.max' => 'The image may not be larger than 2MB.',
            'status.required' => 'Please choose a status.',
            'status.in' => 'Status must be Draft, Published, or Schedule.',
            'published_at.required' => 'Please choose a schedule date and time.',
            'published_at.after' => 'Schedule time must be in the future.',
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
            'seo_title' => 'SEO title',
            'seo_description' => 'SEO description',
            'published_at' => 'schedule date',
        ];
    }
}
