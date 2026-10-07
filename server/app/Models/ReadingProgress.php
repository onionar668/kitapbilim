<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReadingProgress extends Model
{
    protected $table = 'reading_progress';

    protected $fillable = [
        'user_id',
        'book_id',
        'status',
        'chapter_index',
        'scroll_percent',
        'progress_percent',
        'started_at',
        'last_read_at',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'started_at' => 'datetime',
            'last_read_at' => 'datetime',
            'completed_at' => 'datetime',
            'chapter_index' => 'integer',
            'scroll_percent' => 'integer',
            'progress_percent' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
