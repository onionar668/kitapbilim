<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    public function users(): JsonResponse
    {
        $users = User::query()
            ->with([
                'readingProgress' => fn ($query) => $query
                    ->with('book:id,slug,title,author')
                    ->orderByDesc('last_read_at'),
            ])
            ->orderBy('role')
            ->orderBy('name')
            ->get()
            ->map(function (User $user) {
                $latest = $user->readingProgress->first();

                return [
                    'id' => (string) $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role ?? 'user',
                    'joinedDate' => $user->created_at?->format('Y-m-d'),
                    'readingsCount' => $user->readingProgress->count(),
                    'currentBook' => $latest?->book ? [
                        'id' => $latest->book->slug,
                        'title' => $latest->book->title,
                        'author' => $latest->book->author,
                        'status' => $latest->status,
                        'progressPercent' => $latest->progress_percent,
                        'lastReadAt' => $latest->last_read_at?->toIso8601String(),
                    ] : null,
                ];
            })
            ->values();

        return response()->json($users);
    }
}
