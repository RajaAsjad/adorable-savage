<?php

namespace App\Providers;

use App\Models\Setting;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        $this->applyDynamicMailConfig();
        $this->applyDynamicAppName();
    }

    private function applyDynamicMailConfig(): void
    {
        try {
            if (! Schema::hasTable('settings')) {
                return;
            }
        } catch (\Throwable) {
            return;
        }

        $mail = Setting::mailSettings();

        if (! filled($mail['mail_host'])) {
            return;
        }

        Config::set('mail.default', $mail['mail_mailer'] ?: 'smtp');
        Config::set('mail.mailers.smtp.transport', 'smtp');
        Config::set('mail.mailers.smtp.host', $mail['mail_host']);
        Config::set('mail.mailers.smtp.port', (int) ($mail['mail_port'] ?: 587));
        Config::set('mail.mailers.smtp.username', $mail['mail_username'] ?: null);

        $password = $mail['mail_password'] ?: null;
        if (filled($password)) {
            try {
                $password = \Illuminate\Support\Facades\Crypt::decryptString($password);
            } catch (\Throwable) {
                // Allow legacy plain-text values if present.
            }
        }
        Config::set('mail.mailers.smtp.password', $password);
        Config::set('mail.mailers.smtp.encryption', $mail['mail_encryption'] ?: null);

        if (filled($mail['mail_from_address'])) {
            Config::set('mail.from.address', $mail['mail_from_address']);
        }

        if (filled($mail['mail_from_name'])) {
            Config::set('mail.from.name', $mail['mail_from_name']);
        }
    }

    private function applyDynamicAppName(): void
    {
        try {
            if (! Schema::hasTable('settings')) {
                return;
            }
        } catch (\Throwable) {
            return;
        }

        $title = Setting::getValue('site_title');

        if (filled($title)) {
            Config::set('app.name', $title);
        }
    }
}
