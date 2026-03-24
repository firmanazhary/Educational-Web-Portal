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
            <div className="fixed right-6 bottom-12 z-[100] flex flex-col space-y-4">
                {/* Tombol Search */}
                <button className="bg-white shadow-2xl p-4 rounded-full border border-slate-100 hover:scale-110 transition duration-300 text-[#003366] group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:text-[#FF6600]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
                {/* Tombol Chat/Contact */}
                <button className="bg-[#FF6600] shadow-2xl p-4 rounded-full text-white hover:scale-110 transition duration-300 hover:bg-[#E65C00]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h5.25M21 12c0 1.69-.91 3.165-2.28 3.974a6.602 6.602 0 0 1-5.72 1.957l-3.332 1.11a.75.75 0 0 1-.904-.904l1.11-3.332a6.602 6.602 0 0 1 1.957-5.72A6.602 6.602 0 0 1 21 12Zm-10.5 4.5a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" />
                    </svg>
                </button>
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