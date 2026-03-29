import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function About() {
    return (
        <AppLayout title="About At-Taufiq">
            <Head title="About At-Taufiq Jambi | Mencetak Generasi Robbani" />

            <div className="bg-white font-sans selection:bg-[#FF6600] selection:text-white">
                
                {/* --- 1. PREMIUM HERO SECTION --- */}
                <div className="relative h-[90vh] w-full overflow-hidden bg-[#002147]">
                    <img 
                        src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2Nob29sfGVufDB8fDB8fHww" 
                        className="w-full h-full object-cover opacity-50 scale-105"
                        alt="At-Taufiq Campus Life"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-32">
                        <div className="h-1.5 w-24 bg-[#FF6600] mb-8 animate-pulse"></div>
                        <h1 className="text-white text-7xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.85] mb-6">
                            About <br/> <span className="text-[#FF6600]">At-Taufiq</span>
                        </h1>
                        <p className="text-white/70 text-lg md:text-2xl font-light max-w-2xl leading-relaxed italic border-l-4 border-white/20 pl-6">
                            "At-Taufiq is a vibrant community of learners, fostering an environment where every student is supported to achieve their very best."
                        </p>
                    </div>
                </div>

                {/* --- 2. FLOATING SUB-NAV (Sticky) --- */}
                <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100 hidden md:block">
                    <div className="container mx-auto px-32 flex justify-between items-center py-6">
                        <div className="flex space-x-10">
                            {['Mission & Vision', 'Leadership', 'Curriculum', 'Values', 'Accreditation'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#FF6600] transition">
                                    {item}
                                </a>
                            ))}
                        </div>
                        <button className="bg-[#002147] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#FF6600] transition">
                            Inquire Now
                        </button>
                    </div>
                </div>

                {/* --- 3. BOLD INTRO SECTION --- */}
                <section id="mission-vision" className="py-32 container mx-auto px-6 md:px-32">
                    <div className="grid md:grid-cols-12 gap-20 items-start">
                        <div className="md:col-span-7 space-y-10">
                            <h2 className="text-5xl md:text-7xl font-black text-[#002147] uppercase leading-[0.9] tracking-tighter">
                                Learning in Jambi <br/> to be <span className="italic text-[#FF6600]">Best for the World.</span>
                            </h2>
                            <div className="prose prose-xl prose-slate font-light text-slate-600 leading-relaxed">
                                <p>
                                    We create, teach, and learn together across our garden-like campuses with leading-edge facilities that support independent inquiry, critical thinking, problem-solving, and collaborative study.
                                </p>
                                <p>
                                    The At-Taufiq community is global and stretches well beyond the school. As we always say: <span className="font-bold text-[#002147]">Once a Robbani, Always a Robbani!</span>
                                </p>
                            </div>
                        </div>
                        <div className="md:col-span-5 relative">
                            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition duration-700">
                                <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 4. LEADERSHIP MESSAGE (Background Image Section) --- */}
                <section id="leadership" className="relative py-40 overflow-hidden bg-slate-900">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#002147] to-transparent"></div>
                    <div className="container mx-auto px-6 md:px-32 relative z-10">
                        <div className="max-w-3xl space-y-8">
                            <h3 className="text-[#FF6600] text-sm font-black uppercase tracking-[0.4em]">Message from the Director</h3>
                            <p className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                                "Our mission is to inspire learners to be their best for the world. Our values are emphasized in everything we do, for every age in our community, wherever we are."
                            </p>
                            <div className="flex items-center space-x-6">
                                <div className="h-px w-20 bg-white/30"></div>
                                <p className="text-white font-bold uppercase tracking-widest">Ustadz Muhammad Azhary, M.Pd</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 5. CORE VALUES GRID (Bento Box Style) --- */}
                <section id="values" className="py-32 bg-slate-50">
                    <div className="container mx-auto px-6 md:px-32">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 bg-white p-16 rounded-[60px] border border-slate-100 flex flex-col justify-center shadow-sm">
                                <h4 className="text-6xl font-black text-[#002147] uppercase tracking-tighter mb-6">Community <br/> Of Care</h4>
                                <p className="text-slate-500 text-lg font-light leading-relaxed max-w-md">
                                    We prioritize the well-being of every student, ensuring a safe and inclusive environment for spiritual and intellectual growth.
                                </p>
                            </div>
                            <div className="bg-[#FF6600] p-16 rounded-[60px] text-white flex flex-col justify-end group cursor-pointer">
                                <div className="text-5xl mb-10 group-hover:translate-x-4 transition duration-300">→</div>
                                <h4 className="text-3xl font-black uppercase tracking-tighter">Engaging With Indonesia</h4>
                            </div>
                            <div className="bg-white p-16 rounded-[60px] border border-slate-100 shadow-sm">
                                <h4 className="text-3xl font-black text-[#002147] uppercase tracking-tighter mb-4">Creating Change</h4>
                                <p className="text-slate-500 text-sm font-light">Empowering students to be leaders in the global Ummah.</p>
                            </div>
                            <div className="md:col-span-2 overflow-hidden rounded-[60px] relative h-80 group">
                                <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200" className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                                <div className="absolute inset-0 bg-black/40 flex items-center px-12">
                                    <h4 className="text-white text-4xl font-black uppercase tracking-tighter">Accreditation & <br/> Memberships</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 6. ACCREDITATION LOGO GRID (Clean & Formal) --- */}
                <section id="accreditation" className="py-24 bg-white border-b border-slate-100">
                    <div className="container mx-auto px-6 md:px-32">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-16 items-center opacity-40 grayscale hover:grayscale-0 transition duration-700">
                            <div className="text-center font-black text-xl text-[#002147]">SIT TERPADU</div>
                            <div className="text-center font-black text-xl text-[#002147]">JSIT MEMBER</div>
                            <div className="text-center font-black text-xl text-[#002147]">BAN S/M</div>
                            <div className="text-center font-black text-xl text-[#002147]">AQAS</div>
                            <div className="text-center font-black text-xl text-[#002147]">CIS</div>
                        </div>
                    </div>
                </section>

                {/* --- 7. WHERE WE LEARN (Large Image Card) --- */}
                <section className="py-32 container mx-auto px-6 md:px-32">
                    <div className="relative h-[600px] rounded-[60px] overflow-hidden group shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=2000" className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#003366] to-transparent opacity-90"></div>
                        <div className="absolute inset-0 flex flex-col justify-center px-16 max-w-2xl space-y-6">
                            <h3 className="text-white text-5xl font-black uppercase tracking-tighter leading-none">Where We Learn</h3>
                            <p className="text-white/80 text-lg font-light">
                                We learn across three sprawling campuses in Jambi: Pondok Meja, Sipin, and Telanaipura. Each designed for specific age groups and learning needs.
                            </p>
                            <Link href="#" className="text-[#FF6600] font-black uppercase text-xs tracking-widest hover:text-white transition">Explore Our Campuses →</Link>
                        </div>
                    </div>
                </section>

                {/* --- 8. FINAL BIG CTA --- */}
                <section className="bg-slate-50 py-32 text-center">
                    <div className="container mx-auto px-6">
                        <div className="h-1 w-20 bg-[#FF6600] mx-auto mb-10"></div>
                        <h2 className="text-[#002147] text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12">
                            Ready to join <br/> <span className="text-[#FF6600]">Our Tribe?</span>
                        </h2>
                        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                            <Link href="/admissions" className="bg-[#002147] text-white px-16 py-6 rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-[#FF6600] transition shadow-xl">Start Admission</Link>
                            <Link href="/contact" className="bg-white border-2 border-[#002147] text-[#002147] px-16 py-6 rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition">Get In Touch</Link>
                        </div>
                    </div>
                </section>

            </div>
        </AppLayout>
    );
}