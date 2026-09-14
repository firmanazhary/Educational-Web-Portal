"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Blocks, CheckCircle2, ChevronRight, Sun } from "lucide-react";
import Reveal from "@/Components/home/Reveal";
import { ARCH_PATH, PgtkIcon, SdIcon, SmaIcon, SmpIcon } from "@/Components/about/FaqSection";
import Footer from "@/Components/Footer";
import SectionBox from "@/Components/jenjang/SectionBox";

function PgIcon() {
  return <Blocks aria-hidden="true" className="h-full w-full" strokeWidth={1.6} />;
}

const JENJANG = [
  { name: "PG", subtitle: "Playgroup", icon: PgIcon },
  { name: "TK", subtitle: "Taman Kanak-kanak", icon: PgtkIcon },
  { name: "SD", subtitle: "Sekolah Dasar", icon: SdIcon },
  { name: "SMP", subtitle: "Sekolah Menengah Pertama", icon: SmpIcon },
  { name: "SMA", subtitle: "Sekolah Menengah Atas", icon: SmaIcon },
];

const CATATAN_PENTING = [
  { title: "Semua berkas", description: "Wajib dalam format PDF atau JPG, ukuran max 2MB per file." },
  { title: "Pastikan data", description: "Yang diunggah jelas dan dapat dibaca dengan baik." },
  { title: "Berkas asli", description: "Wajib dibawa saat verifikasi di sekolah." },
];

const PERSYARATAN_ITEMS_LEFT = [
  { name: "[ISI: Nama Dokumen 1]", description: "[ISI: Deskripsi/ketentuan dokumen]" },
  { name: "[ISI: Nama Dokumen 2]", description: "[ISI: Deskripsi/ketentuan dokumen]" },
  { name: "[ISI: Nama Dokumen 3]", description: "[ISI: Deskripsi/ketentuan dokumen]" },
];
const PERSYARATAN_ITEMS_RIGHT = [
  { name: "[ISI: Nama Dokumen 4]", description: "[ISI: Deskripsi/ketentuan dokumen]" },
  { name: "[ISI: Nama Dokumen 5]", description: "[ISI: Deskripsi/ketentuan dokumen]" },
  { name: "[ISI: Nama Dokumen 6]", description: "[ISI: Deskripsi/ketentuan dokumen]" },
];

