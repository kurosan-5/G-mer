<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\CommentLikeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Models\User;

use App\Http\Controllers\Auth\AuthController;


use App\Http\Controllers\PostController;
Route::get('posts/get_user', [PostController::class, 'get_user']);

Route::resource('posts', PostController::class);

Route::resource('comments', CommentController::class);

Route::post('likes_p/store', [PostLikeController::class, 'store']);
Route::post('likes_p/delete', [PostLikeController::class, 'destroy']);

Route::post('likes_c/store', [CommentLikeController::class, 'store']);
Route::post('likes_c/delete', [CommentLikeController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('get-game',[GameController::class, 'index']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {
    Route::post('logout', [AuthController::class, 'logout']);
});
