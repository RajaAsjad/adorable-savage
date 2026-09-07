<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Settings/SiteSetting', [
            'branding' => Setting::branding(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_title' => ['required', 'string', 'max:120'],
            'copyright' => ['nullable', 'string', 'max:255'],
            'site_logo' => ['nullable', 'image', 'max:2048'],
            'footer_logo' => ['nullable', 'image', 'max:2048'],
            'site_favicon' => ['nullable', 'mimes:ico,png,jpg,jpeg,svg,webp', 'max:1024'],
            'remove_logo' => ['sometimes', 'boolean'],
            'remove_footer_logo' => ['sometimes', 'boolean'],
            'remove_favicon' => ['sometimes', 'boolean'],
        ], [
            'site_title.required' => 'Please enter the website title.',
        ]);

        Setting::setValue('site_title', $validated['site_title'], 'branding');
        Setting::setValue('copyright', $validated['copyright'] ?? null, 'branding');

        if ($request->boolean('remove_logo')) {
            $this->deleteStoredFile(Setting::getValue('site_logo'));
            Setting::setValue('site_logo', null, 'branding');
        }

        if ($request->boolean('remove_footer_logo')) {
            $this->deleteStoredFile(Setting::getValue('footer_logo'));
            Setting::setValue('footer_logo', null, 'branding');
        }

        if ($request->boolean('remove_favicon')) {
            $this->deleteStoredFile(Setting::getValue('site_favicon'));
            Setting::setValue('site_favicon', null, 'branding');
        }

        if ($request->hasFile('site_logo')) {
            $this->deleteStoredFile(Setting::getValue('site_logo'));
            $path = $request->file('site_logo')->store('branding', 'public');
            Setting::setValue('site_logo', '/storage/'.$path, 'branding');
        }

        if ($request->hasFile('footer_logo')) {
            $this->deleteStoredFile(Setting::getValue('footer_logo'));
            $path = $request->file('footer_logo')->store('branding', 'public');
            Setting::setValue('footer_logo', '/storage/'.$path, 'branding');
        }

        if ($request->hasFile('site_favicon')) {
            $this->deleteStoredFile(Setting::getValue('site_favicon'));
            $path = $request->file('site_favicon')->store('branding', 'public');
            Setting::setValue('site_favicon', '/storage/'.$path, 'branding');
        }

        return back()->with('success', 'Site settings saved.');
    }

    private function deleteStoredFile(?string $url): void
    {
        if (! $url || ! str_starts_with($url, '/storage/')) {
            return;
        }

        Storage::disk('public')->delete(str_replace('/storage/', '', $url));
    }
}
