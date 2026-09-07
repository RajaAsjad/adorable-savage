<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Page extends Model
{
    /** @use HasFactory<\Database\Factories\PageFactory> */
    use HasFactory, SoftDeletes;

    public const STATUS_DRAFT = 'draft';

    public const STATUS_PUBLISHED = 'published';

    protected $fillable = [
        'title',
        'slug',
        'page_template',
        'image',
        'description',
        'status',
        'seo_title',
        'seo_description',
        'custom_fields',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'custom_fields' => 'array',
        ];
    }

    /**
     * WordPress-style meta lookup by field name.
     */
    public function getCustomField(string $name, mixed $default = null): mixed
    {
        foreach ($this->custom_fields ?? [] as $field) {
            if (($field['name'] ?? null) === $name) {
                return $field['value'] ?? $default;
            }
        }

        return $default;
    }

    protected static function booted(): void
    {
        static::creating(function (Page $page): void {
            if (blank($page->slug)) {
                $page->slug = static::uniqueSlug($page->title ?? 'page');
            }
        });
    }

    public static function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'page';
        $slug = $base;
        $i = 2;

        while (
            static::withTrashed()
                ->where('slug', $slug)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $base.'-'.$i;
            $i++;
        }

        return $slug;
    }

    public function isPublished(): bool
    {
        return $this->status === self::STATUS_PUBLISHED;
    }
}
