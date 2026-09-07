<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class ProgramCategory extends Model
{
    /** @use HasFactory<\Database\Factories\ProgramCategoryFactory> */
    use HasFactory, SoftDeletes;

    public const STATUS_DRAFT = 'draft';

    public const STATUS_PUBLISHED = 'published';

    protected $table = 'program_category';

    protected $fillable = [
        'title',
        'slug',
        'image_url',
        'description',
        'status',
        'seo_title',
        'seo_description',
    ];

    protected static function booted(): void
    {
        static::creating(function (ProgramCategory $category): void {
            if (blank($category->slug)) {
                $category->slug = static::uniqueSlug($category->title ?? 'program-category');
            }
        });
    }

    public static function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'program-category';
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

    public function posts(): HasMany
    {
        return $this->hasMany(ProgramPost::class, 'program_category_id');
    }

    public function isPublished(): bool
    {
        return $this->status === self::STATUS_PUBLISHED;
    }

    public function scopePublished($query)
    {
        return $query->where('status', self::STATUS_PUBLISHED);
    }
}
