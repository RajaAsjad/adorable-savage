<?php

namespace App\Http\Requests\Admin;

use App\Services\PageTemplateService;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PageRequest extends FormRequest
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
        $templates = app(PageTemplateService::class)->keys();

        return [
            'title' => ['required', 'string', 'max:255'],
            'page_template' => ['required', 'string', Rule::in($templates)],
            'image' => ['nullable', 'image', 'max:2048'],
            'remove_image' => ['sometimes', 'boolean'],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string', 'max:500'],
            'custom_fields' => ['nullable', 'array'],
            'custom_fields.*.name' => ['nullable', 'string', 'max:255'],
            'custom_fields.*.value' => ['nullable', 'string'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $fields = $this->input('custom_fields');

        if (is_string($fields)) {
            $decoded = json_decode($fields, true);
            $this->merge([
                'custom_fields' => is_array($decoded) ? $decoded : [],
            ]);
        }
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Please enter a page title.',
            'title.max' => 'The page title may not be longer than 255 characters.',
            'page_template.required' => 'Please select a page template.',
            'page_template.in' => 'The selected page template is not valid.',
            'image.image' => 'The featured image must be a valid image file.',
            'image.max' => 'The featured image may not be larger than 2MB.',
            'status.required' => 'Please choose a page status.',
            'status.in' => 'Status must be either Draft or Published.',
            'seo_title.max' => 'The SEO title may not be longer than 255 characters.',
            'seo_description.max' => 'The SEO description may not be longer than 500 characters.',
            'custom_fields.*.name.max' => 'A custom field name may not be longer than 255 characters.',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'page_template' => 'page template',
            'seo_title' => 'SEO title',
            'seo_description' => 'SEO description',
        ];
    }
}
