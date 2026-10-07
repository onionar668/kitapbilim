<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\ReadingProgress;
use App\Models\User;
use App\Services\PdfReaderServices;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminBookApiTest extends TestCase
{
    use RefreshDatabase;

    /** @return array<string, mixed> */
    private function bookPayload(string $id, bool $catalog = false): array
    {
        return [
            'id' => $id,
            'title' => ['kk' => 'Тест', 'ru' => 'Тест', 'en' => 'Test'],
            'author' => ['kk' => 'Автор', 'ru' => 'Автор', 'en' => 'Author'],
            'chapters' => [
                [
                    'id' => 'c1',
                    'title' => ['kk' => '1', 'ru' => '1', 'en' => '1'],
                    'content' => ['kk' => 'Мәтін', 'ru' => 'Текст', 'en' => 'Text'],
                ],
            ],
            'publishToCatalog' => $catalog,
        ];
    }

    public function test_guest_sees_only_catalog_books(): void
    {
        $owner = User::factory()->create();

        Book::create(Book::fromClientPayload($this->bookPayload('public-book', true), $owner->id, true));
        Book::create(Book::fromClientPayload($this->bookPayload('private-book', false), $owner->id, false));

        $this->getJson('/api/books')
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.id', 'public-book');
    }

    public function test_admin_can_create_catalog_book_and_list_users(): void
    {
        $admin = User::factory()->admin()->create(['api_token' => 'admin-token']);

        $this->withToken('admin-token')
            ->postJson('/api/books', $this->bookPayload('admin-catalog', true))
            ->assertCreated()
            ->assertJsonPath('isCatalog', true);

        $this->withToken('admin-token')
            ->getJson('/api/admin/users')
            ->assertOk()
            ->assertJsonFragment(['email' => $admin->email, 'role' => 'admin']);
    }

    public function test_regular_user_cannot_publish_to_catalog(): void
    {
        $user = User::factory()->create(['api_token' => 'user-token']);

        $this->withToken('user-token')
            ->postJson('/api/books', $this->bookPayload('user-private', true))
            ->assertCreated()
            ->assertJsonPath('isCatalog', false);
    }

    public function test_admin_can_create_book_with_data_url_cover_and_edit_its_content(): void
    {
        Storage::fake('public');
        $admin = User::factory()->admin()->create(['api_token' => 'admin-token']);
        $cover = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l2sAAAAASUVORK5CYII=';

        $createResponse = $this->withToken('admin-token')
            ->postJson('/api/books', [
                ...$this->bookPayload('cover-test'),
                'coverImage' => $cover,
            ])
            ->assertCreated()
            ->assertJsonPath('title.ru', 'Тест');

        $book = Book::where('slug', 'cover-test')->firstOrFail();
        $this->assertStringContainsString('/storage/book-covers/', $book->cover_image);
        $coverPath = parse_url($book->cover_image, PHP_URL_PATH);
        $this->assertTrue(Storage::disk('public')->exists(substr($coverPath, strlen('/storage/'))));

        $this->withToken('admin-token')
            ->putJson('/api/books/cover-test', [
                'title' => ['kk' => 'Жаңа', 'ru' => 'Новое', 'en' => 'Updated'],
                'chapters' => [[
                    'id' => 'c1',
                    'title' => ['kk' => '1', 'ru' => 'Глава 1', 'en' => 'Chapter 1'],
                    'content' => ['kk' => 'Жаңа мәтін', 'ru' => 'Новый текст', 'en' => 'New text'],
                ]],
            ])
            ->assertOk()
            ->assertJsonPath('title.ru', 'Новое')
            ->assertJsonPath('chapters.0.content.ru', 'Новый текст')
            ->assertJsonPath('coverImage', $book->cover_image);

        $this->assertSame('Новое', $book->fresh()->title['ru']);
        $this->assertSame('Новый текст', $book->fresh()->chapters[0]['content']['ru']);
        $this->assertSame($admin->id, $book->fresh()->created_by);
    }

    public function test_admin_can_create_book_with_uploaded_cover_file(): void
    {
        Storage::fake('public');
        User::factory()->admin()->create(['api_token' => 'upload-token']);

        $response = $this->withToken('upload-token')
            ->post('/api/books', [
                ...$this->bookPayload('uploaded-cover'),
                'coverImage' => UploadedFile::fake()->image('cover.jpg')->size(6 * 1024),
            ]);

        $response->assertCreated();
        $book = Book::where('slug', 'uploaded-cover')->firstOrFail();
        $this->assertStringContainsString('/storage/book-covers/', $book->cover_image);
        $coverPath = parse_url($book->cover_image, PHP_URL_PATH);
        $this->assertTrue(Storage::disk('public')->exists(substr($coverPath, strlen('/storage/'))));
    }

    public function test_admin_can_upload_cover_larger_than_20_mb(): void
    {
        User::factory()->admin()->create(['api_token' => 'upload-token']);

        $response = $this->withToken('upload-token')
            ->post('/api/books', [
                ...$this->bookPayload('oversized-cover'),
                'coverImage' => UploadedFile::fake()->image('cover.jpg')->size(20 * 1024 + 1),
            ]);

        $response->assertCreated();
        $this->assertDatabaseHas('books', ['slug' => 'oversized-cover']);
    }

    public function test_admin_can_extract_text_from_uploaded_pdf(): void
    {
        User::factory()->admin()->create(['api_token' => 'pdf-token']);
        $this->mock(PdfReaderServices::class, function ($mock): void {
            $mock->shouldReceive('readPdf')
                ->once()
                ->andReturn("  Extracted book text\n");
        });

        $this->withToken('pdf-token')
            ->post('/api/admin/books/extract-pdf', [
                'pdf' => UploadedFile::fake()->create('book.pdf', 14 * 1024, 'application/pdf'),
            ])
            ->assertOk()
            ->assertJsonPath('text', 'Extracted book text');
    }

    public function test_regular_user_cannot_extract_text_from_pdf(): void
    {
        User::factory()->create(['api_token' => 'user-token']);

        $this->withToken('user-token')
            ->post('/api/admin/books/extract-pdf', [
                'pdf' => UploadedFile::fake()->create('book.pdf', 1, 'application/pdf'),
            ])
            ->assertForbidden();
    }

    public function test_regular_user_cannot_access_admin_routes(): void
    {
        $user = User::factory()->create(['api_token' => 'user-token']);

        $this->withToken('user-token')
            ->getJson('/api/admin/users')
            ->assertForbidden();
    }

    public function test_admin_can_move_a_book_to_trash_and_restore_it(): void
    {
        Storage::fake('public');
        User::factory()->admin()->create(['api_token' => 'trash-token']);
        $book = Book::create(Book::fromClientPayload($this->bookPayload('trash-restore', true), null, true));
        Storage::disk('public')->put('book-covers/trash-restore.jpg', 'cover');
        $book->update(['cover_image' => '/storage/book-covers/trash-restore.jpg']);

        $this->withToken('trash-token')
            ->deleteJson('/api/books/trash-restore')
            ->assertOk();

        $this->assertSoftDeleted('books', ['slug' => 'trash-restore']);
        $this->assertTrue(Storage::disk('public')->exists('book-covers/trash-restore.jpg'));
        $this->withToken('trash-token')
            ->getJson('/api/books')
            ->assertOk()
            ->assertJsonMissing(['id' => 'trash-restore']);

        $this->withToken('trash-token')
            ->getJson('/api/admin/books/trash')
            ->assertOk()
            ->assertJsonPath('0.id', 'trash-restore')
            ->assertJsonPath('0.deletedAt', fn ($value) => is_string($value));

        $this->withToken('trash-token')
            ->postJson('/api/admin/books/trash/trash-restore/restore')
            ->assertOk()
            ->assertJsonPath('id', 'trash-restore');

        $this->assertDatabaseHas('books', ['slug' => 'trash-restore', 'deleted_at' => null]);
        $this->assertTrue(Storage::disk('public')->exists('book-covers/trash-restore.jpg'));
    }

    public function test_admin_can_permanently_delete_trashed_book_and_its_progress(): void
    {
        Storage::fake('public');
        $admin = User::factory()->admin()->create(['api_token' => 'purge-token']);
        $reader = User::factory()->create();
        $book = Book::create(Book::fromClientPayload($this->bookPayload('trash-purge', true), null, true));
        Storage::disk('public')->put('book-covers/trash-purge.jpg', 'cover');
        $book->update(['cover_image' => '/storage/book-covers/trash-purge.jpg']);
        ReadingProgress::create([
            'user_id' => $reader->id,
            'book_id' => $book->id,
            'status' => 'reading',
            'chapter_index' => 0,
            'progress_percent' => 10,
        ]);

        $this->withToken('purge-token')
            ->deleteJson('/api/books/trash-purge')
            ->assertOk();

        $this->withToken('purge-token')
            ->deleteJson('/api/admin/books/trash/trash-purge')
            ->assertOk();

        $this->assertDatabaseMissing('books', ['slug' => 'trash-purge']);
        $this->assertDatabaseMissing('reading_progress', ['book_id' => $book->id]);
        $this->assertFalse(Storage::disk('public')->exists('book-covers/trash-purge.jpg'));
    }

    public function test_regular_user_cannot_manage_admin_book_trash(): void
    {
        User::factory()->create(['api_token' => 'regular-trash-token']);

        $this->withToken('regular-trash-token')
            ->getJson('/api/admin/books/trash')
            ->assertForbidden();

        $this->withToken('regular-trash-token')
            ->postJson('/api/admin/books/trash/missing/restore')
            ->assertForbidden();

        $this->withToken('regular-trash-token')
            ->deleteJson('/api/admin/books/trash/missing')
            ->assertForbidden();
    }
}
