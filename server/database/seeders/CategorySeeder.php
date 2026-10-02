<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'slug' => 'kazakh-classics',
                'label' => ['kk' => 'Қазақ классикасы', 'ru' => 'Казахская классика', 'en' => 'Kazakh classics'],
            ],
            [
                'slug' => 'philosophy',
                'label' => ['kk' => 'Философия', 'ru' => 'Философия', 'en' => 'Philosophy'],
            ],
            [
                'slug' => 'world-literature',
                'label' => ['kk' => 'Әлем әдебиеті', 'ru' => 'Мировая литература', 'en' => 'World literature'],
            ],
            [
                'slug' => 'short-story',
                'label' => ['kk' => 'Әңгіме', 'ru' => 'Рассказ', 'en' => 'Short story'],
            ],
            [
                'slug' => 'epic',
                'label' => ['kk' => 'Дастан', 'ru' => 'Эпос', 'en' => 'Epic'],
            ],
        ];

        foreach ($items as $item) {
            Category::updateOrCreate(
                ['slug' => $item['slug']],
                [
                    'name' => $item['label']['ru'],
                    'label' => $item['label'],
                ]
            );
        }
    }
}
