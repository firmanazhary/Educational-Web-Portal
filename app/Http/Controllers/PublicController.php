<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Gallery;
use App\Models\Category;
use Inertia\Inertia;

class PublicController extends Controller
{
    // --- HALAMAN DINAMIS ---

    public function index()
    {
        return Inertia::render('Welcome', [
            'posts' => Post::with('category')->latest()->take(6)->get(), 
            'galleries' => Gallery::latest()->take(6)->get(),
            'categories' => Category::all(),
        ]);
    }

    public function show($slug)
    {
        $post = Post::with('category')->where('slug', $slug)->firstOrFail();

        $relatedPosts = Post::with('category')
            ->where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('BlogDetail', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    // --- HALAMAN HALAMAN STATIS (Persiapan Dynamic CMS) ---

    public function about()   { return Inertia::render('About'); }
    public function sejarah() { return Inertia::render('Sejarah'); }
    public function faq()     { return Inertia::render('Faq'); }
    public function contact() { return Inertia::render('Contact'); }
}