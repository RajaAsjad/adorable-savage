<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class EmailSettingController extends Controller
{
    public function edit(): Response
    {
        $mail = Setting::mailSettings();
        // Never send raw password to the client; only whether one exists.
        $mail['mail_password_set'] = filled($mail['mail_password']);
        unset($mail['mail_password']);

        return Inertia::render('Admin/Settings/Email', [
            'mail' => $mail,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'mail_mailer' => ['required', 'in:smtp,sendmail,log'],
            'mail_host' => ['nullable', 'string', 'max:255'],
            'mail_port' => ['nullable', 'integer', 'min:1', 'max:65535'],
            'mail_username' => ['nullable', 'string', 'max:255'],
            'mail_password' => ['nullable', 'string', 'max:255'],
            'mail_encryption' => ['nullable', 'in:tls,ssl,null'],
            'mail_from_address' => ['nullable', 'email', 'max:255'],
            'mail_from_name' => ['nullable', 'string', 'max:255'],
        ]);

        if (($validated['mail_encryption'] ?? null) === 'null') {
            $validated['mail_encryption'] = null;
        }

        if (! filled($validated['mail_password'] ?? null)) {
            unset($validated['mail_password']);
        } else {
            $validated['mail_password'] = Crypt::encryptString($validated['mail_password']);
        }

        Setting::setMany($validated, 'mail');

        return back()->with('success', 'Email settings saved.');
    }

    public function test(Request $request): RedirectResponse
    {
        $request->validate([
            'test_email' => ['required', 'email'],
        ]);

        try {
            Mail::raw(
                'This is a test email from The Adorable Savage admin panel.',
                function ($message) use ($request) {
                    $message->to($request->string('test_email')->toString())
                        ->subject('SMTP Test — '.Setting::branding()['site_title']);
                }
            );
        } catch (\Throwable $e) {
            return back()->with('error', 'Test email failed: '.$e->getMessage());
        }

        return back()->with('success', 'Test email sent successfully.');
    }
}
