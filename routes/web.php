<?php

use App\Http\Controllers\Admin\AboutPostController;
use App\Http\Controllers\Admin\BlogController as AdminBlogController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EditorUploadController;
use App\Http\Controllers\Admin\EmailSettingController;
use App\Http\Controllers\Admin\EventCategoryController;
use App\Http\Controllers\Admin\EventCategoryPostController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\CalendarCategoryController;
use App\Http\Controllers\Admin\GalleryCategoryController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Admin\ProgramCategoryController;
use App\Http\Controllers\Admin\ProgramPostController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
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

    Route::post('/editor/upload', [EditorUploadController::class, 'store'])
        ->name('editor.upload');

    Route::resource('pages', AdminPageController::class)->except(['show']);
    Route::post('about-posts/{about_post}/move-up', [AboutPostController::class, 'moveUp'])
        ->name('about-posts.move-up');
    Route::post('about-posts/{about_post}/move-down', [AboutPostController::class, 'moveDown'])
        ->name('about-posts.move-down');
    Route::resource('about-posts', AboutPostController::class)->except(['show']);
    Route::resource('blogs', AdminBlogController::class)->except(['show']);
    Route::resource('program-categories', ProgramCategoryController::class)->except(['show']);
    Route::resource('program-posts', ProgramPostController::class)->except(['show']);
    Route::resource('event-categories', EventCategoryController::class)->except(['show']);
    Route::resource('event-category-posts', EventCategoryPostController::class)->except(['show']);
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

Route::get('/pillars/{slug}', [PageController::class, 'aboutPost'])
    ->name('pillars.show');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/calendar/{slug}', [CalendarCategoryController::class, 'show'])
    ->where('slug', 'music|wellness|community|education')
    ->name('calendar.show');

Route::get('/{slug}', [PageController::class, 'show'])
    ->where('slug', '^(?!admin$|dashboard$|profile$|login$|register$|forgot-password$|reset-password$|verify-email$|confirm-password$|up$|pillars$|blog$|calendar$).+')
    ->name('pages.show');
