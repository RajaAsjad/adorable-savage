<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_posts', function (Blueprint $table) {
            $table->unsignedInteger('sort_order')->default(0)->after('status');
        });

        $posts = DB::table('about_posts')
            ->whereNull('deleted_at')
            ->orderBy('id')
            ->get(['id']);

        foreach ($posts as $index => $post) {
            DB::table('about_posts')
                ->where('id', $post->id)
                ->update(['sort_order' => $index + 1]);
        }
    }

    public function down(): void
    {
        Schema::table('about_posts', function (Blueprint $table) {
            $table->dropColumn('sort_order');
        });
    }
};
