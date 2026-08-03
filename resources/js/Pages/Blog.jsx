import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Sparkles,
    BookOpen,
    GraduationCap,
    Users,
    PartyPopper,
    Trophy,
    Lightbulb,
    Newspaper,
    Clock,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

/* ==========================================
   HELPERS
   ========================================== */

function getReadingTime(htmlContent = '') {
    const text = htmlContent.replace(/<[^>]*>?/gm, '').trim();
    if (!text) return 1;
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
}

function getExcerpt(htmlContent = '', length = 110) {
    const text = htmlContent.replace(/<[^>]*>?/gm, '').trim();
    return text.length > length ? `${text.slice(0, length)}…` : text;
}

const CATEGORY_ICONS = {
    parenting: Users,
    tahfizh: BookOpen,
    pendidikan: GraduationCap,
    kegiatan: PartyPopper,
    prestasi: Trophy,
    'tips belajar': Lightbulb,
    berita: Newspaper,
};

function getCategoryIcon(name = '') {
    return CATEGORY_ICONS[name.toLowerCase()] || Sparkles;
}

export default function BlogIndex({
    posts = [],
    categories = [],
    paginationLinks = [],
}) {
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    // Filter posts berdasarkan kategori
    const filteredPosts = selectedCategory === 'Semua'
        ? posts
        : posts.filter(post => post.category?.name === selectedCategory);

    // Ambil post pertama untuk Featured Banner
    const featuredPost = posts.length > 0 ? posts[0] : null;

    return (
        <AppLayout title="Blog & Berita - SIT At-Taufiq">
            <Head title="Berita & Artikel | SIT At-Taufiq Jambi" />

            <div className="bg-[#FAF4EB] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-[#051736]">
                <div className="max-w-6xl mx-auto space-y-10">

                    {/* ==========================================
                        1. FEATURED ARTICLE BANNER
                    ========================================== */}
                    {featuredPost && (
                        <div className="bg-[#F3EBDD] border border-[#E0D3BC] rounded-[32px] p-6 md:p-8 shadow-sm relative overflow-hidden">
                            <div className="grid lg:grid-cols-12 gap-8 items-center">
                                {/* Thumbnail Image */}
                                <div className="lg:col-span-5 aspect-[4/3] rounded-[24px] overflow-hidden shadow-md relative group bg-slate-200">
                                    <span className="absolute top-4 left-4 z-20 bg-[#051736] text-[#F3E5AB] text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider shadow-md">
                                        FEATURED ARTICLE
                                    </span>
                                    <img
                                        src={featuredPost.image ? `/storage/${featuredPost.image}` : '/images/placeholder.jpg'}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                    />
                                </div>

                                {/* Content Details */}
                                <div className="lg:col-span-7 space-y-3">
                                    <span className="inline-block border border-[#D4AF37]/60 text-[#8B6B13] text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase bg-[#FAF8F5]">
                                        {featuredPost.category?.name || 'UMUM'}
                                    </span>

                                    <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-[#051736] leading-snug">
                                        {featuredPost.title}
                                    </h1>

                                    <p className="text-slate-600 font-light text-xs md:text-sm leading-relaxed line-clamp-3">
                                        {featuredPost.content?.replace(/<[^>]*>?/gm, '')}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#E0D3BC]/60 text-xs text-slate-500 font-light gap-4">
                                        <div className="flex items-center space-x-4 text-xs">
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {getReadingTime(featuredPost.content)} menit membaca
                                            </span>
                                            <span>
                                                {new Date(featuredPost.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>

                                        {/* HAPUS onClick preventDefault */}
                                        <Link
                                            href={route('blog.show', featuredPost?.slug || 'slug-berita')}
                                            className="font-bold text-[#051736] hover:text-[#D4AF37] transition flex items-center space-x-1 text-xs"
                                        >
                                            <span>Baca Selengkapnya</span>
                                            <span>→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* ==========================================
                        2. CATEGORY FILTER TABS
                    ========================================== */}
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                        <button
                            onClick={() => setSelectedCategory('Semua')}
                            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center space-x-2 border ${
                                selectedCategory === 'Semua'
                                    ? 'bg-[#051736] text-white border-[#051736] shadow-md'
                                    : 'bg-[#F3EBDD] text-slate-700 border-[#E0D3BC] hover:bg-white'
                            }`}
                        >
                            <Sparkles size={12} />
                            <span>Semua</span>
                        </button>

                        {categories.map((cat) => {
                            const isActive = selectedCategory === cat.name;
                            const Icon = getCategoryIcon(cat.name);
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center space-x-2 border ${
                                        isActive
                                            ? 'bg-[#051736] text-white border-[#051736] shadow-md'
                                            : 'bg-[#F3EBDD] text-slate-700 border-[#E0D3BC] hover:bg-white'
                                    }`}
                                >
                                    <Icon size={12} />
                                    <span>{cat.name}</span>
                                </button>
                            );
                        })}
                    </div>


                    {/* ==========================================
                        3. HEADLINE SECTION
                    ========================================== */}
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 text-[#D4AF37]">
                            <span className="text-xs">✦</span>
                            <h2 className="font-serif text-2xl md:text-3xl text-[#051736] font-normal">
                                Artikel Terbaru {selectedCategory !== 'Semua' && `(${selectedCategory})`}
                            </h2>
                            <span className="text-xs">✦</span>
                        </div>
                    </div>


                    {/* ==========================================
                        4. GRID ARTIKEL
                    ========================================== */}
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {filteredPosts.map((item) => (
                                <ArticleCard key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-slate-500 text-sm">
                            Belum ada artikel untuk kategori <strong>"{selectedCategory}"</strong>.
                        </div>
                    )}

                    {/* ==========================================
                        5. PAGINATION
                    ========================================== */}
                    {paginationLinks.length > 3 && (
                        <div className="flex items-center justify-center gap-1.5 pt-2">
                            {paginationLinks.map((link, i) => {
                                const isPrev = i === 0;
                                const isNext = i === paginationLinks.length - 1;
                                const label = isPrev ? <ChevronLeft size={14} /> : isNext ? <ChevronRight size={14} /> : link.label;

                                return link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        preserveScroll
                                        className={`min-w-[2rem] h-8 px-2 flex items-center justify-center rounded-full text-xs font-semibold transition-all ${
                                            link.active
                                                ? 'bg-[#051736] text-white shadow-md'
                                                : 'bg-[#F3EBDD] text-slate-700 border border-[#E0D3BC] hover:bg-white'
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                ) : (
                                    <span
                                        key={i}
                                        className="min-w-[2rem] h-8 px-2 flex items-center justify-center rounded-full text-xs font-semibold text-slate-300"
                                    >
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}

/* ==========================================
   KARTU ARTIKEL SEDERHANA
   ========================================== */
function ArticleCard({ item }) {
    return (
        /* HAPUS onClick preventDefault */
        <Link
            href={route('blog.show', item?.slug || 'slug-berita')}
            className="group bg-white rounded-3xl border border-[#E0D3BC] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
        >
            {/* Gambar */}
            <div className="aspect-[16/10] relative overflow-hidden bg-slate-200">
                <img
                    src={item.image ? `/storage/${item.image}` : '/images/placeholder.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#051736]/90 text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider">
                    {item.category?.name || 'UMUM'}
                </span>
            </div>

            {/* Konten */}
            <div className="p-4 md:p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>
                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {getReadingTime(item.content)} menit membaca
                    </span>
                </div>

                <h3 className="font-serif font-bold text-[#051736] text-sm md:text-base leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition">
                    {item.title}
                </h3>

                <p className="text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {getExcerpt(item.content)}
                </p>
            </div>
        </Link>
    );
}