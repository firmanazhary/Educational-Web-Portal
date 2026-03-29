// resources/js/Pages/Home.jsx

import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';
import HeroSlider from '@/Layouts/HeroSlider';

// KUNCINYA DI SINI: Samakan nama props dengan yang dikirim Controller (posts & galleries)
export default function Home({ auth, posts = [], galleries = [] }) {
    return (
        <AppLayout title="Home">
            <Head title="SIT At-Taufiq Jambi - Mencetak Generasi Robbani" />
            
            {/* --- HERO SECTION --- */}
            <HeroSlider />

            {/* --- STATS SECTION --- */}
            <section className="py-20 bg-white relative z-20">
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { val: '15+', label: 'Tahun Berdiri' },
                        { val: '500+', label: 'Santri Aktif' },
                        { val: '100%', label: 'Kurikulum SIT' },
                        { val: '30+', label: 'Ekstrakurikuler' }
                    ].map((stat, i) => (
                        <div key={i} className="group p-10 bg-slate-50 rounded-[40px] hover:bg-[#002147] transition duration-500 text-center border border-slate-100">
                            <h2 className="text-5xl font-black text-[#002147] group-hover:text-[#FF6600] transition tracking-tighter">
                                {stat.val}
                            </h2>
                            <p className="text-slate-500 group-hover:text-white uppercase tracking-[0.2em] text-[10px] mt-4 font-black">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- SECTION BLOG (Life at At-Taufiq) --- */}
            <section id="blog" className="py-24 px-6 bg-slate-50">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h3 className="text-[#FF6600] font-black uppercase tracking-widest text-xs mb-3">Update Berita</h3>
                            <h2 className="text-5xl font-extrabold text-[#002147] tracking-tighter uppercase">Life at At-Taufiq</h2>
                        </div>
                        <Link href="/blog" className="text-[#002147] font-black text-xs uppercase tracking-widest border-b-2 border-[#FF6600] pb-1 hover:text-[#FF6600] transition">
                            Lihat Semua Berita →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {posts.length > 0 ? posts.map((post) => (
                            <Link 
                                key={post.id} 
                                href={route('blog.show', post.slug)}
                                className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 overflow-hidden group hover:-translate-y-3 transition duration-500 flex flex-col border border-slate-50 cursor-pointer"
                            >
                                <div className="h-64 overflow-hidden relative bg-slate-200">
                                    <img 
                                        src={`/storage/${post.image}`} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                                        alt={post.title} 
                                        onError={(e) => e.target.src = "https://placehold.co/600x400?text=At-Taufiq+News"}
                                    />
                                    <div className="absolute top-4 left-4 bg-[#FF6600] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                        News
                                    </div>
                                </div>

                                <div className="p-8 flex-grow">
                                    <h3 className="font-bold text-2xl text-[#002147] mb-4 leading-tight group-hover:text-[#FF6600] transition-colors duration-300 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-light">
                                        {post.content}
                                    </p>
                                </div>

                                <div className="p-8 pt-0 mt-auto flex items-center text-[#FF6600] font-black uppercase text-[10px] tracking-[0.2em]">
                                    Baca Artikel <span className="ml-3 text-lg group-hover:ml-5 transition-all">→</span>
                                </div>
                            </Link>
                        )) : (
                            <div className="col-span-3 text-center py-10 text-slate-400 italic font-light uppercase tracking-widest text-xs">
                                Belum ada berita yang diterbitkan.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- GALLERY SECTION --- */}
            <section id="gallery" className="py-24 px-6 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-[#FF6600] font-black uppercase tracking-widest text-[10px] mb-3">Moments</h3>
                        <h2 className="text-5xl font-extrabold text-[#002147] tracking-tighter uppercase">Gallery Santri</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleries.length > 0 ? galleries.map((item) => (
                            <div key={item.id} className="relative aspect-square overflow-hidden rounded-[24px] group shadow-lg bg-slate-100">
                                <img 
                                    src={`/storage/${item.image}`} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                                    alt={item.title}
                                    onError={(e) => e.target.src = "https://placehold.co/400x400?text=Gallery"}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition duration-500">
                                        <p className="text-[#FF6600] text-[8px] font-black uppercase tracking-[0.2em] mb-1">{item.category}</p>
                                        <p className="text-white text-sm font-bold tracking-tight">{item.title}</p>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-4 text-center py-10 text-slate-300 text-xs font-black uppercase tracking-widest">
                                Galeri masih kosong.
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}