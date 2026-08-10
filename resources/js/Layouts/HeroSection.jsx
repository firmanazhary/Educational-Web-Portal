import React from 'react';

export default function HeroSection({
    title = "Judul Halaman",
    subtitle = "Deskripsi singkat halaman di sini.",
    tagline = "SEKOLAH ISLAM ATTAUFIQ",
    patternImage = "/images/hero/frame-left.png",
    mosqueImage = "/images/hero/building-attaufiq.png",
    heroRef,
    heroInView = true
}) {
    return (
        <section ref={heroRef} className="relative w-full overflow-hidden bg-[#07327F] text-white min-h-[460px] md:min-h-[520px] flex items-center justify-center">
            
            {/* 1. FOTO BACKGROUND KANAN */}
            <div className="absolute top-0 right-0 w-full md:w-3/5 h-full z-0">
                <img
                    src={mosqueImage}
                    alt={title}
                    className="w-full h-full object-cover object-center opacity-90"
                />
                {/* Overlay Gradient Halus */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#07327F] via-[#07327F]/70 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#07327F] via-transparent to-[#07327F]/30"></div>
            </div>

            {/* 2. ISLAMIC ARCH FRAME KIRI */}
            <div className="absolute top-0 left-0 h-full w-full md:w-7/12 z-10 pointer-events-none overflow-hidden">
                <img
                    src={patternImage}
                    alt="Islamic Arch Frame"
                    className="h-full w-full object-cover object-left [mask-image:linear-gradient(to_right,black_75%,transparent_100%)]"
                />
            </div>

            {/* 3. KONTEN TEKS HERO */}
            <div className={`relative z-20 container mx-auto px-6 py-16 text-center flex flex-col items-center justify-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                
                {/* Tagline Badge */}
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-[#D4AF37] text-xs">◆</span>
                    <p className="text-[#F3E5AB] font-bold text-xs md:text-sm tracking-[0.25em] uppercase drop-shadow">
                        {tagline}
                    </p>
                    <span className="text-[#D4AF37] text-xs">◆</span>
                </div>

                {/* Ornament Ornamen Matahari */}
                <div className="text-[#D4AF37] text-lg md:text-xl my-1 animate-pulse">☀️</div>

                {/* Title Utama */}
                <h1 className="font-serif text-4xl md:text-6xl font-normal text-white tracking-tight leading-tight my-2 max-w-3xl drop-shadow-md">
                    {title}
                </h1>

                {/* Divider Line */}
                <div className="flex items-center space-x-2 my-2">
                    <div className="w-8 h-[1px] bg-[#D4AF37]/50"></div>
                    <span className="text-[#D4AF37] text-xs">☀️</span>
                    <div className="w-8 h-[1px] bg-[#D4AF37]/50"></div>
                </div>

                {/* Subtitle */}
                <p className="text-blue-100 text-sm md:text-base font-light max-w-lg leading-relaxed mt-1 drop-shadow">
                    {subtitle}
                </p>
            </div>

            {/* 4. DOUBLE CURVED GOLDEN ORGANIC WAVE (SVG 100% PRESISI MOCKUP) */}
            <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none translate-y-[1px]">
                <svg
                    viewBox="0 0 1440 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto block"
                    preserveAspectRatio="none"
                >
                    {/* Layer 1: Border Line Emas (#D4AF37) */}
                    <path
                        d="M0,40 C320,130 640,-10 960,80 C1160,120 1320,50 1440,30 L1440,140 L0,140 Z"
                        fill="#D4AF37"
                    />
                    {/* Layer 2: Canvas Background Warm Sand (#FAF4EB) */}
                    <path
                        d="M0,46 C320,134 640,-4 960,84 C1160,124 1320,54 1440,34 L1440,140 L0,140 Z"
                        fill="#FAF4EB"
                    />
                </svg>
            </div>

        </section>
    );
}