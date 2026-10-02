<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    public function index(): JsonResponse
    {
        $books = Book::query()
            ->with('creator')
            ->orderByDesc('is_catalog')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Book $book) => $book->toClientArray())
            ->values();

        return response()->json($books);
    }

    public function show(Book $book): JsonResponse
    {
        $book->load('creator');

        return response()->json($book->toClientArray());
    }

    public function store(Request $request): JsonResponse
    {
        $validate = Validator::make($request->all(), [
            'title' => 'required|array',
            'title.kk' => 'required|string',
            'author' => 'required|array',
            'chapters' => 'required|array|min:1',
            'level' => 'nullable|in:beginner,intermediate,advanced',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validate->errors(),
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();
        $isAdmin = $user->role === 'admin';

        $book = Book::create(Book::fromClientPayload($request->all(), (int) $user->id, $isAdmin));
        $book->load('creator');

        return response()->json($book->toClientArray(), 201);
    }

    public function destroy(Book $book): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $isAdmin = $user->role === 'admin';
        $isOwner = (int) $book->created_by === (int) $user->id;

        if (! $isAdmin && ! $isOwner) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $book->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
