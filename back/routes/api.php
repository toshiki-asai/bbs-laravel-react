<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return response()->json(new UserResource($request->user()));
})->middleware('auth:sanctum');

Route::get('/', function () {
    return view('welcome');
});

Route::controller(RegisterController::class)->group(function () {
    //仮登録
    Route::post('/preregister', 'storePreRegister');
    //仮登録（メール認証）
    Route::get('/verify', 'verifyEmail')->middleware('signed')->name('preRegister.verifyEmail');

    Route::get('/register', 'register');

    Route::post('/register', 'store');
});

Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);

    Route::controller(PostController::class)->prefix('posts')->group(function () {
        Route::get('/', 'index');

        Route::post('/', 'store');

        Route::prefix('{post}')->whereUuid('post')->group(function () {
            Route::get('/', 'show');

            Route::get('/edit', 'edit')->can('update', 'post');

            Route::put('/', 'update')->can('update', 'post');

            Route::delete('/', 'destroy')->can('delete', 'post');
        });
    });
});
