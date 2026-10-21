<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

/**
 * Seeds ONLY Contact, Get Involved, and The Adorable Savage.
 *
 * Safe for live — does NOT touch Home, About, Programs, Events, or any other data.
 *
 *   php artisan db:seed --class=NewWebsitePagesSeeder --force
 *
 * Uses firstOrCreate by slug:
 * - page missing  → create with full content
 * - page already exists → leave it exactly as-is (no overwrite)
 */
class NewWebsitePagesSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => 'The Adorable Savage',
                'slug' => 'the-adorable-savage',
                'page_template' => 'adorable-savage',
                'image' => null,
                'description' => <<<'HTML'
<p>Adorable started out as a name I gave myself.</p>
<p>Savage came from a dear friend, someone who was able to see me just as I am. She reminded me that I have had savage moments in my life. Moments when I dug in, told the truth, and refused to quit. I hadn't been counting those. She had.</p>
<p>Adorable Savage stuck because it was true.</p>
<p>Adorable is the soft part; the part that feels everything, that cries, that cares, that stays open when it would be easier to shut down. Savage is the part that gets back up. The part that sets the boundary and does the hard thing anyway.</p>
<p>I used to think I had to choose. I've come to believe the opposite: that the whole point of being human is to carry both. And I believe every single person already does. Some have buried their adorability under years of being told they were too much or not enough. Some have lost their grip on their savage; it went quiet, or it turned into anger, or it turned on them. Some want more of it. Some want less.</p>
<p>Sometimes it takes a friend to see it in you before you can see it in yourself. That's what this organization is for. Whatever it is, I'm calling it your Adorable Savage, and we exist to help you find it.</p>
HTML,
                'status' => Page::STATUS_PUBLISHED,
                'seo_title' => 'The Adorable Savage — Our Story',
                'seo_description' => 'The Concept and a note from founder Lyann Noe — soft enough to feel it all, savage enough to keep going.',
                'ticker_text' => null,
                'custom_fields' => [
                    ['name' => 'eyebrow', 'value' => 'OUR STORY'],
                    ['name' => 'left_heading', 'value' => 'The Concept'],
                    ['name' => 'right_heading', 'value' => 'A Note from the Founder'],
                    [
                        'name' => 'founder_note',
                        'value' => <<<'HTML'
<p>I have 25 years of continued recovery from addiction. I am also a survivor of sexual, physical, emotional, mental, and verbal abuse. Along the way, people have asked me how I do it after all I've been through.</p>
<p>That is the savage part of me.</p>
<p>Here's what I've learned: what I have isn't a secret. Just like everyone else, I was given exactly what I needed, I just had to learn to see it. Somewhere in the mess, I began to see myself through a different pair of glasses. Glasses that were much clearer than the ones I'd been wearing. And with reassurance, I started to trust what I was seeing. I began to truly, honestly, freely love myself. Not the polished version. The whole being. Flaws and strengths, grit and tears, inside and out. That is the adorable part of me. And once that happened, the rest started to move. I could grieve. I could heal. I moved from victim to victor.</p>
<p>I could live without the things that used to run my life. Eventually I found myself loving me as much as I loved the people around me. I had always been able to love another person without loving myself but it wasn't real. It couldn't be. Now it is.</p>
<p>It was slow. It was adorable. And it was deeply, stubbornly savage.</p>
<p>My friends know me but not all of me. This organization is my way of opening the rest of it up, because I want you to see that if I could do this, you can do anything. You already have everything.</p>
HTML,
                    ],
                    [
                        'name' => 'founder_signature',
                        'value' => '— Lyann Noe, The Adorable Savage, Founder',
                    ],
                ],
            ],
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
    }
}
