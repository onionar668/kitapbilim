<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\User;
use App\Services\PdfReaderServices;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use RuntimeException;
use Throwable;

class BookController extends Controller
{
    public function __construct(
        private readonly PdfReaderServices $pdfReader,
    ) {}

    private const MAX_COVER_IMAGE_BYTES = 100 * 1024 * 1024;

    public function extractPdfText(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'pdf' => 'required|file|mimes:pdf',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        /** @var UploadedFile $pdf */
        $pdf = $validator->validated()['pdf'];

        try {
            $text = trim($this->pdfReader->readPdf($pdf->getPathname()));
        } catch (Throwable $error) {
            report($error);

            return response()->json([
                'message' => 'Could not extract text from this PDF. Make sure the PDF is readable and try again.',
            ], 422);
        }

        if ($text === '') {
            return response()->json([
                'message' => 'No text could be extracted from this PDF.',
            ], 422);
        }

        return response()->json(['text' => $text]);
    }

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
        $validator = Validator::make($request->all(), $this->bookRules(true));
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }
        $payload = $validator->validated();

        /** @var User $user */
        $user = Auth::user();
        $isAdmin = $user->role === 'admin';
        $isCatalog = $isAdmin && $request->boolean('publishToCatalog', true);

        [$coverImage, $newCoverPath] = $this->storeCoverImage(
            $request->file('coverImage'),
            $payload['coverImage'] ?? null,
        );
        $payload['coverImage'] = $coverImage;

        try {
            $book = DB::transaction(fn () => Book::create(
                Book::fromClientPayload($payload, (int) $user->id, $isCatalog)
            ));
        } catch (Throwable $error) {
            $this->deleteStoredCover($newCoverPath);
            throw $error;
        }

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

        if ($isAdmin) {
            $book->delete();

            return response()->json(['message' => 'Moved to trash']);
        }

        $coverPath = $this->storedCoverPath($book->cover_image);
        $book->forceDelete();
        $this->deleteStoredCover($coverPath);

        return response()->json(['message' => 'Deleted']);
    }

    public function trash(): JsonResponse
    {
        $books = Book::onlyTrashed()
            ->with('creator')
            ->orderByDesc('deleted_at')
            ->get()
            ->map(fn (Book $book): array => [
                ...$book->toClientArray(),
                'deletedAt' => $book->deleted_at?->toISOString(),
            ])
            ->values();

        return response()->json($books);
    }

    public function restore(string $slug): JsonResponse
    {
        $book = Book::onlyTrashed()->where('slug', $slug)->firstOrFail();
        $book->restore();
        $book->load('creator');

        return response()->json($book->toClientArray());
    }

    public function forceDestroy(string $slug): JsonResponse
    {
        $book = Book::onlyTrashed()->where('slug', $slug)->firstOrFail();
        $coverPath = $this->storedCoverPath($book->cover_image);
        $book->forceDelete();
        $this->deleteStoredCover($coverPath);

        return response()->json(['message' => 'Permanently deleted']);
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

        $validator = Validator::make($request->all(), $this->bookRules(false));
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }
        $payload = $validator->validated();

        $fields = [
            'title', 'author', 'year', 'genre', 'level', 'synopsis',
            'chapters', 'quizzes', 'tags',
        ];

        $map = [
            'estimatedReadMinutes' => 'estimated_read_minutes',
        ];

        $oldCoverPath = null;
        $newCoverPath = null;
        if (array_key_exists('coverImage', $payload)) {
            $oldCoverPath = $this->storedCoverPath($book->cover_image);
            [$book->cover_image, $newCoverPath] = $this->storeCoverImage(
                $request->file('coverImage'),
                $payload['coverImage'],
            );
        }

        foreach ($map as $clientKey => $dbKey) {
            if (array_key_exists($clientKey, $payload)) {
                $book->{$dbKey} = $payload[$clientKey];
            }
        }

        foreach ($fields as $key) {
            if (array_key_exists($key, $payload)) {
                $book->{$key} = $payload[$key];
            }
        }

        if ($isAdmin && array_key_exists('publishToCatalog', $payload)) {
            $book->is_catalog = (bool) $payload['publishToCatalog'];
        }

        try {
            DB::transaction(fn () => $book->save());
        } catch (Throwable $error) {
            $this->deleteStoredCover($newCoverPath);
            throw $error;
        }

        if ($oldCoverPath !== $newCoverPath) {
            $this->deleteStoredCover($oldCoverPath);
        }

        $book->load('creator');

        return response()->json($book->toClientArray());
    }

    /**
     * @return array<string, mixed>
     */
    private function bookRules(bool $creating): array
    {
        $titleRule = $creating ? 'required|array' : 'sometimes|array';
        $titleKkRule = $creating
            ? 'required|string|max:255'
            : 'required_with:title|string|max:255';

        return [
            'id' => 'nullable|string|max:255',
            'title' => $titleRule,
            'title.kk' => $titleKkRule,
            'title.ru' => 'nullable|string|max:255',
            'title.en' => 'nullable|string|max:255',
            'author' => $creating ? 'required|array' : 'sometimes|array',
            'author.kk' => 'nullable|string|max:255',
            'author.ru' => 'nullable|string|max:255',
            'author.en' => 'nullable|string|max:255',
            'year' => 'nullable|integer|min:0|max:9999',
            'genre' => 'nullable|array',
            'genre.kk' => 'nullable|string|max:255',
            'genre.ru' => 'nullable|string|max:255',
            'genre.en' => 'nullable|string|max:255',
            'level' => 'nullable|in:beginner,intermediate,advanced',
            'synopsis' => 'nullable|array',
            'synopsis.kk' => 'nullable|string',
            'synopsis.ru' => 'nullable|string',
            'synopsis.en' => 'nullable|string',
            'chapters' => $creating ? 'required|array|min:1' : 'sometimes|array|min:1',
            'chapters.*.id' => 'nullable|string|max:255',
            'chapters.*.title' => 'required_with:chapters|array',
            'chapters.*.title.kk' => 'nullable|string|max:255',
            'chapters.*.title.ru' => 'nullable|string|max:255',
            'chapters.*.title.en' => 'nullable|string|max:255',
            'chapters.*.content' => 'required_with:chapters|array',
            'chapters.*.content.kk' => 'nullable|string',
            'chapters.*.content.ru' => 'nullable|string',
            'chapters.*.content.en' => 'nullable|string',
            'quizzes' => 'nullable|array',
            'tags' => 'nullable|array',
            'estimatedReadMinutes' => 'nullable|integer|min:1',
            'publishToCatalog' => 'nullable|boolean',
            'coverImage' => [
                'sometimes',
                'nullable',
                function (string $attribute, mixed $value, \Closure $fail): void {
                    if ($value instanceof UploadedFile) {
                        if (
                            ! $value->isValid()
                            || $value->getSize() > self::MAX_COVER_IMAGE_BYTES
                            || ! in_array($this->imageMimeType($value->getPathname()), ['image/jpeg', 'image/png', 'image/webp'], true)
                        ) {
                            $fail('The cover image must be a valid JPEG, PNG, or WebP image no larger than 20 MB.');
                        }

                        return;
                    }

                    $maxDataUrlLength = (int) ceil(self::MAX_COVER_IMAGE_BYTES * 4 / 3) + 128;
                    if (! is_string($value) || strlen($value) > $maxDataUrlLength) {
                        $fail('The cover image must be a supported image or image URL.');

                        return;
                    }

                    if ($value === '' || ! str_starts_with($value, 'data:')) {
                        if (strlen($value) > 2048) {
                            $fail('The cover image URL is too long.');
                        }

                        return;
                    }

                    if (! preg_match('#^data:image/(jpeg|png|webp);base64,([A-Za-z0-9+/]*={0,2})$#', $value, $matches)) {
                        $fail('The cover image data is invalid.');

                        return;
                    }

                    $bytes = base64_decode($matches[2], true);
                    if (
                        $bytes === false
                        || strlen($bytes) > self::MAX_COVER_IMAGE_BYTES
                        || $this->imageMimeTypeFromBytes($bytes) !== 'image/'.$matches[1]
                    ) {
                        $fail('The cover image must be a valid JPEG, PNG, or WebP image no larger than 20 MB.');
                    }
                },
            ],
        ];
    }

    /**
     * @return array{0: ?string, 1: ?string}
     */
    private function storeCoverImage(?UploadedFile $file, mixed $value): array
    {
        if ($file !== null) {
            $path = $file->storePublicly('book-covers', 'public');
            if (! is_string($path)) {
                throw new RuntimeException('Failed to store the uploaded book cover.');
            }

            /** @var FilesystemAdapter $disk */
            $disk = Storage::disk('public');

            return [$disk->url($path), $path];
        }

        if (! is_string($value) || $value === '') {
            return [null, null];
        }

        if (preg_match('#^data:image/(jpeg|png|webp);base64,([A-Za-z0-9+/]*={0,2})$#', $value, $matches)) {
            $bytes = base64_decode($matches[2], true);
            if ($bytes === false) {
                throw new RuntimeException('Failed to decode the uploaded book cover.');
            }

            $extension = match ($matches[1]) {
                'jpeg' => 'jpg',
                'png' => 'png',
                'webp' => 'webp',
            };
            $path = 'book-covers/'.Str::uuid().'.'.$extension;
            if (! Storage::disk('public')->put($path, $bytes)) {
                throw new RuntimeException('Failed to store the uploaded book cover.');
            }

            /** @var FilesystemAdapter $disk */
            $disk = Storage::disk('public');

            return [$disk->url($path), $path];
        }

        return [$value, null];
    }

    private function imageMimeType(string $path): ?string
    {
        $image = @getimagesize($path);

        return is_array($image) ? ($image['mime'] ?? null) : null;
    }

    private function imageMimeTypeFromBytes(string $bytes): ?string
    {
        $image = @getimagesizefromstring($bytes);

        return is_array($image) ? ($image['mime'] ?? null) : null;
    }

    private function storedCoverPath(?string $coverImage): ?string
    {
        if (! is_string($coverImage) || $coverImage === '') {
            return null;
        }

        $path = parse_url($coverImage, PHP_URL_PATH);
        if (! is_string($path) || ! str_starts_with($path, '/storage/book-covers/')) {
            return null;
        }

        return substr($path, strlen('/storage/'));
    }

    private function deleteStoredCover(?string $path): void
    {
        if ($path !== null) {
            Storage::disk('public')->delete($path);
        }
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
