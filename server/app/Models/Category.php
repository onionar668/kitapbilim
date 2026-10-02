<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'label',
    ];

    protected function casts(): array
    {
        return [
            'label' => 'array',
        ];
    }

    /** @return array<string, mixed> */
    public function toClientArray(): array
    {
        $label = $this->label;
        if (! is_array($label) || $label === []) {
            $label = [
                'kk' => $this->name,
                'ru' => $this->name,
                'en' => $this->name,
            ];
        }

        return [
            'id' => (string) $this->id,
            'slug' => $this->slug ?? (string) $this->id,
            'label' => $label,
        ];
    }
}
