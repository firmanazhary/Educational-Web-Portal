import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkle,
  SquarePen,
} from "lucide-react";
import { LinkButton } from "@/Components/ui/Button";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import Reveal from "@/Components/home/Reveal";
import { blogPosts } from "@/data/blog";

const BG_SRC = "/images/blog/blog-preview-bg.png";

const CATEGORY_BADGE = {
  "kegiatan-sekolah": { label: "KEGIATAN", className: "bg-[#102380] text-white" },
  pengumuman: { label: "PENGUMUMAN", className: "bg-amber-400 text-[#102380]" },
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPreview() {
  const [activeIndex, setActiveIndex] = useState(1);
  const count = blogPosts.length;
  const prevIndex = (activeIndex - 1 + count) % count;
  const nextIndex = (activeIndex + 1) % count;

  const active = blogPosts[activeIndex];
  const prev = blogPosts[prevIndex];
  const next = blogPosts[nextIndex];
  const activeBadge = CATEGORY_BADGE[active?.category] ?? CATEGORY_BADGE["kegiatan-sekolah"];
  const prevBadge = CATEGORY_BADGE[prev?.category] ?? CATEGORY_BADGE["kegiatan-sekolah"];
  const nextBadge = CATEGORY_BADGE[next?.category] ?? CATEGORY_BADGE["kegiatan-sekolah"];

  return (
    <section className="relative overflow-hidden py-20 md:py-28 font-sans">
      {/* Background Image Standard */}
      <img
        src={BG_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-10">
        {/* Left: Heading block */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-10 h-72 w-72 md:-right-2 md:h-80 md:w-80"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="#FDD000"
                strokeWidth="0.6"
                opacity="0.45"
              />
            </svg>
            {[
              { x: 88, y: 30 },
              { x: 62, y: 92 },
              { x: 8, y: 58 },
            ].map((p, i) => (
              <Sparkle
                key={i}
                className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-amber-400"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              />
            ))}
            <div
              className="absolute left-1/2 top-[6%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, #FFF6D6, #FDD000 55%, #F5B300 100%)",
                boxShadow: "0 0 46px 16px rgba(253,208,0,0.45)",
              }}
            />
          </div>

          <div className="relative">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#102380]/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#102380]">
                <SquarePen aria-hidden="true" className="h-3.5 w-3.5" />
                Sekolah Islam Attaufiq
              </span>
            </Reveal>

           <Reveal delay={0.08}>
  {/* Menggunakan font-bold (weight 700) untuk Playfair Display */}
  <h2 className="mt-5 text-[42px] leading-[1.1] md:text-[54px] md:leading-[1.05] font-semibold text-[#102380] font-['Playfair_Display',Georgia,serif]">
    <span className="block text-[#102380]">Berita</span>
    <span className="block text-amber-400">Terbaru</span>
    <span className="block text-[#102380]">Attaufiq</span>
  </h2>
</Reveal>

            <Reveal delay={0.16}>
              <div className="my-6 flex max-w-[220px] items-center gap-3">
                <span className="h-px flex-1 border-t border-dashed border-amber-400/50" />
                <Sparkle aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-400" />
                <span className="h-px flex-1 border-t border-dashed border-amber-400/50" />
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="max-w-xs text-[#102380]/70 text-sm md:text-base">
                Ikuti kegiatan, informasi, dan kabar terbaru dari keluarga
                besar At-Taufiq.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-8">
                <LinkButton href="/blog" variant="navy">
                  Lihat Berita Lainnya
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </LinkButton>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right: Carousel */}
        <Reveal delay={0.2}>
          <div className="flex items-start justify-center gap-4 md:gap-6">
            {/* Card Kiri (Prev) */}
            <button
              type="button"
              onClick={() => setActiveIndex(prevIndex)}
              aria-label={`Lihat berita sebelumnya: ${prev?.title}`}
              className="group w-36 shrink-0 text-left sm:w-44 md:w-48"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-md shadow-[#102380]/10 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="relative aspect-[4/5] w-full">
                  <ImagePlaceholder label="" className="h-full w-full" />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide ${prevBadge.className}`}
                  >
                    {prevBadge.label}
                  </span>
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#102380] shadow">
                    <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-amber-500">
                    <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                    {formatDate(prev?.date)}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-[#102380]">
                    {prev?.title}
                  </p>
                </div>
              </div>
            </button>

            {/* Card Tengah (Active) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active?.slug || activeIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-52 shrink-0 sm:w-60 md:w-64"
              >
                <a
                  href={`/blog/${active?.slug}`}
                  className="block overflow-hidden rounded-[1.75rem] border-2 border-amber-400 bg-[#102380] shadow-xl shadow-[#102380]/20"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <ImagePlaceholder label="" className="h-full w-full" />
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide ${activeBadge.className}`}
                    >
                      {activeBadge.label}
                    </span>
                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-amber-400 shadow">
                      <Sparkle aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="bg-[#102380] p-5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
                      <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                      {formatDate(active?.date)}
                    </div>
                    <p className="mt-2 line-clamp-2 text-base font-bold leading-snug text-white">
                      {active?.title}
                    </p>
                    <ArrowRight aria-hidden="true" className="mt-4 h-4 w-4 text-white" />
                  </div>
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Card Kanan (Next) */}
            <button
              type="button"
              onClick={() => setActiveIndex(nextIndex)}
              aria-label={`Lihat berita berikutnya: ${next?.title}`}
              className="group w-36 shrink-0 text-left sm:w-44 md:w-48"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-md shadow-[#102380]/10 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="relative aspect-[4/5] w-full">
                  <ImagePlaceholder label="" className="h-full w-full" />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide ${nextBadge.className}`}
                  >
                    {nextBadge.label}
                  </span>
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#102380] shadow">
                    <ChevronRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-amber-500">
                    <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                    {formatDate(next?.date)}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-[#102380]">
                    {next?.title}
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Dots Pagination */}
          <div className="mt-8 flex justify-center gap-2">
            {blogPosts.map((post, i) => (
              <button
                key={post.slug || i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Lihat berita ${post.title}`}
                aria-current={i === activeIndex}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-amber-400" : "w-2.5 bg-[#102380]/20"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
