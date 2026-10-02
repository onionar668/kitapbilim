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
    public function index(Request $request): JsonResponse
    {
        $user = $this->userFromRequest($request);

        $books = Book::query()
            ->with('creator')
            ->visibleTo($user)
            ->orderByDesc('is_catalog')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Book $book) => $book->toClientArray())
            ->values();

        return response()->json($books);
    }

    public function show(Request $request, Book $book): JsonResponse
    {
        $user = $this->userFromRequest($request);

        if (! $book->isVisibleTo($user)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

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
            'genre' => 'nullable|array',
            'synopsis' => 'nullable|array',
            'coverImage' => 'nullable|string',
            'tags' => 'nullable|array',
            'quizzes' => 'nullable|array',
            'estimatedReadMinutes' => 'nullable|integer|min:1',
            'year' => 'nullable|integer',
            'publishToCatalog' => 'nullable|boolean',
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
        $isCatalog = $isAdmin && $request->boolean('publishToCatalog', true);

        $book = Book::create(Book::fromClientPayload($request->all(), (int) $user->id, $isCatalog));
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

    public function update(Request $request, Book $book): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $isAdmin = $user->role === 'admin';
        $isOwner = (int) $book->created_by === (int) $user->id;

        if (! $isAdmin && ! $isOwner) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        if (! $isAdmin && $book->is_catalog) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validate = Validator::make($request->all(), [
            'title' => 'sometimes|array',
            'title.kk' => 'required_with:title|string',
            'author' => 'sometimes|array',
            'chapters' => 'sometimes|array|min:1',
            'level' => 'nullable|in:beginner,intermediate,advanced',
            'genre' => 'nullable|array',
            'synopsis' => 'nullable|array',
            'coverImage' => 'nullable|string',
            'tags' => 'nullable|array',
            'quizzes' => 'nullable|array',
            'estimatedReadMinutes' => 'nullable|integer|min:1',
            'year' => 'nullable|integer',
            'publishToCatalog' => 'nullable|boolean',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validate->errors(),
            ], 422);
        }

        $fields = [
            'title', 'author', 'year', 'genre', 'level', 'synopsis',
            'chapters', 'quizzes', 'tags', 'estimated_read_minutes',
        ];

        $map = [
            'coverImage' => 'cover_image',
            'estimatedReadMinutes' => 'estimated_read_minutes',
        ];

        foreach ($map as $clientKey => $dbKey) {
            if ($request->has($clientKey)) {
                $book->{$dbKey} = $request->input($clientKey);
            }
        }

        foreach ($fields as $key) {
            if ($request->has($key)) {
                $book->{$key} = $request->input($key);
            }
        }

        if ($isAdmin && $request->has('publishToCatalog')) {
            $book->is_catalog = (bool) $request->boolean('publishToCatalog');
        }

        $book->save();
        $book->load('creator');

        return response()->json($book->toClientArray());
    }

    private function userFromRequest(Request $request): ?User
    {
        $authenticated = Auth::user();
        if ($authenticated instanceof User) {
            return $authenticated;
        }

        $token = $request->bearerToken();

        return $token ? User::query()->where('api_token', $token)->first() : null;
    }
}
