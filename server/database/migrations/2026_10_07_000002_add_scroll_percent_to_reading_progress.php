<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reading_progress', function (Blueprint $table) {
            $table->unsignedTinyInteger('scroll_percent')->default(0)->after('chapter_index');
        });
    }

    public function down(): void
    {
        Schema::table('reading_progress', function (Blueprint $table) {
            $table->dropColumn('scroll_percent');
        });
    }
};
