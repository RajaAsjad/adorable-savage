<?php

namespace Database\Seeders;

use App\Models\AboutPost;
use App\Models\Page;
use Illuminate\Database\Seeder;

class TickerSeeder extends Seeder
{
    public function run(): void
    {
        $homeTicker = implode("\n", [
            "YOU'RE SOFT.",
            "YOU'RE WILD.",
            "YOU'RE THE VIBE.",
            "YOU'RE ALLOWED TO REST.",
            "YOU'RE STILL HERE. THAT COUNTS.",
            "WHAT IF YOU'RE ALREADY ENOUGH?",
            "YOU'RE WONDERFUL.",
            "YOU'RE SAVAGE.",
            "YOU'RE ADORABLE.",
        ]);

        Page::query()
            ->where(function ($query) {
                $query->where('slug', 'home')
                    ->orWhere('page_template', 'home');
            })
            ->update(['ticker_text' => $homeTicker]);

        $aboutTickers = [
            [
                'match' => fn (string $haystack): bool => str_contains($haystack, 'verses')
                    && str_contains($haystack, 'vibes'),
                'ticker' => implode("\n", [
                    "YOU'RE THE BEAT.",
                    "YOU'RE THE CHORUS.",
                    "YOU'RE OFF-KEY AND STILL BEAUTIFUL.",
                    "YOU'RE LOUDER THAN YOUR DOUBTS.",
                    "YOU'RE THE VIBE.",
                    "YOU'RE A REMIX, NOT A MISTAKE.",
                    'WHAT SONG WOULD YOUR HEART PLAY RIGHT NOW?',
                    'PLAY IT.',
                    'PLAY IT TWICE.',
                    "YOU'RE THE SONG STUCK IN SOMEONE'S HEAD.",
                    "YOU'RE SAVAGE.",
                    "YOU'RE ADORABLE.",
                ]),
            ],
            [
                'match' => fn (string $haystack): bool => str_contains($haystack, 'unapologetic')
                    && str_contains($haystack, 'wellness'),
                'ticker' => implode("\n", [
                    "YOU'RE ALLOWED TO REST.",
                    "YOU'RE ALLOWED TO PLAY.",
                    "YOU'RE ALLOWED TO FEEL.",
                    "YOU'RE ALLOWED TO GROW.",
                    'WHAT ARE YOU WAITING FOR?',
                    'PERMISSION GRANTED.',
                    "YOU'RE NOT LAZY.",
                    "YOU'RE TIRED.",
                    'WHO TOLD YOU REST HAD TO BE EARNED?',
                    "YOU'RE WORTHY OF YOUR OWN CARE.",
                    'NO APOLOGY REQUIRED.',
                    'NO EXPLANATION OWED.',
                    "YOU'RE SAVAGE.",
                    "YOU'RE ADORABLE.",
                ]),
            ],
            [
                'match' => fn (string $haystack): bool => str_contains($haystack, 'real')
                    && str_contains($haystack, 'raw')
                    && str_contains($haystack, 'relat'),
                'ticker' => implode("\n", [
                    "YOU'RE NOT YOUR WORST DAY.",
                    "YOU'RE STILL HERE.",
                    'THAT COUNTS.',
                    "YOU'RE STARTING OVER, NOT STARTING FROM SCRATCH.",
                    "WHAT IF YOUR STORY ISN'T OVER?",
                    "IT'S NOT.",
                    "YOU'RE MESSY.",
                    "YOU'RE MAGNIFICENT.",
                    "YOU'RE NOT A BURDEN.",
                    "YOU'RE A BLESSING.",
                    'WHO WOULD YOU BE WITHOUT THE SHAME?',
                    "YOU'RE A SURVIVOR.",
                    "YOU'RE SAVAGE.",
                    "YOU'RE ADORABLE.",
                ]),
            ],
        ];

        AboutPost::query()
            ->get(['id', 'slug', 'title'])
            ->each(function (AboutPost $post) use ($aboutTickers) {
                $haystack = strtolower(($post->slug ?? '').' '.($post->title ?? ''));

                foreach ($aboutTickers as $config) {
                    if ($config['match']($haystack)) {
                        $post->forceFill(['ticker_text' => $config['ticker']])->save();

                        break;
                    }
                }
            });
    }
}
