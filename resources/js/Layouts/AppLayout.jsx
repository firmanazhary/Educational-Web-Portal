import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children, title }) {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);

    // Deteksi scroll untuk efek glassmorphism navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Tentang Kami', href: '/about' },
        { name: 'Akademik', href: '/#academics' },
        { name: 'Berita', href: '/#blog' },
        { name: 'Galeri', href: '/#gallery' },
    ];

    return (
        <div className="min-h-screen bg-[#FAF8F5] font-sans text-slate-800 relative antialiased flex flex-col justify-between">
            <Head title={title ? `${title} - SIT At-Taufiq Jambi` : 'SIT At-Taufiq Jambi - Sekolah Islam Terpadu'} />

            {/* --- HEADER / NAVBAR (Tema Royal Navy & Gold) --- */}
            <header 
                className={`sticky top-0 z-50 transition-all duration-300 border-b border-[#D4AF37]/20 ${
                    scrolled 
                        ? 'bg-[#051C42]/95 backdrop-blur-md shadow-lg py-3' 
                        : 'bg-[#07327F] py-4'
                }`}
            >
                <nav className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
                    
                    {/* Logo At-Taufiq */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-md border border-[#D4AF37]">
                            <img 
                                src="/images/logo-attaufiq.png" 
                                alt="At-Taufiq Logo" 
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                        <div className="font-serif font-black text-2xl text-white tracking-wider uppercase group-hover:text-[#F3E5AB] transition">
                            AT-TAUFIQ<span className="text-[#D4AF37]">.</span>
                        </div>
                    </Link>

                    {/* Menu Navigasi (Tengah) */}
                    <div className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest">
                        {navLinks.map((link) => {
                            const isActive = url === link.href || (link.href !== '/' && url.startsWith(link.href));

                            return (
                                <Link 
                                    key={link.name} 
                                    href={link.href} 
                                    className={`relative transition py-1 ${
                                        isActive 
                                            ? 'text-white font-bold' 
                                            : 'text-blue-100/80 hover:text-[#F3E5AB]'
                                    }`}
                                >
                                    {link.name}

                                    {/* Aksen Underline Melengkung Emas jika Menu Aktif */}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-1 flex justify-center">
                                            <svg viewBox="0 0 40 6" fill="none" className="w-full h-auto text-[#D4AF37]">
                                                <path d="M1 3C10 0.5 30 5.5 39 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                            </svg>
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Tombol Aksi (Kanan) */}
                    <div className="flex items-center space-x-4">
                        <a 
                            href="#portal" 
                            className="text-xs font-bold uppercase tracking-widest text-blue-100 hover:text-[#F3E5AB] transition hidden sm:inline-block"
                        >
                            Portal Santri
                        </a>
                        
                        <a 
                            href="#ppdb" 
                            className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#051C42] px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-widest transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            PPDB Online
                        </a>
                    </div>

                </nav>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 flex-grow">{children}</main>

            {/* --- FLOATING DIAMOND BUTTONS (Aksen Warna Disesuaikan) --- */}
            <div className="fixed right-6 bottom-12 z-[100] group flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1 rotate-45 transform scale-90 hover:scale-100 transition duration-500 ease-out cursor-pointer shadow-2xl shadow-[#051C42]/50 rounded-2xl p-1 bg-[#07327F]/20 backdrop-blur-sm border border-[#D4AF37]/30">
                    
                    {/* Kotak KUNING - Info */}
                    <div className="w-14 h-14 bg-[#FFC72C] rounded-xl flex items-center justify-center shadow-md hover:-translate-x-1 hover:-translate-y-1 transition duration-300">
                        <div className="-rotate-45 text-[#051C42] font-bold text-[10px] uppercase">Info</div>
                    </div>

                    {/* Kotak HIJAU - Daftar */}
                    <div className="w-14 h-14 bg-[#008144] rounded-xl flex items-center justify-center shadow-md hover:translate-x-1 hover:-translate-y-1 transition duration-300 relative group/icon">
                        <div className="-rotate-45 text-white text-[10px] font-black uppercase tracking-widest">Daftar</div>
                        <span className="absolute -top-12 -right-4 bg-[#051C42] border border-[#D4AF37] text-white text-[10px] px-3 py-1.5 rounded-md opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-bold italic shadow-xl">Pendaftaran Santri Baru</span>
                    </div>

                    {/* Kotak BIRU - Tanya */}
                    <div className="w-14 h-14 bg-[#07327F] rounded-xl flex items-center justify-center shadow-md hover:-translate-x-1 hover:translate-y-1 transition duration-300 border border-[#D4AF37]/40">
                        <div className="-rotate-45 text-white text-[10px] font-black uppercase tracking-widest">Tanya</div>
                    </div>

                    {/* Kotak EMAS - Lokasi */}
                    <div className="w-14 h-14 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-md hover:translate-x-1 hover:translate-y-1 transition duration-300">
                        <div className="-rotate-45 text-[#051C42] text-[10px] font-black uppercase tracking-widest">Lokasi</div>
                    </div>
                </div>
                <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-700 -z-10"></div>
            </div>

            {/* --- FOOTER (Deep Navy & Islamic Gold Details) --- */}
        {/* --- FOOTER ISLAMI ELEGAN --- */}
<footer className="relative bg-[#FAF8F5] text-white pt-10 overflow-hidden font-sans">
    
    {/* CONTAINER BANNER UTAMA (ROYAL BLUE WITH GOLD DOME FRAME) */}
    <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        <div className="relative bg-[#0047BA] rounded-t-[50px] md:rounded-t-[80px] border-t-2 border-x-2 border-[#D4AF37] p-8 md:p-14 overflow-hidden shadow-2xl">
            
            {/* Background Foto Lorong Masjid Kiri & Lentera Kanan */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <img 
                    src="/images/hero/building-attaufiq.png" 
                    alt="Mosque Pattern Background" 
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#003B99] via-[#0047BA]/90 to-[#003B99]"></div>
            </div>

            {/* Pattern Bintang Ornamen Halus */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[#D4AF37] text-xl z-10">
                ☀️
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 relative z-10 items-start pt-4">
                
                {/* KOLOM 1: BRANDING & DESKRIPSI (Lg: 4/12) */}
                <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-4 border-b lg:border-b-0 lg:border-r border-blue-400/30 pb-8 lg:pb-0">
                    
                    {/* Logo Box */}
                    <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center p-2 shadow-md">
                            <img 
                                src="/images/logo-attaufiq.png" 
                                alt="At-Taufiq Logo" 
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/50";
                                }}
                            />
                        </div>
                        <div>
                            <p className="text-[10px] tracking-[0.2em] uppercase text-blue-200 font-semibold">SEKOLAH ISLAM</p>
                            <h3 className="font-serif text-2xl font-bold text-white leading-none">Attaufiq</h3>
                            <p className="text-[9px] tracking-widest text-blue-200 uppercase mt-0.5">PG-TK-SD-SMP-SMA</p>
                        </div>
                    </div>

                    {/* Tagline Emas */}
                    <p className="text-[#F3E5AB] font-serif italic text-sm md:text-base font-normal pt-1">
                        Memberi Arti itu ATTAUFIQ
                    </p>

                    {/* Deskripsi */}
                    <p className="text-blue-100/90 text-xs md:text-sm font-light leading-relaxed">
                        Membina generasi beradab dengan pendidikan Islam yang menyeluruh, menggabungkan ilmu, karakter, dan spiritualitas untuk masa depan yang penuh keberkahan.
                    </p>

                    <div className="flex justify-center md:justify-start pt-2">
                        <span className="text-[#D4AF37] text-xs">☀️ ──────────</span>
                    </div>
                </div>

                {/* KOLOM 2: ALAMAT KAMPUS (Lg: 3/12) */}
                <div className="lg:col-span-3 space-y-6 lg:border-r border-blue-400/30 pr-0 lg:pr-4">
                    
                    {/* Alamat PG-TK & SD */}
                    <div className="space-y-1.5">
                        <div className="flex items-center space-x-2 text-white">
                            <span className="text-[#D4AF37] text-base">📍</span>
                            <h4 className="font-semibold text-sm">Alamat PG-TK & SD</h4>
                        </div>
                        <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent my-1"></div>
                        <p className="text-blue-100/80 text-xs font-light leading-relaxed pl-6">
                            Jl. Letkol M. Insya No.2, Rajawali, Kec. Jambi Tim., Kota Jambi, Jambi 36143
                        </p>
                    </div>

                    {/* Alamat SMP-SMA */}
                    <div className="space-y-1.5 pt-2">
                        <div className="flex items-center space-x-2 text-white">
                            <span className="text-[#D4AF37] text-base">📍</span>
                            <h4 className="font-semibold text-sm">Alamat SMP-SMA</h4>
                        </div>
                        <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent my-1"></div>
                        <p className="text-blue-100/80 text-xs font-light leading-relaxed pl-6">
                            Jl. Gn. Kidul No.11, Talang Banjar, Kec. Jambi Tim., Kota Jambi, Jambi 36142
                        </p>
                    </div>

                </div>

                {/* KOLOM 3: KONTAK KAMI (Lg: 3/12) */}
                <div className="lg:col-span-3 space-y-3 lg:border-r border-blue-400/30 pr-0 lg:pr-4">
                    
                    <div className="flex items-center space-x-2 text-white mb-1">
                        <span className="text-[#D4AF37] text-base">📞</span>
                        <h4 className="font-semibold text-sm">Kontak Kami</h4>
                    </div>
                    <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent mb-3"></div>

                    {/* Email */}
                    <a href="mailto:smpakislamattaufiq@gmail.com" className="flex items-center space-x-3 text-xs text-blue-100/90 hover:text-white transition py-1">
                        <span className="text-[#D4AF37] text-sm">✉️</span>
                        <span>Email : smpakislamattaufiq@gmail.com</span>
                    </a>

                    {/* Instagram */}
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center space-x-3 text-xs text-blue-100/90 hover:text-white transition py-1">
                        <span className="text-[#D4AF37] text-sm">📸</span>
                        <span>@instagram</span>
                    </a>

                    {/* WA PG-TK-SD */}
                    <a href="https://wa.me/6285268797915" target="_blank" rel="noreferrer" className="flex items-center space-x-3 text-xs text-blue-100/90 hover:text-white transition py-1">
                        <span className="text-[#D4AF37] text-sm">💬</span>
                        <span>+62 852-6879-7915 (WA PG-TK-SD)</span>
                    </a>

                    {/* WA SMP-SMA */}
                    <a href="https://wa.me/6281927421650" target="_blank" rel="noreferrer" className="flex items-center space-x-3 text-xs text-blue-100/90 hover:text-white transition py-1">
                        <span className="text-[#D4AF37] text-sm">💬</span>
                        <span>+62 819-2742-1650 (WA SMP-SMA)</span>
                    </a>

                </div>

                {/* KOLOM 4: FOLLOW US (Lg: 2/12) */}
                <div className="lg:col-span-2 space-y-3">
                    
                    <h4 className="font-semibold text-sm text-white">Follow Us</h4>
                    <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent mb-4"></div>

                    {/* Circle Social Icons */}
                    <div className="flex items-center space-x-2.5">
                        <a href="#" className="w-9 h-9 rounded-full border border-blue-300/40 hover:border-[#D4AF37] bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#0047BA] flex items-center justify-center transition text-xs font-bold shadow-sm">
                            f
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full border border-blue-300/40 hover:border-[#D4AF37] bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#0047BA] flex items-center justify-center transition text-xs font-bold shadow-sm">
                            📷
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full border border-blue-300/40 hover:border-[#D4AF37] bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#0047BA] flex items-center justify-center transition text-xs font-bold shadow-sm">
                            ▶
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full border border-blue-300/40 hover:border-[#D4AF37] bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#0047BA] flex items-center justify-center transition text-xs font-bold shadow-sm">
                            ♪
                        </a>
                    </div>

                </div>

            </div>

        </div>

    </div>

    {/* BOTTOM COPYRIGHT BAR (OFF-WHITE BACKGROUND WITH ORNAMENT) */}
    <div className="bg-[#FAF8F5] text-slate-700 py-6 text-center text-xs md:text-sm font-serif border-t border-[#E8DFC8] relative z-20">
        <div className="container mx-auto px-6 flex items-center justify-center space-x-3">
            <span className="text-[#D4AF37] text-xs">─── ◆</span>
            <p className="text-[#003366] font-medium">
                Copyright © 2026 Memberi Arti Itu Attaufiq | Powered by Memberi Arti Itu Attaufiq
            </p>
            <span className="text-[#D4AF37] text-xs">◆ ───</span>
        </div>
    </div>

</footer>
        </div>
    );
}