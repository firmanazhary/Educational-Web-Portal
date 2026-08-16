import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Play, Sun } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

export default function HeroSlider() {
    // Data Carousel (3 slide)
    const slides = [
        {
            id: 1,
            badge: "✦ SEKOLAH ISLAM ATTAUFIQ ✦",
            titleMain: "Membentuk Generasi",
            titleItalic: "Berarti",
            titleEnd: "untuk Dunia.",
            desc: "Islam + Future Ready — Attaufiq mendampingi setiap anak menemukan arti hidupnya melalui ilmu, akhlak, dan pengalaman belajar yang bermakna.",
            btnPrimaryText: "Kenali Attaufiq →",
            btnPrimaryLink: "#about",
            btnSecondaryText: "Lihat Profil Sekolah",
            btnSecondaryLink: "#profil",
            image: "images/jenjang/heroSma.JPG"
        },
        {
            id: 2,
            badge: "✦ PENDIDIKAN BERKARAKTER ✦",
            titleMain: "Menumbuhkan Potensi",
            titleItalic: "Terbaik",
            titleEnd: "Ananda.",
            desc: "Dengan kurikulum terintegrasi, kami membangun pondasi karakter islami dan keterampilan abad 21 untuk masa depan yang gemilang.",
            btnPrimaryText: "Daftar Sekarang →",
            btnPrimaryLink: "#ppdb",
            btnSecondaryText: "Kurikulum Kami",
            btnSecondaryLink: "#kurikulum",
            image: "images/hero/imgHero-1.JPG"
        },
        {
            id: 3,
            badge: "✦ LINGKUNGAN BELAJAR ISLAMI ✦",
            titleMain: "Suasana Belajar",
            titleItalic: "Nyaman",
            titleEnd: "dan Kolaboratif.",
            desc: "Fasilitas modern dan tenaga pendidik berdedikasi menciptakan ruang tumbuh yang menyenangkan bagi setiap siswa.",
            btnPrimaryText: "Jelajahi Fasilitas →",
            btnPrimaryLink: "#fasilitas",
            btnSecondaryText: "Galeri Kegiatan",
            btnSecondaryLink: "#galeri",
            image: "images/home/tahfidzhDay.JPG"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto play carousel setiap 6 detik
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);


    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
      <section className="relative w-full bg-[#102380] overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
      
      {/* ================= SLIDES CONTAINER ================= */}
      <div className="relative w-full h-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* 1. GAMBAR BACKGROUND FULL */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={slide.image} 
                alt="Hero Background" 
                className="w-full h-full object-cover object-[85%_center] sm:object-[88%_center] lg:object-[92%_center] transition-transform duration-700" 
              />
            </div>

            {/* 2. OVERLAY GRADIENT (#102380) - RESPONSIVE DIRECTION */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#102380] via-[#102380]/90 to-[#102380]/40 sm:bg-gradient-to-r sm:from-[#102380] sm:via-[#102380]/95 sm:via-45% sm:to-transparent pointer-events-none z-10">
              {/* Pattern Islami Transparan */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                  backgroundSize: '22px 22px'
                }}
              />
            </div>

            {/* ================= ORNAMEN ESTETIK TAMBAHAN ================= */}
            {/* Ambient Light Kuning/Emas */}
            <div className="absolute top-0 left-0 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-amber-400/15 rounded-full blur-3xl pointer-events-none z-15" />

            {/* Sparkles / Bintang Emas */}
            <div className="absolute top-10 sm:top-12 left-[15%] sm:left-[30%] text-[#FFC700]/40 text-lg sm:text-xl animate-pulse pointer-events-none z-15">✦</div>
            <div className="absolute top-20 sm:top-28 left-[60%] sm:left-[45%] text-[#FFC700]/30 text-xs animate-ping pointer-events-none z-15">✨</div>
            <div className="absolute bottom-16 sm:bottom-20 left-[10%] sm:left-[25%] text-[#FFC700]/35 text-xs sm:text-sm animate-pulse pointer-events-none z-15">✦</div>

            {/* Silhouette Bulan Sabit Emas */}
            <div className="absolute top-4 sm:top-6 right-[10%] sm:right-[42%] text-amber-300/10 text-6xl sm:text-8xl font-serif pointer-events-none select-none z-15">
              🌙
            </div>

            {/* 3. KONTEN TEKS & LOGO */}
            <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-7xl h-full flex items-center relative z-20 pt-12 sm:pt-0">
              <div className="w-full lg:w-[55%] flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pl-0 sm:pl-8 lg:pl-12">
                
                {/* LOGO ATTAUFIQ (Muncul di Mobile & Desktop) */}
                <div className="shrink-0 self-start sm:self-end mb-1 sm:mb-4 lg:mb-6">
                  <img 
                    src="images/hero/logoHero.png" 
                    alt="Logo Attaufiq" 
                    className="w-14 sm:w-24 lg:w-28 h-auto object-contain drop-shadow-2xl"
                  />
                </div>

                {/* TEKS UTAMA */}
                <div className="space-y-3 sm:space-y-4 max-w-lg">
                  {/* BADGE */}
                  <div>
                    <span className="text-[#FFC700] text-[10px] sm:text-xs lg:text-sm tracking-widest font-bold uppercase drop-shadow">
                      {slide.badge}
                    </span>
                  </div>

                  {/* JUDUL */}
                  <h1 className="text-xl sm:text-3xl lg:text-[42px] font-serif leading-[1.25] sm:leading-[1.2] font-medium text-white drop-shadow-md">
                    {slide.titleMain}{' '}
                    <span className="italic font-normal text-[#FFC700]">
                      {slide.titleItalic}
                    </span>{' '}
                    {slide.titleEnd}
                  </h1>

                  {/* BINTANG DIVIDER */}
                  <div className="flex items-center gap-2 sm:gap-3 opacity-70">
                    <span className="w-8 sm:w-12 h-[1px] bg-amber-100"></span>
                    <span className="text-[#FFC700] text-[9px] sm:text-[10px]">☀️</span>
                    <span className="w-8 sm:w-12 h-[1px] bg-amber-100"></span>
                  </div>

                  {/* DESKRIPSI */}
                  <p className="text-slate-200/90 text-xs sm:text-sm leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
                    {slide.desc}
                  </p>

                  {/* TOMBOL ACTION */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                    <a
                      href={slide.btnPrimaryLink}
                      className="bg-[#FFC700] hover:bg-[#ebd000] text-[#102380] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                    >
                      {slide.btnPrimaryText}
                    </a>

                    <a
                      href={slide.btnSecondaryLink}
                      className="flex items-center gap-2 text-white hover:text-[#FFC700] text-xs sm:text-sm font-semibold transition-colors group"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/80 group-hover:border-[#FFC700] flex items-center justify-center transition-colors shadow">
                        <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                      </div>
                      <span>{slide.btnSecondaryText}</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= GANTUNGAN LAMPU KIRI ATAS ================= */}
      <div className="absolute top-0 left-0 z-30 pointer-events-none w-[180px] sm:w-[520px] lg:w-[640px] h-full max-h-[680px]">
        <img 
          src="images/home/lightHero.png" 
          alt="Lampu Hero Ornamen" 
          className="w-full h-full object-contain object-left-top drop-shadow-[0_10px_20px_rgba(255,199,0,0.25)]"
        />
      </div>

      {/* ================= TOMBOL NAVIGASI CAROUSEL (IKON MATAHARI LUCIDE) ================= */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-[#102380]/60 sm:bg-[#102380]/40 hover:bg-[#FFC700] text-[#FFC700] hover:text-[#102380] backdrop-blur-md border border-[#FFC700]/40 hover:border-[#FFC700] flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,199,0,0.5)] hover:scale-110 active:scale-95 group"
      >
        <Sun className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2] transition-transform duration-500 group-hover:rotate-45" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-[#102380]/60 sm:bg-[#102380]/40 hover:bg-[#FFC700] text-[#FFC700] hover:text-[#102380] backdrop-blur-md border border-[#FFC700]/40 hover:border-[#FFC700] flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,199,0,0.5)] hover:scale-110 active:scale-95 group"
      >
        <Sun className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2] transition-transform duration-500 group-hover:rotate-45" />
      </button>

      {/* ================= DOTS INDICATOR ================= */}
      <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-16 lg:right-20 z-30 flex items-center gap-1.5 sm:gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-6 sm:w-8 bg-[#FFC700] shadow-[0_0_10px_rgba(255,199,0,0.6)]' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

    </section>
    );
}