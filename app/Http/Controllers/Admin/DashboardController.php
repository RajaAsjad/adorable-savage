<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutPost;
use App\Models\Event;
use App\Models\ProgramPost;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users' => User::query()->count(),
                'about_posts' => AboutPost::query()->count(),
                'program_posts' => ProgramPost::query()->count(),
                'events' => Event::query()->count(),
            ],
        ]);
    }
}
