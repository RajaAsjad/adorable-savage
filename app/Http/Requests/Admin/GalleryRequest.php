<?php

namespace App\Http\Requests\Admin;

use App\Models\GalleryCategory;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GalleryRequest extends FormRequest
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
            'gallery_category_id' => [
                'required',
                'integer',
                Rule::exists(GalleryCategory::class, 'id'),
            ],
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
            'gallery_category_id.required' => 'Please select a gallery category.',
            'gallery_category_id.exists' => 'The selected gallery category is not valid.',
            'title.required' => 'Please enter a title.',
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
            'gallery_category_id' => 'gallery category',
            'seo_title' => 'SEO title',
            'seo_description' => 'SEO description',
        ];
    }
}
