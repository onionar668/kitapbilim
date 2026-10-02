<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\ReadingProgress;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReadingController extends Controller
{
    public function upsert(Request $request): JsonResponse
    {
        $validate = Validator::make($request->all(), [
            'bookId' => 'required|string',
            'status' => 'nullable|in:reading,completed',
            'chapterIndex' => 'nullable|integer|min:0',
            'progressPercent' => 'nullable|integer|min:0|max:100',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validate->errors(),
            ], 422);
        }

        $book = Book::where('slug', $request->input('bookId'))->first();
        if (! $book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        /** @var User $user */
        $user = Auth::user();
        $status = $request->input('status', 'reading');
        $now = now();

        $progress = ReadingProgress::query()->firstOrNew([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        if (! $progress->exists) {
            $progress->started_at = $now;
        }

        $progress->status = $status;
        $progress->chapter_index = (int) $request->input('chapterIndex', $progress->chapter_index ?? 0);
        $progress->progress_percent = (int) $request->input('progressPercent', $progress->progress_percent ?? 0);
        $progress->last_read_at = $now;
        $progress->completed_at = $status === 'completed' ? $now : null;
        $progress->save();

        return response()->json(['message' => 'Saved']);
    }

    public function adminIndex(): JsonResponse
    {
        $rows = ReadingProgress::query()
            ->with(['user:id,name,email', 'book:id,slug,title,author'])
            ->whereHas('user', fn ($q) => $q->where('role', '!=', 'admin'))
            ->orderByDesc('last_read_at')
            ->get()
            ->map(function (ReadingProgress $row) {
                $title = $row->book?->title ?? [];
                $author = $row->book?->author ?? [];

                return [
                    'id' => $row->id,
                    'user' => [
                        'id' => (string) $row->user_id,
                        'name' => $row->user?->name,
                        'email' => $row->user?->email,
                    ],
                    'book' => [
                        'id' => $row->book?->slug,
                        'title' => $title,
                        'author' => $author,
                    ],
                    'status' => $row->status,
                    'chapterIndex' => $row->chapter_index,
                    'progressPercent' => $row->progress_percent,
                    'startedAt' => $row->started_at?->toIso8601String(),
                    'lastReadAt' => $row->last_read_at?->toIso8601String(),
                    'completedAt' => $row->completed_at?->toIso8601String(),
                ];
            })
            ->values();

        return response()->json($rows);
    }
}
