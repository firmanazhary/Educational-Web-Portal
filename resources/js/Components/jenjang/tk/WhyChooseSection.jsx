import { Check, Sparkles } from "lucide-react";
import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import SectionBox from "../SectionBox";
import Reveal from "@/Components/home/Reveal";

const TK_CHECKLIST = [
  "Lingkungan Islami yang aman, bersih, dan penuh kasih sayang",
  "Guru profesional dan berpengalaman di bidang PAUD Islam",
  "Kurikulum terpadu: nilai Islam, akademik, dan life skill",
  "Pembiasaan ibadah dan karakter sejak dini",
  "Kolaborasi erat antara sekolah dan orang tua",
];

export default function WhyChooseSection({
  title = "Mengapa Memilih TK Attaufiq?",
  photoSrc = "/images/jenjang/pg-hero.jpg",
  checklist = TK_CHECKLIST,
}) {
  return (
    <section className="relative overflow-hidden bg-[#FAF5EE] px-6 py-14 sm:py-16">
      {/* Ambient Lighting Lembut di Luar Kotak */}
      <div className="pointer-events-none absolute top-1/2 left-8 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-300/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-6 right-10 h-60 w-60 rounded-full bg-amber-400/10 blur-[90px]" />

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionBox>
            {/* Box Utama dengan Background Kuning Keemasan Hangat */}
            <div className="relative overflow-hidden rounded-[2rem] border border-[#FDD000]/40 bg-gradient-to-br from-[#FFFDF5] via-[#FFF9E6] to-[#FFF3D1] shadow-xl shadow-amber-950/5">
              
              {/* Ornamen Bintang di Sudut Dalam */}
              <div className="pointer-events-none absolute top-4 right-4 text-xs text-amber-500/30">✦</div>
              <div className="pointer-events-none absolute bottom-4 right-4 text-xs text-amber-500/30">✦</div>

              <div className="grid grid-cols-1 items-stretch md:grid-cols-12">
                
                {/* Kolom Foto Sisi Kiri (5 kolom) dengan Inner Border Frame */}
                <div className="group relative min-h-[300px] w-full overflow-hidden sm:min-h-[360px] md:col-span-5 md:min-h-full">
                  {/* Bingkai Aksen Emas di Dalam Foto */}
                  <div className="pointer-events-none absolute inset-3 z-10 rounded-2xl border border-amber-300/40 transition-colors duration-500 group-hover:border-amber-300/70" />
                  
                  {/* Foto Utama */}
                  <img
                    src={photoSrc}
                    alt={title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay Lembut di Bawah Foto dengan #102380 */}
                  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#102380]/60 via-transparent to-transparent opacity-70" />

                  {/* Floating Badge di atas Foto */}
                  <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 rounded-xl border border-amber-400/30 bg-[#102380]/85 px-3.5 py-1.5 text-xs font-semibold text-amber-300 shadow-md backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-400" />
                    <span>Keunggulan Utama</span>
                  </div>
                </div>

                {/* Kolom Teks Sisi Kanan (7 kolom) */}
                <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-7 md:p-10 lg:p-12">
                  {/* Header Title */}
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-3">
                      <ScallopBadge n={2} />
                      <h2 className="font-serif text-2xl font-bold tracking-wide text-[#102380] sm:text-3xl">
                        {title}
                      </h2>
                    </div>
                    {/* Divider Garis Emas */}
                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="h-1 w-10 rounded-full bg-gradient-to-r from-[#FDD000] to-amber-500" />
                      <span className="text-xs text-amber-400">✦</span>
                    </div>
                  </div>

                  {/* Daftar Keunggulan */}
                  <ul className="mt-6 flex flex-col gap-3">
                    {checklist.map((item, i) => (
                      <li key={item}>
                        <Reveal delay={i * 0.08}>
                          <div className="group/item flex items-center gap-3.5 rounded-2xl border border-amber-300/40 bg-white/70 p-3 sm:p-3.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:translate-x-1.5 hover:border-amber-400 hover:bg-white/95 hover:shadow-md hover:shadow-amber-900/5">
                            {/* Icon Check Emas Bergradasi */}
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FDD000] to-amber-500 text-[#102380] shadow-sm transition-transform duration-300 group-hover/item:scale-110">
                              <Check
                                aria-hidden="true"
                                className="h-4 w-4 stroke-[3]"
                              />
                            </div>
                            {/* Deskripsi Poin */}
                            <span className="text-xs font-semibold leading-relaxed text-[#102380]/90 transition-colors duration-200 group-hover/item:text-[#102380] sm:text-sm">
                              {item}
                            </span>
                          </div>
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </SectionBox>
        </Reveal>
      </div>
    </section>
  );
}