// Ornamen Sudut Emas Aesthetic
function CornerOrnament({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={`w-8 h-8 text-[#FDD000]/60 ${className}`} aria-hidden="true">
      <path d="M0 0H40V2H2V40H0V0Z" fill="currentColor" />
      <path d="M6 6H24V8H8V24H6V6Z" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function PersyaratanTab({ active, Icon, name, subtitle, isDesktop }) {
  const archWidth = isDesktop ? 195 : 172;
  const archHeight = isDesktop ? 220 : 195;
  const iconSize = isDesktop ? 40 : 34;
  const sunSize = isDesktop ? 16 : 14;
  const nameSize = isDesktop ? 18 : 16;
  const subtitleSize = isDesktop ? 11.5 : 10.5;

  return (
    <div
      className="relative shrink-0 transition-transform duration-300 hover:-translate-y-1.5"
      style={{
        width: archWidth,
        height: archHeight,
        filter: active
          ? "drop-shadow(0 14px 24px rgba(13, 27, 104, 0.35))"
          : "drop-shadow(0 8px 16px rgba(0,0,0,0.06))",
      }}
    >
      <svg viewBox="0 0 245 299" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={ARCH_PATH} fill={active ? "#0D1B68" : "#FAF7F0"} />
        <path
          d={ARCH_PATH}
          fill="none"
          stroke="#FDD000"
          strokeWidth={active ? 5 : 3.5}
          transform="translate(122.5,149.5) scale(0.93) translate(-122.5,-149.5)"
        />
      </svg>

      <div className="relative flex h-full flex-col items-center px-3 text-center" style={{ paddingTop: "22%" }}>
        {active && (
          <Sun
            aria-hidden="true"
            className="relative mb-1 shrink-0 text-[#FDD000]"
            style={{ width: sunSize, height: sunSize, top: "-0.3cm" }}
          />
        )}
        <div
          className="shrink-0 transition-colors"
          style={{ width: iconSize, height: iconSize, color: active ? "#FFFFFF" : "#A38655" }}
        >
          <Icon />
        </div>
        
        <span
          className="mt-2 font-semibold leading-tight tracking-wide font-['Playfair_Display',serif]"
          style={{ fontSize: nameSize, color: active ? "#FFFFFF" : "#0D1B68" }}
        >
          {name}
        </span>

        <span
          className="mt-1 leading-tight font-medium"
          style={{
            fontSize: subtitleSize,
            color: active ? "rgba(255, 255, 255, 0.8)" : "#5C6B89",
          }}
        >
          {subtitle}
        </span>
      </div>

      <span
        className={`absolute inline-flex items-center gap-1 whitespace-nowrap font-semibold uppercase tracking-wide transition-colors ${
          active
            ? "bg-[#FDD000] text-[#0D1B68] shadow-md"
            : "border border-[#FDD000]/60 bg-transparent text-[#0D1B68]"
        }`}
        style={{
          bottom: "calc(6% + 0.2cm)",
          left: "50%",
          transform: "translateX(-50%)",
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
          fontSize: isDesktop ? 9.5 : 8.5,
          borderRadius: 6,
        }}
      >
        Lihat Persyaratan
        <ChevronRight aria-hidden="true" style={{ width: 10, height: 10 }} />
      </span>
    </div>
  );
}

export default function PersyaratanSection() {
  const [active, setActive] = useState(0);
  const ActiveIcon = JENJANG[active].icon;

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mq.matches);
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const titleRef = useRef(null);
  const [dividerTop, setDividerTop] = useState(undefined);
  useEffect(() => {
    if (titleRef.current) {
      setDividerTop(titleRef.current.offsetTop + titleRef.current.offsetHeight);
    }
  }, [active, isDesktop]);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative">
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2"
            style={{ top: isDesktop ? "-7rem" : "-5rem" }}
          >
            <img
              src="/images/admission/persyaratan-bg.png"
              alt=""
              className="h-full w-full object-cover object-top opacity-90"
            />
          </div>

          <Reveal className="relative mx-auto max-w-2xl text-center">
            <Sun aria-hidden="true" className="mx-auto h-5 w-5 text-[#FDD000]" />
            <span className="mt-2.5 block text-xs font-semibold uppercase tracking-[0.22em] text-[#D4A017]">
              PERSYARATAN PENDAFTARAN
            </span>
            
            <h2 className="mt-3 text-4xl leading-[1.15] font-semibold text-[#0D1B68] md:text-5xl font-['Playfair_Display',serif]">
              Pilih Jenjang Pendidikan
            </h2>
            
            <p className="mt-4 text-sm leading-relaxed text-[#3B497D] sm:text-base font-normal">
              Setiap jenjang memiliki persyaratan yang berbeda.
              <br />
              Silakan pilih jenjang yang sesuai untuk melihat detail persyaratan.
            </p>
          </Reveal>

          <div className="relative mx-auto mt-12 flex flex-wrap items-start justify-center gap-3 sm:gap-5 md:gap-6">
            {JENJANG.map((j, i) => {
              const isActive = active === i;
              return (
                <Reveal key={j.name} delay={i * 0.08}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="flex cursor-pointer flex-col items-center focus:outline-none"
                  >
                    <PersyaratanTab
                      active={isActive}
                      Icon={j.icon}
                      name={j.name}
                      subtitle={j.subtitle}
                      isDesktop={isDesktop}
                    />
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1} className="mt-12 w-full">
          <SectionBox>
            <div className="min-h-[420px] w-full overflow-hidden rounded-2xl">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 items-stretch">
                  
                  {/* Left Column: Aesthetic Navy Card */}
                  <div className="relative flex flex-col items-center justify-between gap-6 bg-[#0D1B68] px-6 py-8 text-center min-w-[240px] overflow-hidden">
                    {/* Background Soft Glow */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent" />
                    
                    {/* Corner Ornaments */}
                    <CornerOrnament className="absolute top-3 left-3" />
                    <CornerOrnament className="absolute bottom-3 right-3 rotate-180" />

                    {/* Header Card */}
                    <div className="relative z-10 flex w-full max-w-[220px] items-center gap-3">
                      <div className="relative shrink-0" style={{ width: 56, height: 68 }}>
                        <svg viewBox="0 0 245 299" className="absolute inset-0 h-full w-full" aria-hidden="true">
                          <path
                            d={ARCH_PATH}
                            fill="none"
                            stroke="#FDD000"
                            strokeWidth={4}
                            transform="translate(122.5,149.5) scale(0.93) translate(-122.5,-149.5)"
                          />
                        </svg>
                        <div
                          className="relative flex h-full items-center justify-center"
                          style={{ paddingTop: "22%" }}
                        >
                          <div style={{ width: 24, height: 24, color: "#ffffff" }}>
                            <ActiveIcon />
                          </div>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-2xl font-semibold text-white tracking-wide font-['Playfair_Display',serif]">
                          {JENJANG[active].name}
                        </p>
                        <p className="text-sm font-medium text-white/70">{JENJANG[active].subtitle}</p>
                      </div>
                    </div>

                    {/* Divider Sun */}
                    <div className="relative z-10 flex w-full max-w-[180px] items-center gap-3">
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FDD000]" />
                      <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-[#FDD000]" />
                      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FDD000]" />
                    </div>

                    {/* Logo Memberi Arti */}
                    <div className="relative z-10 w-full max-w-[220px]" style={{ aspectRatio: "3192 / 1468" }}>
                      <img
                        src="/images/admission/persyaratan-tagline.png"
                        alt="Memberi Arti itu Attaufiq"
                        className="h-full w-full object-contain brightness-0 invert drop-shadow-[0_4px_12px_rgba(253,208,0,0.15)]"
                      />
                    </div>

                    {/* Aesthetic Curved Dome Accent Line */}
                    <div className="relative z-10 w-full max-w-[150px] my-1 flex flex-col items-center">
                      <svg viewBox="0 0 245 80" className="w-full h-auto text-[#FDD000]" aria-hidden="true">
                        <path
                          d={ARCH_PATH}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        <path
                          d={ARCH_PATH}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          transform="translate(122.5,40) scale(0.85) translate(-122.5,-40)"
                          opacity="0.6"
                        />
                      </svg>
                    </div>

                    <Footer domeOnly className="relative z-10 w-full max-w-[160px]" />
                  </div>

                  {/* Middle Column */}
                  <div className="relative bg-[#FAF6EC] p-6 sm:p-8 lg:col-span-2 flex flex-col justify-between">
                    <div
                      className="hidden lg:block absolute w-px bg-[#FDD000]/40"
                      style={{
                        left: "calc(50% + 0.5rem)",
                        top: dividerTop !== undefined ? dividerTop + 24 : "4rem",
                        bottom: "2rem",
                      }}
                    />

                    <div>
                      <h3
                        ref={titleRef}
                        className="text-2xl text-[#0D1B68] sm:text-3xl font-semibold tracking-tight font-['Playfair_Display',serif]"
                      >
                        Persyaratan Pendaftaran {JENJANG[active].name}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                        <div className="flex flex-col gap-4">
                          {PERSYARATAN_ITEMS_LEFT.map((item) => (
                            <div key={item.name} className="flex items-start gap-3">
                              <CheckCircle2
                                aria-hidden="true"
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#FDD000]"
                              />
                              <div>
                                <p className="text-sm font-semibold text-[#0D1B68] leading-snug">{item.name}</p>
                                <p className="mt-1 text-xs leading-relaxed text-[#5C6B89]">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col gap-4">
                          {PERSYARATAN_ITEMS_RIGHT.map((item) => (
                            <div key={item.name} className="flex items-start gap-3">
                              <CheckCircle2
                                aria-hidden="true"
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#FDD000]"
                              />
                              <div>
                                <p className="text-sm font-semibold text-[#0D1B68] leading-snug">{item.name}</p>
                                <p className="mt-1 text-xs leading-relaxed text-[#5C6B89]">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="bg-[#FAF6EC] p-6 sm:p-8 lg:col-span-1 flex flex-col">
                    <div
                      className="relative flex-1 overflow-hidden rounded-2xl border p-5 flex flex-col"
                      style={{ borderColor: "rgba(253, 208, 0, 0.4)", backgroundColor: "#FAF3E0" }}
                    >
                      <img
                        src="/images/about/building-cropped.png"
                        alt=""
                        className="pointer-events-none absolute bottom-0 left-0 right-0 h-auto w-full object-cover object-bottom opacity-30"
                        style={{
                          transform: "scale(1.1) translateY(22px)",
                          transformOrigin: "bottom center",
                          WebkitMaskImage:
                            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                          maskImage:
                            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                        }}
                      />

                      <div className="relative z-10 flex flex-col gap-4">
                        <p className="text-center text-lg font-semibold text-[#0D1B68] font-['Playfair_Display',serif]">
                          Catatan Penting
                        </p>

                        <div className="flex items-center gap-2">
                          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FDD000]" />
                          <Sun aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#FDD000]" />
                          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FDD000]" />
                        </div>

                        {CATATAN_PENTING.map((item) => (
                          <div key={item.title} className="flex items-start gap-2.5">
                            <AlertCircle
                              aria-hidden="true"
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#FDD000]"
                            />
                            <div>
                              <p className="text-sm font-semibold text-[#0D1B68] leading-snug">{item.title}</p>
                              <p className="mt-0.5 text-xs leading-relaxed text-[#5C6B89]">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </SectionBox>
        </Reveal>
      </div>
    </section>
  );
}