<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Gallery; // Import model Gallery
use Inertia\Inertia;

class PublicController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            // HAPUS ->where('type', 'blog') KARENA SUDAH GAK ADA KOLOMNYA
            'posts' => Post::latest()->get(),
            'galleries' => Gallery::latest()->take(6)->get() // Ambil dari tabel Gallery
        ]);
    }

    public function show($slug)
    {
        // Cari post berdasarkan slug yang tipenya blog
        $post = Post::where('slug', $slug)->firstOrFail();

        return Inertia::render('BlogDetail', [
            'post' => $post
        ]);
    }

    public function about()
    {
        return Inertia::render('About');
    }
    public function sejarah()
    {
        return Inertia::render('Sejarah');
    }
    public function faq()
    {
        return Inertia::render('Faq');
    }
    public function contact()
    {
        return Inertia::render('Contact');
    }

    public function jenjang()
    {
        return Inertia::render('Jenjang/Jenjang');
    }

    public function pg()
    {
        return Inertia::render('Jenjang/Pg');
    }

    public function tk()
    {
        return Inertia::render('Jenjang/Tk');
    }
}
