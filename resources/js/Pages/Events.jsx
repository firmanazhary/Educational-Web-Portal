import React from 'react';
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

// Mapping Ikon Lucide untuk setiap program/kategori
const PROGRAM_ICONS = {
    'tahfidz & qur\'an': BookOpen,
    'akademik': GraduationCap,
    'seni & kreativitas': Palette,
    'olahraga': Dumbbell,
    'kepemimpinan': Flag,
    'keluarga & parenting': HeartHandshake,
    'spiritual & keislaman': Sparkles,
    'community service': Sprout,
    'wisuda & pelepasan': Award,
};

function getProgramIcon(title = '') {
    const key = title.toLowerCase();
    return PROGRAM_ICONS[key] || Sparkles;
}

export default function EventsIndex({ events = [] }) {

    // Default Data jika backend belum melempar data dinamis
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
        },
        {
            id: 3,
            title: "Seni & Kreativitas",
            description: "Mengembangkan potensi dan kreativitas melalui berbagai kegiatan seni.",
            image: "/images/events/seni.jpg",
            slug: "seni-kreativitas"
        },
        {
            id: 4,
            title: "Olahraga",
            description: "Membentuk jiwa sehat, sportif, dan berdaya saing melalui kegiatan olahraga.",
            image: "/images/events/olahraga.jpg",
            slug: "olahraga"
        },
        {
            id: 5,
            title: "Kepemimpinan",
            description: "Melatih jiwa kepemimpinan, tanggung jawab, dan percaya diri siswa.",
            image: "/images/events/kepemimpinan.jpg",
            slug: "kepemimpinan"
        },
        {
            id: 6,
            title: "Keluarga & Parenting",
            description: "Bersama orang tua membangun lingkungan terbaik untuk tumbuh kembang anak.",
            image: "/images/events/parenting.jpg",
            slug: "keluarga-parenting"
        },
        {
            id: 7,
            title: "Spiritual & Keislaman",
            description: "Menumbuhkan keimanan dan kecintaan kepada Allah melalui kegiatan keislaman.",
            image: "/images/events/spiritual.jpg",
            slug: "spiritual-keislaman"
        },
        {
            id: 8,
            title: "Community Service",
            description: "Menanamkan kepedulian sosial dan semangat berbagi untuk sesama dan lingkungan.",
            image: "/images/events/community.jpg",
            slug: "community-service"
        },
        {
            id: 9,
            title: "Wisuda & Pelepasan",
            description: "Momen berharga merayakan perjuangan dan pencapaian siswa Attaufiq.",
            image: "/images/events/wisuda.jpg",
            slug: "wisuda-pelepasan"
        }
    ];

    const displayPrograms = events.length > 0 ? events : defaultPrograms;

    return (
        <AppLayout title="Program & Kegiatan - SIT At-Taufiq">
            <Head title="Events & Program Sekolah | SIT At-Taufiq Jambi" />

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

{/* Komponen Kartu Program Berbentuk Orb/Lingkaran */}
function ProgramOrbCard({ program, index }) {
    const IconComponent = getProgramIcon(program.title);
    
    // Memberikan offset vertikal pada screen desktop (efek gelombang naik-turun)
    const isEven = index % 2 === 0;

    return (
        <div className={`flex flex-col items-center transition-all duration-500 transform hover:-translate-y-2 ${
            isEven ? 'lg:-translate-y-6' : 'lg:translate-y-6'
        }`}>
            {/* Lingkaran Utama Card */}
            <div className="w-[260px] h-[340px] rounded-[130px] bg-[#FAF8F3] border border-[#E8DFC8] shadow-lg hover:shadow-2xl transition-all duration-500 p-3 flex flex-col justify-between items-center relative group overflow-hidden">
                
                {/* 1. HALF-CIRCLE IMAGE BANNER */}
                <div className="w-full h-[145px] rounded-t-[120px] rounded-b-2xl overflow-hidden relative bg-slate-200">
                    <img
                        src={program.image ? (program.image.startsWith('/images') ? program.image : `/storage/${program.image}`) : '/images/placeholder.jpg'}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* Floating Badge Icon Kategori */}
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

                    {/* 3. CIRCULAR ARROW BUTTON LINK */}
                    <Link
                        href={route('events.show', program.slug || 'program-detail')}
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