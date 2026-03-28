import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    // Inisialisasi useForm
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pakai post() karena kita kirim file
        post(route('admin.posts.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-bold text-xl text-slate-800">Tambah Berita At-Taufiq</h2>}>
            <Head title="Tambah Berita" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-8 shadow-sm rounded-2xl border border-slate-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Judul */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">Judul Berita</label>
                                <input 
                                    type="text" 
                                    className="w-full border-slate-200 rounded-xl focus:ring-[#FF6600] focus:border-[#FF6600]"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                            </div>

                            {/* Isi Konten */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">Isi Berita</label>
                                <textarea 
                                    rows="6"
                                    className="w-full border-slate-200 rounded-xl focus:ring-[#FF6600] focus:border-[#FF6600]"
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                ></textarea>
                                {errors.content && <div className="text-red-500 text-xs mt-1">{errors.content}</div>}
                            </div>

                            {/* Upload Gambar */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">Gambar Utama</label>
                                <input 
                                    type="file" 
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 border-t">
                                <Link href={route('admin.posts.index')} className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-700">Batal</Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-[#003366] text-white px-8 py-2 rounded-xl text-sm font-bold hover:bg-[#FF6600] transition disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Terbitkan Berita'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}