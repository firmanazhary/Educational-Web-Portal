"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import SectionBox from "../SectionBox";
import Reveal from "@/Components/home/Reveal";

const CATEGORIES = [
  { key: "adab-keseharian", label: "Adab dan Keseharian" },
  { key: "akademik", label: "Akademik" },
  { key: "deenul-islam", label: "Deenul Islam" },
  { key: "lifeskills", label: "Lifeskills" },
  { key: "kreativitas", label: "Kreativitas" },
  { key: "outdoor", label: "Outdoor" },
];

const ACTIVITIES = [
  // Adab dan Keseharian
  { category: "adab-keseharian", caption: "Mengucapkan Salam" },
  { category: "adab-keseharian", caption: "Mendoakan Teman" },
  { category: "adab-keseharian", caption: "Naik Turun Tangga" },
  { category: "adab-keseharian", caption: "Meletakkan Tas" },
  { category: "adab-keseharian", caption: "Meletakkan Sepatu" },
  { category: "adab-keseharian", caption: "Antri" },
  { category: "adab-keseharian", caption: "Merapihkan Mainan" },
  { category: "adab-keseharian", caption: "Mengangkat Tangan" },
  { category: "adab-keseharian", caption: "Adab Kamar Mandi" },
  { category: "adab-keseharian", caption: "Menjaga Kebersihan" },
  { category: "adab-keseharian", caption: "Berdoa" },
  { category: "adab-keseharian", caption: "Membuang Sampah" },
  // Akademik
  { category: "akademik", caption: "Math" },
  { category: "akademik", caption: "Science" },
  { category: "akademik", caption: "Technology" },
  { category: "akademik", caption: "Engineering" },
  { category: "akademik", caption: "Membaca" },
  { category: "akademik", caption: "Menulis" },
  { category: "akademik", caption: "Public Speaking" },
  { category: "akademik", caption: "Motorik Halus" },
  { category: "akademik", caption: "Kognitif" },
  { category: "akademik", caption: "Sensory" },
  // Deenul Islam
  { category: "deenul-islam", caption: "Mengenal Doa Harian" },
  { category: "deenul-islam", caption: "Qissoh Sahabat & Rasul" },
  { category: "deenul-islam", caption: "Praktik Wudhu" },
  { category: "deenul-islam", caption: "Praktik Sholat" },
  { category: "deenul-islam", caption: "Doa Pendek" },
  { category: "deenul-islam", caption: "Surat Pendek" },
  { category: "deenul-islam", caption: "Murojaah" },
  { category: "deenul-islam", caption: "Infaq" },
  { category: "deenul-islam", caption: "Sholat Dhuha" },
  { category: "deenul-islam", caption: "Tahsin" },
  { category: "deenul-islam", caption: "Aqidah & Akhlak" },
  { category: "deenul-islam", caption: "Hafalan Hadits" },
  // Lifeskills
  { category: "lifeskills", caption: "Fun Cooking" },
  { category: "lifeskills", caption: "Makan & Minum Sendiri" },
  { category: "lifeskills", caption: "Toilet Training" },
  { category: "lifeskills", caption: "Cuci Tangan" },
  { category: "lifeskills", caption: "Memakai Sepatu" },
  { category: "lifeskills", caption: "Menyiapkan Alat Makan" },
  { category: "lifeskills", caption: "Melipat Baju" },
  { category: "lifeskills", caption: "Menjaga Kebersihan Diri" },
  { category: "lifeskills", caption: "Menyapu" },
  // Kreativitas
  { category: "kreativitas", caption: "Painting" },
  { category: "kreativitas", caption: "Kolase" },
  { category: "kreativitas", caption: "Menggambar" },
  { category: "kreativitas", caption: "Mewarnai" },
  { category: "kreativitas", caption: "Roleplay" },
  { category: "kreativitas", caption: "Building Block" },
  { category: "kreativitas", caption: "Arts" },
  // Outdoor
  { category: "outdoor", caption: "Playground Time" },
  { category: "outdoor", caption: "Sports and Games" },
  { category: "outdoor", caption: "Bermain Sepeda" },
  { category: "outdoor", caption: "Permainan Tradisional" },
  { category: "outdoor", caption: "Aqua Play" },
  { category: "outdoor", caption: "Fieldtrip" },
  { category: "outdoor", caption: "Outbound" },
];

