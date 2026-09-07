<?php

use App\Http\Controllers\Admin\AboutPostController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EmailSettingController;
use App\Http\Controllers\Admin\EventCategoryController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\GalleryCategoryController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Admin\ProgramCategoryController;
use App\Http\Controllers\Admin\ProgramPostController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageController::class, 'home'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::get('/settings/site', [SiteSettingController::class, 'edit'])->name('settings.site');
    Route::post('/settings/site', [SiteSettingController::class, 'update'])->name('settings.site.update');

    Route::get('/settings/email', [EmailSettingController::class, 'edit'])->name('settings.email');
    Route::post('/settings/email', [EmailSettingController::class, 'update'])->name('settings.email.update');
    Route::post('/settings/email/test', [EmailSettingController::class, 'test'])->name('settings.email.test');

    Route::resource('pages', AdminPageController::class)->except(['show']);
    Route::resource('about-posts', AboutPostController::class)->except(['show']);
    Route::resource('program-categories', ProgramCategoryController::class)->except(['show']);
    Route::resource('program-posts', ProgramPostController::class)->except(['show']);
    Route::resource('event-categories', EventCategoryController::class)->except(['show']);
    Route::resource('events', EventController::class)->except(['show']);
    Route::resource('gallery-categories', GalleryCategoryController::class)->except(['show']);
    Route::resource('galleries', GalleryController::class)->except(['show']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::get('/{slug}', [PageController::class, 'show'])
    ->where('slug', '^(?!admin$|dashboard$|profile$|login$|register$|forgot-password$|reset-password$|verify-email$|confirm-password$|up$).+')
    ->name('pages.show');
