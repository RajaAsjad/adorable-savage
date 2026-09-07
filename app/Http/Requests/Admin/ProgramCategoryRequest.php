<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProgramCategoryRequest extends FormRequest
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
            'title.required' => 'Please enter a category title.',
            'title.max' => 'The title may not be longer than 255 characters.',
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
            'seo_title' => 'SEO title',
            'seo_description' => 'SEO description',
        ];
    }
}
