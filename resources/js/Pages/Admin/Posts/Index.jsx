import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ auth, posts }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Berita At-Taufiq</h2>}
        >
            <Head title="Admin - Blog" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash.message && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-sm">
                            {flash.message}
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Daftar Artikel</h3>
                            <Link href={route('admin.posts.create')} className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#FF6600] transition">
                                + Tambah Berita
                            </Link>
                        </div>

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                                    <th className="p-4">Gambar</th>
                                    <th className="p-4">Judul</th>
                                    <th className="p-4">Tanggal</th>
                                    <th className="p-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id} className="border-b hover:bg-slate-50 transition">
                                        <td className="p-4 text-sm font-medium">
                                            <img src={post.image_url} className="w-16 h-10 object-cover rounded" alt="" />
                                        </td>
                                        <td className="p-4 text-sm font-bold text-[#003366]">{post.title}</td>
                                        <td className="p-4 text-sm text-slate-500">{new Date(post.created_at).toLocaleDateString('id-ID')}</td>
                                       <td className="p-4 text-right space-x-3">
                                        <Link 
                                            href={route('admin.posts.edit', post.id)} 
                                            className="text-blue-600 hover:text-blue-800 font-bold text-xs uppercase tracking-widest"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => {
                                                if (confirm('Yakin ingin menghapus berita At-Taufiq ini?')) {
                                                    router.delete(route('admin.posts.destroy', post.id));
                                                }
                                            }}
                                            className="text-red-500 hover:text-red-700 font-bold text-xs uppercase tracking-widest"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}