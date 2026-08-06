import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

export default function EventEdit({ event }) {
    const { data, setData, processing, errors } = useForm({
        title: event.title || '',
        slug: event.slug || '',
        type: event.type || 'program',
        description: event.description || '',
        content: event.content || '',
        icon_type: event.icon_type || 'Sparkles',
        image: null,
        is_active: Boolean(event.is_active),
    });

    const [preview, setPreview] = useState(event.image ? `/storage/${event.image}` : null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pakai router.post dengan method spoofing untuk upload file saat update
        router.post(route('admin.events.update', event.id), {
            _method: 'PUT',
            ...data
        });
    };

    return (
        <AppLayout title={`Edit Program: ${event.title}`}>
            <Head title={`Edit - ${event.title} | Admin`} />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
                
                <Link
                    href={route('admin.events.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
                >
                    <ArrowLeft size={16} />
                    <span>Kembali ke Daftar Events</span>
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                    <h1 className="text-xl font-bold text-slate-800 font-serif mb-6 border-b pb-4">Edit Program / Event</h1>

                    <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-700">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Judul Program / Event *</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 text-xs focus:ring-[#051736]"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Slug (URL Name) *</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 text-xs bg-slate-50 focus:ring-[#051736]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Tipe *</label>
                                <select
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 text-xs focus:ring-[#051736]"
                                >
                                    <option value="program">Program Unggulan</option>
                                    <option value="event">Event / Kegiatan</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Status Publikasi</label>
                                <label className="flex items-center space-x-2 pt-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="rounded border-slate-300 text-[#051736] focus:ring-[#051736]"
                                    />
                                    <span className="font-semibold text-slate-700">Tampilkan di Website (Aktif)</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Gambar / Thumbnail</label>
                            <div className="flex items-center space-x-4">
                                {preview && (
                                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                            <textarea
                                rows="3"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="w-full rounded-xl border-slate-200 text-xs focus:ring-[#051736]"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Konten Lengkap</label>
                            <textarea
                                rows="6"
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                className="w-full rounded-xl border-slate-200 text-xs focus:ring-[#051736]"
                            ></textarea>
                        </div>

                        <div className="pt-4 border-t flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center space-x-2 bg-[#051736] hover:bg-[#0a2554] text-white px-6 py-2.5 rounded-xl font-bold transition shadow-md disabled:opacity-50"
                            >
                                <Save size={16} />
                                <span>Perbarui Program</span>
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </AppLayout>
    );
}