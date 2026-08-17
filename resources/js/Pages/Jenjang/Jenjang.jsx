import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import HeroSection from '@/Layouts/HeroSection';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, GraduationCap, Heart, Sun, Award } from 'lucide-react';

// Varian animasi stagger untuk grid card
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Jenjang() {
    const jenjangList = [
        {
            code: "PG",
            title: "Playgroup",
            age: "Usia 2 - 4 Tahun",
            desc: "Fondasi kasih sayang, adab, dan pengenalan Al-Qur'an sejak usia dini.",
            href: "/pg",
            icon: (
                <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#FFC72C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
        },
        {
            code: "TK",
            title: "Taman Kanak-Kanak",
            age: "Usia 4 - 6 Tahun",
            desc: "Bermain sambil belajar, pembiasaan ibadah harian, dan kemandirian.",
            href: "/tk",
            icon: (
                <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#FFC72C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
                </svg>
            ),
        },
        {
            code: "SD IT",
            title: "Sekolah Dasar",
            age: "Usia 6 - 12 Tahun",
            desc: "Fondasi akademik, pemahaman Al-Qur'an, dan pembentukan karakter adab.",
            href: "/sd",
            icon: (
                <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#FFC72C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    <path d="M6 6h10M6 10h10" />
                </svg>
            ),
        },
        {
            code: "SMP IT",
            title: "Sekolah Menengah Pertama",
            age: "Usia 12 - 15 Tahun",
            desc: "Penguatan kepemimpinan, berpikir kritis, serta penambahan hafalan.",
            href: "/smp",
            icon: (
                <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#FFC72C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4a3 3 0 0 1 6 0v4" />
                    <line x1="12" y1="3" x2="12" y2="7" />
                </svg>
            ),
        },
        {
            code: "SMA IT",
            title: "Sekolah Menengah Atas",
            age: "Usia 15 - 18 Tahun",
            desc: "Kesiapan ke perguruan tinggi terbaik, kepemimpinan, dan kontribusi pada masyarakat.",
            href: "/sma",
            icon: (
                <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#FFC72C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
                </svg>
            ),
        },
    ];

    return (
        <AppLayout title="Program Pendidikan - SIT At-Taufiq">
            <Head title="Program Pendidikan | SIT At-Taufiq Jambi" />

            {/* ==========================================
                1. HERO SECTION (MENGGUNAKAN KOMPONEN HEROSECTION)
            ========================================== */}
            <HeroSection
                title={"Program\nPendidikan"}
                subtitle="Setiap jenjang, satu perjalanan berkelanjutan. Bersama membangun generasi beradab, berilmu, dan bertakwa."
                tagline="SEKOLAH ISLAM ATTAUFIQ"
                mosqueImage="/images/hero/jenjang-hero-left.png"
            />

            {/* ==========================================
                2. PILIH JENJANG PENDIDIKAN SECTION
            ========================================== */}
            <section className="relative py-24 bg-[#FAF4EB] overflow-hidden">
                {/* Background Pattern Subtle */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

                <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                    
                    {/* Header Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 space-y-3"
                    >
                        <div className="flex items-center justify-center space-x-2 text-[#C9972E]">
                            <span className="text-xs">◆</span>
                            <span className="font-bold text-xs uppercase tracking-[0.3em]">JENJANG PENDIDIKAN</span>
                            <span className="text-xs">◆</span>
                        </div>

                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#051736] drop-shadow-xs">
                            Pilih Jenjang Pendidikan
                        </h2>

                        <div className="flex items-center justify-center space-x-3 my-3">
                            <div className="w-12 h-[1.5px] bg-[#C9972E]"></div>
                            <span className="text-[#C9972E] text-xs">☀️</span>
                            <div className="w-12 h-[1.5px] bg-[#C9972E]"></div>
                        </div>

                        <p className="text-slate-600 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                            Setiap fase tumbuh kembang disesuaikan dengan kurikulum integratif dan pembiasaan adab harian.
                        </p>
                    </motion.div>

                    {/* Grid Cards Jenjang Berkubah Islami */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-6 lg:gap-5 justify-center items-stretch"
                    >
                        {jenjangList.map((item, index) => (
                            <motion.div key={item.code} variants={cardVariants} className="flex">
                                <Link
                                    href={item.href}
                                    className="group relative w-full bg-[#FFFDF9] rounded-t-[70px] sm:rounded-t-[85px] rounded-b-[28px] border-2 border-[#E8DFC8] hover:border-[#D4AF37] p-6 sm:p-7 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Ornamen Top Inner Mihrab Arch Line */}
                                    <div className="absolute top-2 inset-x-2 h-20 rounded-t-[60px] border-t border-x border-[#E8DFC8]/50 pointer-events-none group-hover:border-[#D4AF37]/50 transition duration-500"></div>

                                    <div className="relative z-10 flex flex-col items-center w-full pt-2">
                                        
                                        {/* Aksen Bintang Kecil Atas */}
                                        <span className="text-[#C9972E] text-[10px] mb-3 group-hover:scale-125 transition duration-300">✦</span>

                                        {/* Badge Lingkaran Ikon Navy */}
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#051736] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#07327F] transition duration-500 flex-shrink-0">
                                            {item.icon}
                                        </div>

                                        {/* Judul Kode Jenjang (PG, TK, SD IT, dll) */}
                                        <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#051736] mt-5 group-hover:text-[#07327F] transition">
                                            {item.code}
                                        </h3>

                                        {/* Subtitle Nama Jenjang */}
                                        <p className="text-xs font-bold text-[#C9972E] uppercase tracking-wider mt-1">
                                            {item.title}
                                        </p>

                                        {/* Age Badge */}
                                        <span className="inline-block bg-[#FAF4EB] text-slate-500 text-[10px] font-medium px-3 py-1 rounded-full mt-2.5 border border-[#E8DFC8]">
                                            {item.age}
                                        </span>

                                        {/* Deskripsi Singkat */}
                                        <p className="text-slate-600 font-light text-xs leading-relaxed mt-3.5 px-1 line-clamp-3">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Tombol Panah Bawah */}
                                    <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-center space-x-2 text-[#051736] font-serif text-xs font-bold group-hover:text-[#C9972E] transition">
                                        <span>Selengkapnya</span>
                                        <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition duration-300" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Bottom Ornament Divider */}
                    <div className="flex justify-center items-center gap-4 mt-16 text-[#C9972E]">
                        <div className="w-16 sm:w-24 h-[1px] bg-[#C9972E]/60"></div>
                        <span className="text-xs">☀️</span>
                        <div className="w-16 sm:w-24 h-[1px] bg-[#C9972E]/60"></div>
                    </div>

                </div>
            </section>

            {/* ==========================================
                3. HIGHLIGHT BANNER PERJALANAN PENDIDIKAN
            ========================================== */}
            <section className="py-20 bg-[#051736] text-white relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                    <div className="bg-[#07327F]/70 border-2 border-[#D4AF37]/40 rounded-[36px] p-8 sm:p-12 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-3 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start space-x-2 text-[#FFC72C]">
                                <Sparkles size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Satu Perjalanan Berkelanjutan</span>
                            </div>
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                                Siap Mendampingi Ananda Menuju Masa Depan Terbaik?
                            </h3>
                            <p className="text-blue-100/90 font-light text-xs sm:text-sm max-w-xl">
                                Pendaftaran murid baru kini dibuka untuk seluruh jenjang dari Playgroup hingga SMA IT At-Taufiq.
                            </p>
                        </div>

                        <Link
                            href="/admission"
                            className="bg-[#FFC72C] hover:bg-[#ffd34d] text-[#051736] px-8 py-4 rounded-2xl font-serif text-xs font-bold uppercase tracking-wider transition shadow-lg flex items-center space-x-2 whitespace-nowrap flex-shrink-0"
                        >
                            <span>Informasi Pendaftaran</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}