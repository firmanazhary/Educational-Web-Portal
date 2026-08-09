// resources/js/Pages/Home.jsx

import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';
import HeroSlider from '@/Layouts/HeroSlider';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Heart,
  Cloud,
  Sun,
  Star,
  Smile,
  Compass
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
const SCROLL_STOPS = [0,   0.1,  0.2,  0.3,  0.4,  0.5,  0.6,  0.7,  0.8,  0.9,  1.0];
const ROAD_CURVES =  [50,  58,   66,   52,   34,   42,   64,   55,   36,   44,   50];

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
      className={`flex items-center gap-6 pointer-events-auto my-4 ${
        step.align === 'right' ? 'flex-row-reverse text-left' : 'flex-row text-left'
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



// KUNCINYA DI SINI: Samakan nama props dengan yang dikirim Controller (posts & galleries)
export default function Home({ auth, posts = [], galleries = []}) {
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

        </AppLayout>
    );
}
