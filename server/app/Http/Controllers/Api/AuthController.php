<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{


    public function register(Request $request): JsonResponse
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validate->errors(),
            ], 422);
        }

        $token = sha1(Str::random(40));

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'api_token' => $token,
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'token' => $token,
            'user' => $this->formatUser($user),
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validate = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validate->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $token = sha1(Str::random(40));
        $user->api_token = $token;
        $user->save();

        return response()->json([
            'message' => 'User login successfully',
            'token' => $token,
            'user' => $this->formatUser($user),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();

        return response()->json($this->formatUser($user));
    }

    public function logout(): JsonResponse
    {
        $user = Auth::user();

        if ($user instanceof User) {
            $user->api_token = null;
            $user->save();
        }

        return response()->json([
            'message' => 'Logged out',
        ]);
    }

    /** @return array<string, mixed> */
    private function formatUser(User $user): array
    {

        $colors = ['bg-amber-700', 'bg-emerald-700', 'bg-indigo-700', 'bg-rose-700', 'bg-cyan-700', 'bg-stone-800'];

        return [
            'id' => (string) $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role ?? 'user',
            'avatarColor' => $colors[((int) $user->id) % count($colors)],
            'joinedDate' => $user->created_at?->format('Y-m-d') ?? now()->format('Y-m-d'),
            'bio' => $user->role === 'admin'
                ? 'KitapBilim әкімші / Администратор'
                : 'Әдебиет сүйер оқырман / Любитель литературы',
        ];
    }
}
