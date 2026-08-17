<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Gallery;
use App\Models\Category;
use App\Models\Event;
use Inertia\Inertia;

class PublicController extends Controller
{
    // --- HALAMAN DINAMIS ---

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
        // Cari artikel berdasarkan slug beserta kategorinya
        $post = Post::with('category')->where('slug', $slug)->firstOrFail();

        // Ambil 3 artikel terkait dari kategori yang sama
        $relatedPosts = Post::with('category')
            ->where('id', '!=', $post->id)
            ->when($post->category_id, function ($query) use ($post) {
                return $query->where('category_id', $post->category_id);
            })
            ->latest()
            ->take(3)
            ->get();

        // (Opsional) Ambil artikel sebelum & sesudahnya
        $prevPost = Post::where('id', '<', $post->id)->orderBy('id', 'desc')->first();
        $nextPost = Post::where('id', '>', $post->id)->orderBy('id', 'asc')->first();

        return Inertia::render('BlogDetail', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
            'prevPost' => $prevPost,
            'nextPost' => $nextPost,
        ]);
    }
   public function blog()
    {
        return Inertia::render('Blog', [
            // Ambil data postingan beserta relasi kategorinya (termasuk category.icon)
            'posts' => Post::with('category')->latest()->get(),

            // Sertakan kolom 'icon' dan hitung jumlah post per kategori
            'categories' => Category::select('id', 'name', 'slug', 'icon')
                ->withCount('posts')
                ->get(),
        ]);
    }
    // --- HALAMAN HALAMAN STATIS (Persiapan Dynamic CMS) ---

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
}
