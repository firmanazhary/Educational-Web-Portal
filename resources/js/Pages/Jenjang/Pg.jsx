import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Check, Sparkles, ChevronLeft,
  ChevronRight,
  School,
  Gamepad2,
  BookOpen,
  Building2,
  Trees,
  HeartPulse } from 'lucide-react';

const pillars = [
    {
        id: 1,
        title: 'Ilmu',
        description:
            'Menumbuhkan rasa ingin tahu dan kecintaan pada ilmu melalui pembelajaran yang menyenangkan dan bermakna.',
        icon: '/images/jenjang/ilmu.png',
        textColor: 'text-white',
        isYellow: false,
    },
    {
        id: 2,
        title: 'Akhlak',
        description:
            'Membiasakan nilai-nilai Islam dan akhlak mulia dalam keseharian dengan keteladanan dan kasih sayang.',
        icon: '/images/jenjang/akhlak.png',
        textColor: 'text-[#0B1E3D]',
        isYellow: true,
    },
    {
        id: 3,
        title: 'Kemandirian',
        description:
            'Melatih kemandirian, percaya diri, dan kemampuan sosial untuk menjadi pribadi yang siap tumbuh dan berkontribusi.',
        icon: '/images/jenjang/mandiri.png',
        textColor: 'text-white',
        isYellow: false,
    },
];

const features = [
    "Lingkungan Islami yang aman, bersih, dan penuh kasih sayang",
    "Guru profesional dan berpengalaman di bidang PAUD Islam",
    "Kurikulum terpadu: nilai Islam, akademik, dan life skill",
    "Pembiasaan ibadah dan karakter sejak dini",
    "Kolaborasi erat antara sekolah dan orang tua",
];

const facilitiesData = [
    {
      id: 0,
      title: 'Ruang Kelas Nyaman',
      description: 'Ruang kelas dirancang hangat dan aman dengan pencahayaan alami, AC, karpet bermain, dan media belajar yang merangsang kreativitas anak.',
      image: '/images/jenjang/exfasilitas.jfif', // Ganti dengan path foto Anda
      icon: School,
    },
    {
      id: 1,
      title: 'Indoor Playground',
      description: 'Area bermain dalam ruangan yang dilengkapi wahana aman untuk melatih motorik kasar anak saat cuaca tidak mendukung.',
      image: '/images/indoor-playground.jpg',
      icon: Gamepad2,
    },
    {
      id: 2,
      title: 'Perpustakaan Anak',
      description: 'Koleksi buku cerita bergambar Islami dan edukatif untuk menumbuhkan minat baca dan imajinasi anak sejak usia dini.',
      image: '/images/perpustakaan.jpg',
      icon: BookOpen,
    },
    {
      id: 3,
      title: 'Masjid Anak',
      description: 'Sarana latihan ibadah harian yang didesain khusus agar ramah anak, bersih, dan nyaman untuk pembelajaran sholat berjamaah.',
      image: '/images/masjid.jpg',
      icon: Building2,
    },
    {
      id: 4,
      title: 'Area Bermain Outdoor',
      description: 'Taman bermain luar ruangan dengan rumput sintetis, perosotan, dan ayunan untuk eksplorasi fisik dan sosialisasi anak.',
      image: '/images/outdoor.jpg',
      icon: Trees,
    },
    {
      id: 5,
      title: 'UKS & Ruang Kesehatan',
      description: 'Ruang pertolongan pertama yang bersih dan dilengkapi fasilitas medis dasar untuk penanganan awal kesehatan anak.',
      image: '/images/uks.jpg',
      icon: HeartPulse,
    },
  ];


// Custom Hook Animasi Scroll Reveal
function useInView(options = { threshold: 0.15 }) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target); // Animasi cuma jalan sekali pas pertama keliatan
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return [ref, isInView];
}



