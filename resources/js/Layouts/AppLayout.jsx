// resources/js/Layouts/JisLayout.jsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function AppLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 relative antialiased">
            <Head title={title ? `${title} - Jakarta Intercultural School` : 'Jakarta Intercultural School'} />

            {/* --- HEADER / NAVBAR (Sesuai Gambar JIS Top) --- */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo JIS (Teks dummy, nanti ganti <img> kalau ada logo asli) */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-3xl font-black text-[#003366] tracking-tighter">
                            JIS<span className="text-[#FF6600]">.</span>
                        </div>
                    </Link>

                    {/* Menu Navigasi (Tengah) */}
                    <div className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest text-[#003366]/90">
                        <Link href="/" className="hover:text-[#FF6600] transition">Home</Link>
                        <a href="#about" className="hover:text-[#FF6600] transition">About JIS</a>
                        <a href="#academics" className="hover:text-[#FF6600] transition">Academics</a>
                        <a href="#blog" className="hover:text-[#FF6600] transition">News</a>
                        <a href="#gallery" className="hover:text-[#FF6600] transition">Gallery</a>
                    </div>

                    {/* Tombol Aksi (Kanan) */}
                    <div className="flex items-center space-x-4">
                        <button className="text-xs font-bold uppercase tracking-widest text-[#003366] hover:text-[#FF6600]">
                            Portal
                        </button>
                        <button className="bg-[#003366] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FF6600] transition duration-300 shadow-sm">
                            Inquire Now
                        </button>
                    </div>
                </nav>
            </header>

            {/* --- MAIN CONTENT (Konten halaman Home/Blog/Gallery akan masuk sini) --- */}
            <main className="relative z-10">{children}</main>

            {/* --- FLOATING BUTTONS (Sesuai Gambar JIS Right Side) --- */}
            <div className="fixed right-6 bottom-12 z-[100] group flex items-center justify-center">
                
                {/* Kita buat grid 2x2 yang diputar 45 derajat */}
                <div className="grid grid-cols-2 gap-1 rotate-45 transform scale-90 hover:scale-100 transition duration-500 ease-out cursor-pointer shadow-2xl shadow-[#003366]/30 rounded-2xl p-1">
                    
                    {/* Kotak KUNING (Kiri Atas) - Biasanya info/Portal */}
                    <div className="w-14 h-14 bg-[#FFC72C] rounded-xl flex items-center justify-center shadow-md hover:-translate-x-1 hover:-translate-y-1 transition duration-300">
                        {/* Kembalikan rotasi teks/icon agar lurus */}
                        <div className="-rotate-45 text-[#003366] font-bold text-sm">Info</div>
                    </div>

                    {/* Kotak HIJAU (Kanan Atas) - Biasanya Apply/Edit */}
                    <div className="w-14 h-14 bg-[#008144] rounded-xl flex items-center justify-center shadow-md hover:translate-x-1 hover:-translate-y-1 transition duration-300 relative group/icon">
                        <div className="-rotate-45 text-white text-xs font-black uppercase tracking-widest">Apply</div>
                        {/* Tooltip Keren */}
                        <span className="absolute -top-12 -right-4 bg-[#003366] text-white text-[10px] px-3 py-1.5 rounded-md opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-bold">Admissions</span>
                    </div>

                    {/* Kotak BIRU (Kiri Bawah) - Biasanya Inquiry/Inquire */}
                    <div className="w-14 h-14 bg-[#0077C8] rounded-xl flex items-center justify-center shadow-md hover:-translate-x-1 hover:translate-y-1 transition duration-300">
                        <div className="-rotate-45 text-white text-xs font-black uppercase tracking-widest">Inquire</div>
                    </div>

                    {/* Kotak ORANGE (Kanan Bawah) - Biasanya Map/Campus */}
                    <div className="w-14 h-14 bg-[#FF6600] rounded-xl flex items-center justify-center shadow-md hover:translate-x-1 hover:translate-y-1 transition duration-300">
                        <div className="-rotate-45 text-white text-xs font-black uppercase tracking-widest">Visit</div>
                    </div>

                </div>

                {/* Optional: Tambahkan aura cahaya orange di belakang saat hover */}
                <div className="absolute -inset-4 bg-[#FF6600]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-700 -z-10"></div>
            </div>

            {/* --- FOOTER (Sesuai Gambar JIS Bottom) --- */}
            <footer className="bg-[#003366] text-white pt-24 pb-12 px-8 mt-20 relative overflow-hidden">
                {/* Pattern Aksen (Opsional, dummy) */}
                <div className="absolute -top-10 -right-10 opacity-10 text-9xl font-black text-white">JIS</div>

                <div className="container mx-auto grid md:grid-cols-4 gap-12 border-b border-[#004080] pb-20 relative z-10">
                    {/* Kolom 1: Logo & Moto */}
                    <div className="space-y-6">
                        <div className="text-4xl font-black text-white tracking-tighter">
                            JIS<span className="text-[#FF6600]">.</span>
                        </div>
                        <p className="text-blue-100 text-sm leading-relaxed max-w-sm">
                            Learning to Be Best <span className="font-bold text-[#FF6600]">for</span> the World.
                        </p>
                    </div>

                    {/* Kolom 2: Campuses (Sesuai Gambar Footer) */}
                    <div>
                        <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-[#FF6600]">Our Campuses</h4>
                        <ul className="text-sm space-y-4 text-blue-100 font-medium">
                            <li className="hover:text-white cursor-pointer transition">• Pondok Indah Elementary Campus</li>
                            <li className="hover:text-white cursor-pointer transition">• Cilandak Campus (Middle & High School)</li>
                            <li className="hover:text-white cursor-pointer transition">• Pattimura Elementary Campus</li>
                        </ul>
                    </div>

                    {/* Kolom 3: Quick Links */}
                    <div>
                        <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-[#FF6600]">Quick Links</h4>
                        <ul className="text-sm space-y-4 text-blue-100 font-medium">
                            <li className="hover:text-white cursor-pointer transition">Admissions</li>
                            <li className="hover:text-white cursor-pointer transition">Careers at JIS</li>
                            <li className="hover:text-white cursor-pointer transition">Contact Us</li>
                        </ul>
                    </div>

                    {/* Kolom 4: Akreditasi & Social (Dummy) */}
                    <div>
                        <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-[#FF6600]">Accreditation</h4>
                        <div className="flex space-x-3 opacity-80">
                            {/* Dummy Logo Akreditasi */}
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-xs font-bold text-blue-200">WASC</div>
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-xs font-bold text-blue-200">CIS</div>
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-xs font-bold text-blue-200">IB</div>
                        </div>
                    </div>
                </div>

                {/* Bagian Bawah Footer */}
                <div className="container mx-auto mt-12 pt-8 text-center text-xs text-blue-300 font-medium">
                    <p>© 2026 Jakarta Intercultural School. All Rights Reserved.</p>
                    <p className="mt-2 text-blue-400">Website developed by Muhammad Firman Azhary - School CMS Portfolio Project.</p>
                </div>
            </footer>
        </div>
    );
}