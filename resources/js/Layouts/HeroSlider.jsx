// resources/js/Components/HeroSlider.jsx

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
            type: 'image',
            src: 'https://images.pexels.com/photos/247671/pexels-photo-247671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
            title: 'Generasi Qurani & Berprestasi',
            desc: 'Membentuk ananda menjadi pribadi yang cerdas, berakhlak mulia, dan siap menghadapi tantangan zaman di At-Taufiq Jambi.'
        },
        {
            type: 'image',
            src: 'https://images.pexels.com/photos/459301/pexels-photo-459301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Pendidikan Karakter Islami',
            desc: 'Lingkungan belajar yang kondusif untuk menanamkan nilai-nilai keislaman sejak dini melalui program unggulan kami.'
        },
        {
            type: 'image',
            src: 'https://images.pexels.com/photos/219998/pexels-photo-219998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Modern & Inovatif',
            desc: 'Memadukan kurikulum nasional dengan nilai-nilai Islam serta fasilitas teknologi yang mendukung kreativitas santri.'
        },
    ];

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black group">
            
            <Swiper
                modules={[Autoplay, EffectFade, Pagination, Navigation]}
                effect="fade"
                speed={1500} 
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative overflow-hidden w-full h-full">
                        
                        {/* --- BACKGROUND WITH KEN BURNS EFFECT --- */}
                        <div className="absolute inset-0 transform animate-ken-burns">
                            <img src={slide.src} className="h-full w-full object-cover opacity-60" alt={slide.title} />
                        </div>

                        {/* --- KONTEN TEKS (RATA KIRI) --- */}
                        <div className="absolute inset-0 flex flex-col justify-end items-start pb-32 px-10 md:px-24 z-10 text-left">
                            <div className="max-w-4xl space-y-6 slide-content-anim">
                                
                                <div className="h-1.5 w-24 bg-[#FF6600]"></div>
                                
                                <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter text-white text-shadow-xl uppercase">
                                    {slide.title}
                                </h1>
                                
                                <p className="text-xl md:text-2xl text-white font-light max-w-2xl leading-relaxed text-shadow-md">
                                    {slide.desc}
                                </p>
                                
                                <div className="flex pt-6">
                                    <button className="text-white text-sm font-bold uppercase tracking-[0.3em] group flex items-center hover:text-[#FF6600] transition duration-300">
                                        Selengkapnya 
                                        <span className="ml-4 text-2xl group-hover:ml-8 transition-all">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* --- LOGO AT-TAUFIQ JAMBI (Kiri Atas) --- */}
                        <div className="absolute top-10 left-10 z-40 flex items-center space-x-4">
                             <div className="text-3xl font-black text-white tracking-tighter italic">
                                AT-TAUFIQ<span className="text-[#FF6600]">.</span>
                             </div>
                             <div className="text-[10px] text-white/70 leading-tight uppercase tracking-[0.2em] font-bold border-l border-white/30 pl-4 py-1">
                                Sekolah Islam Terpadu<br/>Kota Jambi
                             </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* --- CUSTOM ARROW BUTTONS --- */}
            <button className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#FF6600] backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </button>
            <button className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#FF6600] backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0 7.5 7.5M21 12H3" />
                </svg>
            </button>

            <style jsx global>{`
                .swiper-pagination-bullet { background: white !important; opacity: 0.4; }
                .swiper-pagination-bullet-active { background: #FF6600 !important; opacity: 1; transform: scale(1.3); }
                
                .slide-content-anim { opacity: 0; }

                .swiper-slide-active .slide-content-anim {
                    animation: fadeUpAtTaufiq 1.4s ease-out forwards;
                    animation-delay: 0.3s;
                }

                @keyframes fadeUpAtTaufiq {
                    0% { opacity: 0; transform: translateY(50px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                .text-shadow-xl { text-shadow: 0 4px 10px rgba(0,0,0,0.6); }
                .text-shadow-md { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
            `}</style>
        </section>
    );
}