export default function Pg({
    title = "PG Page",
    subtitle = "Setiap jenjang, satu perjalanan. Bersama membangun generasi beradab.",
    tagline = "SEKOLAH ISLAM ATTAUFIQ",
    patternImage = "/images/hero/heropg.png",
    bgpilar = "/images/jenjang/bgpilar.png",
    bgpilarYellow = "/images/jenjang/bgpilaryellow.png",
    bgsection = "/images/jenjang/bgsection.png",
    bgsection2 = "/images/jenjang/bgsection2.png",
    whysection = "/images/jenjang/whysection.png",
    bgOrnament = "/images/jenjang/bgOrnament.png",
}) {
    const [activeTab, setActiveTab] = useState('PG-TK');
    const [activeIndex, setActiveIndex] = useState(0);
    // Fungsi Navigasi
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? facilitiesData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === facilitiesData.length - 1 ? 0 : prev + 1));
  };

  const currentFacility = facilitiesData[activeIndex];

    // Ref untuk Masing-masing Section Animasi
    const [heroRef, heroInView] = useInView();
    const [pillarRef, pillarInView] = useInView();

    return (
        <AppLayout title="Jenjang At-Taufiq">
            <Head title="Jenjang At-Taufiq Jambi | Mencetak Generasi Robbani" />

            {/* ==========================================
                1. HERO SECTION (FADE IN SANTAI)
            ========================================== */}
            {/* Ditambahkan `flex items-center` agar seluruh konten tepat di tengah vertikal */}
            <section className="relative overflow-hidden min-h-[70vh] lg:min-h-[600px] flex items-center">

                {/* Background Image */}
                <img
                    src={patternImage}
                    alt="Hero PG"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Overlay Biru */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(
                        90deg,
                        rgba(8,43,102,0.98) 0%,
                        rgba(8,43,102,0.95) 30%,
                        rgba(8,43,102,0.82) 45%,
                        rgba(8,43,102,0.55) 58%,
                        rgba(8,43,102,0.15) 72%,
                        rgba(8,43,102,0) 100%
                    )`,
                    }}
                />

                {/* Content - Menghapus pt-40 agar terpusat vertikal secara alami */}
                <div className="relative z-20 container mx-auto px-8 lg:px-20 py-20">

                    {/* Menghapus -mt-12 agar posisi persis di tengah vertikal */}
                    <div className="max-w-2xl relative">
                        <div className="absolute -left-6 -top-8 text-[#D4AF37]/60 text-2xl animate-pulse">
                            ✦
                        </div>

                        <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-white leading-tight">
                            PG (Playgroup)
                        </h1>

                        <h2 className="mt-6 text-[#D4AF37] text-3xl font-serif leading-snug">
                            Tempat terbaik untuk
                            <br />
                            langkah pertama mereka.
                        </h2>

                        <p className="mt-8 text-lg leading-8 text-gray-200">
                            Lingkungan belajar yang hangat, aman, dan menyenangkan
                            untuk menumbuhkan kemandirian, rasa ingin tahu,
                            dan kecintaan pada Islam sejak dini.
                        </p>

                    </div>

                </div>
                {/* Wave di bagian bawah Hero Section */}
                <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10">
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-[120px]"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            {/* 1. Definisikan Pattern Gambar di Sini */}
                            <pattern
                                id="bgSectionPattern" // ID unik untuk dipanggil nanti
                                patternUnits="userSpaceOnUse"
                                width="100%" // Sesuaikan dengan kebutuhan scaling gambar
                                height="120"
                            >
                                <image
                                    href={bgsection2} // Variabel URL gambar kamu
                                    width="1440" // Lebar viewBox SVG
                                    height="120"
                                    preserveAspectRatio="none" // Agar gambar stretch mengikuti bentuk
                                    className='bg-bottom'
                                />
                            </pattern>
                        </defs>

                        {/* 2. Path Garis Emas (Tetap sama) */}
                        <path
                            fill="#D4AF37"
                            d="M0,55 C350,120 1100,0 1440,55 L1440,120 L0,120 Z"
                        />

                        {/* 3. Perbaikan Path Lengkungan Bawah: Panggil Pattern ID */}
                        <path
                            fill="url(#bgSectionPattern)" // Panggil ID pattern yang dibuat di atas
                            d="M0,70 C350,135 1100,15 1440,70 L1440,120 L0,120 Z"
                        />
                    </svg>
                </div>

            </section>

            {/* ==========================================
                2. PILAR SECTION
            ========================================== */}
            <section ref={pillarRef} className="relative w-full bg-[#FAF5EE] z-10 pt-16 mt-[-30px] px-4 font-serif bg-cover" style={{
                backgroundImage: `url(${bgsection2})`, // Variabel gambar background kamu
            }}>
                <div className="max-w-6xl mx-auto flex flex-col items-center">

                    <div
                        className={`
        text-center
        transition-all duration-1000
        ${pillarInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                            }
    `}
                    >

                        <span className="text-[#D4AF37] uppercase tracking-[5px] text-sm font-semibold">
                            Nilai Pendidikan
                        </span>


                        <h2 className="mt-3 text-4xl font-bold text-[#0B1E3D]">
                            3 Pilar Utama Kami
                        </h2>

                        <div className="w-24 h-1 rounded-full bg-[#D4AF37] mx-auto mt-5"></div>

                    </div>

                    {/* Grid 3 Pilar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full items-end justify-center">
                        {pillars.map((pillar) => {
                            const IconComponent = pillar.icon;
                            // Pilih background image sesuai properti isYellow
                            const currentBg = pillar.isYellow ? bgpilarYellow : bgpilar;

                            return (
                                <div
                                    key={pillar.id}
                                    className={`
        relative flex flex-col items-center mx-auto
        w-full max-w-[320px]

        transition-all duration-1000

        ${pillarInView
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-16"
                                        }

        hover:-translate-y-4
    `}
                                    style={{
                                        transitionDelay: `${pillar.id * 180}ms`,
                                    }}
                                >
                                    {/* Container Kubah Menggunakan Background Image Dinamis */}
                                    <div
                                        className={`w-full min-h-[420px] p-6 flex flex-col items-center justify-center text-center ${pillar.textColor} bg-contain bg-no-repeat bg-center`}
                                        style={{
                                            backgroundImage: `url(${currentBg})`,
                                        }}
                                    >
                                        {/* Container Konten */}
                                        <div className="w-full h-full pt-10 pb-6 px-4 flex flex-col items-center justify-center">
                                            {/* Icon SVG */}
                                            <div className="mb-5 flex justify-center">
                                                <img
                                                    src={pillar.icon}
                                                    alt={pillar.title}
                                                    className="
                                w-20
                                h-20
                                object-contain

                                transition-transform
                                duration-500

                                group-hover:scale-110
                                animate-[float_4s_ease-in-out_infinite]
                            "
                                                />
                                            </div>

                                            {/* Judul Pilar */}
                                            <h3 className="text-2xl font-bold mb-3 tracking-wider">
                                                {pillar.title}
                                            </h3>

                                            {/* Garis */}
                                            <div
                                                className={`
                            h-1
                            rounded-full
                            mb-5
                            transition-all
                            duration-500

                            ${pillar.isYellow
                                                        ? "bg-[#0B1E3D]"
                                                        : "bg-[#D4AF37]"
                                                    }

                            w-10
                            group-hover:w-20
                        `}
                                            />

                                            {/* Deskripsi */}
                                            <p className="text-sm leading-relaxed opacity-90 max-w-[220px]">
                                                {pillar.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. WHY ATTAUFIQ SECTION
            ========================================== */}
          <section className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 my-10">
      {/* Outer Card Container */}
      <div className="relative overflow-hidden bg-[#f9f2ed] border border-[#F3E2D4] rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-md">

        {/* Gambar Hiasan Ornamen dengan Animasi Melayang Soft (Pulse/Bounce Slow) */}
        <img
          src={bgOrnament}
          alt="Islamic Ornament Background"
          className="absolute right-0 bottom-0 w-72 h-auto pointer-events-none opacity-15 translate-x-6 translate-y-6 select-none "
        />

        {/* Hiasan Sparkles dengan Animasi Kedip & Putar/Pulse Berbeda-beda */}
        <div className="absolute right-12 bottom-28 text-[#D9A04B]/70 pointer-events-none select-none animate-bounce duration-1000">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>

        <div className="absolute right-28 bottom-12 text-[#D9A04B]/50 pointer-events-none select-none animate-pulse">
          <Sparkles className="w-4 h-4" />
        </div>

        <div className="absolute right-16 bottom-44 text-[#D9A04B]/60 pointer-events-none select-none animate-spin-slow">
          <Sparkles className="w-5 h-5" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Gambar Sisi Kiri dengan Animasi Zoom saat Hover */}
          <div className="lg:col-span-5 w-full h-52 sm:h-80 lg:h-[380px] overflow-hidden rounded-2xl shadow-sm group">
            <img
              src={whysection}
              alt="Anak-anak belajar bersama guru"
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>

          {/* Konten Teks Sisi Kanan */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pl-4">

            {/* Header / Judul */}
            <div className="flex items-center gap-3.5 group">
              {/* Star Badge Icon dengan Efek Hover Rotasi */}
              <div className="relative flex items-center justify-center w-10 h-10 bg-[#0F223D] text-white font-bold rounded-lg rotate-45 flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:rotate-90">
                <span className="-rotate-45 text-lg font-serif group-hover:-rotate-90 transition-transform duration-300">
                  2
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F223D]">
                Mengapa Memilih PG Attaufiq?
              </h2>
            </div>

            {/* Daftar Poin */}
            <ul className="space-y-3.5 pt-2">
              {features.map((item, index) => (
                <li key={index} className="flex items-center gap-3.5 group/item">
                  {/* Circle Check Icon dengan Animasi Scale saat Hover */}
                  <div className="flex items-center justify-center w-7 h-7 bg-[#D9A04B] text-white rounded-full flex-shrink-0 shadow-sm transition-transform duration-300 group-hover/item:scale-110">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>

                  <span className="text-gray-700 text-sm sm:text-base font-medium transition-colors duration-200 group-hover/item:text-[#0F223D]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

          </div>

        </div>

      </div>
    </section>

     {/* ==========================================
                4. WHY ATTAUFIQ SECTION
            ========================================== */}
         <section className="w-full flex flex-col items-center mx-auto p-8 sm:p-6 md:p-8 bg-[#f9f2ed]">
      {/* Outer Card Container */}
      <div className="relative max-w-6xl mx-auto w-full overflow-hidden bg-[#faf8f5] border border-[#F3E2D4] rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm my-10 transition-all duration-300 hover:shadow-md">

        {/* Header Section */}
        <div className="flex items-center justify-center gap-3.5 mb-8 group cursor-default">
          {/* Badge Number dengan Efek Rotasi saat Hover */}
          <div className="relative flex items-center justify-center w-10 h-10 bg-[#0F223D] text-white font-bold rounded-lg rotate-45 flex-shrink-0 shadow-sm transition-transform duration-500 group-hover:rotate-[225deg]">
            <span className="-rotate-45 text-lg font-serif transition-transform duration-500 group-hover:-rotate-[225deg]">
              3
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F223D]">
            Fasilitas Kami
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* 1. Tombol Daftar Fasilitas (Sisi Kiri) */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-2.5">
            {facilitiesData.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full text-left text-xs sm:text-sm font-semibold transition-all duration-300 ease-out w-full group ${
                    isActive
                      ? 'bg-[#0F223D] text-white shadow-md translate-x-2'
                      : 'bg-[#FAF4EE] text-gray-700 hover:bg-[#F0E4D8] border border-[#F3E2D4]/50 hover:translate-x-1'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? 'bg-white/10 text-white' : 'text-[#0F223D]'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="truncate">{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* 2. Display Gambar Utama (Tengah) */}
          <div className="lg:col-span-5 relative w-full h-64 sm:h-80 lg:h-[380px] overflow-hidden rounded-2xl shadow-sm border border-[#F3E2D4]/60 bg-gray-100 group">
            <img
              key={currentFacility.id} // Re-render image animation saat index berubah
              src={currentFacility.image}
              alt={currentFacility.title}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 animate-fadeIn"
            />
          </div>

          {/* 3. Panel Informasi & Control Carousel (Sisi Kanan) */}
          <div className="lg:col-span-4 relative flex flex-col justify-between p-6 sm:p-8 bg-[#FFFBF7]/80 border border-[#F3E2D4] rounded-2xl shadow-sm overflow-hidden">

            {/* Hiasan Vector Masjid/Kubah dengan Animasi Floating Soft */}
            <div className="absolute top-4 right-4 text-[#D9A04B]/20 pointer-events-none select-none animate-pulse duration-1000">
              <Building2 className="w-16 h-16 stroke-[1]" />
            </div>

            {/* Sparkles Hiasan Tambahan */}
            <div className="absolute top-12 right-16 text-[#D9A04B]/50 pointer-events-none select-none">
              <Sparkles className="w-4 h-4 animate-bounce" />
            </div>

            {/* Deskripsi Teks dengan Key Animation */}
            <div key={currentFacility.id} className="relative z-10 space-y-4 my-auto animate-fadeIn">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F223D] transition-colors duration-300">
                {currentFacility.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {currentFacility.description}
              </p>
            </div>

            {/* Navigasi Carousel (Panah Left/Right & Indicator Dots) */}
            <div className="relative z-10 flex items-center justify-center gap-4 pt-6">
              {/* Button Prev */}
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-[#0F223D] hover:text-white hover:border-[#0F223D] active:scale-95 transition-all duration-200 shadow-sm"
                aria-label="Previous Facility"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Indicator Dots */}
              <div className="flex items-center gap-2">
                {facilitiesData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-6 bg-[#0F223D]'
                        : 'w-2.5 bg-[#D9A04B]/40 hover:bg-[#D9A04B]'
                    }`}
                  />
                ))}
              </div>

              {/* Button Next */}
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-[#0F223D] hover:text-white hover:border-[#0F223D] active:scale-95 transition-all duration-200 shadow-sm"
                aria-label="Next Facility"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>




        </AppLayout>
    );
}
