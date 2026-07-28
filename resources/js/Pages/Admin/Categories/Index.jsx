import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';

export default function Index({ auth, categories = [] }) {
    const { flash } = usePage().props;
    const [editCategory, setEditCategory] = useState(null);

    const { data, setData, post, put, reset, errors, processing } = useForm({
        name: '',
    });

    // Handle Submit Tambah / Edit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editCategory) {
            put(route('admin.categories.update', editCategory.id), {
                onSuccess: () => {
                    reset();
                    setEditCategory(null);
                }
            });
        } else {
            post(route('admin.categories.store'), {
                onSuccess: () => reset()
            });
        }
    };

    // Mode Edit
    const handleEdit = (category) => {
        setEditCategory(category);
        setData('name', category.name);
    };

    // Batal Edit
    const handleCancelEdit = () => {
        setEditCategory(null);
        reset();
    };

    // Handle Delete
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus kategori ini? Postingan terkait mungkin terpengaruh.')) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-[#07327F] leading-tight font-serif">Kelola Kategori Berita</h2>}
        >
            <Head title="Admin - Kategori" />

            <div className="py-12 bg-[#FAF8F5] min-h-screen">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Flash Message Success */}
                    {flash?.message && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl shadow-sm flex items-center space-x-2 text-sm font-medium">
                            <span>✅</span>
                            <span>{flash.message}</span>
                        </div>
                    )}

                    {/* Form Input (Tambah / Edit) */}
                    <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 shadow-sm">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
                            <div className="flex-grow">
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#07327F] mb-2">
                                    {editCategory ? '✏️ Edit Nama Kategori' : '➕ Tambah Kategori Baru'}
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Ekstrakurikuler, Prestasi, PPDB, Berita Utama"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-[#07327F] focus:border-[#07327F] transition"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#07327F] hover:bg-[#051C42] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md whitespace-nowrap h-[42px]"
                                >
                                    {editCategory ? 'Update' : 'Simpan'}
                                </button>

                                {editCategory && (
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs uppercase transition h-[42px]"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Tabel List Kategori */}
                    <div className="bg-white rounded-3xl border border-[#E8DFC8] shadow-sm overflow-hidden p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold font-serif text-[#07327F]">Daftar Kategori</h3>
                            <p className="text-xs text-slate-500 font-light">Kategori yang digunakan untuk mengelompokkan artikel dan berita sekolah.</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600 border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                                        <th className="p-4 rounded-l-xl">#</th>
                                        <th className="p-4">Nama Kategori</th>
                                        <th className="p-4">Slug</th>
                                        <th className="p-4 text-center">Jumlah Post</th>
                                        <th className="p-4 text-right rounded-r-xl">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {categories.length > 0 ? (
                                        categories.map((cat, index) => (
                                            <tr key={cat.id} className="hover:bg-slate-50/80 transition duration-150">
                                                <td className="p-4 font-medium text-slate-400">{index + 1}</td>
                                                <td className="p-4 font-bold text-[#07327F]">{cat.name}</td>
                                                <td className="p-4 text-slate-400 italic text-xs">{cat.slug}</td>
                                                <td className="p-4 text-center">
                                                    <span className="bg-blue-50 text-[#07327F] px-3 py-1 rounded-full text-xs font-bold border border-blue-200/60">
                                                        {cat.posts_count ?? 0} Artikel
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right space-x-3 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleEdit(cat)}
                                                        className="text-amber-600 hover:text-amber-800 font-bold text-xs uppercase tracking-wider transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(cat.id)}
                                                        className="text-rose-500 hover:text-rose-700 font-bold text-xs uppercase tracking-wider transition"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-8 text-center text-slate-400 text-sm italic">
                                                Belum ada kategori. Silakan tambahkan kategori baru di atas.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}