<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_category_id')
                ->constrained('event_category')
                ->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->date('event_date')->nullable()->index();
            $table->string('image_url')->nullable();
            $table->longText('description')->nullable();
            $table->string('status')->default('draft')->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
