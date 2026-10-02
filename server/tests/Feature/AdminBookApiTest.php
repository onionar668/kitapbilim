<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

    public function test_regular_user_cannot_access_admin_routes(): void
    {
        $user = User::factory()->create(['api_token' => 'user-token']);

        $this->withToken('user-token')
            ->getJson('/api/admin/users')
            ->assertForbidden();
    }
}
