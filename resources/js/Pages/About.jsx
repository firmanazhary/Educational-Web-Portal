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

export default function About({
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
    const [visiRef, visiInView] = useInView();
    const [sejarahRef, sejarahInView] = useInView();
    const [todayRef, todayInView] = useInView();
    const [quoteRef, quoteInView] = useInView();
    const [faqRef, faqInView] = useInView();
    const [contactRef, contactInView] = useInView();

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
                2. VISI & MISI SECTION (ANIMATED STAGGERED)
            ========================================== */}
            <section ref={visiRef} className="py-20 bg-[#FAF8F5] relative overflow-hidden">
                <div className="flex justify-center mb-12">
                    <div className="text-[#D4AF37] text-2xl animate-pulse">✦</div>
                </div>

                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-8 items-stretch">

                        {/* CARD 1: VISI */}
                        <div className={`relative bg-[#FFFDF9] border border-[#E8DFC8] rounded-[32px] p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-700 ease-out flex flex-col justify-between overflow-hidden group h-full transform hover:-translate-y-2 ${visiInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div
                                className="absolute inset-0 bg-cover bg-bottom opacity-5 pointer-events-none group-hover:opacity-10 transition duration-500"
                                style={{ backgroundImage: `url('/images/hero/building-attaufiq.png')` }}
                            ></div>

                            <div className="relative z-10 flex-grow">
                                <div className="flex items-start space-x-6 mb-8">
                                    <div className="w-20 h-24 bg-[#07327F] rounded-t-[32px] rounded-b-lg flex items-center justify-center p-2 shadow-md border-2 border-[#D4AF37] flex-shrink-0 group-hover:scale-105 transition duration-500">
                                        <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div className="pt-2">
                                        <h2 className="font-serif text-4xl font-normal text-[#07327F]">Visi</h2>
                                        <div className="flex items-center space-x-2 my-2">
                                            <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
                                            <span className="text-[#D4AF37] text-[10px]">✦</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-700 font-light text-base md:text-lg leading-relaxed pt-2">
                                    Menjadi lembaga pendidikan Islam unggulan yang melahirkan <strong className="font-semibold text-slate-900">generasi beriman, berilmu, berakhlak mulia, dan berprestasi</strong> menuju ridha Allah.
                                </p>
                            </div>

                            <div className="relative z-10 pt-8 mt-auto border-t border-slate-100 flex items-center justify-between text-[#D4AF37] text-xs font-serif italic">
                                <span>SIT At-Taufiq Jambi</span>
                                <span>✦ ✦ ✦</span>
                            </div>
                        </div>

                        {/* CARD 2: MISI */}
                        <div className={`relative bg-[#FFFDF9] border border-[#E8DFC8] rounded-[32px] p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-700 delay-200 ease-out flex flex-col justify-between overflow-hidden group h-full transform hover:-translate-y-2 ${visiInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="relative z-10 flex-grow">
                                <div className="flex items-start space-x-6 mb-8">
                                    <div className="w-20 h-24 bg-[#07327F] rounded-t-[32px] rounded-b-lg flex items-center justify-center p-2 shadow-md border-2 border-[#D4AF37] flex-shrink-0 group-hover:scale-105 transition duration-500">
                                        <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                                            <circle cx="12" cy="12" r="5" strokeWidth="1.5" />
                                            <circle cx="12" cy="12" r="2" strokeWidth="1.5" />
                                        </svg>
                                    </div>
                                    <div className="pt-2">
                                        <h2 className="font-serif text-4xl font-normal text-[#07327F]">Misi</h2>
                                        <div className="flex items-center space-x-2 my-2">
                                            <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
                                            <span className="text-[#D4AF37] text-[10px]">✦</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        "Menyelenggarakan pendidikan Islam yang berkualitas dan integratif.",
                                        "Menanamkan nilai-nilai Al-Qur'an dan Sunnah dalam kehidupan sehari-hari.",
                                        "Mengembangkan potensi akademik, karakter, dan keterampilan siswa.",
                                        "Menciptakan lingkungan belajar yang aman, nyaman, dan inspiratif.",
                                        "Membangun kemitraan dengan orang tua dan masyarakat untuk bersama-sama mendidik generasi terbaik."
                                    ].map((misi, index) => (
                                        <div key={index} className="flex items-start space-x-4 pb-3 border-b border-slate-100 last:border-none last:pb-0 group/item hover:pl-1 transition-all duration-300">
                                            <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 shadow-sm group-hover/item:scale-110 transition">
                                                {index + 1}
                                            </div>
                                            <p className="text-slate-700 font-light text-sm md:text-base leading-snug">
                                                {misi}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                3. SEJARAH 1982 SECTION
            ========================================== */}
            <section ref={sejarahRef} className="py-24 bg-[#FAF8F5] relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className={`text-center mb-16 transition-all duration-700 ${sejarahInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center justify-center space-x-3 mb-2">
                            <span className="w-10 h-[1px] bg-[#D4AF37]/60"></span>
                            <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.3em]">TENTANG ATTAUFIQ</span>
                            <span className="w-10 h-[1px] bg-[#D4AF37]/60"></span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl text-[#07327F] font-normal mb-3">
                            Awal Sebuah Amanah
                        </h2>
                        <div className="flex items-center justify-center space-x-3 text-[#D4AF37]">
                            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
                            <span className="font-serif italic text-lg font-bold">1982</span>
                            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className={`md:col-span-6 lg:col-span-5 relative group mx-auto w-full max-w-md transition-all duration-1000 ${sejarahInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#E6D7B8]/90 backdrop-blur-sm z-20 rotate-[-1deg] shadow-sm"></div>
                            <div className="bg-white p-5 rounded-[28px] shadow-xl border border-[#E8DFC8] transform -rotate-1 group-hover:rotate-0 transition duration-500">
                                <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-amber-950/10">
                                    <img
                                        src="/images/hero/sejarah-1982.jpg"
                                        alt="Yayasan Pendidikan Attaufiq 1982"
                                        className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition duration-700"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={`md:col-span-6 lg:col-span-7 space-y-6 text-slate-700 font-light text-base md:text-lg leading-relaxed pl-0 lg:pl-4 transition-all duration-1000 delay-200 ${sejarahInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                            <p>
                                Attaufiq berawal dari sebuah amanah dan kepedulian untuk menghadirkan pendidikan Islam yang tidak hanya mengajarkan ilmu, tetapi juga menanamkan nilai-nilai Al-Qur'an dan Sunnah dalam kehidupan anak.
                            </p>
                            <p>
                                Pada tahun <strong className="font-normal text-slate-900">1982</strong>, lahirlah <strong className="font-normal text-slate-900">Yayasan Pendidikan Attaufiq</strong> dengan cita-cita besar membentuk generasi beriman, berakhlak mulia, dan berprestasi yang mampu memberi manfaat bagi umat dan bangsa.
                            </p>
                            <div className="pt-2 flex justify-center md:justify-start">
                                <span className="text-[#D4AF37] text-lg">✦</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. ATTAUFIQ HARI INI SECTION
            ========================================== */}
            <section ref={todayRef} className="py-28 bg-[#051C42] text-white relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className={`text-center mb-20 transition-all duration-700 ${todayInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-[#D4AF37] text-xl mb-2">✦</div>
                        <h2 className="font-serif text-4xl md:text-5xl font-normal text-white mb-3">
                            Attaufiq Hari Ini
                        </h2>
                        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4"></div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className={`lg:col-span-7 relative flex items-center justify-center transition-all duration-1000 ${todayInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <div className="w-full md:w-5/6 rounded-[36px] overflow-hidden shadow-2xl border border-[#D4AF37]/30 h-[380px] md:h-[420px] relative z-10 group">
                                <img
                                    src="/images/hero/building-attaufiq.png"
                                    alt="Attaufiq Modern"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                />
                            </div>

                            <div className="hidden sm:flex flex-col space-y-4 absolute -right-2 md:right-0 z-20 w-48 lg:w-52">
                                <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#051C42] h-28 lg:h-32 transform translate-x-4 hover:translate-x-0 transition duration-500">
                                    <img
                                        src="/images/hero/santri-1.jpg"
                                        alt="Kegiatan Santri"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#051C42] h-28 lg:h-32 transform translate-x-2 hover:translate-x-0 transition duration-500">
                                    <img
                                        src="/images/hero/santri-2.jpg"
                                        alt="Santri Attaufiq"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={`lg:col-span-5 space-y-8 pl-0 lg:pl-2 transition-all duration-1000 delay-200 ${todayInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            {[
                                { title: 'Bertumbuh dengan Amanah', desc: 'Hingga hari ini, Attaufiq terus bertumbuh dengan amanah yang sama: menghadirkan pendidikan Islam yang berkualitas, relevan dengan zaman, dan tetap berlandaskan Al-Qur\'an dan Sunnah.' },
                                { title: 'Melayani dengan Hati', desc: 'Attaufiq menaungi jenjang PG-TK, SD, SMP, hingga SMA dengan lingkungan belajar yang aman, nyaman, dan kondusif. Didukung oleh guru dan tenaga pendidik profesional yang peduli dan berkompeten.' },
                                { title: 'Mempersiapkan Generasi Terbaik', desc: 'Kami mempersiapkan generasi yang berilmu, berakhlak, berdaya saing global, dan siap menjadi pemimpin masa depan yang membawa kebaikan bagi umat, bangsa, dan dunia.' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-5 group/item hover:translate-x-1 transition duration-300">
                                    <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center flex-shrink-0 bg-[#07327F]/40 text-[#D4AF37] mt-1 group-hover/item:bg-[#D4AF37] group-hover/item:text-[#051C42] transition duration-300">
                                        <span className="text-sm">✦</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-base md:text-lg text-white mb-1.5">{item.title}</h3>
                                        <p className="text-blue-100/80 font-light text-xs md:text-sm leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                5. QUOTE SECTION (PULSE & GLOW ELEGAN)
            ========================================== */}
            <section ref={quoteRef} className="py-24 text-white relative overflow-hidden bg-[#051736]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero/mesjid-about-us.png"
                        alt="Mosque Sunset Background"
                        className="w-full h-full object-cover object-bottom opacity-50 brightness-90 contrast-110"
                    />
                    <div className="absolute inset-0 bg-radial from-[#051736]/40 via-[#051736]/80 to-[#051736]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051736] via-transparent to-[#051736]/70"></div>
                </div>

                <div className={`container mx-auto px-6 max-w-6xl relative z-10 transition-all duration-1000 ${quoteInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className="lg:col-span-6 relative p-8 md:p-12 text-center flex flex-col justify-center items-center">
                            <div className="absolute inset-0 border-2 border-[#D4AF37]/80 rounded-t-[160px] rounded-b-3xl pointer-events-none shadow-[0_0_25px_rgba(212,175,55,0.15)] bg-[#051736]/40 backdrop-blur-[2px]"></div>

                            <div className="relative z-10 py-6 px-4">
                                <div className="flex items-center justify-center space-x-3 mb-6">
                                    <span className="w-10 h-[1px] bg-[#D4AF37]"></span>
                                    <span className="text-[#D4AF37] font-serif text-3xl font-bold">“</span>
                                    <span className="w-10 h-[1px] bg-[#D4AF37]"></span>
                                </div>

                                <p className="font-serif text-xl md:text-2xl text-white font-light leading-relaxed tracking-wide drop-shadow-md">
                                    Setiap anak adalah amanah,<br />
                                    setiap langkah pendidikan adalah kesempatan<br />
                                    untuk memberi arti.
                                </p>

                                <div className="flex items-center justify-center space-x-3 mt-6">
                                    <span className="w-10 h-[1px] bg-[#D4AF37]"></span>
                                    <span className="text-[#D4AF37] font-serif text-3xl font-bold">”</span>
                                    <span className="w-10 h-[1px] bg-[#D4AF37]"></span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-6 text-center lg:text-left space-y-6">
                            <p className="text-blue-200/90 text-xs md:text-sm uppercase tracking-[0.25em] font-light">
                                ITULAH SEBABNYA KAMI HADIR,
                            </p>

                            <div className="space-y-1">
                                <p
                                    className="text-4xl md:text-5xl lg:text-6xl text-[#F3E5AB] font-normal tracking-wide drop-shadow-lg italic"
                                    style={{ fontFamily: "'Great Vibes', 'Brush Script MT', cursive" }}
                                >
                                    Memberi Arti itu
                                </p>
                                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#D4AF37] tracking-wider uppercase drop-shadow-xl">
                                    ATTAUFIQ
                                </h2>
                            </div>

                            <div className="flex justify-center lg:justify-start my-2">
                                <span className="text-[#D4AF37] text-xl animate-pulse">✦</span>
                            </div>

                            <p className="text-blue-100/90 font-light text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0 drop-shadow">
                                Attaufiq berkomitmen untuk terus menjadi rumah pendidikan Islam yang memberikan arti, membimbing, dan mengantarkan setiap anak menuju masa depan terbaiknya.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                6. FAQ SECTION
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

            {/* ==========================================
                7. CONTACT & LOCATION SECTION
            ========================================== */}
            <section ref={contactRef} className="py-20 bg-[#FAF8F5] relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className={`text-center mb-12 transition-all duration-700 ${contactInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#07327F] mb-3">
                            Hubungi Kami
                        </h2>
                        <div className="flex items-center justify-center space-x-2 text-[#D4AF37]">
                            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                            <span className="text-xs">✦</span>
                            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                        </div>
                    </div>

                    {/* 3 Card Contact */}
                    <div className="grid md:grid-cols-3 gap-6 mb-20 items-stretch">
                        {[
                            { title: 'PG-TK-SD Attaufiq', sub: 'Kami siap membantu kebutuhan informasi untuk jenjang PG, TK dan SD.', wa: '0812-XXXX-XXXX', tel: '0741-XXXXXXX' },
                            { title: 'SMP-SMA Attaufiq', sub: 'Kami siap membantu kebutuhan informasi untuk jenjang SMP dan SMA.', wa: '0821-XXXX-XXXX', tel: '0741-XXXXXXX' }
                        ].map((item, idx) => (
                            <div key={idx} className={`bg-[#FFFDF9] border border-[#E8DFC8] rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between ${contactInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                                <div>
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-14 h-14 rounded-full bg-[#07327F] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                                            <span>🕌</span>
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-lg font-bold text-[#07327F]">{item.title}</h3>
                                            <p className="text-xs text-slate-500 font-light leading-snug">{item.sub}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3 mt-6">
                                        <a href="#" className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 transition group">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">💬</div>
                                                <div>
                                                    <p className="text-[10px] text-slate-400 uppercase">WhatsApp</p>
                                                    <p className="text-xs font-semibold text-slate-800">{item.wa}</p>
                                                </div>
                                            </div>
                                            <span className="text-slate-400 group-hover:text-emerald-600 transition">›</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Card 3: Operasional */}
                        <div className={`bg-[#FFFDF9] border border-[#E8DFC8] rounded-[28px] p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-xl transition duration-500 transform hover:-translate-y-2 ${contactInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="flex items-start space-x-3.5 pb-3 border-b border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-[#07327F] text-[#D4AF37] flex items-center justify-center flex-shrink-0 text-sm">⏰</div>
                                <div>
                                    <h4 className="font-semibold text-xs text-slate-800">Jam Operasional</h4>
                                    <p className="text-[11px] text-slate-600">Senin - Jumat : 07.00 - 16.00 WIB</p>
                                    <p className="text-[11px] text-slate-600">Sabtu : 07.00 - 12.00 WIB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}