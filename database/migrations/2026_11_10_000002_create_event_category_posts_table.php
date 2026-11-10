<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_category_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_category_id')
                ->constrained('event_category')
                ->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('image_url')->nullable();
            $table->string('video_url')->nullable();
            $table->longText('description')->nullable();
            $table->string('status')->default('draft')->index();
            $table->unsignedInteger('sort_order')->default(0);
            $table->string('seo_title')->nullable();
            $table->string('seo_description', 500)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_category_posts');
    }
};
