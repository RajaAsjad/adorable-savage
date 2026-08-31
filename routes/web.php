<?php

use App\Http\Controllers\Admin\BrandingController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EmailSettingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::get('/settings/branding', [BrandingController::class, 'edit'])->name('settings.branding');
    Route::post('/settings/branding', [BrandingController::class, 'update'])->name('settings.branding.update');

    Route::get('/settings/email', [EmailSettingController::class, 'edit'])->name('settings.email');
    Route::post('/settings/email', [EmailSettingController::class, 'update'])->name('settings.email.update');
    Route::post('/settings/email/test', [EmailSettingController::class, 'test'])->name('settings.email.test');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
