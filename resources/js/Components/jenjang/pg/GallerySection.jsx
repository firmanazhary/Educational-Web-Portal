"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, X, ZoomIn } from "lucide-react";
import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import SectionBox from "../SectionBox";
import Reveal from "@/Components/home/Reveal";

const GALLERY_ITEMS = [
  { id: 1, title: "Pembiasaan Sholat Dhuha Berjamaah", category: "Deenul Islam" },
  { id: 2, title: "Eksplorasi Sains & Motorik Halus", category: "Akademik" },
  { id: 3, title: "Kegiatan Kreatif Melipat & Mewarnai", category: "Kreativitas" },
  { id: 4, title: "Bermain Seru di Area Playground Outdoor", category: "Outdoor" },
  { id: 5, title: "Praktek Kemandirian & Adab Makan Bersama", category: "Lifeskills" },
  { id: 6, title: "Dongeng Kisah Teladan Rasulullah & Sahabat", category: "Adab & Karakter" },
];

export default function GallerySection() {
  const scrollerRef = useRef(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const scrollBy = (dir) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: dir * 310, behavior: "smooth" });
  };

  // Keyboard accessibility (ESC, Panah Kiri, Panah Kanan)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") setSelectedPhotoIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : GALLERY_ITEMS.length - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) => (prev < GALLERY_ITEMS.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex]);

  // Kunci scroll body saat modal aktif agar halaman tidak ikut bergeser
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPhotoIndex]);

  const selectedItem = selectedPhotoIndex !== null ? GALLERY_ITEMS[selectedPhotoIndex] : null;

  return (
    <section className="relative overflow-hidden bg-[#FAF5EE] px-6 py-14 sm:py-16">
      {/* Ambient Lighting Ornaments */}
      <div className="pointer-events-none absolute top-10 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-amber-200/20 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-8 left-10 h-64 w-64 rounded-full bg-blue-900/5 blur-[100px]" />
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
                  <span>Dokumentasi & Kenangan</span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <ScallopBadge n={7} />
                  <h2 className="font-serif text-3xl font-bold tracking-wide text-[#102380] sm:text-4xl">
                    Galeri Kegiatan Ananda
                  </h2>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FDD000]" />
                  <div className="h-1 w-12 rounded-full bg-[#FDD000]" />
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#FDD000]" />
                </div>
              </div>

              {/* Carousel Container */}
              <div className="relative mt-10">
                {/* Tombol Panah Kiri */}
                <button
                  type="button"
                  aria-label="Geser ke kiri"
                  onClick={() => scrollBy(-1)}
                  className="absolute top-1/2 left-2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/60 bg-white/95 text-[#102380] shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-[#102380] hover:text-[#FDD000] active:scale-95 sm:left-3"
                >
                  <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
                </button>

                {/* Kontainer Scroll Foto */}
                <div
                  ref={scrollerRef}
                  className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-3 px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {GALLERY_ITEMS.map((item, i) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPhotoIndex(i)}
                      className="group/item relative w-64 shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl border border-amber-300/40 bg-white/80 p-2 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-950/15 sm:w-72"
                    >
                      <div className="relative h-56 w-full overflow-hidden rounded-xl bg-slate-900 sm:h-60">
                        <div className="pointer-events-none absolute inset-2.5 z-10 rounded-lg border border-amber-300/30 transition-colors duration-300 group-hover/item:border-amber-300/80" />

                        <ImagePlaceholder
                          label={`[Foto ${item.title}]`}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-105"
                        />

                        {/* Hover Overlay Zoom */}
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#102380]/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/item:opacity-100">
                          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#102380] shadow-md transition-transform duration-200 group-hover/item:scale-110">
                            <ZoomIn className="h-5 w-5" />
                          </span>
                        </div>

                        {/* Badge Kategori */}
                        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-[#102380]/85 px-3 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-md">
                          <span>0{i + 1}</span>
                          <span className="text-white/40">•</span>
                          <span>{item.category}</span>
                        </div>
                      </div>

                      <div className="px-2 pt-3 pb-1.5">
                        <p className="font-serif text-sm font-semibold text-[#102380] truncate transition-colors group-hover/item:text-amber-700">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tombol Panah Kanan */}
                <button
                  type="button"
                  aria-label="Geser ke kanan"
                  onClick={() => scrollBy(1)}
                  className="absolute top-1/2 right-2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/60 bg-white/95 text-[#102380] shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-[#102380] hover:text-[#FDD000] active:scale-95 sm:right-3"
                >
                  <ChevronRight className="h-6 w-6 stroke-[2.5]" />
                </button>
              </div>

            </div>
          </SectionBox>
        </Reveal>
      </div>

      {/* --- POP-UP MODAL / LIGHTBOX (Diatas Header & Pas 100vh) --- */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center bg-[#071330]/85 p-4 sm:p-6 backdrop-blur-md transition-all animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Card Modal: Compact (max-w-xl), tinggi maksimal 85vh */}
          <div
            className="relative flex w-full max-w-xl max-h-[85vh] flex-col overflow-hidden rounded-3xl border border-amber-400/40 bg-white shadow-2xl shadow-black/60 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close */}
            <button
              type="button"
              onClick={() => setSelectedPhotoIndex(null)}
              aria-label="Tutup foto"
              className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-[#102380]/80 text-white backdrop-blur-md transition-transform hover:scale-105 hover:bg-[#102380]"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Frame Foto Pop-up */}
            <div className="relative h-56 sm:h-64 md:h-72 w-full shrink-0 bg-slate-950">
              <ImagePlaceholder
                label={`[Foto ${selectedItem.title}]`}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

              {/* Tombol Navigasi Kiri */}
              <button
                type="button"
                aria-label="Foto sebelumnya"
                onClick={() =>
                  setSelectedPhotoIndex((prev) =>
                    prev > 0 ? prev - 1 : GALLERY_ITEMS.length - 1
                  )
                }
                className="absolute top-1/2 left-3 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#102380] shadow-md backdrop-blur-sm transition-all hover:bg-white active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Tombol Navigasi Kanan */}
              <button
                type="button"
                aria-label="Foto berikutnya"
                onClick={() =>
                  setSelectedPhotoIndex((prev) =>
                    prev < GALLERY_ITEMS.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute top-1/2 right-3 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#102380] shadow-md backdrop-blur-sm transition-all hover:bg-white active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Keterangan & Caption Foto */}
            <div className="flex flex-col gap-1.5 overflow-y-auto bg-[#FFFDF7] p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-400/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  {selectedItem.category}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Foto 0{selectedPhotoIndex + 1} dari 0{GALLERY_ITEMS.length}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold leading-snug text-[#102380] sm:text-xl">
                {selectedItem.title}
              </h3>

              <p className="text-xs text-slate-600 sm:text-sm leading-relaxed">
                Dokumentasi aktivitas pembelajaran bermakna dan menyenangkan siswa di Sekolah Islam Terpadu At-Taufiq.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}