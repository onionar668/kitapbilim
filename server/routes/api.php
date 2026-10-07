<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ReadingController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{book}', [BookController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);

Route::middleware(AuthMiddleware::class)->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/books', [BookController::class, 'store']);
    Route::put('/books/{book}', [BookController::class, 'update']);
    Route::delete('/books/{book}', [BookController::class, 'destroy']);
    Route::get('/readings/{book}', [ReadingController::class, 'show']);
    Route::post('/readings', [ReadingController::class, 'upsert']);

    Route::middleware(AdminMiddleware::class)->group(function () {
        Route::get('/admin/users', [AdminController::class, 'users']);
        Route::get('/admin/readers', [ReadingController::class, 'adminIndex']);
        Route::post('/admin/books/extract-pdf', [BookController::class, 'extractPdfText']);
        Route::get('/admin/books/trash', [BookController::class, 'trash']);
        Route::post('/admin/books/trash/{slug}/restore', [BookController::class, 'restore']);
        Route::delete('/admin/books/trash/{slug}', [BookController::class, 'forceDestroy']);
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{category}', [CategoryController::class, 'update']);
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
    });
});
