<?php

use App\Http\Controllers\MediaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/media', MediaController::class);

    Route::post('profile', [ProfileController::class, 'update']);
    Route::post('profile/password', [ProfileController::class, 'changePassword']);
});
