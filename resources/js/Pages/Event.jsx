import React, { useRef, useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    GraduationCap,
    Palette,
    Dumbbell,
    Flag,
    HeartHandshake,
    Sparkles,
    Sprout,
    Award,
    ArrowRight
} from 'lucide-react';

/* ==========================================
   CONFIG & HELPERS
   ========================================== */



function getProgramIcon(title = '') {
    const key = title.toLowerCase();
    return PROGRAM_ICONS[key] || Sparkles;
}

// Hook harus dipanggil di dalam komponen, bukan di top-level module
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

export default function EventsIndex({
    events = [],
    title = "Events",
    subtitle = "Temukan berbagai kegiatan dan program unggulan yang kami selenggarakan untuk mendukung tumbuh kembang anak-anak di SIT At-Taufiq.",
    tagline = "SEKOLAH ISLAM ATTAUFIQ",
    patternImage = "/images/hero/frame-left.png",
    mosqueImage = "/images/hero/building-attaufiq.png"
}) {
    const [heroRef, heroInView] = useInView();
// 1. Data Dummy Default jika database masih kosong
    const defaultPrograms = [
        {
            id: 1,
            title: "Tahfidz & Qur'an",
            description: "Membina generasi penghafal Al-Qur'an yang cinta ilmu dan berakhlak mulia.",
            image: "/images/events/tahfidz.jpg",
            slug: "tahfidz-quran"
        },
        {
            id: 2,
            title: "Akademik",
            description: "Pembelajaran berbasis karakter dan kompetensi unggul untuk masa depan.",
            image: "/images/events/akademik.jpg",
            slug: "akademik"
        }
    ];

    // 2. PASTI KAN BARIS INI ADA:
    // Jika data `events` dari backend ada passes, pakai `events`. Kalau kosong, fallback ke `defaultPrograms`.
    const displayPrograms = events && events.length > 0 ? events : defaultPrograms;

    return (
        <AppLayout title="Program & Kegiatan - SIT At-Taufiq">
            <Head title="Events & Program Sekolah | SIT At-Taufiq Jambi" />

            {/* ==========================================
                HERO SECTION
            ========================================== */}
            <section ref={heroRef} className="relative w-full overflow-hidden bg-[#07327F] text-white min-h-[480px] md:min-h-[560px] flex items-center justify-center">
                <div className="absolute top-0 right-0 w-full md:w-3/4 h-full z-0">
                    <img
                        src={mosqueImage}
                        alt="Mosque Background"
                        className="w-full h-full object-cover object-right md:object-center opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07327F] via-[#07327F]/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07327F] via-transparent to-[#07327F]/30"></div>
                </div>

                <div className="absolute top-0 left-0 h-full w-full md:w-7/12 z-10 pointer-events-none overflow-hidden">
                    <img
                        src={patternImage}
                        alt="Islamic Arch Frame"
                        className="h-full w-full object-cover object-left [mask-image:linear-gradient(to_right,black_70%,transparent_100%)]"
                    />
                </div>

                <div className={`relative z-20 container mx-auto px-6 py-16 text-center flex flex-col items-center justify-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex items-center space-x-2 mb-3">
                        <span className="text-[#D4AF37] text-xs">◆</span>
                        <p className="text-[#F3E5AB] font-bold text-xs md:text-sm tracking-[0.25em] uppercase drop-shadow">
                            {tagline}
                        </p>
                        <span className="text-[#D4AF37] text-xs">◆</span>
                    </div>

                    <div className="text-[#D4AF37] text-lg md:text-xl my-1 animate-pulse">✦</div>

                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-tight my-2 max-w-3xl drop-shadow-md">
                        {title}
                    </h1>

                    <div className="text-[#D4AF37] text-lg md:text-xl my-1 animate-pulse">✦</div>

                    <div className="w-16 h-[1px] bg-[#D4AF37]/50 my-3"></div>

                    <p className="text-blue-100 text-sm md:text-base font-light max-w-lg leading-relaxed mt-1 drop-shadow">
                        {subtitle}
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none translate-y-1">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
                        <path d="M0 60 C 360 120, 1080 0, 1440 60 L 1440 120 L 0 120 Z" fill="#D4AF37" opacity="0.8" />
                        <path d="M0 75 C 360 135, 1080 15, 1440 75 L 1440 120 L 0 120 Z" fill="#FAF8F5" />
                    </svg>
                </div>
            </section>

            {/* Canvas Utama - Warm Sand/Beige */}
            <div className="bg-[#FAF4EB] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-[#051736] relative overflow-hidden">

                {/* Background Pattern Ornament */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

                <div className="max-w-7xl mx-auto space-y-12 relative z-10">

                    {/* ==========================================
                        HEADER SECTION
                    ========================================== */}
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <p className="text-xs md:text-sm font-medium text-slate-600 tracking-wide">
                            Pilih kegiatan untuk melihat informasi selengkapnya
                        </p>
                        <div className="flex justify-center text-[#D4AF37] pt-1">
                            <span className="animate-bounce text-sm">∨</span>
                        </div>
                    </div>

                    {/* ==========================================
                        ORBITAL GRID PROGRAM CONTAINER
                    ========================================== */}
                    <div className="relative py-8">

                        {/* Line Orbit Golden Path (Visual Desktop SVG) */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                        >
                            <path
                                d="M 50 180 Q 300 80 600 220 T 1200 180 T 1800 220"
                                stroke="#D4AF37"
                                strokeWidth="1.5"
                                strokeDasharray="6 6"
                                strokeOpacity="0.4"
                            />
                        </svg>

                        {/* Flex Grid Display: Top Row & Bottom Row Staggered */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-y-16 items-center justify-center">
                            {displayPrograms.map((program, index) => (
                                <ProgramOrbCard key={program.id || index} program={program} index={index} />
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </AppLayout>
    );
}

// Komponen Kartu Program Berbentuk Orb/Lingkaran
function ProgramOrbCard({ program, index }) {
    const IconComponent = getProgramIcon(program.title);
    const isEven = index % 2 === 0;

    // Helper Penanganan Gambar dari DB Storage / Fallback Image
    const imageUrl = program.image 
        ? (program.image.startsWith('http') || program.image.startsWith('/images') 
            ? program.image 
            : `/storage/${program.image}`)
        : '/images/placeholder.jpg';

    return (
        <div className={`flex flex-col items-center transition-all duration-500 transform hover:-translate-y-2 ${
            isEven ? 'lg:-translate-y-6' : 'lg:translate-y-6'
        }`}>
            <div className="w-[260px] h-[340px] rounded-[130px] bg-[#FAF8F3] border border-[#E8DFC8] shadow-lg hover:shadow-2xl transition-all duration-500 p-3 flex flex-col justify-between items-center relative group overflow-hidden">

                {/* 1. HALF-CIRCLE IMAGE BANNER */}
                <div className="w-full h-[145px] rounded-t-[120px] rounded-b-2xl overflow-hidden relative bg-slate-200">
                    <img
                        src={imageUrl}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* Floating Badge Icon */}
                    <div className="absolute -bottom-1 left-4 w-9 h-9 rounded-full bg-[#FAF8F3] border border-[#E8DFC8] shadow-md flex items-center justify-center text-[#8B6B13] z-10">
                        <IconComponent size={16} />
                    </div>
                </div>

                {/* 2. CARD CONTENT DETAILS */}
                <div className="px-3 pt-3 pb-2 text-center flex-1 flex flex-col justify-between items-center w-full">
                    <div className="space-y-1.5">
                        <h3 className="font-serif text-base font-bold text-[#051736] group-hover:text-[#D4AF37] transition leading-snug">
                            {program.title}
                        </h3>

                        <p className="text-[11px] text-slate-500 font-light leading-relaxed line-clamp-3 px-1">
                            {program.description}
                        </p>
                    </div>

                    {/* 3. ROUTE LINK KE DETAIL PAGE */}
                    <Link
                        href={route('events.show', program.slug)}
                        className="w-8 h-8 rounded-full bg-[#C29D38] hover:bg-[#051736] text-white flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110 mt-2"
                        title="Lihat Informasi Selengkapnya"
                    >
                        <ArrowRight size={14} />
                    </Link>
                </div>

            </div>
        </div>
    );
}