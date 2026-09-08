import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Sparkle, Star, UsersRound } from "lucide-react";
import Reveal from "@/Components/home/Reveal";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import { testimonials } from "@/data/testimonials";

const BG_SRC = "/images/testimonials/testimonial-bg.png";

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  return (
    <section className="relative overflow-hidden py-20 md:py-28 font-sans">
      {/* Background Image Standard */}
      <img
        src={BG_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          {/* Judul Utama dengan Presisi CSS Inspector */}
          <h2 className="text-center font-semibold text-[36px] leading-[45px] md:text-[48px] md:leading-[60px] text-[#102380] font-['Playfair_Display',Georgia,serif]">
            Kepercayaan Anda, Amanah Terbesar Kami
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[#102380]/70 font-normal leading-relaxed text-sm md:text-base">
            Melalui testimoni ini, Anda dapat melihat pengalaman nyata dan
            kesan positif dari para orang tua serta siswa yang telah
            merasakan lingkungan belajar Islami, pembelajaran yang terarah,
            dan pendampingan penuh perhatian di At-Taufiq.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-16 md:grid-cols-2 md:items-start md:gap-14">
          {/* Kolom Kiri: Testimoni Teks */}
          <Reveal delay={0.16} className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[7rem_3rem_2.5rem_9rem/9rem_2.5rem_7rem_3rem] bg-white/50 shadow-lg shadow-[#102380]/5 md:-inset-10"
            />

            <div className="relative">
              {/* Tanda Petik (Kutipan) */}
              <p className="text-7xl leading-none text-[#102380] font-['Playfair_Display',Georgia,serif]">
                &ldquo;
              </p>

              {/* Judul Sub-Section */}
              <h3 className="mt-2 font-semibold text-3xl leading-tight text-[#102380] md:text-4xl font-['Playfair_Display',Georgia,serif]">
                Apa kata
                <br />
                Alumni/Wali Santri
              </h3>

              <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 border-t border-dashed border-amber-400/60" />
                <Sparkle aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-400" />
                <span className="h-px flex-1 border-t border-dashed border-amber-400/60" />
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="rounded-2xl bg-white p-6 shadow-lg shadow-[#102380]/10"
                  >
                    <div className="flex gap-1">
                      {Array.from({ length: active?.rating || 5 }).map((_, i) => (
                        <Star
                          key={i}
                          aria-hidden="true"
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#102380]/80">
                      {active?.quote}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <ImagePlaceholder
                        label={active?.name}
                        className="h-12 w-12 shrink-0 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-bold text-[#102380]">
                          {active?.name}
                        </p>
                        <p className="text-xs text-[#102380]/60">{active?.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <p
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-5 -right-3 text-6xl leading-none text-[#102380]/15 font-['Playfair_Display',Georgia,serif]"
                >
                  &rdquo;
                </p>
              </div>

              <div className="mt-6 flex gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name || i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Lihat testimoni ${t.name}`}
                    aria-current={i === activeIndex}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-6 bg-[#102380]" : "w-2.5 bg-[#102380]/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Kolom Kanan: Testimoni Video/Gambar */}
          <Reveal delay={0.24} className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] shadow-xl">
              <ImagePlaceholder
                label="Foto/video testimoni — keluarga di area sekolah"
                className="h-full w-full"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#102380]/90 shadow-lg">
                  <Play
                    aria-hidden="true"
                    className="ml-1 h-6 w-6 fill-white text-white"
                  />
                </span>
              </div>
            </div>

            <div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-2xl bg-[#102380] px-4 py-3 text-white shadow-xl">
              <UsersRound aria-hidden="true" className="h-6 w-6 shrink-0 text-amber-400" />
              <p className="text-sm leading-tight">
                <span className="block text-lg font-bold">1000+</span>
                <span className="block text-xs text-white/75">
                  Testimoni dari orang tua
                  <br />
                  dan alumni At-Taufiq
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
