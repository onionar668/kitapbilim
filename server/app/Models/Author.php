<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = [
        'name'
    ];

    public function Book()
    {
        return $this->hasMany(Book::class);
    }
}
