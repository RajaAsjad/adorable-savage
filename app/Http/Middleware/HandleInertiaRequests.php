<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $flash = [
            'success' => fn () => $request->session()->get('success'),
            'error' => fn () => $request->session()->get('error'),
        ];

        try {
            $branding = Setting::branding();
        } catch (\Throwable) {
            $branding = [
                'site_title' => config('app.name', 'The Adorable Savage'),
                'site_logo' => null,
                'footer_logo' => null,
                'site_favicon' => null,
                'copyright' => '© 2026 The Adorable Savage Organization • Made with joy in Denver, CO',
            ];
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'branding' => $branding,
            'flash' => $flash,
        ];
    }
}
