import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';


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
    mosqueImage = "/images/hero/jenjang-hero-left.png",
    bgpilar = "/images/jenjang/bgpilar.png",
    bgpilarYellow = "/images/jenjang/bgpilaryellow.png",
    bgsection = "/images/jenjang/bgsection.png",
    bgsection2 = "/images/jenjang/bgsection2.png"
}) {
    const [activeTab, setActiveTab] = useState('PG-TK');

    // Ref untuk Masing-masing Section Animasi
    const [heroRef, heroInView] = useInView();
    const [pillarRef, pillarInView] = useInView();

    return (
        <AppLayout title="About At-Taufiq">
            <Head title="About At-Taufiq Jambi | Mencetak Generasi Robbani" />

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
        ${
            pillarInView
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

        ${
            pillarInView
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

    ${
      pillar.isYellow
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


        </AppLayout>
    );
}
