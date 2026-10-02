<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'nazar@kitapbilim.kz'],
            [
                'name' => 'Назар Қабылов',
                'role' => 'user',
                'password' => 'password123',
            ]
        );

        User::updateOrCreate(
            ['email' => 'tima@example.com'],
            [
                'name' => 'Tima Admin',
                'role' => 'admin',
                'password' => '12345678',
            ]
        );

        $this->call(BookSeeder::class);
    }
}
