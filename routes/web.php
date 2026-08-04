<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\CategoryController;

Route::get('/', [PublicController::class, 'index']);
Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/sejarah', [PublicController::class, 'sejarah'])->name('sejarah');
Route::get('/faq', [PublicController::class, 'faq'])->name('faq');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
Route::get('/blog/{slug}', [PublicController::class, 'show'])->name('blog.show');
Route::get('/blog', [PublicController::class, 'blog'])->name('blog');
Route::get('/event', [PublicController::class, 'event'])->name('event');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Route untuk CRUD Post
    Route::resource('posts', PostController::class);
    Route::resource('categories', CategoryController::class)->except(['create', 'show', 'edit']);
    Route::resource('gallery', GalleryController::class);
});

require __DIR__.'/auth.php';
