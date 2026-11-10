import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Sun,
  X,
} from "lucide-react";

const ASSET_NAVY = "#002672";
const FALLBACK_IMAGE = "/images/hero/hero-slide-1-tahfizh-malam.jpg";

const resolveImageUrl = (path) => {
  if (!path) return FALLBACK_IMAGE;
  if (path.startsWith("http") || path.startsWith("/images") || path.startsWith("/storage") || path.startsWith("data:")) {
    return path;
  }
  return `/storage/${path}`;
};

function galleryFor(program) {
  const list = [];
  if (program?.image) {
    list.push(resolveImageUrl(program.image));
  }
  if (Array.isArray(program?.gallery) && program.gallery.length > 0) {
    program.gallery.forEach((img) => {
      if (img && typeof img === "string") {
        const url = resolveImageUrl(img);
        if (!list.includes(url)) {
          list.push(url);
        }
      }
    });
  }
  if (list.length === 0) {
    return [
      "/images/hero/hero-slide-1-tahfizh-malam.jpg",
      "/images/hero/hero-slide-2-metode-modern.jpg",
      "/images/hero/hero-slide-3-kebersamaan.jpg",
    ];
  }
  return list;
}

export default function ProgramModal({ program, onClose, onNext }) {
  const [activeImage, setActiveImage] = useState(0);
  const gallery = galleryFor(program);

  // Reset index foto ketika berpindah program
  useEffect(() => {
    setActiveImage(0);
  }, [program?.id, program?.slug]);

  const goPrev = () => setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);
  const goNext = () => setActiveImage((i) => (i + 1) % gallery.length);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, gallery.length]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col">
      {/* Top bar */}
      <div
        className="flex shrink-0 items-center px-6 py-4 sm:px-10"
        style={{ backgroundColor: ASSET_NAVY }}
      >
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke Daftar Program
        </button>
      </div>

      {/* Scrim */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-y-auto bg-navy/60 px-4 py-8 sm:px-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative grid w-full max-w-[83rem] gap-10 rounded-3xl bg-ivory p-8 shadow-2xl md:grid-cols-[1.15fr_1fr] md:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:bg-navy/5"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Gallery Slider */}
          <div className="flex flex-col">
            <div className="relative overflow-hidden rounded-2xl bg-navy/5 shadow-md">
              <img
                key={gallery[activeImage]}
                src={gallery[activeImage]}
                alt={`${program.title} - Foto ${activeImage + 1}`}
                className="aspect-[4/3] w-full object-cover transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />

              {/* Tombol Perbesar Foto */}
              <button
                type="button"
                onClick={() => window.open(gallery[activeImage], "_blank")}
                aria-label="Perbesar foto"
                title="Buka foto ukuran penuh"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-gold text-navy shadow-md hover:bg-gold/90 transition-transform active:scale-95"
              >
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              </button>

              {/* Tombol Prev & Next */}
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Foto sebelumnya"
                    className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-navy/80 text-white backdrop-blur-sm transition-all hover:bg-navy hover:scale-105 active:scale-95 shadow-md"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Foto berikutnya"
                    className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-navy/80 text-white backdrop-blur-sm transition-all hover:bg-navy hover:scale-105 active:scale-95 shadow-md"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}

              {/* Counter Badge */}
              <span className="absolute bottom-3 left-3 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm shadow-sm">
                {activeImage + 1} / {gallery.length}
              </span>
            </div>

            {/* Thumbnail Strip */}
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
                {gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Lihat foto ${i + 1}`}
                    className={`relative shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      i === activeImage
                        ? "border-gold ring-2 ring-gold/40 scale-105 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${i + 1}`}
                      className="h-16 w-20 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Dot Indicators */}
            {gallery.length > 1 && (
              <div className="mt-3 flex justify-center gap-1.5">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Ke foto ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeImage ? "w-5 bg-gold" : "w-1.5 bg-navy/20 hover:bg-navy/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit items-center rounded-full border border-gold/60 px-3 py-1 text-xs font-semibold text-navy">
              {program.jenjang || "PG–SMA"}
            </span>

            <h2 className="font-heading mt-4 text-4xl text-navy sm:text-5xl">{program.title}</h2>

            <div className="mt-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-gold/50" />
              <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
              <span className="h-px flex-1 bg-gold/50" />
            </div>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-navy/80">
              {Array.isArray(program.description) ? (
                program.description.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>{program.description || program.content}</p>
              )}
            </div>

            {Array.isArray(program.highlights) && program.highlights.length > 0 && (
              <ul className="mt-6 space-y-3">
                {program.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-navy/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-navy">
                      <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={onNext}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-3xl bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-dark md:mt-auto shadow-md"
            >
              Next Programs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            {program.slug && (
              <div className="mt-3 flex justify-center">
                <Link
                  href={route("events.show", program.slug)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-navy/70 hover:text-gold transition-colors"
                >
                  <span>Lihat Halaman Detail Lengkap</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

