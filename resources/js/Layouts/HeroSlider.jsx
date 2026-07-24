import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

export default function HeroSlider() {
    const slides = [
        {
            image: 'https://images.pexels.com/photos/8923027/pexels-photo-8923027.jpeg?auto=compress&cs=tinysrgb&w=1600',
            titleStart: 'Pendidikan Bukan Sekadar Belajar, Tapi ',
            titleHighlight: 'Menemukan Arti',
            titleEnd: '.',
            desc: 'Dari PG–TK, SD sampai SMP dan SMA, Attaufiq mendampingi setiap tahap tumbuh kembang ananda. Lewat bermain, tahfizh, dan pembelajaran yang adaptif dengan zaman, ananda bukan hanya belajar, tapi memahami untuk apa ia belajar.',
            ctaText: 'Kenali Attaufiq',
            ctaHref: '/about',
        },
        {
            image: 'https://images.pexels.com/photos/8923564/pexels-photo-8923564.jpeg?auto=compress&cs=tinysrgb&w=1600',
            titleStart: 'Membangun Generasi Beradab & ',
            titleHighlight: "Hafiz Qur'an",
            titleEnd: '',
            desc: "Menyiapkan generasi penerus yang berilmu, berakhlak mulia, serta memiliki hafalan Al-Qur'an yang kuat untuk bekal masa depan yang cemerlang di tengah tantangan zaman modern.",
            ctaText: 'Pendaftaran PPDB',
            ctaHref: '#ppdb',
        },
    ];

    return (
        <section className="relative w-full h-[600px] md:h-[680px] lg:h-[720px] bg-[#001845] overflow-hidden group">

            <Swiper
                modules={[Autoplay, EffectFade, Navigation]}
                effect="fade"
                speed={1200}
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                loop={true}
                navigation={{
                    nextEl: '.hero-next-btn',
                    prevEl: '.hero-prev-btn',
                }}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full overflow-hidden">

                        {/* --- LAYER 0: GAMBAR SISWA & GRADASI --- */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={slide.image}
                                alt="Siswa Attaufiq"
                                className="w-full h-full object-cover object-right md:object-center"
                            />
                            {/* Gradasi mulus: navy solid sampai ~45%, lalu memudar memperlihatkan foto */}
                            <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#001845_0%,#001845_45%,rgba(0,24,69,0.9)_55%,rgba(0,24,69,0.4)_75%,transparent_90%)]"></div>
                        </div>

                        {/* --- LAYER 1: FRAME KUBAH DEKORATIF DENGAN MASKING --- */}
                        <div className="absolute top-0 left-[-70px] md:left-[-150px] lg:left-[-190px] h-full w-[80%] md:w-[48%] lg:w-[40%] z-10 pointer-events-none">
                            <img
                                src="/images/hero/frame-left.png"
                                alt="Frame Kubah"
                                /* MASKING: Bagian hitam (solid) di kiri sampai 70%, lalu pudar jadi transparan di ujung kanan 100% */
                                className="w-full h-full object-cover object-right [mask-image:linear-gradient(to_right,black_70%,transparent_100%)]"
                            />
                        </div>

                        {/* --- LAYER 2: KONTEN TEKS --- */}
                        <div className="absolute inset-0 z-20 mx-auto flex max-w-7xl flex-col justify-center px-6 md:pl-28 lg:pl-36 pointer-events-none slide-anim-content">

                            <div className="max-w-md md:pr-6 pointer-events-auto">

                                <h1 className="text-3xl font-bold leading-[1.2] text-white sm:text-4xl md:text-[2.5rem] lg:text-[2.75rem] drop-shadow-md">
                                    <span>{slide.titleStart}</span>
                                    <span className="underline decoration-[#FDD000] decoration-[4px] underline-offset-[5px]">
                                        {slide.titleHighlight}
                                    </span>
                                    <span>{slide.titleEnd}</span>
                                </h1>

                                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/90 md:text-base drop-shadow">
                                    {slide.desc}
                                </p>

                                <div className="mt-10">
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

            {/* --- LAYER 3: DAUN (FOREGROUND) --- */}
            <div className="absolute bottom-0 right-[10%] md:right-[30%] z-30 pointer-events-none w-48 md:w-72 opacity-90 translate-y-4">
                <img
                    src="/images/hero/front-leaves.png"
                    alt="Leaves"
                    className="w-full h-auto filter blur-[2px]"
                />
            </div>

            {/* --- LAYER 4: TOMBOL MATAHARI --- */}
            <button className="hero-prev-btn absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 group flex items-center justify-center cursor-pointer outline-none hover:scale-110 transition-transform duration-300 drop-shadow-xl">
                <svg className="absolute inset-0 w-full h-full text-[#FFC72C] group-hover:text-[#F3E5AB] transition-colors duration-300 animate-[spin_10s_linear_infinite]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L14.39 5.26L18.5 5.5L18.76 9.61L22 12L18.76 14.39L18.5 18.5L14.39 18.74L12 22L9.61 18.74L5.5 18.5L5.24 14.39L2 12L5.24 9.61L5.5 5.5L9.61 5.26L12 2Z" />
                </svg>
                <svg className="relative z-10 w-5 h-5 text-[#031B4E] pr-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button className="hero-next-btn absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 group flex items-center justify-center cursor-pointer outline-none hover:scale-110 transition-transform duration-300 drop-shadow-xl">
                <svg className="absolute inset-0 w-full h-full text-[#FFC72C] group-hover:text-[#F3E5AB] transition-colors duration-300 animate-[spin_10s_linear_infinite_reverse]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L14.39 5.26L18.5 5.5L18.76 9.61L22 12L18.76 14.39L18.5 18.5L14.39 18.74L12 22L9.61 18.74L5.5 18.5L5.24 14.39L2 12L5.24 9.61L5.5 5.5L9.61 5.26L12 2Z" />
                </svg>
                <svg className="relative z-10 w-5 h-5 text-[#031B4E] pl-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>

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