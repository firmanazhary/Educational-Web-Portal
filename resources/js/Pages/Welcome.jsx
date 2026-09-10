// resources/js/Pages/Home.jsx

import React, { useEffect, useRef, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';
import HeroSlider from '@/Layouts/HeroSlider';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import JourneySection from "@/Components/home/journey/JourneySection";
import AchievementsSection from "@/Components/home/achievements/AchievementsSection";
import ClosingCtaSection from '@/Components/home/closing/ClosingCtaSection';
import TestimonialSection from '@/Components/home/testimonials/TestimonialSection';
import BlogPreview from '@/Components/home/BlogPreview';

import {
    Sparkles,
    BookOpen,
    GraduationCap,
    Heart,
    Cloud,
    Smile,
    Compass,
    Star,
    BookOpenText,
    Lightbulb,
    Target,
    Handshake
} from 'lucide-react';

// ==========================================
// DATA ORNAMEN BACKGROUND (Parallax)
// ==========================================
const BACKGROUND_ORNAMENTS = [
    { id: 1, Icon: Sparkles, size: 28, color: "text-amber-400/60", top: "6%", left: "8%", depth: 0.1 },
    { id: 2, Icon: Cloud, size: 48, color: "text-amber-200/50", top: "18%", right: "6%", depth: 0.15 },
    { id: 3, Icon: BookOpen, size: 34, color: "text-amber-600/30", top: "32%", left: "5%", depth: 0.08 },
    { id: 4, Icon: Smile, size: 30, color: "text-amber-400/40", top: "45%", right: "10%", depth: 0.12 },
    { id: 5, Icon: Heart, size: 32, color: "text-rose-400/35", top: "58%", left: "7%", depth: 0.18 },
    { id: 6, Icon: Compass, size: 36, color: "text-amber-500/25", top: "72%", right: "8%", depth: 0.1 },
    { id: 7, Icon: GraduationCap, size: 44, color: "text-amber-700/25", top: "84%", left: "6%", depth: 0.14 },
    { id: 8, Icon: Star, size: 26, color: "text-amber-400/50", top: "94%", right: "12%", depth: 0.06 },
];

const dataKeunggulan = [
    {
        id: 1,
        title: "Pendidikan Islam Berkualitas",
        desc: "Mengintegrasikan ilmu dunia dan nilai-nilai Islam dalam setiap kegiatan, membentuk pribadi berakhlak, berilmu, dan bertakwa.",
        position: "left",
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
        position: "right",
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
        position: "left",
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
        position: "right",
        icon: (
            <svg className="w-6 h-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )
    }
];

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

export default function Home({ auth, posts = [], galleries = [] }) {
    const [sectionRef, isInView] = useInView();

    const activities = [
        {
            icon: <BookOpenText className="w-6 h-6 text-[#1A2D6C]" />,
            title: 'Tahfizh Day',
            desc: 'Event puncak dari perjalanan ananda mencintai Al-Qur\'an — lewat teatrikal, visualisasi, dan tilawah.',
            image: '/images/home/tahfidzhDay.JPG'
        },
        {
            icon: <Lightbulb className="w-6 h-6 text-[#1A2D6C]" />,
            title: 'Fun & Creative Learning',
            desc: 'Belajar tak harus duduk diam. Ananda diajak aktif, bereksplorasi, dan menemukan cara belajarnya sendiri.',
            image: '/images/jenjang/heroPg.png'
        },
        {
            icon: <Target className="w-6 h-6 text-[#1A2D6C]" />,
            title: 'ITC',
            desc: 'Ruang bagi ananda menemukan dan mengembangkan potensinya, dari robotik hingga olahraga, setiap anak punya kesempatan.',
            image: '/images/home/itc.JPG'
        },
        {
            icon: <Handshake className="w-6 h-6 text-[#1A2D6C]" />,
            title: 'Ilal Liqo\'',
            desc: 'Bukan sekadar perpisahan, tapi momen ananda menunjukkan kesiapannya memberi arti bagi sesama.',
            image: '/images/home/ilalLiqo.JPG'
        },
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (customDelay = 0) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: customDelay, ease: [0.25, 0.4, 0.25, 1] },
        }),
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.9, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] },
        },
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 0.88,
            x: 0,
            transition: { duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] },
        },
    };

    return (
        <AppLayout title="Home">
            <Head title="SIT At-Taufiq Jambi - Mencetak Generasi Robbani" />

            {/* --- HERO SECTION --- */}
            <HeroSlider />

            {/* --- ATQ SECTION --- */}
            <section ref={sectionRef} id="about-section" className="w-full bg-[#FAF7F0] relative overflow-hidden text-slate-800 py-12 sm:py-16 md:py-24">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] md:w-[500px] h-[280px] sm:h-[400px] md:h-[500px] bg-[#FFC700]/10 rounded-full blur-3xl pointer-events-none z-0" />
                <div className="absolute left-0 bottom-0 top-0 w-16 sm:w-36 md:w-48 pointer-events-none z-0 opacity-15 sm:opacity-20 transition-opacity duration-500 hover:opacity-30">
                    <img src="/images/hero/bgPot-left.png" alt="Pot Decorative Left" className="h-full w-full object-cover object-left filter drop-shadow-sm" />
                </div>
                <div className="absolute right-0 bottom-0 top-0 w-16 sm:w-36 md:w-48 pointer-events-none z-0 opacity-15 sm:opacity-20 transition-opacity duration-500 hover:opacity-30">
                    <img src="/images/hero/bgPot-right.png" alt="Pot Decorative Right" className="h-full w-full object-cover object-right filter drop-shadow-sm" />
                </div>
                <div className="hidden sm:block absolute top-2 left-4 w-36 md:w-44 pointer-events-none z-10 animate-float-slow drop-shadow-md">
                    <img src="/images/hero/ornamenLogo-1.png" alt="Ornamen Kuning Left" className="w-full h-auto object-contain" />
                </div>

                <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-20">
                    <div className={`text-center max-w-4xl mx-auto space-y-5 sm:space-y-6 md:space-y-7 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex justify-center mb-1">
                            <img src="/images/hero/logo.png" alt="Logo Attaufiq" className="h-24 sm:h-36 md:h-60 w-auto object-contain drop-shadow-md hover:scale-[1.02] transition-transform duration-500" />
                        </div>
                        <div className="flex items-center justify-center gap-3 opacity-60 my-2">
                            <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent to-[#0B2545]"></span>
                            <span className="text-[#FFC700] text-xs rotate-45 transform inline-block">◆</span>
                            <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent to-[#0B2545]"></span>
                        </div>

                        <div className="max-w-[320px] sm:max-w-2xl mx-auto px-2 sm:px-8">
                            <div className="block sm:hidden text-center space-y-2 text-[#0B2545]/90 text-xs leading-relaxed">
                                <p>Di Attaufiq, setiap proses belajar dirancang agar ananda:</p>
                                <div className="flex flex-col items-center gap-1.5 py-1">
                                    <div className="inline-flex items-center gap-1">
                                        <span className="font-semibold text-[#0B2545] bg-[#FFC700]/25 px-2 py-0.5 rounded-md border-b-2 border-[#FFC700]">paham</span>
                                        <span>, bukan sekadar hafal;</span>
                                    </div>
                                    <div className="inline-flex items-center gap-1">
                                        <span className="font-semibold text-[#0B2545] bg-[#FFC700]/25 px-2 py-0.5 rounded-md border-b-2 border-[#FFC700]">berkembang</span>
                                        <span>, bukan sekadar ikut;</span>
                                    </div>
                                    <div className="inline-flex items-center gap-1">
                                        <span className="font-semibold text-[#0B2545] bg-[#FFC700]/25 px-2 py-0.5 rounded-md border-b-2 border-[#FFC700]">punya arah</span>
                                        <span>, bukan sekadar jalan.</span>
                                    </div>
                                </div>
                                <p className="pt-0.5">Karena bagi kami, pendidikan harus memberi arti.</p>
                            </div>

                            <p className="hidden sm:block text-[#0B2545]/90 font-normal text-lg md:text-[19px] leading-relaxed md:leading-[1.85] tracking-wide text-center">
                                Di Attaufiq, setiap proses belajar dirancang agar ananda:{' '}
                                <span className="font-semibold text-[#0B2545] bg-[#FFC700]/20 px-2 py-0.5 rounded-md border-b-2 border-[#FFC700]">paham</span>
                                , bukan sekadar hafal;{' '}
                                <span className="font-semibold text-[#0B2545] bg-[#FFC700]/20 px-2 py-0.5 rounded-md border-b-2 border-[#FFC700]">berkembang</span>
                                , bukan sekadar ikut;{' '}
                                <span className="font-semibold text-[#0B2545] bg-[#FFC700]/20 px-2 py-0.5 rounded-md border-b-2 border-[#FFC700]">punya arah</span>
                                , bukan sekadar jalan. Karena bagi kami, pendidikan harus memberi arti.
                            </p>
                        </div>

                        <div className="pt-3 flex justify-center">
                            <a
                                href="#about-section"
                                className="group relative inline-flex items-center gap-2 bg-[#FFC700] hover:bg-[#f5be00] text-[#0B2545] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 ring-4 ring-[#FFC700]/20"
                            >
                                <span>Kenali Lebih Dekat</span>
                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0B2545]/10 flex items-center justify-center group-hover:bg-[#0B2545]/20 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0B2545] transform group-hover:translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="relative mt-14 sm:mt-20 md:mt-24">
                        <div className="hidden sm:block absolute -top-14 right-4 md:right-8 w-32 md:w-40 pointer-events-none z-30 animate-float-delayed drop-shadow-lg">
                            <img src="/images/hero/ornamenLogo-2.png" alt="Ornamen Biru Right" className="w-full h-auto object-contain" />
                        </div>

                        <div className={`text-center mb-8 sm:mb-12 space-y-2 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h3 className="font-sans text-lg sm:text-2xl md:text-4xl text-[#0B2545] font-extrabold tracking-tight px-4 leading-snug">
                                Belajar yang Tak Berhenti di Kelas
                            </h3>
                            <p className="text-slate-500 font-normal text-xs md:text-sm max-w-[300px] sm:max-w-xl mx-auto leading-relaxed px-2">
                                Setiap kegiatan dirancang untuk membentuk karakter, cara berpikir, dan rasa percaya diri ananda, bukan hanya nilai di atas kertas.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch relative z-20">
                            {activities.map((act, index) => (
                                <div
                                    key={index}
                                    className={`group relative rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-md hover:shadow-2xl border border-[#E8DFC8]/50 bg-[#0B2265] text-white flex flex-col justify-end h-[320px] sm:h-[340px] md:h-[380px] transition-all duration-500 ease-out transform hover:-translate-y-2 ${
                                        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                                >
                                    <img src={act.image} alt={act.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2265] via-[#0B2265]/80 to-transparent opacity-90 group-hover:opacity-85 transition duration-300"></div>

                                    <div className="relative z-10 p-5 sm:p-6 flex items-start gap-3.5">
                                        <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md text-[#0B2265] mt-0.5 group-hover:scale-110 group-hover:bg-[#FFC700] transition duration-300">
                                            {act.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-base md:text-lg text-white leading-snug group-hover:text-[#FFC700] transition-colors duration-300">
                                                {act.title}
                                            </h4>
                                            <p className="text-slate-200/90 font-light text-xs leading-relaxed">{act.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={`flex flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 relative z-20 transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            <Link href="/events" className="inline-flex items-center justify-center bg-[#0B2265] hover:bg-[#081848] text-white font-semibold text-xs md:text-sm px-5 sm:px-7 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex-1 sm:flex-none max-w-[150px] sm:max-w-none text-center">
                                More Events
                            </Link>
                            <Link href="/programs" className="inline-flex items-center justify-center bg-[#0B2265] hover:bg-[#081848] text-white font-semibold text-xs md:text-sm px-5 sm:px-7 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex-1 sm:flex-none max-w-[150px] sm:max-w-none text-center">
                                More Programs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. PERJALANAN TUMBUH BERSAMA ATTAUFIQ --- */}
            <section className="relative w-full min-h-[85vh] bg-[#FAF6F0] flex flex-col justify-between overflow-hidden font-sans py-12 md:py-16">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-200/25 rounded-full blur-[140px] pointer-events-none z-0" />
                <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none z-0" />

                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 0.9, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
                    style={{ backgroundImage: `url('/images/home/bgPerjalanan.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/40 via-transparent to-[#F5EFE6]/90 pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-6 flex flex-col items-center">
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

                <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-8 md:px-12 pt-8 flex flex-col-reverse md:flex-row items-center md:items-end justify-between gap-0">
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

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInRight}
                        className="w-full md:flex-1 flex justify-center md:justify-end items-end -mb-4 md:-mb-16 -mr-0 md:-mr-10 z-10"
                    >
                        <img
                            src="/images/home/gedung-right.png"
                            alt="Gedung Attaufiq"
                            className="w-[75%] sm:w-[60%] max-w-md md:max-w-lg object-contain drop-shadow-xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* --- SEKSI INTERAKTIF & LAINNYA --- */}
            <JourneySection />
            <AchievementsSection />
            <BlogPreview posts={posts} />
            <TestimonialSection />
            <ClosingCtaSection />
        </AppLayout>
    );
}