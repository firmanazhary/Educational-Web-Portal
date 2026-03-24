// resources/js/Pages/Home.jsx

import AppLayout from '@/Layouts/AppLayout'; // Pastikan file Layout kamu namanya AppLayout.jsx
import { Link } from '@inertiajs/react';

export default function Home({ blogs = [], galleries = [] }) {
    return (
        /* Gunakan AppLayout sesuai import di atas */
        <AppLayout title="Home">
            
            {/* --- HERO SECTION (Sesuai Gambar JIS: Full Width & Overlay) --- */}
            <section className="relative h-[90vh] overflow-hidden bg-[#002147]">
                <img 
                    src="/storage/hero-jis.jpg" 
                    className="absolute inset-0 w-full h-full object-cover opacity-70" 
                    alt="JIS Campus"
                />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                    <div className="max-w-5xl space-y-6">
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter">
                            Learning to Be Best <span className="text-[#FF6600]">for</span> the World.
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed font-light">
                            At JIS, we prepare students from across the globe to be best in what they aspire for and at the same time, be best for the world they live in.
                        </p>
                        <div className="pt-8">
                            <button className="bg-[#FF6600] hover:bg-white hover:text-[#002147] px-12 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition duration-300 shadow-2xl">
                                Discover More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- STATS SECTION (4 Kolom Bulat-Bulat Sesuai Gambar) --- */}
            <section className="py-20 bg-white relative z-20">
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { val: '20+', label: 'Nationalities' },
                        { val: '1951', label: 'Founded' },
                        { val: '2000+', label: 'Students' },
                        { val: '150+', label: 'Activities' }
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

            {/* --- LIFE AT JIS (Section Blog - Grid 3 Kolom) --- */}
            <section id="blog" className="py-24 px-6 bg-slate-50">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h3 className="text-[#FF6600] font-black uppercase tracking-widest text-xs mb-3">Our News</h3>
                            <h2 className="text-5xl font-extrabold text-[#002147] tracking-tighter">Life at JIS</h2>
                        </div>
                        <button className="text-[#002147] font-bold text-sm border-b-2 border-[#FF6600] pb-1 hover:text-[#FF6600] transition">
                            View All Stories
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {blogs.map(post => (
                            <article key={post.id} className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 overflow-hidden group hover:-translate-y-3 transition duration-500 flex flex-col">
                                <div className="h-64 overflow-hidden relative">
                                    <img 
                                        src={`/storage/${post.image}`} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                                        alt={post.title} 
                                    />
                                    <div className="absolute top-4 left-4 bg-[#FF6600] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                        Update
                                    </div>
                                </div>
                                <div className="p-8 flex-grow">
                                    <h3 className="font-bold text-2xl text-[#002147] mb-4 leading-tight group-hover:text-[#FF6600] transition">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                                        {post.content}
                                    </p>
                                </div>
                                <div className="p-8 pt-0 mt-auto flex items-center text-[#FF6600] font-bold text-sm">
                                    Read Article <span className="ml-2 group-hover:ml-4 transition-all">→</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- GALLERY SECTION (4 Kolom Sesuai Gambar) --- */}
            <section id="gallery" className="py-24 px-6 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-[#FF6600] font-black uppercase tracking-widest text-[10px] mb-3">Moments</h3>
                        <h2 className="text-5xl font-extrabold text-[#002147] tracking-tighter">School Gallery</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleries.map((item) => (
                            <div key={item.id} className="relative aspect-square overflow-hidden rounded-[24px] group shadow-lg">
                                <img 
                                    src={`/storage/${item.image}`} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                                    alt={item.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
                                    <p className="text-white text-sm font-bold tracking-tight">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}