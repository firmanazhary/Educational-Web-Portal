// resources/js/Layouts/JisLayout.jsx (atau AppLayout.jsx)

import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function AppLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 relative antialiased">
            <Head title={title ? `${title} - SIT At-Taufiq Jambi` : 'SIT At-Taufiq Jambi - Sekolah Islam Terpadu'} />

            {/* --- HEADER / NAVBAR --- */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo At-Taufiq */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-3xl font-black text-[#003366] tracking-tighter italic uppercase">
                            AT-TAUFIQ<span className="text-[#FF6600]">.</span>
                        </div>
                    </Link>

                    {/* Menu Navigasi (Tengah) */}
                    <div className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest text-[#003366]/90">
                        <Link href="/" className="hover:text-[#FF6600] transition">Beranda</Link>
                        <a href="#about" className="hover:text-[#FF6600] transition">Tentang Kami</a>
                        <a href="#academics" className="hover:text-[#FF6600] transition">Akademik</a>
                        <a href="#blog" className="hover:text-[#FF6600] transition">Berita</a>
                        <a href="#gallery" className="hover:text-[#FF6600] transition">Galeri</a>
                    </div>

                    {/* Tombol Aksi (Kanan) */}
                    <div className="flex items-center space-x-4">
                        <button className="text-xs font-bold uppercase tracking-widest text-[#003366] hover:text-[#FF6600]">
                            Portal Santri
                        </button>
                        <button className="bg-[#003366] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FF6600] transition duration-300 shadow-sm">
                            PPDB Online
                        </button>
                    </div>
                </nav>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10">{children}</main>

            {/* --- FLOATING DIAMOND BUTTONS --- */}
            <div className="fixed right-6 bottom-12 z-[100] group flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1 rotate-45 transform scale-90 hover:scale-100 transition duration-500 ease-out cursor-pointer shadow-2xl shadow-[#003366]/30 rounded-2xl p-1">
                    
                    {/* Kotak KUNING - Info */}
                    <div className="w-14 h-14 bg-[#FFC72C] rounded-xl flex items-center justify-center shadow-md hover:-translate-x-1 hover:-translate-y-1 transition duration-300">
                        <div className="-rotate-45 text-[#003366] font-bold text-[10px] uppercase">Info</div>
                    </div>

                    {/* Kotak HIJAU - Daftar */}
                    <div className="w-14 h-14 bg-[#008144] rounded-xl flex items-center justify-center shadow-md hover:translate-x-1 hover:-translate-y-1 transition duration-300 relative group/icon">
                        <div className="-rotate-45 text-white text-[10px] font-black uppercase tracking-widest">Daftar</div>
                        <span className="absolute -top-12 -right-4 bg-[#003366] text-white text-[10px] px-3 py-1.5 rounded-md opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-bold italic">Pendaftaran Santri Baru</span>
                    </div>

                    {/* Kotak BIRU - Tanya */}
                    <div className="w-14 h-14 bg-[#0077C8] rounded-xl flex items-center justify-center shadow-md hover:-translate-x-1 hover:translate-y-1 transition duration-300">
                        <div className="-rotate-45 text-white text-[10px] font-black uppercase tracking-widest">Tanya</div>
                    </div>

                    {/* Kotak ORANGE - Lokasi */}
                    <div className="w-14 h-14 bg-[#FF6600] rounded-xl flex items-center justify-center shadow-md hover:translate-x-1 hover:translate-y-1 transition duration-300">
                        <div className="-rotate-45 text-white text-[10px] font-black uppercase tracking-widest">Lokasi</div>
                    </div>
                </div>
                <div className="absolute -inset-4 bg-[#FF6600]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-700 -z-10"></div>
            </div>

            {/* --- FOOTER --- */}
            <footer className="bg-[#003366] text-white pt-24 pb-12 px-8 mt-20 relative overflow-hidden text-left">
                {/* Pattern Aksen Logo */}
                <div className="absolute -top-10 -right-10 opacity-5 text-8xl font-black text-white italic uppercase tracking-tighter">AT-TAUFIQ</div>

                <div className="container mx-auto grid md:grid-cols-4 gap-12 border-b border-[#004080] pb-20 relative z-10">
                    {/* Kolom 1: Branding */}
                    <div className="space-y-6">
                        <div className="text-4xl font-black text-white tracking-tighter italic uppercase">
                            AT-TAUFIQ<span className="text-[#FF6600]">.</span>
                        </div>
                        <p className="text-blue-100 text-sm leading-relaxed max-w-sm">
                            Mencetak Generasi Robbani yang Unggul dalam <span className="font-bold text-[#FF6600]">Prestasi</span> dan Berakhlak Mulia.
                        </p>
                    </div>

                    {/* Kolom 2: Unit Pendidikan */}
                    <div>
                        <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-[#FF6600]">Unit Pendidikan</h4>
                        <ul className="text-sm space-y-4 text-blue-100 font-medium">
                            <li className="hover:text-white cursor-pointer transition">• TK Islam Terpadu At-Taufiq</li>
                            <li className="hover:text-white cursor-pointer transition">• SD Islam Terpadu At-Taufiq</li>
                            <li className="hover:text-white cursor-pointer transition">• SMP Islam Terpadu At-Taufiq</li>
                        </ul>
                    </div>

                    {/* Kolom 3: Tautan Cepat */}
                    <div>
                        <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-[#FF6600]">Tautan Cepat</h4>
                        <ul className="text-sm space-y-4 text-blue-100 font-medium">
                            <li className="hover:text-white cursor-pointer transition">Informasi PPDB</li>
                            <li className="hover:text-white cursor-pointer transition">Agenda Sekolah</li>
                            <li className="hover:text-white cursor-pointer transition">Kontak Kami</li>
                        </ul>
                    </div>

                    {/* Kolom 4: Lokasi & Social */}
                    <div>
                        <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-[#FF6600]">Media Sosial</h4>
                        <div className="flex space-x-3">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6600] transition cursor-pointer">IG</div>
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6600] transition cursor-pointer">FB</div>
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6600] transition cursor-pointer">YT</div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="container mx-auto mt-12 pt-8 text-center text-xs text-blue-300 font-medium">
                    <p>© 2026 Sekolah Islam Terpadu At-Taufiq Jambi. All Rights Reserved.</p>
                    <p className="mt-2 text-blue-400">Website developed by Muhammad Firman Azhary - Portofolio Project.</p>
                </div>
            </footer>
        </div>
    );
}