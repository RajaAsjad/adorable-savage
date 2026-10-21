<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['nullable', 'string', 'max:180'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $page = Page::query()
            ->where(function ($query) {
                $query->where('page_template', 'contact')
                    ->orWhere('slug', 'contact');
            })
            ->orderByRaw("CASE WHEN page_template = 'contact' THEN 0 ELSE 1 END")
            ->first();

        $to = null;

        if ($page) {
            $to = $page->getCustomField('email')
                ?: $page->getCustomField('contact_email');
        }

        if (blank($to)) {
            $mail = Setting::mailSettings();
            $to = $mail['mail_from_address'] ?: config('mail.from.address');
        }

        if (blank($to)) {
            return back()->with('error', 'Contact email is not configured yet.');
        }

        $subject = filled($validated['subject'] ?? null)
            ? $validated['subject']
            : 'New message from '.$validated['name'];

        $body = implode("\n", [
            'Name: '.$validated['name'],
            'Email: '.$validated['email'],
            'Subject: '.($validated['subject'] ?: '(none)'),
            '',
            $validated['message'],
        ]);

        try {
            Mail::raw($body, function ($message) use ($to, $subject, $validated) {
                $message->to($to)
                    ->replyTo($validated['email'], $validated['name'])
                    ->subject('Contact — '.$subject);
            });
        } catch (\Throwable $e) {
            return back()->with('error', 'Could not send your message. Please try again later.');
        }

        return back()->with('success', 'Thanks for reaching out — we got your message.');
    }
}
