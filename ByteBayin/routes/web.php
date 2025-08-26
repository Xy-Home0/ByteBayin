<?php

use App\Http\Controllers\Admin\LessonController as AdminLessonController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\GovernmentBillController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // User routes
    Route::get('/lessons', [LessonController::class, 'index'])->name('lessons.index');
    Route::get('/lessons/{lesson}', [LessonController::class, 'show'])->name('lessons.show');
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/government-bills', [GovernmentBillController::class, 'index'])->name('government-bills.index');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
});

// Admin routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/lessons', [LessonController::class, 'adminIndex'])->name('lessons.index');
    Route::get('/products', [ProductController::class, 'adminIndex'])->name('products.index');
    
    // Add these resource routes for full CRUD functionality
    Route::resource('lessons', LessonController::class)->except(['index', 'show']);
    Route::resource('products', ProductController::class)->except(['index', 'show']);
    Route::resource('lessons', AdminLessonController::class);
    Route::resource('products', AdminProductController::class);
});

require __DIR__.'/auth.php';