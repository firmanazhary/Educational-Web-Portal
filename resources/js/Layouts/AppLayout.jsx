import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Info, 
    UserPlus, 
    MessageCircleQuestion, 
    MapPin, 
    ChevronDown, 
    Mail, 
    Phone, 
    Sparkles, 
    MessageSquare, 
    ArrowRight,
    Menu,
    X
} from 'lucide-react';

/* ==========================================================================
   CONFIG & ASSETS
   ========================================================================== */
const ASSETS = {
    LOGO: '/images/logo/logo.png',
    MOSQUE_FOOTER: '/images/hero/building-attaufiq.png',
};

export default function AppLayout({ children, title }) {
    const page = usePage();
    const url = page?.url || '';

    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

    // Scroll listener navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Kunci scroll body saat mobile menu dibuka
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { 
            name: 'About Us', 
            href: '/about',
            children: [
                { name: 'Sejarah', href: '/sejarah', desc: 'Rekam jejak & perjalanan sekolah' },
                { name: 'FAQ', href: '/faq', desc: 'Pertanyaan yang sering ditanyakan' },
                { name: 'Kontak Us', href: '/contact', desc: 'Hubungi kami & lokasi kampus' },
            ]
        },
        { name: 'Jenjang', href: '/academics' },
        { name: 'Admission', href: '/admission' },
        { name: 'Events', href: '/events' },
        { name: 'Programs', href: '/programs' },
        { name: 'Blog', href: '/blog' },
    ];

    return (
        <div className="min-h-screen bg-[#FAF4EB] font-sans text-slate-800 relative antialiased flex flex-col justify-between overflow-x-hidden">
            <Head title={title ? `${title} - SIT At-Taufiq Jambi` : 'SIT At-Taufiq Jambi - Sekolah Islam Terpadu'} />

            {/* ==========================================================================
                1. NAVBAR (DESKTOP & MOBILE HEADER BAR)
                ========================================================================== */}
            <header 
                className={`fixed w-full top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
                    scrolled 
                        ? 'bg-[#051736]/90 backdrop-blur-lg border-[#D4AF37]/30 shadow-2xl py-2.5' 
                        : 'bg-[#07327F]/85 backdrop-blur-md border-white/10 py-3.5'
                }`}
            >
                <nav className="container mx-auto px-4 sm:px-6 flex justify-between items-center max-w-7xl relative">
                    
                    {/* Logo & Brand Title */}
                    <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group z-10">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-md border border-[#D4AF37] flex-shrink-0">
                            <img 
                                src={ASSETS.LOGO} 
                                alt="At-Taufiq Logo" 
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                        <span className="font-serif font-extrabold text-xl sm:text-2xl text-white tracking-wide group-hover:text-[#F3E5AB] transition">
                            Attaufiq
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex space-x-7 text-xs font-medium tracking-wide items-center z-10">
                        {navLinks.map((link) => {
                            const isActive = url === link.href || (link.href !== '/' && url.startsWith(link.href));
                            const hasChildren = link.children && link.children.length > 0;

                            return (
                                <div 
                                    key={link.name}
                                    className="relative group py-2"
                                    onMouseEnter={() => hasChildren && setOpenDropdown(link.name)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link 
                                        href={link.href} 
                                        className={`flex items-center space-x-1.5 transition py-1 ${
                                            isActive 
                                                ? 'text-white font-bold' 
                                                : 'text-blue-100/90 hover:text-white'
                                        }`}
                                    >
                                        <span>{link.name}</span>
                                        {hasChildren && (
                                            <ChevronDown size={12} className="text-[#D4AF37] group-hover:rotate-180 transition-transform duration-200" />
                                        )}
                                    </Link>

                                    {/* Active Link Marker */}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                                            <svg viewBox="0 0 50 8" fill="none" className="w-full h-auto text-[#FFC72C]">
                                                <path d="M2 5 C 15 1, 35 7, 48 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Dropdown Menu Card */}
                                    {hasChildren && (
                                        <div 
                                            className={`absolute left-0 top-full pt-3 w-60 transition-all duration-300 transform ${
                                                openDropdown === link.name 
                                                    ? 'opacity-100 visible translate-y-0' 
                                                    : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                                            }`}
                                        >
                                            <div className="bg-white rounded-2xl shadow-2xl border border-[#E8DFC8] p-2 relative">
                                                <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white rotate-45 border-t border-l border-[#E8DFC8]"></div>
                                                <div className="divide-y divide-slate-100 relative z-10">
                                                    {link.children.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="group/sub block p-2.5 rounded-xl hover:bg-[#FAF8F5] transition duration-200"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-slate-800 group-hover/sub:text-[#07327F] font-bold text-xs capitalize">
                                                                    {subItem.name}
                                                                </span>
                                                                <ArrowRight size={12} className="text-[#D4AF37] opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-1 transition-all" />
                                                            </div>
                                                            {subItem.desc && (
                                                                <p className="text-[10px] text-slate-400 font-light mt-0.5 leading-tight">
                                                                    {subItem.desc}
                                                                </p>
                                                            )}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop Right CTA */}
                    <div className="hidden lg:flex items-center z-10">
                        <Link 
                            href="/admission" 
                            className="bg-[#FFC72C] hover:bg-[#ffd34d] text-[#051736] px-5 py-2.5 rounded-full text-xs font-bold transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-1.5"
                        >
                            <span>Kenali Attaufiq</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition focus:outline-none"
                        aria-label="Toggle Mobile Menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                </nav>
            </header>

            {/* ==========================================================================
                2. MOBILE DRAWER OVERLAY (DI LUAR HEADER AGAR TIDAK TERJEPIT)
                ========================================================================== */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-[#051736]/75 backdrop-blur-sm transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="relative w-4/5 max-w-xs h-full bg-[#051736] border-l border-[#D4AF37]/30 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10">
                        <div className="space-y-6">
                            
                            {/* Header Drawer */}
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 border border-[#D4AF37]">
                                        <img src={ASSETS.LOGO} alt="Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <span className="font-serif font-bold text-white text-lg">Menu Utama</span>
                                </div>
                                <button 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-1.5 text-white/80 hover:text-white rounded-lg bg-white/5"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Nav Items */}
                            <div className="space-y-1.5">
                                {navLinks.map((link) => {
                                    const isActive = url === link.href || (link.href !== '/' && url.startsWith(link.href));
                                    const hasChildren = link.children && link.children.length > 0;

                                    if (hasChildren) {
                                        return (
                                            <div key={link.name} className="py-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                                                        isActive ? 'bg-white/10 text-[#FFC72C]' : 'text-white hover:bg-white/5'
                                                    }`}
                                                >
                                                    <span>{link.name}</span>
                                                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180 text-[#FFC72C]' : 'text-slate-400'}`} />
                                                </button>

                                                {mobileDropdownOpen && (
                                                    <div className="pl-3 pr-2 py-2 space-y-1 bg-black/30 rounded-xl mt-1 border border-white/5">
                                                        {link.children.map((sub) => (
                                                            <Link
                                                                key={sub.name}
                                                                href={sub.href}
                                                                onClick={() => setMobileMenuOpen(false)}
                                                                className="block px-3 py-2 rounded-lg text-xs text-blue-100/90 hover:text-white hover:bg-white/5 transition"
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                                                isActive 
                                                    ? 'bg-[#FFC72C] text-[#051736] font-bold shadow-md' 
                                                    : 'text-white hover:bg-white/5'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Drawer Bottom CTA */}
                        <div className="pt-6 border-t border-white/10">
                            <Link 
                                href="/admission" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full bg-[#FFC72C] text-[#051736] py-3 rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center space-x-2"
                            >
                                <span>Kenali Attaufiq</span>
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* ==========================================================================
                3. MAIN CONTENT
                ========================================================================== */}
            <main className="relative z-10 flex-grow">{children}</main>

            {/* ==========================================================================
                4. FLOATING DIAMOND BUTTONS (RESPONSIF MOBILE & DESKTOP)
                ========================================================================== */}
            <div className="fixed right-3 sm:right-6 bottom-4 sm:bottom-8 z-30 group flex items-center justify-center pointer-events-auto">
                <div className="grid grid-cols-2 gap-1 rotate-45 transform scale-75 sm:scale-90 hover:scale-95 sm:hover:scale-100 transition duration-500 ease-out cursor-pointer shadow-2xl rounded-2xl p-1 bg-[#051736]/70 backdrop-blur-md border border-[#D4AF37]/50">

                    <Link 
                        href="/faq" 
                        className="w-11 h-11 sm:w-13 sm:h-13 bg-[#FFC72C] rounded-xl flex items-center justify-center shadow-md hover:-translate-x-1 hover:-translate-y-1 transition duration-300"
                        title="Informasi & FAQ"
                    >
                        <div className="-rotate-45 flex flex-col items-center text-[#051736]">
                            <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                            <span className="font-black text-[8px] sm:text-[9px] uppercase leading-none mt-0.5">INFO</span>
                        </div>
                    </Link>

                    <Link 
                        href="/admission" 
                        className="w-11 h-11 sm:w-13 sm:h-13 bg-[#008144] rounded-xl flex items-center justify-center shadow-md hover:translate-x-1 hover:-translate-y-1 transition duration-300 relative"
                        title="Pendaftaran Siswa Baru"
                    >
                        <div className="-rotate-45 flex flex-col items-center text-white">
                            <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                            <span className="font-black text-[8px] sm:text-[9px] uppercase tracking-wider leading-none mt-0.5">DAFTAR</span>
                        </div>
                    </Link>

                    <a 
                        href="https://wa.me/6285268797915" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-11 h-11 sm:w-13 sm:h-13 bg-[#07327F] rounded-xl flex items-center justify-center shadow-md hover:-translate-x-1 hover:translate-y-1 transition duration-300 border border-[#D4AF37]/40"
                        title="Konsultasi WhatsApp"
                    >
                        <div className="-rotate-45 flex flex-col items-center text-white">
                            <MessageCircleQuestion className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                            <span className="font-black text-[8px] sm:text-[9px] uppercase tracking-wider leading-none mt-0.5">TANYA</span>
                        </div>
                    </a>

                    <a 
                        href="#footer-location" 
                        className="w-11 h-11 sm:w-13 sm:h-13 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-md hover:translate-x-1 hover:translate-y-1 transition duration-300"
                        title="Lihat Alamat & Lokasi"
                    >
                        <div className="-rotate-45 flex flex-col items-center text-[#051736]">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                            <span className="font-black text-[8px] sm:text-[9px] uppercase tracking-wider leading-none mt-0.5">LOKASI</span>
                        </div>
                    </a>

                </div>
            </div>

            {/* ==========================================================================
                5. FOOTER SECTION
                ========================================================================== */}
            <footer id="footer-location" className="relative bg-[#FAF4EB] text-white pt-10 overflow-hidden font-sans">
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="relative bg-[#003B99] rounded-t-[40px] sm:rounded-t-[60px] md:rounded-t-[80px] border-t-2 border-x-2 border-[#D4AF37] p-6 sm:p-8 md:p-12 overflow-hidden shadow-2xl">
                        
                        {/* Background Mosque Silhouette Pattern */}
                        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
                            <img 
                                src={ASSETS.MOSQUE_FOOTER} 
                                alt="Mosque Pattern Background" 
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#003B99] via-[#003B99]/90 to-[#003B99]"></div>
                        </div>

                        {/* Top Decorative Sparkle */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[#FFC72C] z-10">
                            <Sparkles size={18} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 relative z-10 items-start pt-6">
                            
                            {/* COL 1: Logo & Vision */}
                            <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-4 border-b lg:border-b-0 lg:border-r border-blue-400/30 pb-6 lg:pb-0">
                                <div className="p-5 rounded-[28px] border border-[#D4AF37]/50 bg-white/5 backdrop-blur-sm space-y-3 relative overflow-hidden">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1.5 shadow-md flex-shrink-0">
                                            <img 
                                                src={ASSETS.LOGO} 
                                                alt="At-Taufiq Logo" 
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[9px] tracking-[0.2em] uppercase text-blue-200 font-bold">SEKOLAH ISLAM</p>
                                            <h3 className="font-serif text-2xl font-bold text-white leading-none">Attaufiq</h3>
                                            <p className="text-[8px] tracking-widest text-blue-200 uppercase mt-0.5">PG - TK - SD - SMP - SMA</p>
                                        </div>
                                    </div>

                                    <p className="text-[#FFC72C] font-serif italic text-sm md:text-base font-normal pt-1">
                                        Memberi Arti itu ATTAUFIQ
                                    </p>

                                    <p className="text-blue-100/90 text-xs font-light leading-relaxed">
                                        Membina generasi beradab dengan pendidikan Islam yang menyeluruh, menggabungkan ilmu, karakter, dan spiritualitas untuk masa depan yang penuh keberkahan.
                                    </p>
                                </div>
                            </div>

                            {/* COL 2: Campus Locations */}
                            <div className="lg:col-span-3 space-y-5 lg:border-r border-blue-400/30 pr-0 lg:pr-4 border-b lg:border-b-0 pb-6 lg:pb-0">
                                <div className="space-y-1.5">
                                    <div className="flex items-center space-x-2 text-white">
                                        <MapPin size={16} className="text-[#FFC72C]" />
                                        <h4 className="font-bold text-xs md:text-sm">Alamat PG-TK & SD</h4>
                                    </div>
                                    <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent my-1"></div>
                                    <p className="text-blue-100/80 text-xs font-light leading-relaxed pl-6">
                                        Jl. Letkol M. Insya No.2, Rajawali, Kec. Jambi Tim., Kota Jambi, Jambi 36143
                                    </p>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                    <div className="flex items-center space-x-2 text-white">
                                        <MapPin size={16} className="text-[#FFC72C]" />
                                        <h4 className="font-bold text-xs md:text-sm">Alamat SMP-SMA</h4>
                                    </div>
                                    <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent my-1"></div>
                                    <p className="text-blue-100/80 text-xs font-light leading-relaxed pl-6">
                                        Jl. Gn. Kidul No.11, Talang Banjar, Kec. Jambi Tim., Kota Jambi, Jambi 36142
                                    </p>
                                </div>
                            </div>

                            {/* COL 3: Contacts */}
                            <div className="lg:col-span-3 space-y-3 lg:border-r border-blue-400/30 pr-0 lg:pr-4 border-b lg:border-b-0 pb-6 lg:pb-0">
                                <div className="flex items-center space-x-2 text-white mb-1">
                                    <Phone size={16} className="text-[#FFC72C]" />
                                    <h4 className="font-bold text-xs md:text-sm">Kontak Kami</h4>
                                </div>
                                <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent mb-3"></div>

                                <a href="mailto:smpakislamattaufiq@gmail.com" className="flex items-center space-x-2.5 text-xs text-blue-100/90 hover:text-white transition py-1">
                                    <Mail size={14} className="text-[#FFC72C] flex-shrink-0" />
                                    <span className="truncate">smpakislamattaufiq@gmail.com</span>
                                </a>

                                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2.5 text-xs text-blue-100/90 hover:text-white transition py-1">
                                    <span className="text-[#FFC72C] font-bold text-xs">IG</span>
                                    <span>@attaufiqjambi</span>
                                </a>

                                <a href="https://wa.me/6285268797915" target="_blank" rel="noreferrer" className="flex items-center space-x-2.5 text-xs text-blue-100/90 hover:text-white transition py-1">
                                    <MessageSquare size={14} className="text-[#FFC72C] flex-shrink-0" />
                                    <span>+62 852-6879-7915 (PG-TK-SD)</span>
                                </a>

                                <a href="https://wa.me/6281927421650" target="_blank" rel="noreferrer" className="flex items-center space-x-2.5 text-xs text-blue-100/90 hover:text-white transition py-1">
                                    <MessageSquare size={14} className="text-[#FFC72C] flex-shrink-0" />
                                    <span>+62 819-2742-1650 (SMP-SMA)</span>
                                </a>
                            </div>

                            {/* COL 4: Social Media */}
                            <div className="lg:col-span-2 space-y-3">
                                <h4 className="font-bold text-xs md:text-sm text-white">Follow Us</h4>
                                <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent mb-4"></div>

                                <div className="flex items-center space-x-2.5">
                                    <a href="#" className="w-8 h-8 rounded-full border border-blue-300/40 hover:border-[#D4AF37] bg-white/10 hover:bg-[#FFC72C] text-white hover:text-[#051736] flex items-center justify-center transition shadow-sm" title="Facebook">
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>

                                    <a href="#" className="w-8 h-8 rounded-full border border-blue-300/40 hover:border-[#D4AF37] bg-white/10 hover:bg-[#FFC72C] text-white hover:text-[#051736] flex items-center justify-center transition shadow-sm" title="Instagram">
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </a>

                                    <a href="#" className="w-8 h-8 rounded-full border border-blue-300/40 hover:border-[#D4AF37] bg-white/10 hover:bg-[#FFC72C] text-white hover:text-[#051736] flex items-center justify-center transition shadow-sm" title="YouTube">
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="bg-[#FAF4EB] text-slate-700 py-6 text-center text-xs md:text-sm font-serif border-t border-[#E8DFC8] relative z-20">
                    <div className="container mx-auto px-6 flex items-center justify-center space-x-3">
                        <Sparkles size={12} className="text-[#D4AF37]" />
                        <p className="text-[#051736] font-bold">
                            Copyright © 2026 Memberi Arti Itu Attaufiq | Powered by Memberi Arti Itu Attaufiq
                        </p>
                        <Sparkles size={12} className="text-[#D4AF37]" />
                    </div>
                </div>

            </footer>
        </div>
    );
}