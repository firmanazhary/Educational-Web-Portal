import React, { useState, useRef, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    Check,
    ChevronRight,
    ChevronLeft,
    FileText,
    UploadCloud,
    Users,
    Megaphone,
    CheckCircle,
    ShieldCheck,
    Lock,
    Clock,
    HeartHandshake,
    PhoneCall,
    Plus,
    Minus,
    HelpCircle,
    MessageCircle,
    GraduationCap,
    BookOpen,
    Building2,
    FileCheck,
    Info,
    ArrowRight
} from 'lucide-react';

/* ==========================================
   HOOK INTERSECTION OBSERVER
   ========================================== */
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

export default function AdmissionIndex({
    title = "Penerimaan Murid Baru",
    subtitle = "Mulai perjalanan pendidikan Islami terbaik untuk Ananda bersama SIT At-Taufiq Jambi.",
    tagline = "PENDAFTARAN ATTAUFIQ",
    patternImage = "/images/hero/frame-left.png",
    mosqueImage = "/images/hero/building-attaufiq.png"
}) {
    const [heroRef, heroInView] = useInView();

    // STATE UNTUK ALUR PENDAFTARAN (STEPPER)
    const [activeStep, setActiveStep] = useState(1);

    // STATE UNTUK JENJANG PERSYARATAN
    const [activeLevel, setActiveLevel] = useState('SMP');

    // STATE UNTUK ACCORDION FAQ
    const [openFaq, setOpenFaq] = useState(0);

    /* ==========================================
       DATA DUMMY ADMISSION
       ========================================== */
    const periods = [
        {
            id: 1,
            wave: "GELOMBANG 1",
            title: "Early Admission",
            date: "1 Januari – 31 Maret 2026",
            desc: "Kesempatan istimewa untuk bergabung lebih awal dan mendapatkan berbagai keuntungan terbaik.",
            benefits: [
                "Potongan biaya pendaftaran 25%",
                "Free seragam sekolah",
                "Prioritas kelas pilihan",
                "Free konsultasi tumbuh kembang"
            ],
            status: "open", // 'open' | 'upcoming' | 'closed'
            statusText: "SEDANG DIBUKA"
        },
        {
            id: 2,
            wave: "GELOMBANG 2",
            title: "Regular Admission",
            date: "1 April – 30 Juni 2026",
            desc: "Periode reguler dengan kuota terbatas. Pastikan Ananda tidak kehabisan kesempatan.",
            benefits: [
                "Potongan biaya pendaftaran 15%",
                "Free seragam sekolah",
                "Prioritas kelas (sesuai kuota)",
                "Free konsultasi tumbuh kembang"
            ],
            status: "open",
            statusText: "SEDANG DIBUKA"
        },
        {
            id: 3,
            wave: "GELOMBANG 3",
            title: "Last Admission",
            date: "1 Juli – 31 Agustus 2026",
            desc: "Periode terakhir dengan kuota sangat terbatas sebelum tahun ajaran baru dimulai.",
            benefits: [
                "Potongan biaya pendaftaran 10%",
                "Free seragam sekolah",
                "Kelas menyesuaikan ketersediaan",
                "Free konsultasi tumbuh kembang"
            ],
            status: "upcoming",
            statusText: "AKAN DIBUKA"
        }
    ];

    const steps = [
        {
            id: 1,
            title: "Isi Formulir",
            icon: FileText,
            detailTitle: "Isi Formulir Pendaftaran",
            detailDesc: "Lengkapi data Ananda melalui formulir pendaftaran online. Pastikan semua informasi yang diisi sudah benar.",
            prepList: [
                "Data pribadi Ananda",
                "Data orang tua/wali",
                "Informasi kontak aktif",
                "Pilih jenjang dan program",
                "Periode pendaftaran yang dipilih"
            ],
            note: "Anda dapat menyimpan data sementara dan melanjutkan kembali kapan saja."
        },
        {
            id: 2,
            title: "Upload Berkas",
            icon: UploadCloud,
            detailTitle: "Unggah Berkas Persyaratan",
            detailDesc: "Unggah dokumen persyaratan yang diperlukan secara digital untuk verifikasi berkas awal.",
            prepList: [
                "Scan Akta Kelahiran & KK",
                "Scan KTP Orang Tua",
                "Pasfoto berwarna terbaru",
                "Rapor semester terakhir"
            ],
            note: "Format berkas PDF/JPG maksimal berukuran 2MB per file."
        },
        {
            id: 3,
            title: "Observasi / Tes",
            icon: Users,
            detailTitle: "Pelaksanaan Observasi & Tes",
            detailDesc: "Jadwal pemetaan potensi dan bacaan Al-Qur'an Ananda bersama tim penguji profesional.",
            prepList: [
                "Hadir tepat waktu sesuai jadwal",
                "Membawa kartu peserta tes",
                "Wawancara orang tua/wali"
            ],
            note: "Jadwal tes akan dikirimkan via WhatsApp setelah verifikasi berkas."
        },
        {
            id: 4,
            title: "Pengumuman",
            icon: Megaphone,
            detailTitle: "Pengumuman Hasil Seleksi",
            detailDesc: "Hasil seleksi dapat dilihat melalui portal resmi atau pesan WhatsApp terverifikasi.",
            prepList: [
                "Cek status kelulusan di portal",
                "Unduh surat keputusan hasil seleksi"
            ],
            note: "Pengumuman diterbitkan maksimal 3 hari setelah pelaksanaan tes."
        },
        {
            id: 5,
            title: "Daftar Ulang",
            icon: FileCheck,
            detailTitle: "Konfirmasi & Daftar Ulang",
            detailDesc: "Lakukan pembayaran biaya masuk dan konfirmasi daftar ulang untuk mengamankan kuota Ananda.",
            prepList: [
                "Pembayaran registrasi ulang",
                "Pengukuran seragam sekolah",
                "Pengambilan buku & perlengkapan"
            ],
            note: "Batas waktu daftar ulang adalah 7 hari kerja setelah pengumuman."
        }
    ];

    const levels = [
        { id: 'PG-TK', title: 'PG-TK', desc: 'Playgroup & Taman Kanak-kanak', icon: BookOpen },
        { id: 'SD', title: 'SD', desc: 'Sekolah Dasar', icon: GraduationCap },
        { id: 'SMP', title: 'SMP', desc: 'Sekolah Menengah Pertama', icon: Building2 },
        { id: 'SMA', title: 'SMA', desc: 'Sekolah Menengah Atas', icon: Building2 },
        { id: 'PKBM', title: 'PKBM', desc: 'Pusat Kegiatan Belajar Masyarakat', icon: Users }
    ];

    const levelRequirements = {
        'SMP': [
            { label: "Fotokopi Akta Kelahiran", sub: "1 lembar" },
            { label: "Fotokopi Kartu Keluarga (KK)", sub: "1 lembar" },
            { label: "Fotokopi KTP Orang Tua", sub: "Ayah & Ibu masing-masing 1 lembar" },
            { label: "Pas Foto Terbaru", sub: "Berwarna ukuran 3x4 (2 lembar)" },
            { label: "Fotokopi Rapor Semester Terakhir", sub: "Kelas 5 SD (legalisir)" },
            { label: "Surat Keterangan Lulus", sub: "Asli dari sekolah asal" },
            { label: "Surat Keterangan Sehat", sub: "Dari dokter/klinik" },
            { label: "Surat Keterangan Bebas Narkoba", sub: "Jika diperlukan" },
        ]
    };

    const faqs = [
        {
            q: "Apa saja jenjang pendidikan yang tersedia di Attaufiq?",
            a: "Attaufiq memiliki jenjang pendidikan lengkap mulai dari PG, TK, SD, SMP, SMA, hingga PKBM. Setiap jenjang dirancang untuk mendampingi tumbuh kembang Ananda secara optimal, dengan kurikulum terpadu berbasis nilai-nilai Islam dan karakter care."
        },
        {
            q: "Bagaimana sistem pembelajaran di Attaufiq?",
            a: "Kami menerapkan Kurikulum Merdeka yang dipadukan dengan nilai keislaman, program pembiasaan adab harian, serta penguatan hafalan Al-Qur'an (Tahfiz) dengan metode pembelajaran interaktif berbasis teknologi."
        },
        {
            q: "Apakah Attaufiq memiliki program Tahfizh?",
            a: "Ya, kami memiliki program khusus Tahfizh Al-Qur'an dengan target mutqin yang dibimbing langsung oleh Asatidz teruji dan tersertifikasi."
        },
        {
            q: "Apakah ada program beasiswa?",
            a: "Tersedia beasiswa khusus untuk jalur prestasi akademik, non-akademik, serta program beasiswa khusus bagi para Penghafal Al-Qur'an (Hafiz)."
        },
        {
            q: "Bagaimana cara tahu hasil seleksi?",
            a: "Hasil seleksi dapat diakses secara transparan melalui portal penerimaan siswa baru ini di menu Cek Kelulusan atau pemberitahuan langsung via WhatsApp."
        },
        {
            q: "Apakah orang tua bisa melihat perkembangan Ananda di sekolah?",
            a: "Sangat bisa. Kami menyediakan laporan perkembangan berkala serta portal informasi wali murid yang terhubung langsung dengan guru pembimbing."
        }
    ];

    return (
        <AppLayout title="Penerimaan Murid Baru - SIT At-Taufiq">
            <Head title="Admission & Pendaftaran PMB | SIT At-Taufiq Jambi" />

            {/* ==========================================
                1. HERO SECTION (PERSIS DENGAN HERO EVENT)
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
                        <path d="M0 75 C 360 135, 1080 15, 1440 75 L 1440 120 L 0 120 Z" fill="#FAF4EB" />
                    </svg>
                </div>
            </section>


            {/* CANVAS UTAMA */}
            <div className="bg-[#FAF4EB] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-[#051736] relative overflow-hidden space-y-24">
                
                {/* Background Pattern Ornament */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

                {/* ==========================================
                    2. PERIODE PENDAFTARAN (GELOMBANG CARD)
                ========================================== */}
                <section className="max-w-7xl mx-auto space-y-10 relative z-10">
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center space-x-2 text-[#D4AF37] text-xs uppercase font-extrabold tracking-[0.2em]">
                            <span>◆</span>
                            <span>Periode Pendaftaran</span>
                            <span>◆</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#051736]">
                            Pilih Periode Pendaftaran
                        </h2>
                        <p className="text-slate-600 text-xs md:text-sm font-light">
                            Setiap langkah besar dimulai dari keputusan hari ini.<br className="hidden sm:inline" />
                            Pilih periode terbaik untuk memulai perjalanan Ananda di Attaufiq.
                        </p>
                    </div>

                    {/* Podium & Stand Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6">
                        {periods.map((item) => (
                            <div key={item.id} className="relative group flex flex-col justify-between bg-[#FAF8F3] border border-[#E8DFC8] rounded-[36px] p-6 shadow-lg hover:shadow-2xl transition duration-500">
                                
                                {/* Binding Ring Ring Top Decorative */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="w-2.5 h-5 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#8B6B13] border border-amber-200 shadow-sm"></div>
                                    ))}
                                </div>

                                <div className="pt-4 space-y-5 text-center flex-1">
                                    {/* Wave Title */}
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-extrabold tracking-widest text-[#8B6B13] uppercase">
                                            {item.wave}
                                        </span>
                                        <h3 className="font-serif text-2xl font-bold text-[#051736]">
                                            {item.title}
                                        </h3>
                                    </div>

                                    {/* Date Badge */}
                                    <div className="inline-flex items-center space-x-2 bg-[#F3EBDD] border border-[#E8DFC8] px-4 py-1.5 rounded-full text-xs text-[#051736] font-medium">
                                        <Calendar size={13} className="text-[#8B6B13]" />
                                        <span>{item.date}</span>
                                    </div>

                                    <p className="text-xs text-slate-500 font-light leading-relaxed px-2">
                                        {item.desc}
                                    </p>

                                    {/* Benefits List */}
                                    <div className="pt-4 border-t border-[#E8DFC8]/60 text-left space-y-2.5 text-xs text-slate-700">
                                        {item.benefits.map((b, idx) => (
                                            <div key={idx} className="flex items-start space-x-2.5">
                                                <span className="text-[#8B6B13] pt-0.5">✦</span>
                                                <span className="font-light">{b}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Status & Action Button */}
                                <div className="pt-6 space-y-3">
                                    <div className="flex justify-center">
                                        <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                                            item.status === 'open' 
                                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                                                : 'bg-slate-200 text-slate-600 border border-slate-300'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'open' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                            <span>{item.statusText}</span>
                                        </span>
                                    </div>

                                    {item.status === 'open' ? (
                                        <Link
                                            href="#alur-pendaftaran"
                                            className="w-full flex items-center justify-center space-x-2 bg-[#051736] hover:bg-[#07327F] text-white py-3 rounded-full text-xs font-bold transition shadow-md group-hover:scale-[1.02]"
                                        >
                                            <span>Daftar Sekarang</span>
                                            <ChevronRight size={14} />
                                        </Link>
                                    ) : (
                                        <button
                                            disabled
                                            className="w-full flex items-center justify-center space-x-2 bg-[#E8DFC8] text-slate-600 py-3 rounded-full text-xs font-bold cursor-not-allowed"
                                        >
                                            <span>Nantikan Informasi</span>
                                            <ChevronRight size={14} />
                                        </button>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Bottom Info Banner */}
                    <div className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="flex items-center space-x-4">
                            <div className="p-3.5 bg-[#051736] text-[#D4AF37] rounded-xl flex-shrink-0">
                                <Calendar size={22} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xs text-[#051736]">Kuota terbatas di setiap gelombang</h4>
                                <p className="text-[11px] text-slate-500 font-light">Daftarkan Ananda lebih awal untuk mendapatkan kesempatan dan benefit terbaik.</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 border-t md:border-t-0 md:border-l border-[#E8DFC8] pt-4 md:pt-0 md:pl-6">
                            <div className="p-3.5 bg-[#F3EBDD] text-[#8B6B13] rounded-xl flex-shrink-0">
                                <PhoneCall size={22} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xs text-[#051736]">Butuh bantuan?</h4>
                                <p className="text-[11px] text-slate-500 font-light">Hubungi tim kami untuk informasi lebih lanjut melalui WhatsApp atau email.</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ==========================================
                    3. ALUR PENDAFTARAN (ROYAL BLUE CONTAINER)
                ========================================== */}
                <section id="alur-pendaftaran" className="max-w-7xl mx-auto rounded-[36px] bg-[#051736] text-white p-8 md:p-14 relative overflow-hidden space-y-10 shadow-2xl">
                    
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]"></div>

                    <div className="text-center space-y-2 max-w-2xl mx-auto relative z-10">
                        <div className="flex items-center justify-center space-x-2 text-[#D4AF37] text-xs uppercase font-extrabold tracking-[0.2em]">
                            <span>◆</span>
                            <span>Alur Pendaftaran</span>
                            <span>◆</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl font-normal text-white">
                            5 Langkah Mudah Menuju Attaufiq
                        </h2>
                        <p className="text-blue-100/80 text-xs md:text-sm font-light">
                            Ikuti tahapan pendaftaran berikut dengan mudah dan pastikan Ananda menjadi bagian dari keluarga besar Attaufiq.
                        </p>
                    </div>

                    {/* Stepper Node Indicators */}
                    <div className="relative z-10 flex items-center justify-between max-w-3xl mx-auto py-4">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#D4AF37]/30 -translate-y-1/2 z-0"></div>

                        {steps.map((s) => {
                            const IconComp = s.icon;
                            const isActive = activeStep === s.id;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveStep(s.id)}
                                    className="relative z-10 flex flex-col items-center group focus:outline-none"
                                >
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        isActive 
                                            ? 'bg-gradient-to-b from-[#F3E5AB] to-[#D4AF37] text-[#051736] ring-4 ring-[#D4AF37]/30 scale-110 shadow-lg' 
                                            : 'bg-[#07327F] text-blue-200 border border-[#D4AF37]/40 hover:border-[#D4AF37]'
                                    }`}>
                                        <IconComp size={20} />
                                    </div>
                                    <span className={`text-[11px] font-bold mt-2 transition ${isActive ? 'text-[#F3E5AB]' : 'text-blue-200/60'}`}>
                                        {s.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Dynamic Detail Card */}
                    {(() => {
                        const current = steps.find(s => s.id === activeStep) || steps[0];
                        return (
                            <div className="bg-[#FAF8F3] text-[#051736] rounded-[28px] p-6 md:p-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-lg">
                                
                                {/* Step Tag */}
                                <div className="absolute top-0 left-6 bg-[#D4AF37] text-[#051736] text-[10px] font-black uppercase px-4 py-1.5 rounded-b-xl tracking-wider">
                                    Langkah 0{current.id}
                                </div>

                                {/* Illustration Area */}
                                <div className="md:col-span-4 flex justify-center pt-6 md:pt-0">
                                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-[#F3EBDD] border border-[#E8DFC8] flex items-center justify-center text-[#8B6B13] shadow-inner">
                                        <current.icon size={64} strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="md:col-span-8 space-y-4 pt-2">
                                    <h3 className="font-serif text-2xl font-bold text-[#051736]">
                                        {current.detailTitle}
                                    </h3>
                                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                                        {current.detailDesc}
                                    </p>

                                    {/* Checklist Prep */}
                                    <div className="bg-[#F3EBDD]/60 border border-[#E8DFC8] rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                        {current.prepList.map((item, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                <CheckCircle size={14} className="text-[#8B6B13] flex-shrink-0" />
                                                <span className="font-light text-slate-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action & Note */}
                                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-center space-x-2 max-w-sm">
                                            <Info size={16} className="text-blue-600 flex-shrink-0" />
                                            <span className="font-light">{current.note}</span>
                                        </div>

                                        <Link
                                            href="#"
                                            className="inline-flex items-center space-x-2 bg-[#051736] hover:bg-[#07327F] text-white px-6 py-3 rounded-xl text-xs font-bold transition shadow-md flex-shrink-0"
                                        >
                                            <span>Mulai Langkah Ini</span>
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        );
                    })()}

                    {/* Key Value Badges */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-blue-800/60 text-xs text-blue-100">
                        <div className="flex items-center space-x-3">
                            <ShieldCheck size={20} className="text-[#D4AF37]" />
                            <div>
                                <p className="font-bold">Proses Mudah & Transparan</p>
                                <p className="text-[10px] text-blue-200/60">Setiap tahapan terstruktur dengan jelas.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Lock size={20} className="text-[#D4AF37]" />
                            <div>
                                <p className="font-bold">Data Aman & Terjaga</p>
                                <p className="text-[10px] text-blue-200/60">Informasi Anda terenkripsi aman.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Clock size={20} className="text-[#D4AF37]" />
                            <div>
                                <p className="font-bold">Hemat Waktu</p>
                                <p className="text-[10px] text-blue-200/60">Daftar kapan saja melalui perangkat Anda.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <HeartHandshake size={20} className="text-[#D4AF37]" />
                            <div>
                                <p className="font-bold">Didampingi Sepenuh Hati</p>
                                <p className="text-[10px] text-blue-200/60">Tim siap membantu setiap langkah.</p>
                            </div>
                        </div>
                    </div>

                </section>


                {/* ==========================================
                    4. PERSYARATAN PENDAFTARAN (JENJANG TAB)
                ========================================== */}
                <section className="max-w-7xl mx-auto space-y-10 relative z-10">
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center space-x-2 text-[#D4AF37] text-xs uppercase font-extrabold tracking-[0.2em]">
                            <span>◆</span>
                            <span>Persyaratan Pendaftaran</span>
                            <span>◆</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#051736]">
                            Pilih Jenjang Pendidikan
                        </h2>
                        <p className="text-slate-600 text-xs md:text-sm font-light">
                            Setiap jenjang memiliki persyaratan yang berbeda.<br className="hidden sm:inline" />
                            Silakan pilih jenjang yang sesuai untuk melihat detail persyaratan.
                        </p>
                    </div>

                    {/* Level Selector Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {levels.map((lvl) => {
                            const isSel = activeLevel === lvl.id;
                            return (
                                <button
                                    key={lvl.id}
                                    onClick={() => setActiveLevel(lvl.id)}
                                    className={`p-5 rounded-[28px] border text-center flex flex-col items-center justify-between space-y-3 transition duration-300 ${
                                        isSel 
                                            ? 'bg-[#051736] text-white border-[#D4AF37] shadow-xl ring-2 ring-[#D4AF37]/50 -translate-y-1' 
                                            : 'bg-[#FAF8F3] text-[#051736] border-[#E8DFC8] hover:border-[#D4AF37]'
                                    }`}
                                >
                                    <div className={`p-3 rounded-full ${isSel ? 'bg-[#07327F] text-[#D4AF37]' : 'bg-[#F3EBDD] text-[#8B6B13]'}`}>
                                        <lvl.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl font-bold">{lvl.title}</h3>
                                        <p className={`text-[10px] mt-0.5 ${isSel ? 'text-blue-200' : 'text-slate-500'}`}>{lvl.desc}</p>
                                    </div>
                                    <span className={`text-[11px] font-bold inline-flex items-center space-x-1 ${isSel ? 'text-[#D4AF37]' : 'text-slate-600'}`}>
                                        <span>Lihat Persyaratan</span>
                                        <ChevronRight size={12} />
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Requirement Display Panel */}
                    <div className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-[32px] p-6 md:p-10 shadow-lg space-y-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E8DFC8] pb-6 gap-4">
                            <div>
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B6B13]">PERSYARATAN BERKAS</span>
                                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#051736]">
                                    Persyaratan Pendaftaran {activeLevel}
                                </h3>
                            </div>
                            <div className="flex gap-3">
                                <Link
                                    href="#"
                                    className="bg-[#051736] hover:bg-[#07327F] text-white px-5 py-2.5 rounded-full text-xs font-bold transition shadow-md"
                                >
                                    Register Now
                                </Link>
                                <a
                                    href="https://wa.me/628123456789"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="border border-[#051736] text-[#051736] hover:bg-[#051736] hover:text-white px-5 py-2.5 rounded-full text-xs font-bold transition"
                                >
                                    Chat Admin
                                </a>
                            </div>
                        </div>

                        {/* List Grid Requirements */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(levelRequirements[activeLevel] || levelRequirements['SMP']).map((req, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E8DFC8] flex items-start space-x-3 shadow-sm">
                                    <div className="p-2 bg-[#F3EBDD] text-[#8B6B13] rounded-lg mt-0.5">
                                        <FileText size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs text-[#051736]">{req.label}</h4>
                                        <p className="text-[11px] text-slate-500 font-light">{req.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Important Note Box */}
                        <div className="p-5 rounded-2xl bg-[#F3EBDD]/60 border border-[#D4AF37]/40 flex items-start space-x-3 text-xs text-slate-700">
                            <Info size={18} className="text-[#8B6B13] flex-shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <p className="font-bold text-[#051736]">Catatan Penting:</p>
                                <p className="font-light">Semua berkas diunggah dalam format PDF atau JPG dengan ukuran maksimal 2MB per file. Berkas fisik wajib dibawa saat verifikasi langsung di sekolah.</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ==========================================
                    5. FAQ ACCORDION SECTION
                ========================================== */}
                <section className="max-w-7xl mx-auto space-y-10 relative z-10">
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center space-x-2 text-[#D4AF37] text-xs uppercase font-extrabold tracking-[0.2em]">
                            <span>◆</span>
                            <span>FAQ</span>
                            <span>◆</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#051736]">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <p className="text-slate-600 text-xs md:text-sm font-light">
                            Kami memahami setiap pertanyaan Bunda/Ayah.<br className="hidden sm:inline" />
                            Berikut jawaban atas hal-hal yang paling sering ditanyakan tentang Attaufiq.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Side Help Card */}
                        <div className="lg:col-span-4 bg-[#FAF8F3] border border-[#E8DFC8] rounded-[32px] p-6 text-center space-y-6 shadow-md">
                            <div className="w-16 h-16 rounded-full bg-[#F3EBDD] text-[#8B6B13] border border-[#E8DFC8] flex items-center justify-center mx-auto">
                                <HelpCircle size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-serif text-2xl font-bold text-[#051736]">
                                    Masih Punya Pertanyaan?
                                </h3>
                                <p className="text-xs text-slate-500 font-light leading-relaxed">
                                    Jika pertanyaan Bunda/Ayah belum terjawab di sini, jangan ragu untuk menghubungi tim kami. Kami siap membantu.
                                </p>
                            </div>
                            <a
                                href="https://wa.me/628123456789"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full inline-flex items-center justify-center space-x-2 bg-[#051736] hover:bg-[#07327F] text-white py-3 rounded-full text-xs font-bold transition shadow-md"
                            >
                                <MessageCircle size={16} />
                                <span>Hubungi Tim Kami</span>
                            </a>
                        </div>

                        {/* Accordion List */}
                        <div className="lg:col-span-8 space-y-3">
                            {faqs.map((faq, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div 
                                        key={index} 
                                        className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-2xl overflow-hidden shadow-sm transition"
                                    >
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : index)}
                                            className="w-full text-left p-5 flex items-center justify-between space-x-4 focus:outline-none"
                                        >
                                            <span className="font-bold text-xs md:text-sm text-[#051736]">
                                                {faq.q}
                                            </span>
                                            <div className={`p-1 rounded-full transition-transform duration-300 ${isOpen ? 'bg-[#051736] text-white rotate-180' : 'bg-[#F3EBDD] text-[#8B6B13]'}`}>
                                                <Plus size={14} />
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="px-5 pb-5 pt-1 text-xs text-slate-600 font-light leading-relaxed border-t border-[#E8DFC8]/50 bg-white/40">
                                                {faq.a}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    {/* Bottom Contact Help Banner */}
                    <div className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3.5 bg-[#051736] text-[#D4AF37] rounded-xl flex-shrink-0">
                                <PhoneCall size={22} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xs text-[#051736]">Butuh Bantuan Lebih Lanjut?</h4>
                                <p className="text-[11px] text-slate-500 font-light">Tim Attaufiq siap membantu menjawab setiap pertanyaan Bunda/Ayah.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <a
                                href="https://wa.me/628123456789"
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 sm:flex-none border border-[#051736] text-[#051736] hover:bg-[#051736] hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold transition text-center"
                            >
                                Chat Admin
                            </a>
                            <a
                                href="tel:0821xxxx"
                                className="flex-1 sm:flex-none bg-[#051736] hover:bg-[#07327F] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition text-center"
                            >
                                Hubungi Kami
                            </a>
                        </div>
                    </div>

                </section>

            </div>
        </AppLayout>
    );
}