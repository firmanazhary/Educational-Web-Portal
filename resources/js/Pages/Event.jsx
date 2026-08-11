import React, { useRef, useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import HeroSection from '@/Layouts/HeroSection'; 
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

export default function EventsIndex({
    events = [],
    title = "Events & Agenda",
    subtitle = "Temukan berbagai kegiatan dan agenda menarik yang kami selenggarakan di SIT At-Taufiq.",
    tagline = "AGENDA ATTAUFIQ",
    mosqueImage = "/images/hero/building-attaufiq.png"
}) {
    // Data Dummy Default jika database masih kosong
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

    const displayPrograms = events && events.length > 0 ? events : defaultPrograms;

    return (
        <AppLayout title={`${title} - SIT At-Taufiq`}>
            <Head title={`${title} | SIT At-Taufiq Jambi`} />

            {/* HERO SECTION REUSABLE */}
            <HeroSection
                title={title}
                subtitle={subtitle}
                tagline={tagline}
                mosqueImage={mosqueImage}
            />

            {/* Canvas Utama - Warm Sand/Beige */}
            <div className="bg-[#FAF4EB] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-[#051736] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

                <div className="max-w-7xl mx-auto space-y-12 relative z-10">

                    {/* HEADER SECTION */}
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <p className="text-xs md:text-sm font-medium text-slate-600 tracking-wide">
                            Pilih item untuk melihat informasi selengkapnya
                        </p>
                        <div className="flex justify-center text-[#D4AF37] pt-1">
                            <span className="animate-bounce text-sm">∨</span>
                        </div>
                    </div>

                    {/* ORBITAL GRID CONTAINER */}
                    <div className="relative py-8">
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

// Komponen Kartu Program Berbentuk Orb
function ProgramOrbCard({ program, index }) {
    const IconComponent = getProgramIcon(program.title);
    const isEven = index % 2 === 0;

    const imageUrl = program.image
        ? (program.image.startsWith('http') || program.image.startsWith('/images')
            ? program.image
            : `/storage/${program.image}`)
        : '/images/placeholder.jpg';

    const detailUrl = route('events.show', program.slug);

    return (
        <div className={`flex flex-col items-center transition-all duration-500 transform hover:-translate-y-2 ${isEven ? 'lg:-translate-y-6' : 'lg:translate-y-6'}`}>
            <div className="w-[260px] h-[340px] rounded-[130px] bg-[#FAF8F3] border border-[#E8DFC8] shadow-lg hover:shadow-2xl transition-all duration-500 p-3 flex flex-col justify-between items-center relative group overflow-hidden">

                {/* 1. HALF-CIRCLE IMAGE BANNER */}
                <Link href={detailUrl} className="w-full h-[145px] rounded-t-[120px] rounded-b-2xl overflow-hidden relative bg-slate-200 block">
                    <img
                        src={imageUrl}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    <div className="absolute -bottom-1 left-4 w-9 h-9 rounded-full bg-[#FAF8F3] border border-[#E8DFC8] shadow-md flex items-center justify-center text-[#8B6B13] z-10">
                        <IconComponent size={16} />
                    </div>
                </Link>

                {/* 2. CARD CONTENT DETAILS */}
                <div className="px-3 pt-3 pb-2 text-center flex-1 flex flex-col justify-between items-center w-full">
                    <div className="space-y-1.5">
                        <Link href={detailUrl} className="block">
                            <h3 className="font-serif text-base font-bold text-[#051736] group-hover:text-[#D4AF37] transition leading-snug">
                                {program.title}
                            </h3>
                        </Link>

                        <p className="text-[11px] text-slate-500 font-light leading-relaxed line-clamp-3 px-1">
                            {program.description}
                        </p>
                    </div>

                    <Link
                        href={detailUrl}
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