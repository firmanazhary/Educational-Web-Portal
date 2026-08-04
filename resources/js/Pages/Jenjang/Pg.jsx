import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import {
    Check, Sparkles, ChevronLeft,
    ChevronRight,
    School,
    Gamepad2,
    BookOpen,
    Building2,
    Trees,
    HeartPulse,
    Users,
    ClipboardList,

} from 'lucide-react';

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

const categories = [
    "Semua",
    "Pembiasaan Islami",
    "Akademik",
    "Kreativitas",
    "Life Skill",
    "Outdoor",
    "Tahfidz",
];

const activitiesData = [
    {
        id: 1,
        title: "Morning Circle",
        category: "Pembiasaan Islami",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Tilawah & Doa Harian",
        category: "Pembiasaan Islami",
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Belajar Sambil Bermain",
        category: "Akademik",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Kegiatan Seni",
        category: "Kreativitas",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Bermain Outdoor",
        category: "Outdoor",
        image: "https://images.unsplash.com/photo-1472162072142-d544e7784670?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "Tahfidz Quran",
        category: "Tahfidz",
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 7,
        title: "Mandiri & Cooking Class",
        category: "Life Skill",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=500&auto=format&fit=crop",
    },
];

const stepsData = [
    {
        number: "1",
        title: "Pendaftaran",
        description: "Isi formulir pendaftaran secara online atau datang langsung ke sekolah.",
        icon: <ClipboardList className="w-8 h-8 text-[#0B1A30]" />
    },
    {
        number: "2",
        title: "Observasi & Interview",
        description: "Ananda akan mengikuti observasi bermain dan wawancara orang tua.",
        icon: <Users className="w-8 h-8 text-[#0B1A30]" />
    },
    {
        number: "3",
        title: "Konfirmasi & Awal Belajar",
        description: "Setelah konfirmasi, Ananda siap memulai pengalaman belajar menyenangkan di Attaufiq!",
        icon: <Sparkles className="w-8 h-8 text-[#0B1A30]" />
    }
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

    // Kegiatan section
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [isLoaded, setIsLoaded] = useState(false);
    const scrollContainerRef = useRef(null);
    const cardRef = useRef(null);

    // Trigger animasi masuk setelah komponen di-mount
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const filteredActivities = activeCategory === "Semua"
        ? activitiesData
        : activitiesData.filter((item) => item.category === activeCategory);

    // Scroll persis sejauh lebar 1 kartu + gap
    const handleScroll = (direction) => {
        if (scrollContainerRef.current && cardRef.current) {
            const cardWidth = cardRef.current.offsetWidth;
            const gap = 24; // gap-6 di tailwind bernilai 24px
            const scrollDistance = cardWidth + gap;

            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollDistance : scrollDistance,
                behavior: 'smooth',
            });
        }
    };



    return (
        <AppLayout title="Jenjang At-Taufiq">
            <Head title="Jenjang At-Taufiq Jambi | Mencetak Generasi Robbani" />

            {/* ==========================================
                1. HERO SECTION (FADE IN SANTAI)
            ========================================== */}
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

    {/* Elemen Aesthetic Tambahan 1: Ambient Golden Light Bulb */}
    <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

    {/* Content */}
    <div className="relative z-20 container mx-auto px-8 lg:px-20 py-20">

        <div className="max-w-2xl relative">

            {/* Sparkle 1 (Kiri Atas Besar) */}
            <div className="absolute -left-10 -top-10 text-[#D4AF37] text-3xl animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] pointer-events-none">
                ✦
            </div>

            {/* Sparkle 2 (Kanan Atas Kecil) */}
            <div className="absolute right-12 -top-6 text-amber-300/80 text-xl animate-ping pointer-events-none" style={{ animationDuration: '3s' }}>
                ✦
            </div>

            {/* Elemen Aesthetic Tambahan 2: Garis Aksen Vertikal + Konten Teks */}
            <div className="pl-6 border-l-2 border-gradient-to-b border-[#D4AF37] relative">
                
                {/* Glow Line effect */}
                <div className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37] via-amber-200 to-transparent shadow-[0_0_12px_#D4AF37]" />

                <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-wide">
                    PG (Playgroup)
                </h1>

                {/* Subtitle dengan Text-Gradient Emas */}
                <h2 className="mt-6 text-3xl font-serif leading-snug bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent drop-shadow-sm">
                    Tempat terbaik untuk
                    <br />
                    langkah pertama mereka.
                </h2>

                <p className="mt-8 text-lg leading-8 text-gray-200 font-light">
                    Lingkungan belajar yang hangat, aman, dan menyenangkan
                    untuk menumbuhkan kemandirian, rasa ingin tahu,
                    dan kecintaan pada Islam sejak dini.
                </p>
            </div>

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
                {/* Pattern Gambar */}
                <pattern
                    id="bgSectionPattern"
                    patternUnits="userSpaceOnUse"
                    width="100%"
                    height="120"
                >
                    <image
                        href={bgsection2}
                        width="1440"
                        height="120"
                        preserveAspectRatio="none"
                        className="bg-bottom"
                    />
                </pattern>
            </defs>

            {/* Path Garis Emas */}
            <path
                fill="#D4AF37"
                d="M0,55 C350,120 1100,0 1440,55 L1440,120 L0,120 Z"
            />

            {/* Perbaikan Path Lengkungan Bawah */}
            <path
                fill="url(#bgSectionPattern)"
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
                                        className={`flex items-center gap-3 px-4 py-3 rounded-full text-left text-xs sm:text-sm font-semibold transition-all duration-300 ease-out w-full group ${isActive
                                            ? 'bg-[#0F223D] text-white shadow-md translate-x-2'
                                            : 'bg-[#FAF4EE] text-gray-700 hover:bg-[#F0E4D8] border border-[#F3E2D4]/50 hover:translate-x-1'
                                            }`}
                                    >
                                        <div
                                            className={`p-1.5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isActive ? 'bg-white/10 text-white' : 'text-[#0F223D]'
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
                                            className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeIndex
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

            {/* ==========================================
                5. ACTIVITY SECTION
            ========================================== */}
            <section className="w-full bg-[#FAF6F0] py-16 px-4 md:px-8 font-sans overflow-hidden">
                {/* Container utama dengan animasi fade-in-up */}
                <div
                    className={`max-w-7xl mx-auto bg-[#FFFBF5]/90 backdrop-blur-md rounded-3xl border border-[#F1E4D5] p-6 md:p-12 shadow-xl shadow-amber-900/5 transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >

                    {/* Header Section */}
                    <div className="flex flex-col items-center mb-10 text-center">
                        {/* Badge Icon dengan Sentuhan Aesthetic Light/Glow */}
                        <div className="relative mb-4 flex items-center justify-center group">
                            <div className="absolute inset-0 bg-amber-400/30 rounded-xl blur-md group-hover:blur-lg transition-all duration-500"></div>
                            <div className="relative w-11 h-11 bg-[#0B1A30] rotate-45 rounded-xl flex items-center justify-center shadow-lg border border-amber-300/30 transition-transform duration-500 hover:rotate-[225deg]">
                                <span className="-rotate-45 text-amber-400 font-bold text-base transition-transform duration-500 group-hover:scale-110">
                                    4
                                </span>
                            </div>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#0B1A30] tracking-wide">
                            Kegiatan Ananda
                        </h2>
                        <div className="w-12 h-0.5 bg-amber-400/60 rounded-full mt-2"></div>
                    </div>

                    {/* Filter Categories */}
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
                        {categories.map((category) => {
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 transform active:scale-95 ${isActive
                                        ? 'bg-[#0B1A30] text-amber-300 shadow-md shadow-navy-900/20 scale-105'
                                        : 'bg-[#FAF0E6] text-[#5A5A5A] border border-[#E8D7C5] hover:bg-[#F3E3D3] hover:text-[#0B1A30]'
                                        }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>

                    {/* Carousel Container */}
                    <div className="relative px-2 md:px-10">
                        {/* Tombol Prev */}
                        <button
                            onClick={() => handleScroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-20 w-11 h-11 bg-white/90 backdrop-blur-sm border border-[#E8D7C5] rounded-full flex items-center justify-center shadow-lg text-[#0B1A30] hover:bg-[#0B1A30] hover:text-white hover:border-[#0B1A30] transition-all duration-300 transform hover:scale-110 active:scale-90"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={22} />
                        </button>

                        {/* Wrapper Scroll */}
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-2 snap-x snap-mandatory"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            {filteredActivities.map((item, index) => (
                                <div
                                    key={item.id}
                                    ref={index === 0 ? cardRef : null}
                                    className="flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] snap-start flex flex-col items-center group/card transition-all duration-500 hover:-translate-y-2"
                                >
                                    {/* Frame Gambar Aesthetic */}
                                    <div className="relative w-full h-[200px] sm:h-[220px] md:h-[250px] rounded-2xl overflow-hidden shadow-md shadow-amber-950/5 border border-[#EFE5D9]">
                                        {/* Overlay gradien halus */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10" />

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 ease-out"
                                        />
                                    </div>

                                    {/* Title dengan efek underline saat hover */}
                                    <p className="mt-4 text-sm md:text-base font-semibold text-[#0B1A30] text-center group-hover/card:text-amber-700 transition-colors duration-300">
                                        {item.title}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Tombol Next */}
                        <button
                            onClick={() => handleScroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-20 w-11 h-11 bg-white/90 backdrop-blur-sm border border-[#E8D7C5] rounded-full flex items-center justify-center shadow-lg text-[#0B1A30] hover:bg-[#0B1A30] hover:text-white hover:border-[#0B1A30] transition-all duration-300 transform hover:scale-110 active:scale-90"
                            aria-label="Next image"
                        >
                            <ChevronRight size={22} />
                        </button>
                    </div>

                </div>
            </section>

            {/* ==========================================
                6. JOIN SECTION
            ========================================== */}
            <section className="w-full bg-[#FAF6F0] py-16 px-4 md:px-8 font-sans overflow-hidden">
                {/* Container Utama dengan Animasi Smooth Fade-In */}
                <div
                    className={`max-w-7xl mx-auto bg-[#FFFBF5]/90 backdrop-blur-md rounded-3xl border border-[#F1E4D5] p-6 md:p-12 shadow-xl shadow-amber-900/5 relative transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >

                    {/* Header Section */}
                    <div className="flex flex-col items-center mb-10 text-center">
                        {/* Badge Icon 5 dengan Glow Effect */}
                        {/* Badge Icon 5 dengan Glow Effect & Rotasi Bingkai */}
                        <div className="relative mb-4 flex items-center justify-center group">
                            {/* Glow lembut di belakang */}
                            <div className="absolute inset-0 bg-amber-400/30 rounded-xl blur-md group-hover:blur-lg transition-all duration-500" />

                            {/* Kotak Bingkai (Berputar saat hover) */}
                            <div className="relative w-11 h-11 bg-[#0B1A30] rotate-45 rounded-xl flex items-center justify-center shadow-lg border border-amber-300/30 transition-transform duration-500 group-hover:rotate-[225deg]">

                                {/* Angka 5 (Selalu tegak, ikut menyesuaikan rotasi agar tidak terbalik) */}
                                <span className="-rotate-45 -group-hover:rotate-[225deg] text-amber-400 font-bold text-base transition-transform duration-500 group-hover:scale-110">
                                    5
                                </span>

                            </div>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#0B1A30] tracking-wide">
                            Cara Bergabung di PG Attaufiq
                        </h2>
                        <div className="w-12 h-0.5 bg-amber-400/60 rounded-full mt-2" />
                    </div>

                    {/* Content Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                        {/* Langkah 1-3 Container (Kiri) - Luas & Beranimasi */}
                        <div className="lg:col-span-7 bg-[#FFFBF5] rounded-2xl border border-[#E8D7C5]/70 p-4 md:p-6 flex flex-col gap-5 justify-between relative shadow-sm">
                            {stepsData.map((step, index) => (
                                <div
                                    key={index}
                                    style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                                    className={`group relative flex flex-row items-center gap-5 p-4 md:p-5 rounded-2xl transition-all duration-500 ease-out transform hover:-translate-y-1.5 hover:shadow-lg hover:shadow-amber-900/5 hover:bg-gradient-to-r hover:from-[#FAF0E6] hover:to-[#FFFBF5] border border-transparent hover:border-[#E8D7C5] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                                        }`}
                                >
                                    {/* SISI KIRI: SVG Frame Kubah dengan Hover Effect */}
                                    <div className="relative w-18 h-22 sm:w-20 sm:h-24 flex-shrink-0 flex items-center justify-center">
                                        {/* Glow lembut di belakang kubah saat hover */}
                                        <div className="absolute inset-0 bg-amber-300/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <svg
                                            viewBox="0 0 100 120"
                                            className="absolute inset-0 w-full h-full text-[#E8D7C5] group-hover:text-amber-500/60 transition-colors duration-500"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M50 5 C30 25 10 35 10 65 L10 115 L90 115 L90 65 C90 35 70 25 50 5 Z"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                fill="none"
                                            />
                                        </svg>

                                        {/* Icon di dalam Frame Kubah dengan efek bounce/scale */}
                                        <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* SISI KANAN: Text Content (Lega & Sangat Mudah Dibaca) */}
                                    <div className="flex-1 text-left">
                                        <span className="text-amber-600 font-extrabold text-xs md:text-sm tracking-wider uppercase mb-1 block">
                                            Langkah 0{step.number}
                                        </span>
                                        <h3 className="font-bold text-[#0B1A30] text-base md:text-xl leading-snug mb-1.5 group-hover:text-amber-800 transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-[#5A5A5A] text-xs md:text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Banner Admission (Kanan) dengan Gradien Hidup & Animasi Floating */}
                        <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1A30] via-[#102544] to-[#081324] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl border border-amber-500/20 group min-h-[320px]">

                            {/* Ambient Animated Light/Orb Background */}
                            <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl animate-pulse" />
                            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

                            {/* Teks Informasi */}
                            <div className="relative z-10 max-w-xs mb-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-semibold text-xs tracking-wider uppercase mb-3 backdrop-blur-sm">
                                    Pendaftaran Siswa Baru
                                </span>
                                <p className="text-lg md:text-xl font-medium leading-relaxed text-slate-100 font-serif">
                                    Info lengkap & pendaftaran kunjungi halaman Admission
                                </p>
                            </div>

                            {/* Tombol Action Shimmering */}
                            <div className="relative z-10">
                                <a
                                    href="#admission"
                                    className="relative overflow-hidden inline-flex items-center justify-between gap-3 w-full sm:w-auto bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-[#0B1A30] font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 group/btn"
                                >
                                    <span className="relative z-10">Lihat Halaman Admission</span>
                                    <ChevronRight size={18} className="relative z-10 transform group-hover/btn:translate-x-1 transition-transform duration-300" />

                                    {/* Effect kilatan cahaya pada button */}
                                    <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                </a>
                            </div>

                            {/* Decorative Masjid Line Art Background (Glow saat hovered) */}
                            <div className="absolute right-0 bottom-0 top-0 opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none flex items-center justify-end pr-2">
                                <svg
                                    viewBox="0 0 160 200"
                                    className="h-full w-auto text-amber-300 stroke-current transform group-hover:scale-105 transition-transform duration-700"
                                    fill="none"
                                    strokeWidth="1.5"
                                >
                                    <path d="M100 40 C70 70 40 85 40 130 L40 200 L160 200 L160 130 C160 85 130 70 100 40 Z" />
                                    <path d="M100 120 C85 135 70 145 70 170 L70 200 L130 200 L130 170 C130 145 115 135 100 120 Z" />
                                    <path d="M100 25 L100 35 M95 30 L105 30" />
                                </svg>
                            </div>

                        </div>

                    </div>

                </div>
            </section>



        </AppLayout>
    );
}
