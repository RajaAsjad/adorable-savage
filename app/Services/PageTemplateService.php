<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class PageTemplateService
{
    public function directory(): string
    {
        return resource_path('views/page-templates');
    }

    /**
     * @return list<array{value: string, label: string}>
     */
    public function options(): array
    {
        $directory = $this->directory();

        if (! File::isDirectory($directory)) {
            return [];
        }

        return collect(File::files($directory))
            ->filter(fn ($file) => str_ends_with($file->getFilename(), '.blade.php'))
            ->map(function ($file) {
                $value = Str::before($file->getFilename(), '.blade.php');

                return [
                    'value' => $value,
                    'label' => Str::title(str_replace(['-', '_'], ' ', $value)),
                ];
            })
            ->sortBy('label')
            ->values()
            ->all();
    }

    /**
     * @return list<string>
     */
    public function keys(): array
    {
        return collect($this->options())->pluck('value')->all();
    }

    /**
     * Map a Blade template key to an Inertia React page component.
     */
    public function inertiaComponent(string $template): string
    {
        $map = [
            'home' => 'Home',
            'about-us' => 'Templates/AboutUs',
            'programs' => 'Templates/Programs',
            'events' => 'Templates/Events',
            'stay-vibe' => 'Templates/StayVibe',
            'default' => 'Templates/Default',
        ];

        return $map[$template] ?? 'Templates/Default';
    }
}
