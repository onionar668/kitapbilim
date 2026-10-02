<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\ReadingController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{book}', [BookController::class, 'show']);

Route::middleware(AuthMiddleware::class)->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/books', [BookController::class, 'store']);
    Route::delete('/books/{book}', [BookController::class, 'destroy']);
    Route::post('/readings', [ReadingController::class, 'upsert']);

    Route::middleware(AdminMiddleware::class)->group(function () {
        Route::get('/admin/readers', [ReadingController::class, 'adminIndex']);
    });
});
