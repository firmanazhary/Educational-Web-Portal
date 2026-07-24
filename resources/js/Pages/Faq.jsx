import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

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

export default function Faq({
    title = "Program Pendidikan",
    subtitle = "Setiap jenjang, satu perjalanan. Bersama membangun generasi beradab.",
    tagline = "SEKOLAH ISLAM ATTAUFIQ",
    patternImage = "/images/hero/frame-left.png",
    mosqueImage = "/images/hero/building-attaufiq.png"
}) {
    const [activeTab, setActiveTab] = useState('PG-TK');
    const [openFaq, setOpenFaq] = useState(0);

    // Ref untuk Masing-masing Section Animasi
    const [heroRef, heroInView] = useInView();
    const [faqRef, faqInView] = useInView();
  

    const faqData = {
        'PG-TK': {
            title: 'PG-TK (Playgroup – TK)',
            desc: 'Tahap awal pendidikan yang menyenangkan untuk menumbuhkan iman, akhlak, dan kemandirian sejak dini.',
            image: '/images/hero/pgtk-kids.jpg',
            badgeText: 'Lingkungan belajar yang aman, nyaman, dan penuh kasih sayang untuk tumbuh kembang optimal.',
            faqs: [
                { q: 'Berapa usia minimal untuk masuk PG-TK Attaufiq?', a: 'Untuk Playgroup minimal berusia 3 tahun, sedangkan untuk TK-A minimal berusia 4 tahun per bulan Juli tahun berjalan.' },
                { q: 'Apakah ada proses seleksi untuk PG-TK?', a: 'Tidak ada tes akademik. Seleksi berupa pemetaan tumbuh kembang dan kesiapan anak melalui observasi ramah anak.' },
                { q: 'Bagaimana kurikulum yang digunakan di PG-TK Attaufiq?', a: 'Kami mengintegrasikan Kurikulum Merdeka dengan nilai-nilai Keislaman, pembelajaran berbasis bermain (play-based learning), dan pembiasaan adab.' },
                { q: 'Apakah anak harus sudah bisa membaca atau menulis?', a: 'Tidak wajib. Kemampuan calistung diajarkan secara bertahap dan menyenangkan sesuai dengan tahap perkembangan usia anak.' },
                { q: 'Bagaimana jam belajar dan jam pulang di PG-TK?', a: 'Jam belajar dimulai pukul 07.30 - 11.00 WIB untuk Playgroup, dan 07.30 - 12.00 WIB untuk TK.' },
                { q: 'Apakah ada program Tahfiz di PG-TK?', a: 'Ada, fokus pada hafalan Juz Amma (Juz 30) pilihan, doa harian, dan hadits-hadits pendek dengan metode talaqqi.' },
                { q: 'Bagaimana fasilitas yang tersedia untuk PG-TK?', a: 'Tersedia ruang kelas ber-AC, area bermain indoor & outdoor, pojok baca, serta ruang audiovisual.' },
                { q: 'Bagaimana komunikasi antara sekolah dan orang tua?', a: 'Kami menggunakan Buku Penghubung harian, grup WhatsApp kelas, dan pertemuan berkala Parent Teacher Meeting (PTM).' }
            ]
        },
        'SD': {
            title: 'SD IT Attaufiq',
            desc: 'Membangun fondasi akademik yang kuat, pemahaman Al-Qur\'an, dan pembentukan karakter adab yang kokoh.',
            image: '/images/hero/sd-kids.jpg',
            badgeText: 'Pendidikan integratif yang mencetak generasi bertakwa, cerdas, dan berkarakter.',
            faqs: [
                { q: 'Berapa usia minimal masuk SD IT Attaufiq?', a: 'Minimal berusia 6 tahun pada bulan Juli tahun ajaran baru.' },
                { q: 'Apakah ada program target Tahfizh di SD?', a: 'Ya, target kelulusan SD adalah minimal hafal 2-3 Juz Al-Qur\'an beserta tartil membaca.' },
                { q: 'Bagaimana jam operasional sekolah SD?', a: 'Pembelajaran Full Day dari Senin - Jumat, pukul 07.15 hingga 15.30 WIB.' }
            ]
        },
        'SMP': {
            title: 'SMP IT Attaufiq',
            desc: 'Mengembangkan potensi kepemimpinan, kritis berpikir, serta pemantapan hafalan dan pemahaman Islam.',
            image: '/images/hero/smp-kids.jpg',
            badgeText: 'Menyiapkan remaja berdaya saing global dengan pijakan akidah yang lurus.',
            faqs: [
                { q: 'Apa saja ekstrakurikuler unggulan di SMP?', a: 'Pramuka, Archery (Panahan), Martial Arts (Pencak Silat), Robotic, dan English/Arabic Club.' },
                { q: 'Apakah ada kelas persiapan program beasiswa/lanjutan?', a: 'Ya, terdapat bimbingan akademik intensif untuk persiapan sekolah kedinasan maupun SMA unggulan.' }
            ]
        },
        'SMA': {
            title: 'SMA IT Attaufiq',
            desc: 'Masa matang untuk penguatan akademik perguruan tinggi, kepemimpinan, dan kesiapan berkontribusi pada masyarakat.',
            image: '/images/hero/sma-kids.jpg',
            badgeText: 'Menghantarkan peserta didik menuju Perguruan Tinggi Terbaik dan karir impian.',
            faqs: [
                { q: 'Bagaimana rekam jejak kelulusan SMA Attaufiq ke PTN?', a: 'Alhamdulillah, mayoritas lulusan terserap di Perguruan Tinggi Negeri unggulan dan kampus luar negeri.' }
            ]
        }
    };

    const currentContent = faqData[activeTab];

    return (
        <AppLayout title="About At-Taufiq">
            <Head title="About At-Taufiq Jambi | Mencetak Generasi Robbani" />

            {/* ==========================================
                1. HERO SECTION (FADE IN SANTAI)
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

        
            {/* ==========================================
                2. FAQ SECTION
            ========================================== */}
            <section ref={faqRef} className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#051C42] text-white">
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className={`text-center mb-16 space-y-3 transition-all duration-700 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-[#D4AF37] text-xs">◆</span>
                            <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.3em]">FAQ</span>
                            <span className="text-[#D4AF37] text-xs">◆</span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl font-normal text-white drop-shadow-md">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <p className="text-blue-200/80 font-light text-sm md:text-base max-w-xl mx-auto">
                            Temukan jawaban atas pertanyaan Bunda/Ayah tentang Attaufiq sesuai jenjang pendidikan yang diminati.
                        </p>
                    </div>

                    {/* Tab Jenjang */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-6">
                        {[
                            { id: 'PG-TK', label: 'PG-TK', sub: '(Playgroup – TK)', icon: '🎠' },
                            { id: 'SD', label: 'SD', sub: '(Sekolah Dasar)', icon: '📖' },
                            { id: 'SMP', label: 'SMP', sub: '(Sekolah Menengah Pertama)', icon: '🏛️' },
                            { id: 'SMA', label: 'SMA', sub: '(Sekolah Menengah Atas)', icon: '🕌' }
                        ].map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setOpenFaq(0);
                                    }}
                                    className={`relative px-4 py-6 text-center transition-all duration-300 rounded-t-[36px] rounded-b-xl border-t-2 border-x-2 transform hover:-translate-y-1 ${isActive
                                            ? 'bg-[#07327F] border-[#D4AF37] shadow-2xl -translate-y-2 z-20'
                                            : 'bg-[#FAF8F5] text-slate-700 border-transparent hover:bg-white z-10 opacity-90'
                                        }`}
                                >
                                    <div className="text-lg mb-1">{tab.icon}</div>
                                    <h3 className={`font-serif text-xl font-bold ${isActive ? 'text-white' : 'text-[#07327F]'}`}>
                                        {tab.label}
                                    </h3>
                                    <p className={`text-[10px] font-light mt-0.5 ${isActive ? 'text-blue-200' : 'text-slate-500'}`}>
                                        {tab.sub}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    {/* Main FAQ Container */}
                    <div className="bg-[#FAF8F5] text-slate-800 rounded-[40px] p-8 md:p-12 shadow-2xl border border-[#E8DFC8] relative z-20">
                        <div className="grid lg:grid-cols-12 gap-10 items-start">
                            <div className="lg:col-span-5 space-y-6">
                                <div>
                                    <h3 className="font-serif text-2xl md:text-3xl text-[#07327F] font-normal mb-2">
                                        {currentContent.title}
                                    </h3>
                                    <div className="w-12 h-[1px] bg-[#D4AF37] mb-3"></div>
                                    <p className="text-slate-600 font-light text-sm leading-relaxed">
                                        {currentContent.desc}
                                    </p>
                                </div>

                                <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-white aspect-[4/3] relative bg-slate-200 group">
                                    <img
                                        src={currentContent.image}
                                        alt={currentContent.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                    />
                                </div>

                                <div className="bg-[#051736] text-white p-6 rounded-2xl border border-[#D4AF37]/40 shadow-md flex items-start space-x-4">
                                    <span className="text-[#D4AF37] text-xl flex-shrink-0">✦</span>
                                    <p className="text-xs font-light leading-relaxed text-blue-100">
                                        {currentContent.badgeText}
                                    </p>
                                </div>
                            </div>

                            <div className="lg:col-span-7 space-y-3">
                                {currentContent.faqs.map((faq, index) => {
                                    const isOpen = openFaq === index;
                                    return (
                                        <div
                                            key={index}
                                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition duration-300"
                                        >
                                            <button
                                                onClick={() => setOpenFaq(isOpen ? null : index)}
                                                className="w-full p-5 text-left flex items-center justify-between space-x-4 hover:bg-slate-50/80 transition"
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <span className="w-6 h-6 rounded-full bg-[#E8DFC8] text-[#07327F] flex items-center justify-center font-serif text-xs font-bold flex-shrink-0 mt-0.5">
                                                        ?
                                                    </span>
                                                    <span className="font-serif text-sm md:text-base font-medium text-[#07327F]">
                                                        {faq.q}
                                                    </span>
                                                </div>
                                                <span className={`text-[#D4AF37] font-bold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                                    ▼
                                                </span>
                                            </button>

                                            {isOpen && (
                                                <div className="px-5 pb-5 pt-1 text-slate-600 font-light text-xs md:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50 pl-12 animate-fade-in">
                                                    {faq.a}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

         
        </AppLayout>
    );
}