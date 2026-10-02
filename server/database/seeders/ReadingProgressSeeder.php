<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\ReadingProgress;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReadingProgressSeeder extends Seeder
{
    public function run(): void
    {
        $nazar = User::query()->where('email', 'nazar@kitapbilim.kz')->first();
        $aigerim = User::query()->where('email', 'aigerim@kitapbilim.kz')->first();
        $daniyar = User::query()->where('email', 'daniyar@kitapbilim.kz')->first();

        $abai = Book::query()->where('slug', 'abai-words')->first();
        $readingNation = Book::query()->where('slug', 'reading-nation')->first();
        $anyCatalog = Book::query()->where('is_catalog', true)->first();

        $pairs = [
            [$nazar, $abai ?? $anyCatalog, 'reading', 0, 24],
            [$aigerim, $readingNation ?? $anyCatalog, 'completed', 0, 100],
            [$daniyar, $abai ?? $anyCatalog, 'reading', 1, 48],
        ];

        foreach ($pairs as [$user, $book, $status, $chapter, $percent]) {
            if (! $user || ! $book) {
                continue;
            }

            ReadingProgress::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'book_id' => $book->id,
                ],
                [
                    'status' => $status,
                    'chapter_index' => $chapter,
                    'progress_percent' => $percent,
                    'started_at' => now()->subDays(3),
                    'last_read_at' => now()->subHours(2),
                    'completed_at' => $status === 'completed' ? now()->subDay() : null,
                ]
            );
        }
    }
}
