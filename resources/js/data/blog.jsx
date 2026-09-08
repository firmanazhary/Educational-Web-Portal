export const blogCategories = [
  { slug: "kegiatan-sekolah", name: "Kegiatan Sekolah" },
  { slug: "pengumuman", name: "Pengumuman" },
  { slug: "tips-parenting", name: "Tips Parenting" },
  { slug: "prestasi", name: "Prestasi" },
];

// 5 item — cocok dengan 5 titik pagination di mockup "Berita Terbaru
// Attaufiq" (lihat BlogPreview), disusun berurutan tanggal terbaru ke
// lama seperti aslinya.
export const blogPosts = [
  {
    slug: "kegiatan-tilawah-pagi-di-masjid-sekolah",
    title: "Kegiatan Tilawah Pagi di Masjid Sekolah",
    date: "2026-05-18",
    category: "kegiatan-sekolah",
    author: "[ISI: Nama penulis]",
    coverImage: "/images/blog/post-1-cover.jpg",
    excerpt: "[ISI: ringkasan singkat artikel]",
    content: "[ISI: isi lengkap artikel dalam format paragraf/markdown]",
  },
  {
    slug: "pengumuman-jadwal-ujian-tengah-semester-uts",
    title: "Pengumuman Jadwal Ujian Tengah Semester (UTS)",
    date: "2026-05-17",
    category: "pengumuman",
    author: "[ISI: Nama penulis]",
    coverImage: "/images/blog/post-2-cover.jpg",
    excerpt: "[ISI: ringkasan singkat artikel]",
    content: "[ISI: isi lengkap artikel dalam format paragraf/markdown]",
  },
  {
    slug: "munaqasyah-tahfizh-juz-30-oleh-siswa-smp",
    title: "Munaqasyah Tahfizh Juz 30 oleh Siswa SMP",
    date: "2026-05-15",
    category: "kegiatan-sekolah",
    author: "[ISI: Nama penulis]",
    coverImage: "/images/blog/post-3-cover.jpg",
    excerpt: "[ISI: ringkasan singkat artikel]",
    content: "[ISI: isi lengkap artikel dalam format paragraf/markdown]",
  },
  {
    slug: "kunjungan-edukatif-siswa-sd-ke-museum",
    title: "Kunjungan Edukatif Siswa SD ke Museum",
    date: "2026-05-12",
    category: "kegiatan-sekolah",
    author: "[ISI: Nama penulis]",
    coverImage: "/images/blog/post-4-cover.jpg",
    excerpt: "[ISI: ringkasan singkat artikel]",
    content: "[ISI: isi lengkap artikel dalam format paragraf/markdown]",
  },
  {
    slug: "pembukaan-pendaftaran-santri-baru-tahun-ajaran",
    title: "Pembukaan Pendaftaran Santri Baru Tahun Ajaran Ini",
    date: "2026-05-10",
    category: "pengumuman",
    author: "[ISI: Nama penulis]",
    coverImage: "/images/blog/post-5-cover.jpg",
    excerpt: "[ISI: ringkasan singkat artikel]",
    content: "[ISI: isi lengkap artikel dalam format paragraf/markdown]",
  },
];

export function getBlogPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug);
}
