<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::query()
            ->orderBy('name')
            ->get()
            ->map(fn (Category $category) => $category->toClientArray())
            ->values();

        return response()->json($categories);
    }

    public function store(Request $request): JsonResponse
    {
        $validate = Validator::make($request->all(), [
            'label' => 'required|array',
            'label.kk' => 'required|string|max:255',
            'label.ru' => 'required|string|max:255',
            'label.en' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:categories,slug',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validate->errors(),
            ], 422);
        }

        $label = $request->input('label');
        $slug = $request->input('slug') ?: str($label['en'] ?? $label['ru'])->slug()->toString();

        $category = Category::create([
            'slug' => $slug,
            'name' => $label['ru'] ?? $label['kk'],
            'label' => $label,
        ]);

        return response()->json($category->toClientArray(), 201);
    }

    public function update(Request $request, Category $category): JsonResponse
    {
        $validate = Validator::make($request->all(), [
            'label' => 'sometimes|array',
            'label.kk' => 'required_with:label|string|max:255',
            'label.ru' => 'required_with:label|string|max:255',
            'label.en' => 'required_with:label|string|max:255',
            'slug' => 'nullable|string|max:255|unique:categories,slug,'.$category->id,
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validate->errors(),
            ], 422);
        }

        if ($request->has('label')) {
            $label = $request->input('label');
            $category->label = $label;
            $category->name = $label['ru'] ?? $label['kk'];
        }

        if ($request->filled('slug')) {
            $category->slug = $request->input('slug');
        }

        $category->save();

        return response()->json($category->toClientArray());
    }

    public function destroy(Category $category): JsonResponse
    {
        $category->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
