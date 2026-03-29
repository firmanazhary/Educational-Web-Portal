<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str; // Tambahkan ini buat generate slug otomatis

class PostController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Posts/Index', [
            // HAPUS ->where('type', 'blog')
            'posts' => Post::latest()->get()
        ]);
    }
   
    public function create()
    {
        return Inertia::render('Admin/Posts/Create');
    }

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
            // HAPUS 'type' => 'blog'
            'title' => $request->input('title'),
            'slug' => Str::slug($request->input('title')), // Tambahkan slug otomatis biar link blog cantik
            'content' => $request->input('content'),
            'image' => $imagePath,
            'is_featured' => false,
        ]);

        return redirect()->route('admin.posts.index')->with('message', 'Berita SIT At-Taufiq berhasil diterbitkan!');
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

        $post->title = $request->input('title');
        $post->slug = Str::slug($request->input('title')); // Update slug juga kalau judul ganti
        $post->content = $request->input('content');

        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $post->image = $request->file('image')->store('posts', 'public');
        }

        $post->save();

        return redirect()->route('admin.posts.index')->with('message', 'Berita berhasil diperbarui!');
    }
       
    public function destroy(Post $post)
    {
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();

        return redirect()->route('admin.posts.index')->with('message', 'Berita berhasil dihapus!');
    }
}