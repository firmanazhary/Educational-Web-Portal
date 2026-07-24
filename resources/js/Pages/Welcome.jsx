// resources/js/Pages/Home.jsx

import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';
import HeroSlider from '@/Layouts/HeroSlider';
import { useEffect, useRef, useState } from 'react';


// Hook Animasi Scroll Reveal
function useInView(options = { threshold: 0.15 }) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return [ref, isInView];
}

// KUNCINYA DI SINI: Samakan nama props dengan yang dikirim Controller (posts & galleries)
export default function Home({ auth, posts = [], galleries = [] }) {
    const [sectionRef, isInView] = useInView();

    // Data 4 Card Aktivitas
    const activities = [
        {
            title: "Tasmi Day",
            desc: "Kegiatan penyimakan hafalan Al-Qur'an siswa untuk melatih hafalan dan kepercayaan diri.",
            image: "/images/hero/tasmi-day.jpg",
            icon: (
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            title: "Business Day",
            desc: "Kegiatan siswa belajar berjualan dan mengelola produk sederhana untuk melatih kreativitas dan jiwa wirausaha.",
            image: "/images/hero/business-day.jpg",
            icon: (
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "Interest & Talent Culture",
            desc: "Program pengembangan minat dan bakat siswa melalui aktivitas seni, budaya, dan keterampilan.",
            image: "/images/hero/talent-day.jpg",
            icon: (
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            )
        },
        {
            title: "Outing Class",
            desc: "Kegiatan belajar di luar kelas untuk pengalaman nyata, kebersamaan, dan eksplorasi.",
            image: "/images/hero/outing-class.jpg",
            icon: (
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        }
    ];
    return (
        <AppLayout title="Home">
            <Head title="SIT At-Taufiq Jambi - Mencetak Generasi Robbani" />
            
            {/* --- HERO SECTION --- */}
            <HeroSlider />

            {/* --- STATS SECTION --- */}
            {/* <section className="py-20 bg-white relative z-20">
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
            </section> */}

            {/* --- SECTION BLOG (Life at At-Taufiq) --- */}
            {/* <section id="blog" className="py-24 px-6 bg-slate-50">
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
            </section> */}

            {/* --- GALLERY SECTION --- */}
            {/* <section id="gallery" className="py-24 px-6 bg-white">
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
            </section> */}
            <section ref={sectionRef} className="py-24 bg-[#FAF8F5] relative overflow-hidden text-slate-800">

            {/* --- 1. DEKORASI ORNAMEN SAMPING KIRI & KANAN --- */}
            
            {/* Curved Swoosh Kuning (Atas Kiri) */}
            <div className="absolute top-0 left-0 w-64 md:w-80 h-80 pointer-events-none z-10 opacity-90">
                <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M -50 -50 C 150 -20, 250 150, 180 320" stroke="#FFC72C" strokeWidth="28" strokeLinecap="round" />
                </svg>
            </div>

            {/* Curved Swoosh Navy (Kanan Bawah) */}
            <div className="absolute top-12 right-0 w-64 md:w-80 h-96 pointer-events-none z-10 opacity-90">
                <svg viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M 350 0 C 120 100, 150 300, 250 400" stroke="#07327F" strokeWidth="24" strokeLinecap="round" />
                </svg>
            </div>

            {/* Pilar & Lentera Islami di Ujung Kiri-Kanan (Hidden on Mobile) */}
            <div className="hidden xl:block absolute left-0 top-0 bottom-0 w-48 pointer-events-none opacity-20 z-0">
                <img src="/images/home/frame-home-1.png" alt="Arch Pillar Left" className="h-full w-full object-cover object-left" />
            </div>
            <div className="hidden xl:block absolute right-0 top-0 bottom-0 w-48 pointer-events-none opacity-20 z-0 scale-x-[-1]">
                <img src="/images/hero/frame-left.png" alt="Arch Pillar Right" className="h-full w-full object-cover object-left" />
            </div>


            {/* --- 2. KONTEN UTAMA --- */}
            <div className="container mx-auto px-6 max-w-7xl relative z-20">
                
                {/* HEADLINE TOP BLOCK */}
                <div className={`text-center max-w-3xl mx-auto space-y-4 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Bintang Emas Top */}
                    <div className="flex justify-center">
                        <span className="text-[#D4AF37] text-2xl animate-pulse">☀️</span>
                    </div>

                    <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#07327F] leading-tight">
                        Membangun Generasi Islami Berkarakter
                    </h2>

                    <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed px-4">
                        Di sekolah Islam Attaufiq, pembinaan generasi muda dilakukan dalam lingkungan yang serasa rumah kedua Ananda. Pendekatan pendidikan Attaufiq menggabungkan nilai-nilai Islam yang dalam dengan teknik pembelajaran kontemporer.
                    </p>

                    {/* Button Explore More */}
                    <div className="pt-2">
                        <a
                            href="/about"
                            className="inline-flex items-center space-x-2 bg-[#FFC72C] hover:bg-[#D4AF37] text-[#07327F] px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <span>Explore More</span>
                            <span className="text-sm">→</span>
                        </a>
                    </div>

                </div>


                {/* SUB-HEADER: AKTIVITAS & KEGIATAN SISWA */}
                <div className={`text-center mt-20 mb-12 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex items-center justify-center space-x-3">
                        <span className="text-[#D4AF37] text-xs">✦</span>
                        <h3 className="font-serif text-2xl md:text-3xl text-[#07327F] font-normal">
                            Aktivitas & Kegiatan Siswa
                        </h3>
                        <span className="text-[#D4AF37] text-xs">✦</span>
                    </div>
                </div>


                {/* GRID 4 CARD AKTIVITAS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {activities.map((act, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-[28px] overflow-hidden shadow-lg border border-[#E8DFC8] bg-[#051736] text-white flex flex-col justify-end h-[340px] md:h-[380px] transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl ${
                                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                            }`}
                            style={{ transitionDelay: `${300 + index * 100}ms` }}
                        >
                            {/* Background Image dengan Zoom Hover */}
                            <img
                                src={act.image}
                                alt={act.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                            />

                            {/* Dark Navy Overlay (Gradient dari Bawah Pelepah Transparan ke Atas) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#031026] via-[#051736]/80 to-transparent opacity-90 group-hover:opacity-95 transition duration-300"></div>

                            {/* Content Text & Icon Badge */}
                            <div className="relative z-10 p-6 space-y-3">
                                
                                {/* Badge Icon Lingkaran */}
                                <div className="w-11 h-11 rounded-full bg-[#07327F]/80 border border-[#D4AF37] flex items-center justify-center shadow-md group-hover:bg-[#D4AF37] group-hover:text-[#07327F] transition duration-300">
                                    {act.icon}
                                </div>

                                {/* Judul Aktivitas */}
                                <h4 className="font-serif text-xl font-bold text-white group-hover:text-[#F3E5AB] transition">
                                    {act.title}
                                </h4>

                                {/* Deskripsi Singkat */}
                                <p className="text-blue-100/80 font-light text-xs leading-relaxed line-clamp-3">
                                    {act.desc}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
        </AppLayout>
    );
}