<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('reading_progress');
        Schema::dropIfExists('books');

        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('title');
            $table->json('author');
            $table->unsignedInteger('year')->nullable();
            $table->json('genre')->nullable();
            $table->string('level')->default('intermediate');
            $table->string('cover_image')->nullable();
            $table->json('synopsis')->nullable();
            $table->json('chapters');
            $table->json('quizzes')->nullable();
            $table->json('tags')->nullable();
            $table->unsignedInteger('estimated_read_minutes')->default(5);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('is_catalog')->default(false);
            $table->timestamps();
        });

        Schema::create('reading_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('book_id')->constrained()->cascadeOnDelete();
            $table->string('status')->default('reading');
            $table->unsignedInteger('chapter_index')->default(0);
            $table->unsignedTinyInteger('progress_percent')->default(0);
            $table->timestamp('started_at')->nullable();
            $table->timestamp('last_read_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'book_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reading_progress');
        Schema::dropIfExists('books');

        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->foreignId('author_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->integer('year');
            $table->string('complexity')->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }
};
