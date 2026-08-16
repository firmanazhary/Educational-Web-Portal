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
        /* Ubah tinggi di sini menjadi min-h-screen atau h-screen */
        <section 
            ref={heroRef} 
            className="relative w-full overflow-hidden bg-[#07327F] text-white min-h-screen flex flex-col justify-center items-center"
        >
            {/* 1. FOTO BACKGROUND KANAN */}
            <div className="absolute top-0 right-0 w-full md:w-3/5 h-full z-0">
                <img
                    src={mosqueImage}
                    alt={title}
                    className="w-full h-full object-cover object-center opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07327F] via-[#07327F]/75 to-transparent"></div>
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

            {/* 3. KONTEN TEKS HERO (Ditambahkan padding bawah agar tidak tertutup gelombang) */}
            <div className={`relative z-20 container mx-auto px-6 py-20 pb-32 text-center flex flex-col items-center justify-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                
                {/* Tagline Badge */}
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-[#FFC72C] text-xs">✦</span>
                    <p className="text-[#FFC72C] font-bold text-xs md:text-sm tracking-[0.25em] uppercase drop-shadow">
                        {tagline}
                    </p>
                    <span className="text-[#FFC72C] text-xs">✦</span>
                </div>

                {/* Sun Icon */}
                <div className="text-[#FFC72C] text-sm md:text-base my-1">
                    <svg className="w-5 h-5 mx-auto fill-current" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>

                {/* Title Utama */}
                <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-normal text-white tracking-tight leading-tight my-2 max-w-4xl drop-shadow-md">
                    {title}
                </h1>

                {/* Divider Line */}
                <div className="flex items-center space-x-2 my-2 opacity-80">
                    <div className="w-10 h-[1px] bg-[#D4AF37]"></div>
                    <span className="text-[#FFC72C] text-xs">☀️</span>
                    <div className="w-10 h-[1px] bg-[#D4AF37]"></div>
                </div>

                {/* Subtitle */}
                <p className="text-blue-100 text-sm md:text-lg font-light max-w-xl leading-relaxed mt-2 drop-shadow">
                    {subtitle}
                </p>
            </div>

            {/* 4. GELOMBANG SVG BAWAH */}
            <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none translate-y-[1px]">
                <svg
                    viewBox="0 0 1440 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-20 sm:h-28 md:h-36 block"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,60 C240,140 480,150 720,70 C940,-5 1200,-10 1440,55 L1440,160 L0,160 Z"
                        fill="#D4AF37"
                    />
                    <path
                        d="M0,66 C240,146 480,156 720,76 C940,1 1200,-4 1440,61 L1440,160 L0,160 Z"
                        fill="#FAF4EB"
                    />
                </svg>
            </div>

        </section>
    );
}