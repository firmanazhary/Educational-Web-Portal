import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Sparkles, Calendar, ArrowRight } from 'lucide-react';

export default function EventDetail({ event, relatedEvents = [] }) {
    const imageUrl = event.image 
        ? (event.image.startsWith('http') || event.image.startsWith('/images') 
            ? event.image 
            : `/storage/${event.image}`)
        : '/images/placeholder.jpg';

    return (
        <AppLayout title={`${event.title} - SIT At-Taufiq`}>
            <Head title={`${event.title} | Program & Kegiatan SIT At-Taufiq`} />

            <div className="bg-[#FAF4EB] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-[#051736]">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    {/* Back Button */}
                    <Link 
                        href={route('events.index')} 
                        className="inline-flex items-center space-x-2 text-xs font-bold text-[#051736] hover:text-[#D4AF37] transition"
                    >
                        <ArrowLeft size={16} />
                        <span>Kembali ke Semua Kegiatan</span>
                    </Link>

                    {/* Main Banner Header */}
                    <div className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-[32px] p-6 md:p-10 shadow-sm space-y-6">
                        <div className="aspect-[16/9] rounded-[24px] overflow-hidden border border-[#E8DFC8] shadow-md bg-slate-100">
                            <img src={imageUrl} alt={event.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="space-y-3">
                            <span className="inline-block border border-[#D4AF37]/60 text-[#8B6B13] text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase bg-[#FAF8F5]">
                                {event.type || 'PROGRAM UNGGULAN'}
                            </span>
                            <h1 className="font-serif text-3xl md:text-5xl text-[#051736] font-normal leading-tight">
                                {event.title}
                            </h1>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light">
                                {event.description}
                            </p>
                        </div>

                        <div className="pt-6 border-t border-[#E8DFC8] prose max-w-none text-slate-700 font-light leading-relaxed">
                            {event.content ? (
                                <div dangerouslySetInnerHTML={{ __html: event.content }} />
                            ) : (
                                <p>Informasi detail mengenai {event.title} di SIT At-Taufiq Jambi.</p>
                            )}
                        </div>
                    </div>

                    {/* Related Events Section */}
                    {relatedEvents.length > 0 && (
                        <div className="space-y-4 pt-6">
                            <h3 className="font-serif text-xl font-bold text-[#051736]">Kegiatan Lainnya</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {relatedEvents.map((item) => (
                                    <Link 
                                        key={item.id} 
                                        href={route('events.show', item.slug)}
                                        className="bg-white p-4 rounded-2xl border border-[#E8DFC8] hover:shadow-md transition flex flex-col justify-between"
                                    >
                                        <div className="space-y-2">
                                            <h4 className="font-serif font-bold text-sm text-[#051736] line-clamp-1">{item.title}</h4>
                                            <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                                        </div>
                                        <div className="pt-3 flex items-center text-xs font-bold text-[#D4AF37] space-x-1">
                                            <span>Lihat</span>
                                            <ArrowRight size={12} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}