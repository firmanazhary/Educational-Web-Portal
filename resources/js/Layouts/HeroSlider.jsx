import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HeroSlider() {
    const slides = [
        {
            image: 'images/hero/building-attaufiq.png', 
            title: 'Membangun Generasi Beradab dengan Pendidikan Berlandaskan Al-Qur\'an',
            desc: 'Di Sekolah Islam Attaufiq, setiap ananda dibina dalam lingkungan yang hangat seperti rumah kedua. Pembelajaran menggabungkan nilai Al-Qur\'an dan sunnah, pemahaman salafus shalih, serta metode modern yang adaptif dengan perkembangan teknologi.',
            ctaText: 'Kenali Attaufiq',
            ctaHref: '/about',
        },
     
    ];

    return (
        <section className="relative w-full h-[600px] md:h-[680px] lg:h-[720px] bg-[#001845] overflow-hidden group">
            
            <Swiper
                modules={[Autoplay, EffectFade, Pagination, Navigation]}
                effect="fade"
                speed={1200}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true}
                navigation={{
                    nextEl: '.hero-next-btn',
                    prevEl: '.hero-prev-btn',
                }}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full overflow-hidden">
                        
                        {/* --- 1. LAYER 0: GAMBAR SISWA (KANAN) --- */}
                  <div className="absolute inset-0 z-0">
                            <img 
                                src={slide.image} 
                                alt="Siswa Attaufiq" 
                                className="w-full h-full object-cover object-right md:object-center"
                            />
                            {/* 
                                EFEK GRADASI SUPER MULUS (ASOI MAX): 
                                - 0% ke 45%: Biru Solid (Teks & Kubah aman)
                                - 55% ke 75%: Memudar perlahan banget
                                - 90%: Hilang total (Transparan)
                            */}
                            <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#001845_0%,#001845_45%,rgba(0,24,69,0.9)_55%,rgba(0,24,69,0.4)_75%,transparent_90%)]"></div>
                        </div>

                        {/* --- 2. LAYER 1: FRAME PNG KUBAH (KIRI) --- */}
                        {/* Digeser menggunakan nilai minus di left agar frame mundur */}
                        <div className="absolute top-0 left-[-60px] md:left-[-100px] h-full w-[90%] md:w-[70%] lg:w-[60%] z-10 pointer-events-none">
                            <img 
                                src="/images/hero/frame-left.png" 
                                alt="Frame Kubah" 
                                className="w-full h-full object-cover object-right" 
                            />
                        </div>

                        {/* --- 3. LAYER 2: KONTEN TEKS --- */}
                        {/* Padding Left (pl) diatur cukup besar agar teks berada di tengah area biru */}
                        <div className="absolute top-0 left-28 h-full w-[85%] md:w-[65%] lg:w-[55%] z-20 flex flex-col justify-center pl-20 pr-10 md:pl-28 md:pr-16 lg:pl-36 lg:pr-24 slide-anim-content pointer-events-none">
                            <div className="pointer-events-auto">
                                {/* Judul */}
                                <h1 className="text-3xl md:text-4xl lg:text-[44px] font-serif font-bold text-white leading-[1.1] tracking-wide mb-6 drop-shadow-md">
                                    {slide.title}
                                </h1>

                                {/* Deskripsi */}
                                <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-md mb-8 drop-shadow">
                                    {slide.desc}
                                </p>

                                {/* Tombol Kuning */}
                                <div>
                                    <a 
                                        href={slide.ctaHref} 
                                        className="inline-flex items-center space-x-3 bg-[#FFC72C] hover:bg-[#F3E5AB] text-[#051C42] px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition duration-300 shadow-xl hover:scale-105"
                                    >
                                        <span>{slide.ctaText}</span>
                                        <span className="text-lg leading-none">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* --- 4. LAYER 3: DAUN (FOREGROUND) --- */}
            <div className="absolute bottom-0 right-[10%] md:right-[30%] z-30 pointer-events-none w-48 md:w-72 opacity-90 translate-y-4">
                <img 
                    src="/images/hero/front-leaves.png" 
                    alt="Leaves" 
                    className="w-full h-auto filter blur-[2px]"
                />
            </div>

            {/* --- 5. LAYER 4: TOMBOL MATAHARI --- */}
            
            {/* Tombol Kiri */}
            <button className="hero-prev-btn absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 group flex items-center justify-center cursor-pointer outline-none hover:scale-110 transition-transform duration-300 drop-shadow-xl">
                <svg className="absolute inset-0 w-full h-full text-[#FFC72C] group-hover:text-[#F3E5AB] transition-colors duration-300 animate-[spin_10s_linear_infinite]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L14.39 5.26L18.5 5.5L18.76 9.61L22 12L18.76 14.39L18.5 18.5L14.39 18.74L12 22L9.61 18.74L5.5 18.5L5.24 14.39L2 12L5.24 9.61L5.5 5.5L9.61 5.26L12 2Z" />
                </svg>
                <svg className="relative z-10 w-5 h-5 text-[#031B4E] pr-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Tombol Kanan */}
            <button className="hero-next-btn absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 group flex items-center justify-center cursor-pointer outline-none hover:scale-110 transition-transform duration-300 drop-shadow-xl">
                <svg className="absolute inset-0 w-full h-full text-[#FFC72C] group-hover:text-[#F3E5AB] transition-colors duration-300 animate-[spin_10s_linear_infinite_reverse]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L14.39 5.26L18.5 5.5L18.76 9.61L22 12L18.76 14.39L18.5 18.5L14.39 18.74L12 22L9.61 18.74L5.5 18.5L5.24 14.39L2 12L5.24 9.61L5.5 5.5L9.61 5.26L12 2Z" />
                </svg>
                <svg className="relative z-10 w-5 h-5 text-[#031B4E] pl-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* --- ANIMASI TEKS --- */}
            <style jsx global>{`
                .slide-anim-content {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 1s ease-out;
                    transition-delay: 0.3s;
                }
                .swiper-slide-active .slide-anim-content {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </section>
    );
}