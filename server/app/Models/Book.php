<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug',
        'title',
        'author',
        'year',
        'genre',
        'level',
        'cover_image',
        'synopsis',
        'chapters',
        'quizzes',
        'tags',
        'estimated_read_minutes',
        'created_by',
        'is_catalog',
    ];

    protected function casts(): array
    {
        return [
            'title' => 'array',
            'author' => 'array',
            'genre' => 'array',
            'synopsis' => 'array',
            'chapters' => 'array',
            'quizzes' => 'array',
            'tags' => 'array',
            'is_catalog' => 'boolean',
            'year' => 'integer',
            'estimated_read_minutes' => 'integer',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function readingProgress(): HasMany
    {
        return $this->hasMany(ReadingProgress::class);
    }

    public function scopeVisibleTo($query, ?User $user)
    {
        if ($user?->role === 'admin') {
            return $query;
        }

        return $query->where(function ($inner) use ($user) {
            $inner->where('is_catalog', true);
            if ($user) {
                $inner->orWhere('created_by', $user->id);
            }
        });
    }

    public function isVisibleTo(?User $user): bool
    {
        if ($this->is_catalog) {
            return true;
        }

        if ($user?->role === 'admin') {
            return true;
        }

        return $user !== null && (int) $this->created_by === (int) $user->id;
    }

    /** @param  array<string, mixed>  $payload */
    public static function fromClientPayload(array $payload, ?int $createdBy, bool $isCatalog): array
    {
        $title = $payload['title'] ?? [];
        $slug = $payload['id'] ?? null;
        if (! is_string($slug) || $slug === '') {
            $base = is_array($title) ? ($title['en'] ?? $title['ru'] ?? $title['kk'] ?? 'book') : 'book';
            $slug = str($base)->slug()->toString().'-'.uniqid();
        }

        return [
            'slug' => $slug,
            'title' => $title,
            'author' => $payload['author'] ?? ['kk' => '', 'ru' => '', 'en' => ''],
            'year' => $payload['year'] ?? (int) date('Y'),
            'genre' => $payload['genre'] ?? null,
            'level' => $payload['level'] ?? 'intermediate',
            'cover_image' => $payload['coverImage'] ?? null,
            'synopsis' => $payload['synopsis'] ?? null,
            'chapters' => $payload['chapters'] ?? [],
            'quizzes' => $payload['quizzes'] ?? null,
            'tags' => $payload['tags'] ?? null,
            'estimated_read_minutes' => $payload['estimatedReadMinutes'] ?? 5,
            'created_by' => $createdBy,
            'is_catalog' => $isCatalog,
        ];
    }

    /** @return array<string, mixed> */
    public function toClientArray(): array
    {
        return [
            'id' => $this->slug,
            'title' => $this->title,
            'author' => $this->author,
            'year' => $this->year,
            'genre' => $this->genre,
            'level' => $this->level,
            'coverImage' => $this->cover_image,
            'synopsis' => $this->synopsis,
            'chapters' => $this->chapters,
            'estimatedReadMinutes' => $this->estimated_read_minutes,
            'tags' => $this->tags,
            'createdByUserId' => $this->created_by ? (string) $this->created_by : null,
            'createdByUserName' => $this->creator?->name,
            'createdAt' => $this->created_at?->toIso8601String(),
            'quizzes' => $this->quizzes,
            'isCatalog' => $this->is_catalog,
        ];
    }
}
