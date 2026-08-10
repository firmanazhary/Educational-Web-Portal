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
            'posts' => Post::with('category')->latest()->take(6)->get(),
            'galleries' => Gallery::latest()->take(6)->get(),
            'categories' => Category::all(),
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
            // Ambil data postingan beserta relasi kategorinya
            'posts' => Post::with('category')->latest()->get(),

            // Ambil semua kategori dari hasil CRUD database
            'categories' => Category::select('id', 'name', 'slug')->get(),
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

    // ==========================================
    // 1. MODUL EVENTS (Kegiatan Tematik)
    // ==========================================
    public function events()
    {
        $events = Event::where('is_active', true)
            ->where('type', 'event') // Filter khusus Event
            ->latest()
            ->get();

        return Inertia::render('Event', [
            'events' => $events,
            'pageType' => 'event',
        ]);
    }

    // ==========================================
    // 2. MODUL PROGRAMS (Program Unggulan Sekolah)
    // ==========================================
    public function programs()
    {
        $programs = Event::where('is_active', true)
            ->where('type', 'program') // Filter khusus Program
            ->latest()
            ->get();

        // Bisa mengarahkan ke file React 'Program' (atau pakai 'Event' dengan props dinamis)
        return Inertia::render('Program', [
            'events' => $programs,
            'pageType' => 'program',
        ]);
    }

    // ==========================================
    // 3. DETAIL (Bisa Dipakai Bersama untuk Event & Program)
    // ==========================================
    public function eventShow($slug)
    {
        $event = Event::where('slug', $slug)->where('is_active', true)->firstOrFail();

        // Ambil item terkait dengan tipe yang sama
        $relatedEvents = Event::where('id', '!=', $event->id)
            ->where('type', $event->type)
            ->where('is_active', true)
            ->take(3)
            ->get();

        return Inertia::render('EventDetail', [
            'event'         => $event,
            'relatedEvents' => $relatedEvents,
        ]);
    }
    public function admission()
{
    return Inertia::render('Admission');
}
}