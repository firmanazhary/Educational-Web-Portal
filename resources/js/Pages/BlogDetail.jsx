import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function BlogDetail({ post }) {
    return (
        <AppLayout title={post.title}>
            <Head title={post.title} />

            <article className="min-h-screen bg-white">
                {/* --- HERO IMAGE (Full Width) --- */}
                <div className="relative h-[60vh] w-full bg-slate-200">
                    <img 
                        src={`/storage/${post.image}`} 
                        className="w-full h-full object-cover" 
                        alt={post.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 md:left-24 text-white">
                         <div className="h-1 w-20 bg-[#FF6600] mb-4"></div>
                         <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-4xl uppercase leading-tight">
                            {post.title}
                         </h1>
                    </div>
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="container mx-auto px-6 md:px-24 py-16 grid md:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="md:col-span-8">
                        <div className="flex items-center space-x-4 mb-8 text-xs font-bold uppercase tracking-widest text-slate-400 border-b pb-6">
                            <span className="text-[#FF6600]">Diterbitkan pada</span>
                            <span>{new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            <span>•</span>
                            <span>Oleh Admin At-Taufiq</span>
                        </div>

                        {/* Teks Berita */}
                        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed font-light whitespace-pre-line">
                            {post.content}
                        </div>

                        {/* Back Button */}
                        <div className="mt-16 pt-8 border-t">
                            <Link href="/" className="text-[#003366] font-black uppercase text-xs tracking-[0.2em] hover:text-[#FF6600] transition">
                                ← Kembali ke Beranda
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar / Sidebar Info */}
                    <div className="md:col-span-4 space-y-8">
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h4 className="font-black text-[#003366] uppercase text-xs tracking-widest mb-6">Informasi Sekolah</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                At-Taufiq Jambi berkomitmen mencetak generasi Robbani yang cerdas dan berakhlakul karimah.
                            </p>
                            <button className="mt-6 w-full bg-[#003366] text-white py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#FF6600] transition transition-all duration-300">
                                Inquire Now
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </AppLayout>
    );
}