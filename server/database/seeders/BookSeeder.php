<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/books.json');
        if (! is_file($path)) {
            return;
        }

        $items = json_decode((string) file_get_contents($path), true);
        if (! is_array($items)) {
            return;
        }

        foreach ($items as $item) {
            $payload = Book::fromClientPayload($item, null, true);
            Book::updateOrCreate(
                ['slug' => $payload['slug']],
                $payload
            );
        }
    }
}
