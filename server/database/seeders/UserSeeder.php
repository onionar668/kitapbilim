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
                'name' => 'Назар Қабылов',
                'role' => 'user',
                'password' => 'password123',
            ]
        );

        User::updateOrCreate(
            ['email' => 'aigerim@kitapbilim.kz'],
            [
                'name' => 'Айгерім Сәтбаева',
                'role' => 'user',
                'password' => 'password123',
            ]
        );

        User::updateOrCreate(
            ['email' => 'daniyar@kitapbilim.kz'],
            [
                'name' => 'Данияр Жұмабек',
                'role' => 'user',
                'password' => 'password123',
            ]
        );

        User::updateOrCreate(
            ['email' => 'admin@kitapbilim.kz'],
            [
                'name' => 'KitapBilim Admin',
                'role' => 'admin',
                'password' => 'admin12345',
            ]
        );
    }
}
