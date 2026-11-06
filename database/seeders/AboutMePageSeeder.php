<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

/**
 * Updates /the-adorable-savage with the FINAL About Me page content.
 * Content + bold spans match FINAL_ABOUT_ME_PAGE_-_NEW_TAS.docx.
 *
 * Live after deploy (overwrites this page only):
 *   php artisan db:seed --class=AboutMePageSeeder --force
 */
class AboutMePageSeeder extends Seeder
{
    public function run(): void
    {
        $attributes = [
            'title' => 'The Adorable Savage',
            'slug' => 'the-adorable-savage',
            'page_template' => 'adorable-savage',
            'image' => null,
            'status' => Page::STATUS_PUBLISHED,
            'seo_title' => 'About Me — The Adorable Savage',
            'seo_description' => 'Cute is given. Adorable is earned. Meet Lyann Noe — The Adorable Savage. Soft enough to feel it all. Savage enough to keep going.',
            'ticker_text' => "CUTE IS GIVEN.\nADORABLE IS EARNED.\nSOFT ON PURPOSE.\nSAVAGE ENOUGH TO RISE.\nBOTH. ALWAYS.",
            // Intro under tagline (doc para after "Cute is given…")
            'description' => <<<'HTML'
<p>A puppy is cute. A baby is cute. But a woman who survived abuse, did the therapy, and stayed in recovery for 25 years, and still chose to stay soft, still feels everything, still loves? That's not cute. That's Adorable. It's cute that's been through the fire and came out tender on purpose.</p>
HTML,
            'custom_fields' => [
                ['name' => 'eyebrow', 'value' => 'ABOUT ME'],
                // Bold in doc
                ['name' => 'tagline', 'value' => 'Cute is given. Adorable is earned.'],
                ['name' => 'meet_heading', 'value' => 'Meet The Adorable Savage'],
                [
                    'name' => 'meet_body',
                    'value' => <<<'HTML'
<p>I've worn a lot of glasses in my life. The ones that told me I was too much. The ones that told me I wasn't enough.</p>
<p>Then I found a clearer pair.</p>
<p>Through these, I could finally see that Adorable is something you earn. It's the woman who survived what should have hardened her and chose to stay soft anyway. Adorable isn't just the outside; it's the inside. It's the part that feels everything, that cares, that stays open when shutting down would be so much easier.</p>
<p>After 25 years of continuous recovery, years of therapy, and more than my share of being hurt, I'll say it plainly: I've risen to the top of Adorable. Not despite what I've been through. Because of it.</p>
<p>Savage came later, from a friend who saw it in me in a single moment. The Savage is the part that gets back up. The part that sets the boundary and does the hard thing anyway.</p>
<p>I know the ground I'm standing on. Twenty-five years of recovery from addiction. A survivor of abuse in just about every form it comes in: sexual, physical, emotional, mental, verbal. People have asked me how I made it through all of that.</p>
<p>That's the Savage.</p>
<p>But here's what I've learned: what I have isn't a secret. I was given exactly what I needed; I just had to learn to see it. Somewhere in the mess, I started looking through those clearer glasses, and with a little reassurance, I began to trust what I saw. I started to truly, honestly, freely love myself. Not the polished version. The whole being. Flaws and strengths, grit and tears, inside and out.</p>
<p>That's the Adorable.</p>
<p>And once that happened, the rest started to move. I could grieve. I could heal. I went from victim to victor. I could live without the things that used to run my life. Eventually I loved myself as much as I loved the people around me. I'd always been able to love others without loving myself, but it wasn't real. It couldn't be.</p>
<p>Now it is.</p>
<p>It was slow. It was Adorable. And it was deeply, stubbornly Savage.</p>
<p>My friends know me, but not all of me. This is my way of opening up the rest, because I want you to see that if I could do this, you can do anything.</p>
HTML,
                ],
                ['name' => 'pull_quote', 'value' => 'Adorable Savage. Both. Always.'],
                [
                    'name' => 'origin_heading',
                    'value' => 'How I Became The Adorable Savage',
                ],
                [
                    'name' => 'origin_body',
                    'value' => <<<'HTML'
<p><strong>Adorable</strong> has always been a word I've used for myself.</p>
<p><strong>Savage</strong> came later, during a self-awareness program. In the middle of one exercise, I realized I wasn't only adorable. I was also facing the version of myself that had been holding me back from becoming the woman I wanted to be.</p>
<p>I said the word "Adorable" out loud. And from the back of the room, my friend Mike yelled:</p>
<p><strong>"SAVAGE!"</strong></p>
<p>And it hit. 🔥</p>
<p>It went right past my surface and deeper, like it went into my cells. I yelled back, <strong>"YEAH! YEAH! I am The Adorable Savage!"</strong></p>
<p><strong>In that moment, The Adorable Savage was born.</strong></p>
<p>Since then, some of my friends call me The Adorable Savage, and some have no idea. Now you know.</p>
<p>When I look back at the trials and tribulations I've been through, I see that <strong>the savage part of me is the fighter.</strong> She's the one who refused to give up, kept getting back up, and did the hard thing anyway, even when I didn't know she was there.</p>
<p>Adorable is the soft part of me. She feels everything, cries, cares, and stays open when it would be easier to shut down.</p>
<p>I used to think I had to choose. Now I carry both, and that's who I am. My life is proof of what can happen when you believe in yourself, love yourself, and keep showing up, all at the same time.</p>
<p><strong>What could you do if you truly believed in yourself?</strong></p>
HTML,
                ],
                ['name' => 'today_heading', 'value' => 'Who I Am Today'],
                [
                    'name' => 'today_body',
                    'value' => <<<'HTML'
<p>Today I live in Florida, the place I came back home to.</p>
<p>My faith is my foundation. My strength is rooted in truth. And I live by the same words I've always lived by: <strong>do the next right thing and trust the process.</strong></p>
<p>Music has always been where I go to be lifted, or to calm down when I need it most. Sometimes I hear a song and it's saying the exact words I've been wanting to say. That feeling is where <strong>Verses and Vibes with The Adorable Savage</strong> came from. 🎶</p>
<p>Essential oils and recovery are part of my everyday life. They're not things I do once in a while. They're how I take care of myself, one day at a time. 🌿</p>
<p>And what I'm most proud of? <strong>Twenty-five years of continued sobriety.</strong> 💪 Every one of those days counts, and I'm grateful for every single one.</p>
<p><strong>I am.</strong></p>
<p><strong>I am The Adorable Savage.</strong></p>
<p><strong>And I'm just getting started.</strong> 🔥</p>
HTML,
                ],
            ],
        ];

        Page::query()->updateOrCreate(
            ['slug' => 'the-adorable-savage'],
            $attributes
        );

        $this->command?->info('Updated /the-adorable-savage with FINAL About Me content (incl. bold spans).');
    }
}
