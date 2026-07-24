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

export default function Sejarah({
    title = "Program Pendidikan",
    subtitle = "Setiap jenjang, satu perjalanan. Bersama membangun generasi beradab.",
    tagline = "SEKOLAH ISLAM ATTAUFIQ",
    patternImage = "/images/hero/frame-left.png",
    mosqueImage = "/images/hero/building-attaufiq.png"
}) {
    const [activeTab, setActiveTab] = useState('PG-TK');
 

    // Ref untuk Masing-masing Section Animasi
    const [heroRef, heroInView] = useInView();
    const [sejarahRef, sejarahInView] = useInView();
    const [todayRef, todayInView] = useInView();
    const [quoteRef, quoteInView] = useInView();
    

  


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
                2. SEJARAH 1982 SECTION
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

   
        </AppLayout>
    );
}