<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->longText('ticker_text')->nullable()->after('description');
        });

        Schema::table('about_posts', function (Blueprint $table) {
            $table->longText('ticker_text')->nullable()->after('description');
        });

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

        DB::table('pages')
            ->where(function ($query) {
                $query->where('slug', 'home')
                    ->orWhere('page_template', 'home');
            })
            ->whereNull('ticker_text')
            ->update(['ticker_text' => $homeTicker]);

        $aboutTickers = [
            'verses' => implode("\n", [
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
            'unapologetic' => implode("\n", [
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
            'real' => implode("\n", [
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
        ];

        foreach (DB::table('about_posts')->whereNull('deleted_at')->get(['id', 'slug', 'title']) as $post) {
            $haystack = strtolower(($post->slug ?? '').' '.($post->title ?? ''));
            $ticker = null;

            if (str_contains($haystack, 'verses') && str_contains($haystack, 'vibes')) {
                $ticker = $aboutTickers['verses'];
            } elseif (str_contains($haystack, 'unapologetic') && str_contains($haystack, 'wellness')) {
                $ticker = $aboutTickers['unapologetic'];
            } elseif (str_contains($haystack, 'real') && str_contains($haystack, 'raw')) {
                $ticker = $aboutTickers['real'];
            }

            if ($ticker) {
                DB::table('about_posts')->where('id', $post->id)->update(['ticker_text' => $ticker]);
            }
        }
    }

    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropColumn('ticker_text');
        });

        Schema::table('about_posts', function (Blueprint $table) {
            $table->dropColumn('ticker_text');
        });
    }
};
