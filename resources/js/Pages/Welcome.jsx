// resources/js/Pages/Home.jsx

import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';
import HeroSlider from '@/Layouts/HeroSlider';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    BookOpen,
    GraduationCap,
    Heart,
    Cloud,
    Sun,
    Star,
    Smile,
    Compass,
    UserPlus,
    Calendar,
    ArrowRight,
    ArrowUpRight
} from 'lucide-react';

// ==========================================
// DATA ORNAMEN BACKGROUND (Parallax)
// ==========================================
const BACKGROUND_ORNAMENTS = [
    {
        id: 1,
        Icon: Sparkles,
        size: 28,
        color: "text-amber-400/60",
        top: "6%",
        left: "8%",
        depth: 0.1,
    },
    {
        id: 2,
        Icon: Cloud,
        size: 48,
        color: "text-amber-200/50",
        top: "18%",
        right: "6%",
        depth: 0.15,
    },
    {
        id: 3,
        Icon: BookOpen,
        size: 34,
        color: "text-amber-600/30",
        top: "32%",
        left: "5%",
        depth: 0.08,
    },
    {
        id: 4,
        Icon: Smile,
        size: 30,
        color: "text-amber-400/40",
        top: "45%",
        right: "10%",
        depth: 0.12,
    },
    {
        id: 5,
        Icon: Heart,
        size: 32,
        color: "text-rose-400/35",
        top: "58%",
        left: "7%",
        depth: 0.18,
    },
    {
        id: 6,
        Icon: Compass,
        size: 36,
        color: "text-amber-500/25",
        top: "72%",
        right: "8%",
        depth: 0.1,
    },
    {
        id: 7,
        Icon: GraduationCap,
        size: 44,
        color: "text-amber-700/25",
        top: "84%",
        left: "6%",
        depth: 0.14,
    },
    {
        id: 8,
        Icon: Star,
        size: 26,
        color: "text-amber-400/50",
        top: "94%",
        right: "12%",
        depth: 0.06,
    },
];



// ==========================================
// 1. DATA PATH / ALAMAT GAMBAR
// ==========================================
const ROAD_IMAGE = "/images/home/jalan2.png";
const PEOPLE_IMAGE = "/images/home/people.png";

// ==========================================
// 2. KOORDINAT LEKUKAN JALAN LEBIH DETAIL (Supaya Sangat Smooth)
// ==========================================
const SCROLL_STOPS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
const ROAD_CURVES = [50, 58, 66, 52, 34, 42, 64, 55, 36, 44, 50];

// ==========================================
// 3. DATA JENJANG PENDIDIKAN & RENTANG TRIGGER ANIMASI
// ==========================================
const JENJANG_DATA = [
    {
        id: 'pg',
        badge: 'Langkah 1',
        title: 'PG',
        age: 'Usia 2 - 4 Tahun',
        desc: 'Belajar merasa aman, dicintai, dan dekat dengan Al-Qur\'an.',
        btnText: 'Lihat Program PG',
        align: 'left',
        imgSrc: '/images/home/pg.png',
        triggerScroll: 0.12, // Card muncul saat scroll melewatinya
    },
    {
        id: 'tk',
        badge: 'Langkah 2',
        title: 'TK',
        age: 'Usia 4 - 6 Tahun',
        desc: 'Bermain sambil belajar, mengenal adab dan akhlak islami.',
        btnText: 'Lihat Program TK',
        align: 'right',
        imgSrc: '/images/home/tk.png',
        triggerScroll: 0.32,
    },
    {
        id: 'sd',
        badge: 'Langkah 3',
        title: 'SD',
        age: 'Usia 7 - 12 Tahun',
        desc: 'Menumbuhkan ilmu, rasa ingin tahu, dan akhlak mulia.',
        btnText: 'Lihat Program SD',
        align: 'left',
        imgSrc: '/images/home/sd.JPG',
        triggerScroll: 0.52,
    },
    {
        id: 'smp',
        badge: 'Langkah 4',
        title: 'SMP',
        age: 'Usia 13 - 15 Tahun',
        desc: 'Menguatkan karakter, logika, dan kepemimpinan diri.',
        btnText: 'Lihat Program SMP',
        align: 'right',
        imgSrc: '/images/home/smp.JPG',
        triggerScroll: 0.72,
    },
    {
        id: 'sma',
        badge: 'Langkah 5',
        title: 'SMA',
        age: 'Usia 16 - 18 Tahun',
        desc: 'Menjadi generasi pembawa manfaat dan pemimpin masa depan.',
        btnText: 'Lihat Program SMA',
        align: 'left',
        imgSrc: '/images/home/sma.JPG',
        triggerScroll: 0.90,
    }
];

