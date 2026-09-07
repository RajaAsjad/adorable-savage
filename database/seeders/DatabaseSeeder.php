<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Admin',
                'password' => 'Admin@123',
                'role' => User::ROLE_ADMIN,
                'email_verified_at' => now(),
            ]
        );

        \App\Models\Setting::setMany([
            'site_title' => 'The Adorable Savage',
            'site_logo' => null,
            'footer_logo' => null,
            'site_favicon' => null,
            'copyright' => '© 2026 The Adorable Savage Organization • Made with joy in Denver, CO',
        ], 'branding');

        \App\Models\Setting::setMany([
            'mail_mailer' => 'smtp',
            'mail_host' => '',
            'mail_port' => '587',
            'mail_username' => '',
            'mail_password' => '',
            'mail_encryption' => 'tls',
            'mail_from_address' => '',
            'mail_from_name' => 'The Adorable Savage',
        ], 'mail');

        $this->call(PageSeeder::class);
        $this->call(AboutPostSeeder::class);
        $this->call(ProgramCategorySeeder::class);
        $this->call(ProgramPostSeeder::class);
        $this->call(EventCategorySeeder::class);
        $this->call(EventSeeder::class);
        $this->call(GalleryCategorySeeder::class);
        $this->call(GallerySeeder::class);
    }
}
