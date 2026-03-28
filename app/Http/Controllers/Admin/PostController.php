<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    // Fungsi untuk nampilin list blog di dashboard
    public function index()
    {
        return Inertia::render('Admin/Posts/Index', [
            'posts' => Post::where('type', 'blog')->latest()->get()
        ]);
    }
     public function show($slug)
        {
            // Cari post berdasarkan slug yang tipenya blog
            $post = Post::where('slug', $slug)->where('type', 'blog')->firstOrFail();

            return Inertia::render('BlogDetail', [
                'post' => $post
            ]);
        }
    // Fungsi untuk nampilin form tambah berita
    public function create()
    {
        return Inertia::render('Admin/Posts/Create');
    }

    // Fungsi untuk simpan data ke database
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        Post::create([
            'type' => 'blog',
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'image' => $imagePath,
            'is_featured' => false,
        ]);

        return redirect()->route('admin.posts.index')->with('message', 'Berita berhasil diterbitkan!');
    }
            public function edit(Post $post)
        {
            return Inertia::render('Admin/Posts/Edit', [
                'post' => $post
            ]);
        }

        public function update(Request $request, Post $post)
        {
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required',
                'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            ]);

            // Update data teks
            $post->title = $request->input('title');
            $post->content = $request->input('content');

            // Logika ganti gambar
            if ($request->hasFile('image')) {
                // Hapus gambar lama dari folder storage
                if ($post->image) {
                    Storage::disk('public')->delete($post->image);
                }
                // Simpan gambar baru
                $post->image = $request->file('image')->store('posts', 'public');
            }

            $post->save();

            return redirect()->route('admin.posts.index')->with('message', 'Berita berhasil diperbarui!');
        }
       
        public function destroy(Post $post)
        {
            // Hapus file fisik gambar
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }

            $post->delete();

            return redirect()->route('admin.posts.index')->with('message', 'Berita berhasil dihapus!');
        }
}