// Data konten keunggulan
const dataKeunggulan = [
    {
        id: 1,
        title: "Pendidikan Islam Berkualitas",
        desc: "Mengintegrasikan ilmu dunia dan nilai-nilai Islam dalam setiap kegiatan, membentuk pribadi berakhlak, berilmu, dan bertakwa.",
        position: "left", // Frame foto di kiri, Teks di kanan, Gedung di kanan
        sunPos: { x: "88%", y: "70%" }, // Posisi relatif matahari pada lintasan
        icon: (
            <svg className="w-6 h-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Akademik Berkualitas",
        desc: "Proses pembelajaran aktif dan bermakna yang menumbuhkan kemampuan berpikir, kreativitas, dan kemandirian.",
        position: "right", // Frame foto di kanan, Teks di kiri, Gedung di kiri
        sunPos: { x: "62%", y: "22%" },
        icon: (
            <svg className="w-6 h-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
        )
    },
    {
        id: 3,
        title: "Prestasi Nyata, Membanggakan",
        desc: "Mendorong siswa untuk berprestasi di berbagai bidang, baik akademik, tahfiz, olahraga, seni, maupun kepemimpinan.",
        position: "left", // Frame foto di kiri, Teks di kanan, Gedung di kanan
        sunPos: { x: "32%", y: "10%" },
        icon: (
            <svg className="w-6 h-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        )
    },
    {
        id: 4,
        title: "Guru & Pendamping yang Berdedikasi",
        desc: "Dibimbing oleh guru dan pendamping yang amanah, berpengalaman, dan tulus mendampingi tumbuh kembang ananda setiap hari.",
        position: "right", // Frame foto di kanan, Teks di kiri, Gedung di kiri
        sunPos: { x: "12%", y: "45%" },
        icon: (
            <svg className="w-6 h-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )
    }
];

// PRESTASI
const achievements = [
    { id: 1, title: 'Juara 1 Olimpiade Matematika', level: 'Tingkat Kota', unit: 'SD Attaufiq · 2026', angle: -90, distance: 220 },
    { id: 2, title: 'Juara Tahfiz 5 Juz', level: 'Tingkat Provinsi', unit: 'SMP Attaufiq · 2026', angle: -45, distance: 260 },
    { id: 3, title: 'Juara 2 Lomba Cerdas Cermat', level: 'Tingkat Kota', unit: 'SMP Attaufiq · 2026', angle: 0, distance: 280 },
    { id: 4, title: 'Juara 1 Futsal Putra', level: 'Tingkat Kota', unit: 'SMA Attaufiq · 2026', angle: 45, distance: 260 },
    { id: 5, title: 'Juara 1 Olimpiade IPA', level: 'Tingkat Kota', unit: 'SD Attaufiq · 2026', angle: 90, distance: 220 },
    { id: 6, title: 'Juara 1 Lomba MTQ', level: 'Tingkat Kota', unit: 'SMA Attaufiq · 2026', angle: 135, distance: 260 },
    { id: 7, title: 'Juara 1 Karya Ilmiah Remaja', level: 'Tingkat Provinsi', unit: 'SMP Attaufiq · 2026', angle: 180, distance: 280 },
    { id: 8, title: 'Juara Harapan 1 Lomba Kaligrafi', level: 'Tingkat Provinsi', unit: 'SMP Attaufiq · 2026', angle: -135, distance: 260 },
];

// EVENT & PROGRAM
// Data Event Terbaru
  const events = [
    {
      id: 1,
      title: '[ISI: Nama Event 1, mis. Tasmi Day]',
      desc: '[ISI: ringkasan singkat event 1]',
      link: '#',
    },
    {
      id: 2,
      title: '[ISI: Nama Event 2, mis. Business Day]',
      desc: '[ISI: ringkasan singkat event 2]',
      link: '#',
    },
  ];

  // Data Program Unggulan
  const programs = [
    {
      id: 1,
      title: "[ISI: Nama Program 1, mis. Tahfizh Al-Qur'an]",
      desc: '[ISI: ringkasan singkat program 1]',
      link: '#',
    },
    {
      id: 2,
      title: '[ISI: Nama Program 2, mis. Interest & Talent Culture]',
      desc: '[ISI: ringkasan singkat program 2]',
      link: '#',
    },
  ];


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

// ==========================================
// 4. SUB-KOMPONEN CARD UNTUK ANIMASI DILALUI ORANG
// ==========================================
const StepCard = ({ step, smoothProgress }) => {
    const opacity = useTransform(
        smoothProgress,
        [step.triggerScroll - 0.08, step.triggerScroll],
        [0, 1]
    );

    const y = useTransform(
        smoothProgress,
        [step.triggerScroll - 0.08, step.triggerScroll],
        [40, 0]
    );

    const scale = useTransform(
        smoothProgress,
        [step.triggerScroll - 0.08, step.triggerScroll],
        [0.9, 1]
    );

    return (
        <motion.div
            style={{ opacity, y, scale }}
            className={`flex items-center gap-6 pointer-events-auto my-4 ${step.align === 'right' ? 'flex-row-reverse text-left' : 'flex-row text-left'
                }`}
        >
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-xs sm:max-w-sm border border-amber-100/60">
                <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-wider text-amber-800 bg-amber-100 rounded-full mb-2">
                    {step.badge}
                </span>
                <h3 className="text-2xl font-bold text-[#0F1E56]">{step.title}</h3>
                <p className="text-xs font-semibold text-slate-400 mb-2">{step.age}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{step.desc}</p>

                <button className="text-xs font-semibold text-[#0F1E56] bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-2">
                    {step.btnText} &rarr;
                </button>
            </div>

            <div className="w-24 h-36 sm:w-28 sm:h-40 rounded-t-full overflow-hidden shadow-xl border-4 border-white flex-shrink-0 bg-amber-100">
                <img src={step.imgSrc} alt={step.title} className="w-full h-full object-cover" />
            </div>
        </motion.div>
    );
};

// Helper component untuk Ornamen Cahaya
const FloatingSparkle = ({ className, delay = 0 }) => (
    <div className={`absolute w-2 h-2 bg-amber-200 rounded-full animate-pulse pointer-events-none ${className}`} style={{ animationDelay: `${delay}ms` }}></div>
);



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

    // Variabel konfigurasi animasi halus
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (customDelay = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: customDelay,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.9,
                delay: 0.4,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 0.88, // opacity target gedung
            x: 0,
            transition: {
                duration: 1,
                delay: 0.5,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    };

    //   UNTUK ANIMASI JALAN
    const roadSectionRef = useRef(null);

    // Setup Animation Scroll untuk Section Jalan
    const { scrollYProgress } = useScroll({
        target: roadSectionRef,
        // Kita majukan awal animasinya.
        // "start 80%" artinya progress 0 dimulai saat start section masih 80% di bawah layar.
        // Saat start section akhirnya menyentuh top layar (start start), progress sudah jalan.
        offset: ["start 40%", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 20,
        restDelta: 0.001
    });

    const rawX = useTransform(
        smoothProgress,
        SCROLL_STOPS,
        ROAD_CURVES.map(val => `${val}%`),
        { clamp: true } // Pastikan ini ada agar tidak error di ujung
    );

    // TAMBAHKAN INI: Mengontrol muncul/hilang orang
    const opacityPeople = useTransform(
        smoothProgress,
        // RENTANG PROGRESS: [Awal Sekali (PG), Menjelang Akhir SMA, Akhir Sekali]
        // Kita hilangkan titik transisi 0.02 agar tidak ada fade-in di atas.
        [0, 0.94, 1.0],
        // RENTANG OPACITY: [Muncul Penuh, Muncul Penuh, Hilang Total]
        [1, 1, 0]
    );

    // Definisi warna aesthetic & kontras
    const primaryTextColor = "text-[#0F1E56]"; // Biru Tua
    // Warna bayangan teks untuk menciptakan kontras di atas area terang
    const textShadowStyle = { textShadow: '0 2px 4px rgba(255, 255, 255, 0.9), 0 0 1px rgba(255, 255, 255, 1)' };

    // UNTUK KEUNGGULAN
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress: sectionScrollProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Listener untuk menentukan item aktif secara pasti dari posisi scroll
    useEffect(() => {
        const unsubscribe = sectionScrollProgress.on("change", (latest) => {
            if (latest < 0.25) {
                setActiveIndex(0);
            } else if (latest >= 0.25 && latest < 0.50) {
                setActiveIndex(1);
            } else if (latest >= 0.50 && latest < 0.75) {
                setActiveIndex(2);
            } else {
                setActiveIndex(3);
            }
        });

        return () => unsubscribe();
    }, [sectionScrollProgress]);

    // Pergerakan Horizontal Matahari
    const sunX = useTransform(
        sectionScrollProgress,
        [0, 0.25, 0.50, 0.75, 1],
        ["85%", "65%", "46%", "27%", "13%"]
    );

    // Pergerakan Vertikal Matahari
    const sunY = useTransform(
        sectionScrollProgress,
        [0, 0.25, 0.50, 0.75, 1],
        ["58%", "21%", "11%", "23%", "69%"]
    );

    const currentItem = dataKeunggulan[activeIndex];

    // UNTUK PRESTASI
    const achievementRef = useRef(null);

    const { scrollYProgress: achievementScroll } = useScroll({
        target: achievementRef,
        offset: ["start start", "end end"]
    });

    // Timeline Animasi
    const lineScale = useTransform(achievementScroll, [0.1, 0.5], [0, 1]);
    const nodeOpacity = useTransform(achievementScroll, [0.3, 0.55], [0, 1]);
    const cardOpacity = useTransform(achievementScroll, [0.6, 0.85], [0, 1]);
    const cardScale = useTransform(achievementScroll, [0.6, 0.85], [0.8, 1]);


    // UNTUK CTA SECTION
    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] },
    },
  };

//   UNTUK EVENT PROGRAM
const sectionContainerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, staggerChildren: 0.15 },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };





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
                                className={`group relative rounded-[28px] overflow-hidden shadow-lg border border-[#E8DFC8] bg-[#051736] text-white flex flex-col justify-end h-[340px] md:h-[380px] transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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

            {/* --- 3. PERJALANAN TUMBUH BERSAMA ATTAUFIQ --- */}
            <section className="relative w-full min-h-[85vh] bg-[#FAF6F0] flex flex-col justify-between overflow-hidden font-sans py-12 md:py-16">

                {/* 1. Ambient Glow Orbs (Efek Aesthetic Cahaya Warm) */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-200/25 rounded-full blur-[140px] pointer-events-none z-0" />
                <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none z-0" />

                {/* 2. Background Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 0.9, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
                    style={{
                        backgroundImage: `url('images/home/bgPerjalanan.png')`
                    }}
                />

                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/40 via-transparent to-[#F5EFE6]/90 pointer-events-none" />

                {/* 3. Content Top (Judul Utama & Deskripsi) */}
                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-6 flex flex-col items-center">

                    {/* Badge Kecil Aesthetic */}
                    <motion.span
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="inline-block px-4 py-1.5 mb-3 text-xs font-semibold tracking-wider text-[#0F1E56] bg-amber-100/60 backdrop-blur-md rounded-full border border-amber-200/50 uppercase"
                    >
                        Pendidikan Berkarakter
                    </motion.span>

                    <motion.h2
                        custom={0.1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl md:text-[2.85rem] font-extrabold text-[#0F1E56] leading-tight tracking-tight drop-shadow-sm"
                    >
                        Perjalanan Tumbuh Bersama <br className="hidden sm:inline" /> Attaufiq
                    </motion.h2>

                    <motion.p
                        custom={0.25}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mt-5 text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl font-normal"
                    >
                        Setiap langkah adalah awal dari masa depan. Kami mendampingi Ananda tumbuh dalam ilmu, akhlak, dan cinta kepada Allah hingga siap menjadi generasi beradab dan bermanfaat.
                    </motion.p>
                </div>

                {/* 4. Content Bottom (Card Kiri & Foto Gedung Kanan) */}
                <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-8 md:px-12 pt-8 flex flex-col md:flex-row items-end justify-between gap-0">

                    {/* Card Putih Kiri Aesthetic */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInLeft}
                        className="bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(15,30,86,0.06)] w-full md:max-w-xl lg:max-w-2xl border border-white/80 mb-6 z-20 md:-mr-12 lg:-mr-20 transition-transform duration-300 hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">Visi Kami</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F1E56] leading-snug">
                            Satu Perjalanan, Seumur Hidup
                        </h3>
                        <p className="mt-4 text-xs sm:text-sm lg:text-base text-[#64748B] leading-relaxed">
                            Dari usia dini hingga remaja, Attaufiq menjadi rumah kedua yang mengantarkan Ananda menapaki tangga ilmu dan keberkahan menuju cahaya masa depan.
                        </p>
                    </motion.div>

                    {/* Gambar Gedung Kanan */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInRight}
                        className="w-full md:flex-1 flex justify-end items-end -mb-16 -mr-4 md:-mr-10 z-10"
                    >
                        <img
                            src="images/home/gedung-right.png"
                            alt="Gedung Attaufiq"
                            className="w-[60%] max-w-md md:max-w-xl lg:max-w-3xl h-auto object-contain hover:opacity-100 transition-all duration-500 drop-shadow-xl"
                        />
                    </motion.div>

                </div>

            </section>

            {/* SECTION JALANAN BERKELOK DENGAN ORNAMEN BACKGROUND */}
            <section
                ref={roadSectionRef}
                //   {/* Hapus overflow-hidden dari section utama agar sticky tidak terkunci */}
                className="relative w-full bg-[#FAF6EE] min-h-[250vh] font-sans"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, #FAF6EE 0%, #F4ECE0 100%)',
                }}
            >
                {/* ======================================================== */}
                {/* LAYER ORNAMEN BACKGROUND */}
                {/* ======================================================== */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                    {BACKGROUND_ORNAMENTS.map(({ id, Icon, size, color, top, left, right, depth }) => {
                        const yVal = useTransform(smoothProgress, [0, 1], [0, depth * 400]);

                        return (
                            <motion.div
                                key={id}
                                className="absolute"
                                style={{
                                    top,
                                    left: left || 'auto',
                                    right: right || 'auto',
                                    y: yVal,
                                }}
                            >
                                <Icon className={`${color} animate-pulse`} size={size} />
                            </motion.div>
                        );
                    })}
                </div>

                {/* ======================================================== */}
                {/* CHARACTER FLOATING (DIBERSIHKAN & DIPERTINGGI Z-INDEX) */}
                {/* ======================================================== */}
                {/* Container sticky ini harus sejajar langsung dengan konten jalan & card */}
                <div className="sticky top-0 h-screen w-full pointer-events-none z-50 flex items-center justify-center">
                    <motion.div
                        className="absolute"
                        style={{
                            left: rawX,
                            top: '35%', // Menggunakan nilai dari permintaan sebelumnya
                            opacity: opacityPeople // <--- TAMBAHKAN INI
                        }}
                    >
                        <img
                            src={PEOPLE_IMAGE}
                            alt="People Character"
                            // Tambahkan drop-shadow agar lebih estetis
                            className="w-16 sm:w-20 md:w-24 h-auto object-contain drop-shadow-3xl -translate-x-1/2 -translate-y-1/2"
                        />
                    </motion.div>
                </div>

                {/* ======================================================== */}
                {/* ROAD & CARDS (Gunakan margin negatif agar sejajar dengan sticky) */}
                {/* ======================================================== */}
                <div className="relative -mt-[100vh] z-10 w-full min-h-[250vh] flex flex-col justify-between py-16 pointer-events-none">

                    {/* GAMBAR JALAN MURNI */}
                    <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                        <img
                            src={ROAD_IMAGE}
                            alt="Jalan Path"
                            className="w-full max-w-3xl h-full object-fill opacity-95"
                        />
                    </div>

                    {/* LIST CARD JENJANG */}
                    <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col justify-between h-full">
                        {JENJANG_DATA.map((step) => (
                            <StepCard
                                key={step.id}
                                step={step}
                                smoothProgress={smoothProgress}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CAHAYA MASA DEPAN SECTION */}
            <section className="relative w-full min-h-[450px] lg:min-h-[550px] flex items-center justify-center overflow-hidden font-sans">

                {/* 1. LAYER BASE: Background Daun-daun (bgCahaya.png) */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out"
                    style={{ backgroundImage: 'url(/images/home/bgCahaya.png)' }}
                >
                    {/* Overlay Tipis & Halus */}
                    <div className="absolute inset-0 bg-[#FAF6EE]/40"></div>
                </div>

                {/* ======================================================== */}
                {/* ORNAMEN VISUAL DENGAN ANIMASI ENTRANCE & CONTINUOUS ANIMATION */}
                {/* ======================================================== */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">

                    {/* --- ORNAMEN 1: Radial Sunburst / Sinar Cahaya di Latar (Entrance: Fade & Zoom) --- */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(251,191,36,0.15)_0%,transparent_70%)] rounded-full animate-[spin_60s_linear_infinite] motion-safe:animate-fade-in duration-1000"></div>

                    {/* --- ORNAMEN 2: Floating Badge Kiri Atas (Entrance: Slide down + Fade) --- */}
                    <div className="absolute top-8 left-4 md:left-10 flex items-center gap-2.5 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-200 shadow-lg -rotate-3 transition-all duration-700 animate-[bounce_4s_infinite] motion-safe:animate-slide-down">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-[#0F1E56] tracking-wide">✨ Berkah & Cahaya</span>
                    </div>

                    {/* --- ORNAMEN 3: Garis Emas Lengkung & Ring Dekoratif (Entrance: Scale Up) --- */}
                    <div className="absolute top-4 -right-8 w-64 h-32 text-amber-400/50 motion-safe:animate-zoom-in duration-700">
                        <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,80 Q50,0 120,40 T200,20" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" />
                            <circle cx="120" cy="40" r="6" fill="#F59E0B" className="animate-pulse" />
                        </svg>
                    </div>

                    {/* --- ORNAMEN 4: Floating Card Kanan Atas (Entrance: Slide Left + Fade) --- */}
                    <div className="absolute top-1/4 right-3 md:right-10 bg-amber-50/90 backdrop-blur-md p-3.5 rounded-2xl border border-amber-300/60 shadow-xl rotate-6 hidden sm:flex items-center gap-3 transition-transform duration-500 hover:scale-105 motion-safe:animate-slide-left">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-300 to-amber-500 rounded-xl flex items-center justify-center text-amber-950 shadow-inner font-bold text-lg">
                            🌱
                        </div>
                        <div className="text-left pr-1">
                            <p className="text-[10px] uppercase tracking-wider text-amber-800 font-extrabold">Masa Depan</p>
                            <p className="text-xs font-bold text-[#0F1E56]">Tumbuh Bersama</p>
                        </div>
                    </div>

                    {/* --- ORNAMEN 5: Badge Islami / Al-Qur'an Kiri Tengah (NEW) --- */}
                    <div className="absolute top-1/2 left-3 md:left-8 -translate-y-1/2 bg-white/70 backdrop-blur-md p-2.5 rounded-2xl border border-emerald-200 shadow-md -rotate-6 hidden lg:flex items-center gap-2.5 motion-safe:animate-slide-right">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 text-sm">
                            📖
                        </div>
                        <span className="text-xs font-bold text-[#0F1E56] pr-2">Generasi Rabbani</span>
                    </div>

                    {/* --- ORNAMEN 6: Elemen Daun & Wave Lengkung (Entrance: Slide Up) --- */}
                    <div className="absolute bottom-10 left-4 md:left-12 flex items-center gap-3 -rotate-2 motion-safe:animate-slide-up">
                        <div className="w-11 h-11 bg-emerald-500/15 backdrop-blur-md rounded-2xl border border-emerald-500/30 flex items-center justify-center text-emerald-800 shadow-md animate-bounce">
                            🍃
                        </div>
                        <div className="hidden sm:block">
                            <svg className="w-28 h-8 text-emerald-600/40" viewBox="0 0 100 30" fill="none">
                                <path d="M0,15 C30,5 70,25 100,15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    {/* --- ORNAMEN 7: Sparkles & Stars Kanan Bawah (Continuous Float) --- */}
                    <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-amber-300/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-16 right-8 md:right-20 text-amber-500 text-3xl animate-[bounce_3s_infinite] motion-safe:animate-zoom-in">
                        ✦
                    </div>
                    <div className="absolute bottom-32 right-16 text-amber-400 text-lg animate-pulse">
                        ✦
                    </div>

                    {/* --- ORNAMEN 8: Floating Glow Particles --- */}
                    <div className="absolute top-1/3 left-1/4 w-3.5 h-3.5 bg-amber-400 rounded-full blur-[0.5px] shadow-[0_0_10px_#F59E0B] animate-ping"></div>
                    <div className="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-amber-300 rounded-full blur-[0.5px] shadow-[0_0_8px_#FCD34D] animate-pulse"></div>
                </div>
                {/* ======================================================== */}

                {/* 3. LAYER TENGAH: Konten Utama (Orang, Teks, Tombol) */}
                <div className="relative z-20 container mx-auto px-6 py-20 flex flex-col items-center text-center">

                    {/* Container untuk perataan konten tengah */}
                    <div className="relative flex flex-col items-center max-w-4xl">

                        {/* Area Blending Gambar Tengah & Meredam Kecerahan di Bawah Teks */}
                        <div className="absolute -top-32 md:-top-40 inset-x-0 h-[400px] md:h-[500px] z-0 pointer-events-none transition-all duration-1000 ease-out">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,246,238,0)_0%,rgba(250,246,238,0.7)_50%,rgba(250,246,238,0)_100%)]"></div>

                            {/* Gambar Utama dengan Animasi Entrance Fade & Zoom In */}
                            <img
                                src="/images/home/cahaya.png"
                                alt="Cahaya Masa Depan"
                                className="w-full h-full object-contain opacity-95 filter drop-shadow-[0_12px_15px_rgba(251,191,36,0.35)] animate-[zoom-in_1s_ease-out]"
                            />
                        </div>

                        {/* Teks Kuote dengan Animasi Entrance Slide Up */}
                        <h2
                            className={`relative z-10 mt-28 md:mt-36 text-xl md:text-2xl lg:text-3xl font-medium ${primaryTextColor} leading-relaxed md:leading-snug tracking-wide transition-all duration-700 animate-[slide-up_0.8s_ease-out]`}
                            style={textShadowStyle}
                        >
                            Setiap langkah hari ini adalah cahaya masa <br className="hidden md:inline" />
                            depan yang sedang Allah siapkan.
                        </h2>

                        {/* Tombol CTA dengan Animasi Entrance Fade & Pop Up */}
                        <button className="relative z-10 mt-12 md:mt-14 flex items-center gap-2.5 px-9 py-4 bg-amber-400 hover:bg-amber-500 text-[#0F1E56] font-semibold text-sm md:text-base rounded-full shadow-[0_8px_16px_rgba(15,30,86,0.15)] hover:shadow-[0_12px_20px_rgba(15,30,86,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 animate-[zoom-in_1s_ease-out]">
                            Mari tumbuh bersama Attaufiq

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={`w-4 h-4 md:w-5 md:h-5 ${primaryTextColor} group-hover:animate-bounce-short`}
                            >
                                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                </div>

            </section>


            {/* 5. KEUNGGULAN ATQ SECTION */}
            <section ref={containerRef} className="relative h-[450vh] bg-[#FFFBEF] flex flex-col items-center pt-20">

                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-200/30 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-30 text-center max-w-5xl px-6 mb-4 md:mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/60 shadow-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <p className="text-amber-700 font-bold tracking-wider text-xs md:text-sm uppercase">
                            KEUNGGULAN ATTAUFIQ
                        </p>
                    </motion.div>

                    <h2 className="text-2xl md:text-4xl font-extrabold text-indigo-950 leading-snug md:leading-tight">
                        Fondasi kuat yang menjadi alasan orang tua percaya, dan anak–anak tumbuh luar biasa.
                    </h2>
                </div>

                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start pt-10 md:pt-14">

                    <motion.div
                        animate={{ x: [0, 25, 0] }}
                        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                        className="absolute top-12 left-[8%] opacity-40 pointer-events-none z-10"
                    >
                        <svg className="w-24 h-12 text-amber-200/70 fill-current" viewBox="0 0 24 24">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                        </svg>
                    </motion.div>

                    <motion.div
                        animate={{ x: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                        className="absolute top-20 right-[10%] opacity-30 pointer-events-none z-10"
                    >
                        <svg className="w-28 h-14 text-amber-300/60 fill-current" viewBox="0 0 24 24">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                        </svg>
                    </motion.div>

                    <div className="absolute top-32 left-[20%] text-amber-400 opacity-60 animate-pulse pointer-events-none">✦</div>
                    <div className="absolute top-16 right-[22%] text-amber-300 opacity-70 animate-bounce pointer-events-none">✦</div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 scale-x-105 md:scale-x-110">
                        <img
                            src="images/home/garisMatahari.png"
                            alt="Garis Lintasan Matahari"
                            className="w-full h-full object-contain opacity-90 filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]"
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`gedung-${currentItem.id}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`absolute bottom-0 h-[85vh] w-1/2 md:w-5/12 pointer-events-none z-0 ${currentItem.position === "left"
                                ? "right-0"
                                : "left-0 transform -scale-x-100"
                                }`}
                        >
                            <img
                                src="images/home/gedung-right.png"
                                alt="Gedung Latar"
                                className="w-full h-full object-cover object-bottom opacity-25"
                            />
                        </motion.div>
                    </AnimatePresence>

                    <motion.div
                        style={{ left: sunX, top: sunY }}
                        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    >
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-28 h-28 bg-yellow-400/40 rounded-full blur-xl animate-pulse" />
                            <img
                                src="images/home/matahari.png"
                                alt="Matahari"
                                className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-[0_0_32px_rgba(253,224,71,0.95)] relative z-10"
                            />
                        </div>
                    </motion.div>

                    <div className="relative z-10 w-full max-w-4xl px-6 md:px-8 h-full flex flex-col items-center justify-center pt-12 md:pt-16">

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentItem.id}
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -25 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className={`absolute inset-x-6 md:inset-x-8 flex items-center justify-center gap-6 md:gap-12
                ${currentItem.position === 'right' ? 'flex-row-reverse' : 'flex-row'}
              `}
                            >
                                <div className="w-1/2 flex justify-center relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-amber-300/30 to-sky-300/30 rounded-t-full blur-lg transform scale-105 pointer-events-none" />

                                    {/* Perbaikan: Menurunkan posisi wadah gambar dan menguranginya ukurannya */}
                                    <div className="relative w-full max-w-[240px] md:max-w-[260px] h-56 md:h-[300px] mt-8 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-amber-300/90 shadow-2xl bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 flex items-center justify-center text-center p-4">
                                        <span className="text-white/90 font-medium text-xs md:text-sm drop-shadow-md relative z-10">
                                            Foto — {currentItem.title}
                                        </span>
                                        <div className="absolute inset-0 bg-sky-900/10 pointer-events-none" />
                                    </div>
                                </div>

                                <div className={`w-1/2 flex flex-col items-start text-left
                ${currentItem.position === 'right' ? 'pt-24 md:pt-32 ml-10' : 'pt-0'}
              `}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl font-black text-amber-500/80 tracking-tight">
                                            0{currentItem.id}
                                        </span>
                                        <div className="h-[2px] w-8 bg-amber-400/60 rounded-full" />
                                    </div>

                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200/80 flex items-center justify-center mb-3 shadow-md border border-amber-300/60">
                                        {currentItem.icon}
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-bold text-indigo-950 mb-2 leading-tight">
                                        {currentItem.title}
                                    </h3>
                                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-md">
                                        {currentItem.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute bottom-12 flex items-center gap-2 z-30 bg-amber-100/60 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-200/60 shadow-sm">
                            {dataKeunggulan.map((item, idx) => (
                                <div
                                    key={item.id}
                                    className={`transition-all duration-300 rounded-full ${activeIndex === idx
                                        ? "w-6 h-2 bg-amber-500"
                                        : "w-2 h-2 bg-amber-300/80"
                                        }`}
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </section>


            {/* 6. PRESTASI SISWA ATQ SECTION */}
            <section
    id="achievements"
    ref={achievementRef}
    className="relative h-[300vh] bg-gradient-to-b from-[#FFFDF7] via-[#FFFBEB] to-[#FFF9E6] w-full"
>
    {/* HEADER SECTION (JUDUL & DESKRIPSI) - RATA TENGAH HORIZONTAL */}
    <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-30 text-center max-w-3xl px-4 pointer-events-none w-full">
      <span className="text-xs font-bold tracking-widest text-amber-500 uppercase mb-2 block">
        PRESTASI SISWA
      </span>
      <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 leading-tight">
        Mendukung setiap siswa untuk berkembang, berprestasi, dan tumbuh menjadi generasi yang cerdas, mandiri, serta berlandaskan nilai–nilai Islami.
      </h2>
    </div>

    {/* Container Sticky */}
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* 1. ORNAMEN BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
            <div className="w-[600px] h-[600px] bg-amber-200/30 rounded-full blur-[120px] animate-pulse" />
            <div className="w-[350px] h-[350px] bg-orange-300/20 rounded-full blur-[80px]" />
        </div>

        {/* 2. ORNAMEN BINTANG KECIL MELAYANG */}
        <div className="absolute inset-0 pointer-events-none z-0">
            {[
                { top: '15%', left: '20%', size: 'w-2 h-2', delay: '0s' },
                { top: '25%', right: '18%', size: 'w-3 h-3', delay: '1s' },
                { bottom: '20%', left: '15%', size: 'w-2.5 h-2.5', delay: '2s' },
                { bottom: '15%', right: '22%', size: 'w-2 h-2', delay: '0.5s' },
            ].map((sparkle, idx) => (
                <div
                    key={idx}
                    className={`absolute ${sparkle.size} bg-amber-400 rounded-full blur-[1px] opacity-60 animate-ping`}
                    style={{ top: sparkle.top, left: sparkle.left, right: sparkle.right, bottom: sparkle.bottom, animationDelay: sparkle.delay, animationDuration: '3s' }}
                />
            ))}
        </div>

        {/* 3. SVG CONNECTOR & DOTS */}
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="-500 -500 1000 1000"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g>
                {achievements.map((item) => {
                    const rad = (item.angle * Math.PI) / 180;
                    const lineDistance = item.distance * 1.1;
                    const endX = Math.cos(rad) * lineDistance;
                    const endY = Math.sin(rad) * lineDistance;
                    const midX = endX * 0.5;
                    const midY = endY * 0.5;

                    return (
                        <g key={item.id}>
                            <motion.line
                                x1="0"
                                y1="0"
                                x2={endX}
                                y2={endY}
                                stroke="#FCD34D"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                style={{ pathLength: lineScale }}
                            />
                            <motion.circle
                                cx={midX}
                                cy={midY}
                                r="5"
                                fill="#FBBF24"
                                style={{ opacity: nodeOpacity }}
                            />
                            <motion.circle
                                cx={endX}
                                cy={endY}
                                r="6.5"
                                fill="#F59E0B"
                                filter="url(#glow)"
                                style={{ opacity: nodeOpacity }}
                            />
                        </g>
                    );
                })}
            </g>
        </svg>

        {/* 4. MATAHARI UTAMA */}
        <div className="relative z-10 flex items-center justify-center">
            <div className="absolute w-36 h-36 rounded-full border border-amber-300/40 animate-[spin_12s_linear_infinite]" />
            <div className="absolute w-44 h-44 rounded-full border border-dashed border-amber-400/25 animate-[spin_20s_linear_infinite_reverse]" />
            <div className="absolute w-28 h-28 bg-amber-400/30 rounded-full blur-xl animate-pulse" />

            <img
                src="/images/home/matahari.png"
                alt="Matahari Attaufiq"
                className="w-24 h-24 min-w-[96px] min-h-[96px] object-contain relative z-10 drop-shadow-[0_0_30px_rgba(251,191,36,0.9)] pointer-events-none transition-transform duration-500 hover:scale-110"
            />
        </div>

        {/* 5. LAYER CARD PRESTASI */}
        <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center z-20">
            {achievements.map((item) => {
                const rad = (item.angle * Math.PI) / 180;
                const isVertical = item.angle === -90 || item.angle === 90;
                const isHorizontal = item.angle === 0 || item.angle === 180;

                let radiusX = 390;
                let radiusY = 230;
                if (isVertical) radiusY = 240;
                if (isHorizontal) radiusX = 430;

                const x = Math.cos(rad) * radiusX;
                const y = Math.sin(rad) * radiusY;

                return (
                    <motion.div
                        key={item.id}
                        className="absolute w-52 p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-[0_10px_25px_-5px_rgba(217,119,6,0.1)] border border-amber-100/80 hover:border-amber-300 pointer-events-auto transition-all duration-300 hover:shadow-[0_15px_30px_-5px_rgba(245,158,11,0.25)] hover:-translate-y-1"
                        style={{
                            x,
                            y,
                            opacity: cardOpacity,
                            scale: cardScale,
                        }}
                    >
                        <a
                            href={item.link || `/prestasi/${item.id}`}
                            className="group block cursor-pointer relative overflow-hidden rounded-xl"
                        >
                            <div className="w-full h-24 mb-2.5 rounded-xl bg-gradient-to-tr from-sky-400 via-teal-300 to-amber-200 flex items-center justify-center text-xs text-white font-semibold shadow-inner relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-300">
                                <span className="drop-shadow-md z-10">Foto — {item.unit.split(' · ')[0]}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </div>

                            <div className="px-0.5">
                                <div className="inline-block px-2 py-0.5 mb-1 text-[9px] font-bold tracking-wider uppercase bg-amber-50 text-amber-700 rounded-full border border-amber-200/60">
                                    {item.level}
                                </div>

                                <h4 className="text-xs font-bold text-slate-800 leading-snug transition-colors duration-200 group-hover:text-amber-600 line-clamp-2">
                                    {item.title}
                                </h4>

                                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px]">
                                    <span className="text-slate-400 font-medium">SIT At-Taufiq</span>
                                    <span className="text-amber-600 font-bold">{item.unit.split(' · ')[0]}</span>
                                </div>
                            </div>
                        </a>
                    </motion.div>
                );
            })}
        </div>

    </div>
</section>

            {/* 7. CTA ATQ SECTION */}
            <section className="relative w-full min-h-screen bg-gradient-to-b from-[#FFFDF7] via-[#FFFBEB] to-[#FFF9E6] flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden">
      
      {/* ================= ORNAMEN BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Glow Soft Ambient */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200/40 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[120px]" />

        {/* Ornamen Bintang Melayang (Floating Sparkles) */}
        <div className="absolute top-16 left-1/4 w-3 h-3 bg-amber-400 rounded-full blur-[1px] opacity-70 animate-pulse" />
        <div className="absolute bottom-24 left-1/3 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-amber-300 rounded-full blur-[1px] opacity-80 animate-bounce" />
      </div>

      {/* ================= KONTEN UTAMA ================= */}
      <motion.div
        className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center justify-items-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        
        {/* KONTEN KIRI (TEKS & TOMBOL) */}
        <motion.div className="flex flex-col items-start justify-center space-y-6 max-w-xl w-full" variants={itemVariants}>
          
          {/* Sub-heading Glassmorphism */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md text-amber-600 font-bold text-xs tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>PERJALANAN HEBAT DIMULAI DI SINI</span>
          </div>

          {/* Heading Utama */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12]">
            Saatnya Memulai Perjalanan{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
              Ananda
            </span>
          </h1>

          {/* Deskripsi */}
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
            Bersama Attaufiq, tumbuh dalam ilmu, akhlak, dan prestasi untuk masa depan yang gemilang.
          </p>

          {/* Group Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-4 w-full pt-3">
            {/* Tombol Utama */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#daftar"
              className="inline-flex items-center justify-center px-7 py-4 bg-[#1B2B65] hover:bg-[#142150] text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-950/20 transition-colors duration-300"
            >
              <UserPlus className="w-4 h-4 mr-2.5 text-amber-300" />
              <span>Daftarkan Ananda — Mulai Perjalanan Hebatnya</span>
            </motion.a>

            {/* Tombol Sekunder */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#kunjungan"
              className="inline-flex items-center justify-center px-7 py-4 bg-white/80 hover:bg-white text-slate-800 text-sm font-semibold rounded-full border border-slate-200/80 shadow-sm backdrop-blur-sm transition-all duration-300"
            >
              <Calendar className="w-4 h-4 mr-2.5 text-amber-600" />
              <span>Jadwalkan Kunjungan</span>
            </motion.a>
          </div>
        </motion.div>

        {/* KONTEN KANAN (VISUAL KARTU & ORNAMEN) */}
        <motion.div className="relative flex items-center justify-center w-full" variants={itemVariants}>
          
          {/* Layer Glow Belakang Kartu */}
          <div className="absolute w-[280px] h-[360px] md:w-[360px] md:h-[460px] bg-amber-400/20 rounded-[50px] blur-2xl" />

          {/* Ornamen 1: Ring Statis */}
          <div className="absolute w-[310px] h-[390px] md:w-[390px] md:h-[490px] border border-amber-300/60 rounded-[44px] -rotate-6 pointer-events-none shadow-sm" />
          
          {/* Ornamen 2: Ring Berputar Hapus Putus (Dashed Rotating Border) */}
          <div className="absolute w-[330px] h-[410px] md:w-[410px] md:h-[510px] border border-dashed border-amber-400/50 rounded-[48px] animate-[spin_25s_linear_infinite] pointer-events-none" />

          {/* Kartu Utama Gradien */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-[300px] h-[380px] md:w-[380px] md:h-[480px] rounded-[36px] bg-gradient-to-tr from-[#3B5998] via-[#6FA8DC] to-[#FCEEAA] shadow-2xl shadow-amber-900/10 border border-white/40 overflow-hidden flex flex-col justify-between p-6 text-center text-white/90"
          >
            {/* Tag Badge Atas Kartu */}
            <div className="self-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-medium tracking-wide drop-shadow-sm">
              Foto keluarga — berjalan menuju matahari
            </div>

            {/* Ilustrasi Ornamen Sunburst Kecil di Dalam Kartu */}
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-300/30 rounded-full blur-xl pointer-events-none" />
          </motion.div>

        </motion.div>

      </motion.div>
    </section>

            {/* 8. EVENT & PROGRAM SECTION */}
            <section className="relative w-full bg-gradient-to-b from-[#FFFDF7] via-[#FFFBEB] to-[#FFF9E6] py-24 px-6 md:px-12 overflow-hidden">
      
      {/* Background Ornamen Soft Ambient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-200/25 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-sky-200/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14"
          variants={sectionContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* ================= KOLOM KIRI: EVENT TERBARU ================= */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-end justify-between border-b border-amber-200/60 pb-4">
              <div>
                <span className="text-xs font-bold tracking-widest text-amber-500 uppercase flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5" /> Agenda Sekolah
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#1B2B65]">
                  Event Terbaru
                </h3>
              </div>
              <a
                href="#all-events"
                className="group inline-flex items-center text-xs md:text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors"
              >
                Lihat semua 
                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="flex flex-col space-y-4">
              {events.map((event) => (
                <motion.a
                  key={event.id}
                  href={event.link}
                  variants={cardItemVariants}
                  whileHover={{ y: -4 }}
                  className="group relative flex items-center p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-amber-100/80 shadow-[0_4px_20px_-2px_rgba(217,119,6,0.06)] hover:shadow-[0_12px_30px_-5px_rgba(245,158,11,0.15)] hover:border-amber-300 transition-all duration-300 overflow-hidden"
                >
                  {/* Thumbnail Image dengan Efek Hover Zoom */}
                  <div className="relative w-24 h-24 md:w-28 md:h-24 rounded-xl bg-gradient-to-tr from-[#6FA8DC] via-[#9DC6E8] to-[#FCEEAA] flex-shrink-0 overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent z-10" />
                    <div className="w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out" />
                  </div>

                  {/* Teks Konten */}
                  <div className="ml-4 md:ml-5 flex-1 pr-6">
                    <span className="inline-block text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50 mb-1.5">
                      {event.date}
                    </span>
                    <h4 className="text-sm md:text-base font-bold text-slate-800 leading-snug group-hover:text-amber-600 transition-colors duration-200 line-clamp-1">
                      {event.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {event.desc}
                    </p>
                  </div>

                  {/* Icon Action Arrow */}
                  <div className="absolute top-4 right-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* ================= KOLOM KANAN: PROGRAM UNGGULAN ================= */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-end justify-between border-b border-amber-200/60 pb-4">
              <div>
                <span className="text-xs font-bold tracking-widest text-amber-500 uppercase flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Pembentukan Karakter
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#1B2B65]">
                  Program Unggulan
                </h3>
              </div>
              <a
                href="#all-programs"
                className="group inline-flex items-center text-xs md:text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors"
              >
                Lihat semua 
                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="flex flex-col space-y-4">
              {programs.map((program) => (
                <motion.a
                  key={program.id}
                  href={program.link}
                  variants={cardItemVariants}
                  whileHover={{ y: -4 }}
                  className="group relative flex items-center p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-amber-100/80 shadow-[0_4px_20px_-2px_rgba(217,119,6,0.06)] hover:shadow-[0_12px_30px_-5px_rgba(245,158,11,0.15)] hover:border-amber-300 transition-all duration-300 overflow-hidden"
                >
                  {/* Thumbnail Image dengan Efek Hover Zoom */}
                  <div className="relative w-24 h-24 md:w-28 md:h-24 rounded-xl bg-gradient-to-tr from-[#3B5998] via-[#6FA8DC] to-[#FCEEAA] flex-shrink-0 overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent z-10" />
                    <div className="w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out" />
                  </div>

                  {/* Teks Konten */}
                  <div className="ml-4 md:ml-5 flex-1 pr-6">
                    <span className="inline-block text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200/50 mb-1.5">
                      {program.tag}
                    </span>
                    <h4 className="text-sm md:text-base font-bold text-slate-800 leading-snug group-hover:text-amber-600 transition-colors duration-200 line-clamp-1">
                      {program.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {program.desc}
                    </p>
                  </div>

                  {/* Icon Action Arrow */}
                  <div className="absolute top-4 right-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= TOMBOL CTA UTAMA ================= */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#lihat-semua-program"
            className="group inline-flex items-center justify-center px-8 py-4 bg-[#1B2B65] hover:bg-[#142150] text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-950/15 transition-all duration-300"
          >
            <span>Lihat Semua Program</span>
            <ArrowRight className="w-4 h-4 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
            






        </AppLayout>
    );
}
