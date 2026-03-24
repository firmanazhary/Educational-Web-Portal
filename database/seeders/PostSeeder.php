<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data Blog dummy
        Post::create([
            'type' => 'blog',
            'title' => 'Opening Ceremony 2026',
            'content' => 'Welcome to the new academic year at JIS. We are excited to see our students back!',
            'image' => 'sample-blog.jpg', // Nanti kita bahas cara munculin gambarnya
        ]);

        // Data Gallery dummy
        for ($i = 1; $i <= 4; $i++) {
            Post::create([
                'type' => 'gallery',
                'title' => "School Activity $i",
                'image' => "sample-gallery-$i.jpg",
            ]);
        }
    }
}
