<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'nazar@kitapbilim.kz'],
            [
                'name' => 'Назар Миратович',
                'role' => 'user',
                'password' => 'password123',
            ]
        );

        User::updateOrCreate(
            ['email' => 'ainel@kitapbilim.kz'],
            [
                'name' => 'Айнель Кумаровна',
                'role' => 'user',
                'password' => 'password123',
            ]
        );

        User::updateOrCreate(
            ['email' => 'adil@kitapbilim.kz'],
            [
                'name' => 'Адиль Муратович',
                'role' => 'user',
                'password' => 'password123',
            ]
        );

        User::updateOrCreate(
            ['email' => 'admin@kitapbilim.kz'],
            [
                'name' => 'Tемерлан Айдарович',
                'role' => 'admin',
                'password' => 'admin12345',
            ]
        );
    }
}
