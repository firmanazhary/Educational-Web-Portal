import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, post }) {
    const { data, setData, post: postMethod, processing, errors } = useForm({
        title: post.title || '',
        content: post.content || '',
        image: null,
        _method: 'put', // TRICK: Beritahu Laravel ini adalah request PUT
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tetap pakai .post() karena Inertia handle multipart/form-data lewat POST
        postMethod(route('admin.posts.update', post.id));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-bold text-xl text-slate-800 italic">Edit Berita: {post.title}</h2>}>
            <Head title="Edit Berita" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-8 shadow-sm rounded-3xl border border-slate-100">
                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div>
                                <label className="block text-sm font-black text-[#003366] mb-2 uppercase tracking-widest">Judul Berita</label>
                                <input 
                                    type="text" 
                                    className="w-full border-slate-200 rounded-2xl focus:ring-[#FF6600] focus:border-[#FF6600]"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="text-red-500 text-xs mt-1 font-bold">{errors.title}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-black text-[#003366] mb-2 uppercase tracking-widest">Konten Berita</label>
                                <textarea 
                                    rows="8"
                                    className="w-full border-slate-200 rounded-2xl focus:ring-[#FF6600] focus:border-[#FF6600]"
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                ></textarea>
                                {errors.content && <div className="text-red-500 text-xs mt-1 font-bold">{errors.content}</div>}
                            </div>

                            <div className="flex items-center space-x-6">
                                <div className="shrink-0">
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest text-center">Gambar Saat Ini</p>
                                    <img className="h-24 w-24 object-cover rounded-2xl shadow-md border-2 border-slate-100" src={`/storage/${post.image}`} alt="" />
                                </div>
                                <div className="grow">
                                    <label className="block text-sm font-black text-[#003366] mb-2 uppercase tracking-widest">Ganti Gambar (Opsional)</label>
                                    <input 
                                        type="file" 
                                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:bg-blue-50 file:text-[#003366] hover:file:bg-[#FF6600] hover:file:text-white transition-all cursor-pointer"
                                        onChange={e => setData('image', e.target.files[0])}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-50">
                                <Link href={route('admin.posts.index')} className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition">Batal</Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-[#003366] text-white px-10 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#FF6600] transition shadow-lg shadow-blue-900/10 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Perbarui Berita'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}