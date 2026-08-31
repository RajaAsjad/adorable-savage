<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    protected $fillable = [
        'group',
        'key',
        'value',
    ];

    public static function getValue(string $key, mixed $default = null): mixed
    {
        $settings = static::allCached();

        return array_key_exists($key, $settings) ? $settings[$key] : $default;
    }

    public static function setValue(string $key, mixed $value, string $group = 'general'): void
    {
        static::query()->updateOrCreate(
            ['key' => $key],
            [
                'group' => $group,
                'value' => $value,
            ]
        );

        Cache::forget('app.settings');
    }

    public static function setMany(array $values, string $group = 'general'): void
    {
        foreach ($values as $key => $value) {
            static::setValue($key, $value, $group);
        }
    }

    /**
     * @return array<string, mixed>
     */
    public static function allCached(): array
    {
        return Cache::rememberForever('app.settings', function () {
            return static::query()->pluck('value', 'key')->all();
        });
    }

    /**
     * @return array<string, mixed>
     */
    public static function branding(): array
    {
        return [
            'site_title' => static::getValue('site_title', config('app.name', 'The Adorable Savage')),
            'site_logo' => static::getValue('site_logo'),
            'site_favicon' => static::getValue('site_favicon'),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function mailSettings(): array
    {
        return [
            'mail_mailer' => static::getValue('mail_mailer', 'smtp'),
            'mail_host' => static::getValue('mail_host', ''),
            'mail_port' => static::getValue('mail_port', '587'),
            'mail_username' => static::getValue('mail_username', ''),
            'mail_password' => static::getValue('mail_password', ''),
            'mail_encryption' => static::getValue('mail_encryption', 'tls'),
            'mail_from_address' => static::getValue('mail_from_address', ''),
            'mail_from_name' => static::getValue('mail_from_name', config('app.name')),
        ];
    }
}
