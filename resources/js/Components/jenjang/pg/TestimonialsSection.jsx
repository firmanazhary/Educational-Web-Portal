"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Sparkles, User } from "lucide-react";
import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import Reveal from "@/Components/home/Reveal";

function Avatar() {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#102380]/10 border border-[#FDD000]/40 shadow-sm transition-transform duration-300 group-hover/card:scale-110">
      <User className="h-6 w-6 text-[#102380]/70" aria-hidden="true" />
    </div>
  );
}

const PG_TESTIMONIALS = [
  {
    quote:
      "Anak kami sekarang lebih mandiri, berani, dan senang beribadah. Terima kasih PG Attaufiq yang membimbing dengan penuh cinta.",
    name: "Bunda Aisyah",
    relation: "Orang Tua dari Aqeela (PG B)",
  },
  {
    quote:
      "Lingkungannya sangat Islami dan guru-gurunya luar biasa sabar. Anak kami betah setiap hari berangkat sekolah.",
    name: "Bunda Rina",
    relation: "Orang Tua dari Zayn (PG A)",
  },
  {
    quote:
      "Programnya seimbang antara belajar dan bermain, Anak kami berkembang pesat di sini.",
    name: "Bunda Nana",
    relation: "Orang Tua dari Khalid (PG B)",
  },
  {
    quote:
      "Kami sangat bersyukur menyekolahkan anak di sini. Pendekatan guru yang hangat membuat proses belajar terasa menyenangkan.",
    name: "Bunda Laras",
    relation: "Orang Tua dari Yusuf (PG A)",
  },
];

export default function TestimonialsSection({
  testimonials = PG_TESTIMONIALS,
}) {
  const [activeCard, setActiveCard] = useState(0);
  const scrollerRef = useRef(null);

  const scrollByCard = (dir) => {
    if (!scrollerRef.current) return;
    const scrollAmount = 350; // Perkiraan lebar satu card
    scrollerRef.current.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
  };

  // Autoplay (Opsional)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => {
        const next = (prev + 1) % testimonials.length;
        if (scrollerRef.current) {
          const cardWidth = scrollerRef.current.scrollWidth / testimonials.length;
          scrollerRef.current.scrollTo({ left: next * cardWidth, behavior: "smooth" });
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative overflow-hidden bg-[#FAF5EE] px-6 py-14 sm:py-16">
      {/* Ambient Visual Ornaments */}
      <div className="pointer-events-none absolute top-10 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-amber-200/25 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-8 right-10 h-64 w-64 rounded-full bg-blue-900/5 blur-[100px]" />
      <div className="pointer-events-none absolute top-14 left-8 text-xl text-amber-500/25 animate-pulse">✦</div>
      <div className="pointer-events-none absolute top-20 right-10 text-sm text-amber-600/25 animate-ping" style={{ animationDuration: "3.5s" }}>✨</div>

      <div className="mx-auto max-w-6xl">
        {/* Header Title Section */}
        <Reveal className="flex flex-col items-center justify-center text-center">
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-[#B58900]">
            <Sparkles className="h-3 w-3" />
            <span>Kesan & Pengalaman Nyata</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <ScallopBadge n={6} />
            <h2 className="font-serif text-3xl font-bold tracking-wide text-[#102380] sm:text-4xl">
              Apa Kata Orang Tua?
            </h2>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FDD000]" />
            <div className="h-1 w-12 rounded-full bg-[#FDD000]" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#FDD000]" />
          </div>
        </Reveal>

        {/* Carousel Section */}
        <div className="relative mt-12">
          {/* Scrollable Container dengan Snapping */}
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto py-4 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={() => {
              if (!scrollerRef.current) return;
              const { scrollLeft, scrollWidth } = scrollerRef.current;
              const cardWidth = scrollWidth / testimonials.length;
              const index = Math.round(scrollLeft / cardWidth);
              if (index >= 0 && index < testimonials.length) {
                setActiveCard(index);
              }
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="group/card w-full shrink-0 snap-center md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="relative flex h-full min-h-[220px] flex-col justify-between rounded-3xl border border-amber-300/40 bg-white/85 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:bg-white hover:shadow-md hover:shadow-amber-950/10">
                  
                  {/* Bagian Atas: Icon Quote & Teks */}
                  <div>
                    <div className="flex items-center justify-between">
                      <Quote
                        className="h-7 w-7 -scale-x-100 text-[#FDD000] drop-shadow-sm transition-transform duration-300 group-hover/card:scale-105"
                        fill="currentColor"
                        aria-hidden="true"
                      />
                      <span className="text-[10px] font-semibold tracking-widest text-[#102380]/40 uppercase">
                        Testimoni
                      </span>
                    </div>
                    
                    <p className="mt-4 text-sm font-medium leading-relaxed text-[#102380]/85 group-hover/card:text-[#102380] transition-colors">
                      “{t.quote}”
                    </p>
                  </div>

                  {/* Bagian Bawah: Data Orang Tua */}
                  <div className="mt-6 flex items-center gap-3 border-t border-amber-200/60 pt-4">
                    <Avatar />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#102380]">
                        {t.name}
                      </h4>
                      <p className="text-xs font-semibold text-amber-600">
                        {t.relation}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Carousel Buttons (Kiri & Kanan) */}
          <div className="absolute top-1/2 left-0 right-0 z-10 flex -translate-y-1/2 justify-between pointer-events-none px-2 lg:-mx-4">
            <button
              type="button"
              aria-label="Geser ke kiri"
              onClick={() => scrollByCard(-1)}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/30 bg-white/90 text-[#102380] shadow-md transition-all hover:border-[#102380] hover:bg-[#102380] hover:text-[#FDD000] active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Geser ke kanan"
              onClick={() => scrollByCard(1)}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/30 bg-white/90 text-[#102380] shadow-md transition-all hover:border-[#102380] hover:bg-[#102380] hover:text-[#FDD000] active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Indicators (Dots) */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Lihat ulasan ${i + 1}`}
              onClick={() => {
                setActiveCard(i);
                if (scrollerRef.current) {
                  const cardWidth = scrollerRef.current.scrollWidth / testimonials.length;
                  scrollerRef.current.scrollTo({ left: i * cardWidth, behavior: "smooth" });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeCard ? "w-6 bg-[#102380]" : "w-2 bg-amber-300/60 hover:bg-amber-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}