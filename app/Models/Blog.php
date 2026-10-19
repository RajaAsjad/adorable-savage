<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Blog extends Model
{
    /** @use HasFactory<\Database\Factories\BlogFactory> */
    use HasFactory, SoftDeletes;

    public const STATUS_DRAFT = 'draft';

    public const STATUS_PUBLISHED = 'published';

    public const STATUS_SCHEDULED = 'scheduled';

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'image_url',
        'description',
        'status',
        'sort_order',
        'published_at',
        'seo_title',
        'seo_description',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Blog $blog): void {
            if (blank($blog->slug)) {
                $blog->slug = static::uniqueSlug($blog->title ?? 'blog');
            }
        });
    }

    public static function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'blog';
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

    public function isScheduled(): bool
    {
        return $this->status === self::STATUS_SCHEDULED;
    }

    /** Visible on the public website right now. */
    public function isLive(): bool
    {
        if ($this->status === self::STATUS_PUBLISHED) {
            return true;
        }

        return $this->status === self::STATUS_SCHEDULED
            && $this->published_at
            && $this->published_at->lte(now());
    }

    public function scopePublished($query)
    {
        return $query->where(function ($builder) {
            $builder->where('status', self::STATUS_PUBLISHED)
                ->orWhere(function ($scheduled) {
                    $scheduled->where('status', self::STATUS_SCHEDULED)
                        ->whereNotNull('published_at')
                        ->where('published_at', '<=', now());
                });
        });
    }

    public function scopeDueForPublish($query)
    {
        return $query->where('status', self::STATUS_SCHEDULED)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
}
