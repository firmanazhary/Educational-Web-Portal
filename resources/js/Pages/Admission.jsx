import React, { useState, useRef, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import HeroSection from '@/Layouts/HeroSection';
import PageHeroBanner from "@/Components/PageHeroBanner";
import PeriodeSection from "@/Components/Admission/PeriodeSection";
import AlurSection from "@/Components/Admission/AlurSection";
import PersyaratanSection from "@/Components/Admission/PersyaratanSection";
import FaqAdmissionSection from "@/Components/Admission/FaqAdmissionSection";
import {
    Calendar,
    ChevronRight,
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
    HelpCircle,
    MessageCircle,
    GraduationCap,
    BookOpen,
    Building2,
    FileCheck,
    Info,
    ArrowRight,
    Sparkles,
    Lightbulb,
    Gift,
    Shirt,
    Award,
    UserCheck,
    FileCode
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

    // STATE MANAGEMENT
    const [activeStep, setActiveStep] = useState(1);
    const [activeLevel, setActiveLevel] = useState('SMP');
    const [openFaq, setOpenFaq] = useState(0);

    /* ==========================================
       DATA STRUCTURES
       ========================================== */
    const periods = [
        {
            id: 1,
            wave: "GELOMBANG 1",
            title: "Early Admission",
            date: "1 Januari – 31 Maret 2026",
            desc: "Kesempatan istimewa untuk bergabung lebih awal dan mendapatkan berbagai keuntungan terbaik.",
            benefits: [
                { text: "Potongan biaya pendaftaran 25%", icon: Gift },
                { text: "Free seragam sekolah", icon: Shirt },
                { text: "Prioritas kelas pilihan", icon: Award },
                { text: "Free konsultasi tumbuh kembang", icon: UserCheck }
            ],
            status: "open",
            statusText: "SEDANG DIBUKA"
        },
        {
            id: 2,
            wave: "GELOMBANG 2",
            title: "Regular Admission",
            date: "1 April – 30 Juni 2026",
            desc: "Periode reguler dengan kuota terbatas. Pastikan Ananda tidak kehabisan kesempatan.",
            benefits: [
                { text: "Potongan biaya pendaftaran 15%", icon: Gift },
                { text: "Free seragam sekolah", icon: Shirt },
                { text: "Prioritas kelas (sesuai kuota)", icon: Award },
                { text: "Free konsultasi tumbuh kembang", icon: UserCheck }
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
                { text: "Potongan biaya pendaftaran 10%", icon: Gift },
                { text: "Free seragam sekolah", icon: Shirt },
                { text: "Kelas menyesuaikan ketersediaan", icon: Award },
                { text: "Free konsultasi tumbuh kembang", icon: UserCheck }
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
        'PG-TK': [
            { label: "Fotokopi Akta Kelahiran", sub: "1 lembar" },
            { label: "Fotokopi Kartu Keluarga (KK)", sub: "1 lembar" },
            { label: "Fotokopi KTP Orang Tua", sub: "Ayah & Ibu masing-masing 1 lembar" },
            { label: "Pas Foto Terbaru", sub: "Berwarna ukuran 3x4 (2 lembar)" },
        ],
        'SD': [
            { label: "Fotokopi Akta Kelahiran", sub: "1 lembar" },
            { label: "Fotokopi Kartu Keluarga (KK)", sub: "1 lembar" },
            { label: "Fotokopi KTP Orang Tua", sub: "Ayah & Ibu masing-masing 1 lembar" },
            { label: "Pas Foto Terbaru", sub: "Berwarna ukuran 3x4 (2 lembar)" },
            { label: "Ijazah TK / Surat Keterangan TK", sub: "1 lembar (jika ada)" }
        ],
        'SMP': [
            { label: "Fotokopi Akta Kelahiran", sub: "1 lembar" },
            { label: "Fotokopi Kartu Keluarga (KK)", sub: "1 lembar" },
            { label: "Fotokopi KTP Orang Tua", sub: "Ayah & Ibu masing-masing 1 lembar" },
            { label: "Pas Foto Terbaru", sub: "Berwarna ukuran 3x4 (2 lembar)" },
            { label: "Fotokopi Rapor Semester Terakhir", sub: "Kelas 5 SD (legalisir)" },
            { label: "Surat Keterangan Lulus", sub: "Asli dari sekolah asal" },
            { label: "Surat Keterangan Sehat", sub: "Dari dokter/klinik" },
            { label: "Surat Keterangan Bebas Narkoba", sub: "Jika diperlukan" }
        ],
        'SMA': [
            { label: "Fotokopi Akta Kelahiran", sub: "1 lembar" },
            { label: "Fotokopi Kartu Keluarga (KK)", sub: "1 lembar" },
            { label: "Fotokopi KTP Orang Tua", sub: "Ayah & Ibu masing-masing 1 lembar" },
            { label: "Pas Foto Terbaru", sub: "Berwarna ukuran 3x4 (2 lembar)" },
            { label: "Fotokopi Rapor Semester Terakhir", sub: "Kelas 8 SMP (legalisir)" },
            { label: "Surat Keterangan Lulus SMP", sub: "Asli dari sekolah asal" }
        ],
        'PKBM': [
            { label: "Fotokopi Akta Kelahiran", sub: "1 lembar" },
            { label: "Fotokopi Kartu Keluarga (KK)", sub: "1 lembar" },
            { label: "Fotokopi KTP / KTP Orang Tua", sub: "1 lembar" },
            { label: "Ijazah Terakhir", sub: "Legalisir (2 lembar)" }
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
                1. HERO SECTION (SESUAI HERO BANNER PRESISI)
            ========================================== */}
            <PageHeroBanner
        heading="Admission"
        subheading={["Bunda dan Ayah, berikut alur", "pendaftaran ananda di Attaufiq."]}
        photoSrc="/images/hero-banner/hero-banner-photo-example.jpg"
        revealNotchBehind
      />

      <PeriodeSection/>

      <AlurSection/>

      <PersyaratanSection/>

      <FaqAdmissionSection/>



        </AppLayout>
    );
}
