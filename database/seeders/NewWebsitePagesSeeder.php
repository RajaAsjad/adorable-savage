<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

/**
 * Seeds Contact + Get Involved (safe create-only).
 * About Me (/the-adorable-savage) is created only if missing via AboutMePageSeeder.
 *
 * Safe for live — does NOT overwrite existing pages:
 *   php artisan db:seed --class=NewWebsitePagesSeeder --force
 *
 * To refresh About Me content on live (overwrite that page only):
 *   php artisan db:seed --class=AboutMePageSeeder --force
 */
class NewWebsitePagesSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => 'Get in touch',
                'slug' => 'contact',
                'page_template' => 'contact',
                'description' => '<p>Questions, partnerships, press, or just saying hi — we\'d love to hear from you. Real humans. Real replies.</p>',
                'status' => Page::STATUS_PUBLISHED,
                'seo_title' => 'Contact — The Adorable Savage',
                'seo_description' => 'Get in touch with The Adorable Savage. Reach out about programs, events, partnerships, or community.',
                'ticker_text' => "YOU'RE SOFT.\nYOU'RE WILD.\nYOU'RE ADORABLE.\nREACH OUT ANYTIME.",
                'custom_fields' => [
                    ['name' => 'eyebrow', 'value' => 'SAY HELLO'],
                    ['name' => 'email', 'value' => 'hello@adorablesavage.org'],
                    ['name' => 'phone', 'value' => ''],
                    ['name' => 'location', 'value' => 'Denver, CO'],
                    ['name' => 'hours', 'value' => 'Mon–Fri · replies within 2–3 days'],
                    ['name' => 'form_heading', 'value' => 'Send a note'],
                    ['name' => 'form_button', 'value' => 'SEND MESSAGE'],
                    ['name' => 'form_note', 'value' => 'No spam. Just real humans reading real messages.'],
                    ['name' => 'instagram', 'value' => ''],
                ],
            ],
            [
                'title' => 'Get Involved',
                'slug' => 'get-involved',
                'page_template' => 'get-involved',
                'description' => '<p>The Adorable Savage is the belief that every person walks into this life already carrying what they need to live it — the tenderness and the grit, the tears and the fight. Most of us were taught to pick one. We don\'t. Through music, natural wellness, and the honest work of learning to love yourself, we help people meet the whole of who they already are.</p>',
                'status' => Page::STATUS_PUBLISHED,
                'seo_title' => 'Get Involved — The Adorable Savage',
                'seo_description' => 'Donate, volunteer, sponsor, or share your craft with The Adorable Savage community.',
                'ticker_text' => "GIVE.\nHELP.\nPARTNER.\nCREATE.\nYOU BELONG HERE.",
                'custom_fields' => [
                    ['name' => 'eyebrow', 'value' => 'BE PART OF IT'],
                    ['name' => 'closing', 'value' => 'No perfect entry — just you, showing up.'],
                    ['name' => 'pillar_1_name', 'value' => 'Real, Raw, Relatable'],
                    ['name' => 'pillar_1_tagline', 'value' => 'Where truth hits the pavement.'],
                    ['name' => 'pillar_2_name', 'value' => 'Verses And Vibes'],
                    ['name' => 'pillar_2_tagline', 'value' => 'Every lyric holds a story.'],
                    ['name' => 'pillar_3_name', 'value' => 'Unapologetic Wellness'],
                    ['name' => 'pillar_3_tagline', 'value' => 'You just needed someone to go first.'],
                    ['name' => 'donate_title', 'value' => 'Donate'],
                    [
                        'name' => 'donate_text',
                        'value' => "Your gift keeps the mic on, the classes free or low-cost, and the door open for someone who's ready to change.",
                    ],
                    ['name' => 'donate_cta', 'value' => 'DONATE TODAY'],
                    ['name' => 'donate_url', 'value' => '/donate'],
                    [
                        'name' => 'donate_note',
                        'value' => 'Every donation is tax-deductible to the extent allowed by law — 501(c)(3) is pending.',
                    ],
                    ['name' => 'volunteer_title', 'value' => 'Volunteer'],
                    [
                        'name' => 'volunteer_text',
                        'value' => 'Help run events, host a circle, teach a class, or share a skill. If you have a gift, we have a place for it.',
                    ],
                    ['name' => 'volunteer_cta', 'value' => 'APPLY TO VOLUNTEER'],
                    ['name' => 'volunteer_url', 'value' => '/contact'],
                    ['name' => 'sponsor_title', 'value' => 'Sponsor or Partner'],
                    [
                        'name' => 'sponsor_text',
                        'value' => 'Local businesses and venues: partner with us on an open mic, a wellness event, or a yoga series and put your name behind something that matters.',
                    ],
                    ['name' => 'sponsor_cta', 'value' => 'PARTNER WITH US'],
                    ['name' => 'sponsor_url', 'value' => '/contact'],
                    ['name' => 'artists_title', 'value' => 'Artists & Practitioners'],
                    [
                        'name' => 'artists_text',
                        'value' => 'Want to be interviewed, perform, or lead a workshop? Reach out.',
                    ],
                    ['name' => 'artists_cta', 'value' => 'GET IN TOUCH'],
                    ['name' => 'artists_url', 'value' => '/contact'],
                ],
            ],
        ];

        $created = [];
        $skipped = [];

        foreach ($pages as $attributes) {
            $slug = $attributes['slug'];

            $page = Page::query()->firstOrCreate(
                ['slug' => $slug],
                $attributes
            );

            if ($page->wasRecentlyCreated) {
                $created[] = '/'.$slug;
            } else {
                $skipped[] = '/'.$slug;
            }
        }

        if ($created !== []) {
            $this->command?->info('Created: '.implode(', ', $created));
        }

        if ($skipped !== []) {
            $this->command?->warn('Already existed (left unchanged): '.implode(', ', $skipped));
        }

        // About Me page: create only when missing (AboutMePageSeeder has full content).
        if (! Page::query()->where('slug', 'the-adorable-savage')->exists()) {
            $this->call(AboutMePageSeeder::class);
        } else {
            $this->command?->warn('Already existed (left unchanged): /the-adorable-savage');
        }
    }
}