export default function ActivitiesSection() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const scrollerRef = useRef(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeCategory]);

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  const items =
    activeCategory === "semua"
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => a.category === activeCategory);

  return (
    <section className="relative overflow-hidden bg-[#FAF5EE] px-6 py-14 sm:py-16">
      {/* Ambient Lighting Ornaments */}
      <div className="pointer-events-none absolute top-10 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-amber-200/20 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-8 right-10 h-64 w-64 rounded-full bg-blue-900/5 blur-[100px]" />
      <div className="pointer-events-none absolute top-14 left-8 text-xl text-amber-500/30 animate-pulse">✦</div>
      <div className="pointer-events-none absolute top-20 right-10 text-sm text-amber-600/30 animate-ping" style={{ animationDuration: "3.5s" }}>✨</div>

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionBox>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#FDD000]/30 bg-gradient-to-br from-[#FFFDF7] via-[#FFFBF0] to-[#FFF6E3] p-6 shadow-xl shadow-amber-950/5 sm:p-8 md:p-10">
              
              {/* Header Title Section */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-[#B58900]">
                  <Sparkles className="h-3 w-3" />
                  <span>Aktivitas & Pembiasaan</span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <ScallopBadge n={4} />
                  <h2 className="font-serif text-3xl font-bold tracking-wide text-[#102380] sm:text-4xl">
                    Kegiatan Ananda
                  </h2>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FDD000]" />
                  <div className="h-1 w-12 rounded-full bg-[#FDD000]" />
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#FDD000]" />
                </div>
              </div>

              {/* Category Pills Navigation */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory("semua")}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    activeCategory === "semua"
                      ? "bg-[#102380] text-white shadow-md shadow-blue-950/20"
                      : "border border-amber-300/50 bg-white/70 text-[#102380]/75 hover:border-amber-400 hover:bg-white hover:text-[#102380]"
                  }`}
                >
                  Semua
                </button>
                {CATEGORIES.map((c) => {
                  const isActive = activeCategory === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setActiveCategory(c.key)}
                      className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[#102380] text-white shadow-md shadow-blue-950/20"
                          : "border border-amber-300/50 bg-white/70 text-[#102380]/75 hover:border-amber-400 hover:bg-white hover:text-[#102380]"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>

              {/* Controls Bar */}
              <div className="mt-8 flex items-center justify-between border-b border-amber-200/60 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#102380]/70">
                  Menampilkan <span className="text-[#102380] font-bold">{items.length}</span> Kegiatan
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Geser ke kiri"
                    onClick={() => scrollBy(-1)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-200 bg-white text-[#102380] shadow-sm transition-all duration-200 hover:border-[#102380] hover:bg-[#102380] hover:text-[#FDD000] active:scale-95"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Geser ke kanan"
                    onClick={() => scrollBy(1)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-200 bg-white text-[#102380] shadow-sm transition-all duration-200 hover:border-[#102380] hover:bg-[#102380] hover:text-[#FDD000] active:scale-95"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Cards Carousel */}
              <div className="relative mt-5">
                <div
                  ref={scrollerRef}
                  className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {items.map((item) => (
                    <div
                      key={`${item.category}-${item.caption}`}
                      className="group/card w-44 shrink-0 snap-start sm:w-52"
                    >
                      <div className="overflow-hidden rounded-2xl border border-amber-300/40 bg-white/80 p-2 shadow-sm transition-all duration-300 group-hover/card:-translate-y-1.5 group-hover/card:border-amber-400 group-hover/card:shadow-md group-hover/card:shadow-amber-950/10">
                        <div className="relative h-32 w-full overflow-hidden rounded-xl bg-slate-900 sm:h-36">
                          <ImagePlaceholder
                            label={`[Foto ${item.caption}]`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#102380]/60 via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="pt-2.5 pb-1 px-1">
                          <p className="text-center font-serif text-sm font-semibold text-[#102380] transition-colors group-hover/card:text-amber-700">
                            {item.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </SectionBox>
        </Reveal>
      </div>
    </section>
  );
}