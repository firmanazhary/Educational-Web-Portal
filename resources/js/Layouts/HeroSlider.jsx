// resources/js/Components/HeroSlider.jsx Perbaikan Total

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';

// IMPORT WAJIB (Pastikan terinstall)
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HeroSlider() {
    const slides = [
        {
            type: 'image',
            src: 'https://images.pexels.com/photos/247671/pexels-photo-247671.jpeg?_gl=1*rd9esi*_ga*MTg0OTQ5Nzc0OC4xNzc0MzUyODYx*_ga_8JE65Q40S6*czE3NzQzNTI4NjEkbzEkZzEkdDE3NzQzNTM1MDgkajU4JGwwJGgw', 
            title: 'Best for the World',
            desc: 'We learn in Indonesia to be Best for the World. Find out how you can join the JIS community today!'
        },
        {
            type: 'image',
            src: 'https://images.pexels.com/photos/459301/pexels-photo-459301.jpeg?_gl=1*1x0rzql*_ga*MTg0OTQ5Nzc0OC4xNzc0MzUyODYx*_ga_8JE65Q40S6*czE3NzQzNTI4NjEkbzEkZzAkdDE3NzQzNTI4NjEkajYwJGwwJGgw',
            title: 'Intercultural Excellence',
            desc: 'A vibrant community of lifelong learners, leaders, and best for the world.'
        },
             {
            type: 'image',
            src: 'https://images.pexels.com/photos/219998/pexels-photo-219998.jpeg?_gl=1*1h2nq4b*_ga*MTg0OTQ5Nzc0OC4xNzc0MzUyODYx*_ga_8JE65Q40S6*czE3NzQzNTI4NjEkbzEkZzEkdDE3NzQzNTM0MzgkajQ2JGwwJGgw',
            title: 'Intercultural ',
            desc: 'A vibrant community of lifelong learners, leaders, and best for the world.'
        },
    ];

    return (
        // Container utama H-SCREEN agar full satu layar
        <section className="relative h-screen w-full overflow-hidden bg-black group">
            
            <Swiper
                modules={[Autoplay, EffectFade, Pagination, Navigation]}
                effect="fade" // Wajib Fade agar gak numpuk pas transisi
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
                    <SwiperSlide key={index} className="relative overflow-hidden w-full h-full swiper-slide-custom">
                        
                        {/* --- BACKGROUND WITH KEN BURNS EFFECT (Matiin kalau ganggu teks) --- */}
                        <div className="absolute inset-0 transform animate-ken-burns">
                            {slide.type === 'video' ? (
                                <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-60">
                                    <source src={slide.src} type="video/mp4" />
                                </video>
                            ) : (
                                <img src={slide.src} className="h-full w-full object-cover opacity-60" alt={slide.title} />
                            )}
                        </div>

                        {/* --- KONTEN TEKS: INI KUNCINYA AGAR RATA KIRI & GAK NABRAK --- 
                            Pakai 'items-start' untuk align left (bukan items-center)
                            Pakai 'justify-end' & 'pb-32' untuk naruh di kiri bawah.
                        */}
                        <div className="absolute inset-0 flex flex-col justify-end items-start pb-32 px-10 md:px-24 z-10 text-left">
                            <div className="max-w-4xl space-y-6 slide-content-anim">
                                
                                {/* Garis Aksen Orange */}
                                <div className="h-1.5 w-24 bg-[#FF6600]"></div>
                                
                                {/* Judul Besar (Rata Kiri, tracking tighter biar premium) */}
                                <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter text-white text-shadow-xl">
                                    {slide.title}
                                </h1>
                                
                                {/* Deskripsi (Maksimal lebar agar gak full satu layar) */}
                                <p className="text-xl md:text-2xl text-white font-light max-w-2xl leading-relaxed text-shadow-md">
                                    {slide.desc}
                                </p>
                                
                                {/* Tombol Learn More */}
                                <div className="flex pt-6">
                                    <button className="text-white text-sm font-bold uppercase tracking-[0.3em] group flex items-center hover:text-[#FF6600] transition transition-all duration-300">
                                        Learn More 
                                        <span className="ml-4 text-2xl group-hover:ml-8 transition-all duration-300">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* --- LOGO JIS FLOATING (Kiri Atas) --- */}
                        <div className="absolute top-10 left-10 z-40 flex items-center space-x-4">
                             <div className="text-4xl font-black text-white">JIS<span className="text-[#FF6600]">.</span></div>
                             <div className="text-[10px] text-white/70 leading-tight uppercase tracking-[0.2em] font-bold border-l border-white/30 pl-4 py-1">
                                Jakarta<br/>Intercultural<br/>School
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

            {/* --- STYLE UNTUK ANIMASI & PAGINATION (Wajib!) --- */}
            <style jsx global>{`
                /* Pagination Dot Orange */
                .swiper-pagination-bullet { background: white !important; opacity: 0.4; height: 10px; width: 10px; }
                .swiper-pagination-bullet-active { background: #FF6600 !important; opacity: 1; transform: scale(1.3); }
                
                /* Trik CSS: Sembunyikan konten secara default */
                .slide-content-anim {
                    opacity: 0;
                }

                /* Tampilkan dan animasikan konten HANYA pada slide aktif */
                .swiper-slide-active .slide-content-anim {
                    animation: fadeUpJis 1.4s ease-out forwards;
                    animation-delay: 0.3s; /* Sedikit delay biar background muncul duluan */
                }

                @keyframes fadeUpJis {
                    0% { opacity: 0; transform: translateY(50px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                /* Tambahan text-shadow agar teks terbaca di background terang */
                .text-shadow-xl {
                    text-shadow: 0 4px 10px rgba(0,0,0,0.5);
                }
                .text-shadow-md {
                    text-shadow: 0 2px 4px rgba(0,0,0,0.4);
                }
            `}</style>
        </section>
    );
}