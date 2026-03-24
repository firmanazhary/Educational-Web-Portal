<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
class PublicController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'blogs' => Post::where('type', 'blog')->latest()->take(3)->get(),
            'galleries' => Post::where('type', 'gallery')->latest()->get(),
        ]);
    }
}
