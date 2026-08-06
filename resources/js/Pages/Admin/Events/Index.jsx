import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, CheckCircle, XCircle, Calendar, Sparkles } from 'lucide-react';

export default function EventIndex({ events }) {
    const handleDelete = (id, title) => {
        if (confirm(`Apakah Anda yakin ingin menghapus "${title}"?`)) {
            router.delete(route('admin.events.destroy', id));
        }
    };

    return (
        <AppLayout title="Kelola Events & Program">
            <Head title="Kelola Events & Program | Admin" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 font-serif">Kelola Events & Program</h1>
                        <p className="text-sm text-slate-500">Tambah, ubah, atau hapus kegiatan & program sekolah.</p>
                    </div>

                    <Link
                        href={route('admin.events.create')}
                        className="inline-flex items-center space-x-2 bg-[#051736] hover:bg-[#0a2554] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md"
                    >
                        <Plus size={16} />
                        <span>Tambah Program Baru</span>
                    </Link>
                </div>

                {/* Table Data */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-600">
                            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="px-6 py-4">Gambar</th>
                                    <th className="px-6 py-4">Judul & Slug</th>
                                    <th className="px-6 py-4">Tipe</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {events.data.length > 0 ? (
                                    events.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/80 transition">
                                            {/* Gambar */}
                                            <td className="px-6 py-4">
                                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                                                    <img
                                                        src={item.image ? `/storage/${item.image}` : '/images/placeholder.jpg'}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </td>

                                            {/* Title & Slug */}
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                                                <p className="text-slate-400 text-[11px] font-mono">/events/{item.slug}</p>
                                            </td>

                                            {/* Tipe */}
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    item.type === 'program' 
                                                        ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                                                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                                                }`}>
                                                    {item.type}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                {item.is_active ? (
                                                    <span className="inline-flex items-center space-x-1 text-emerald-600 font-semibold">
                                                        <CheckCircle size={14} />
                                                        <span>Aktif</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center space-x-1 text-slate-400 font-semibold">
                                                        <XCircle size={14} />
                                                        <span>Draft</span>
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link
                                                        href={route('admin.events.edit', item.id)}
                                                        className="p-2 text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <Edit size={14} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id, item.title)}
                                                        className="p-2 text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-lg transition"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                                            Belum ada data events/program.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}