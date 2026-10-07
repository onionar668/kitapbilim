<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\ReadingProgress;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReadingProgressApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_reader_can_save_and_restore_chapter_scroll_position(): void
    {
        $user = User::factory()->create(['api_token' => 'reader-token']);
        $book = Book::create(Book::fromClientPayload([
            'id' => 'reading-progress-book',
            'title' => ['kk' => 'Кітап', 'ru' => 'Книга', 'en' => 'Book'],
            'author' => ['kk' => 'Автор', 'ru' => 'Автор', 'en' => 'Author'],
            'chapters' => [[
                'id' => 'chapter-1',
                'title' => ['kk' => 'Бөлім', 'ru' => 'Глава', 'en' => 'Chapter'],
                'content' => ['kk' => 'Мәтін', 'ru' => 'Текст', 'en' => 'Text'],
            ]],
        ], $user->id, true));

        $this->withToken('reader-token')
            ->postJson('/api/readings', [
                'bookId' => $book->slug,
                'status' => 'reading',
                'chapterIndex' => 0,
                'scrollPercent' => 63,
                'progressPercent' => 63,
            ])
            ->assertOk();

        $this->withToken('reader-token')
            ->getJson('/api/readings/'.$book->slug)
            ->assertOk()
            ->assertJsonPath('bookId', $book->slug)
            ->assertJsonPath('chapterIndex', 0)
            ->assertJsonPath('scrollPercent', 63)
            ->assertJsonPath('progressPercent', 63);

        $this->assertDatabaseHas('reading_progress', [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'scroll_percent' => 63,
        ]);
    }

    public function test_reader_progress_is_private_to_the_authenticated_user(): void
    {
        $owner = User::factory()->create();
        $reader = User::factory()->create(['api_token' => 'reader-token']);
        $book = Book::create(Book::fromClientPayload([
            'id' => 'private-reading-progress-book',
            'title' => ['kk' => 'Кітап', 'ru' => 'Книга', 'en' => 'Book'],
            'chapters' => [['id' => 'chapter-1', 'title' => [], 'content' => []]],
        ], $owner->id, false));

        $this->withToken('reader-token')
            ->getJson('/api/readings/'.$book->slug)
            ->assertForbidden();

        $this->assertDatabaseMissing('reading_progress', [
            'user_id' => $reader->id,
            'book_id' => $book->id,
        ]);
    }
}
