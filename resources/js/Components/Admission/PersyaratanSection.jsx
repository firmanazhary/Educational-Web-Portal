import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Blocks, CheckCircle2, ChevronRight, Sun } from "lucide-react";
import Reveal from "@/Components/home/Reveal";
import { ARCH_PATH, PgtkIcon, SdIcon, SmaIcon, SmpIcon } from "@/Components/about/FaqSection";
import { FooterArchLineArt } from "@/Components/Footer";
import SectionBox from "@/Components/jenjang/SectionBox";

function PgIcon() {
  return <Blocks aria-hidden="true" className="h-full w-full" strokeWidth={1.6} />;
}

const JENJANG = [
  {
    name: "PG",
    subtitle: "Playgroup",
    icon: PgIcon,
    theme: { navy: true },
  },
  {
    name: "TK",
    subtitle: "Taman Kanak-Kanak",
    icon: PgtkIcon,
    theme: { navy: true },
  },
  {
    name: "SD",
    subtitle: "Sekolah Dasar",
    icon: SdIcon,
    theme: { navy: true },
  },
  {
    name: "SMP",
    subtitle: "Sekolah Menengah Pertama",
    icon: SmpIcon,
    theme: { navy: true },
  },
  {
    name: "SMA",
    subtitle: "Sekolah Menengah Atas",
    icon: SmaIcon,
    theme: { navy: true },
  },
];

const PERSYARATAN_ITEMS_LEFT = [
  {
    name: "Fotokopi Akta Kelahiran",
    description: "Dokumen resmi, jelas, dan terbaca",
  },
  {
    name: "Fotokopi Kartu Keluarga (KK)",
    description: "Terbaru dan sesuai domisili",
  },
  {
    name: "Fotokopi KTP Orang Tua",
    description: "Ayah dan Ibu masing-masing 1 lembar",
  },
];

const PERSYARATAN_ITEMS_RIGHT = [
  {
    name: "Pas Foto Berwarna Terbaru",
    description: "Ukuran standar sekolah",
  },
  {
    name: "Surat Keterangan dari Sekolah Asal",
    description: "Sesuai jenjang yang didaftar",
  },
  {
    name: "Formulir Pendaftaran",
    description: "Telah diisi lengkap",
  },
];

const CATATAN_PENTING = [
  {
    title: "Dokumen Asli",
    description: "Harap membawa dokumen asli saat verifikasi berkas",
  },
  {
    title: "Kelengkapan Berkas",
    description: "Berkas yang tidak lengkap dapat memperlambat proses seleksi",
  },
  {
    title: "Format Digital",
    description: "Pendaftaran online memerlukan scan dokumen dalam format PDF/JPG",
  },
];

function PersyaratanTab({
  active,
  Icon,
  name,
  subtitle,
}) {
  return (
    <>
      {/* ================= MOBILE VIEW (< sm) ================= */}
      {/* Compact arch with Icon + Name only (NO subtitle, NO button), perfectly fitting 5 in a row */}
      <div
        className={`relative mx-auto w-full aspect-[245/299] shrink-0 sm:hidden transition-all duration-200 ${
          active
            ? "drop-shadow-[0_8px_14px_rgba(16,35,128,0.35)] scale-105 z-10"
            : "drop-shadow-[0_4px_8px_rgba(16,35,128,0.15)] opacity-95"
        }`}
      >
        <svg viewBox="0 0 245 299" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d={ARCH_PATH} fill={active ? "#102380" : "#FAF8F4"} />
          <path
            d={ARCH_PATH}
            fill="none"
            stroke="#FDD000"
            strokeWidth={active ? 6 : 3.5}
            transform="translate(122.5,149.5) scale(0.93) translate(-122.5,-149.5)"
          />
        </svg>
        <div className="relative flex h-full flex-col items-center justify-center pt-[22%] text-center px-0.5">
          <div
            className="h-5 w-5 shrink-0"
            style={{ color: active ? "#ffffff" : "#102380" }}
          >
            <Icon />
          </div>
          <span
            className={`font-heading mt-1 text-[11px] sm:text-xs font-bold leading-none ${
              active ? "text-white" : "text-navy"
            }`}
          >
            {name}
          </span>
        </div>
      </div>

      {/* ================= DESKTOP VIEW (>= sm) ================= */}
      {/* Full arch with Icon, Name, Subtitle, and properly spaced Lihat Button without collisions */}
      <div
        className={`relative hidden sm:flex flex-col items-center shrink-0 aspect-[245/299] transition-all duration-300 ${
          active
            ? "w-36 md:w-40 lg:w-44 -translate-y-2 z-10 drop-shadow-[0_14px_24px_rgba(16,35,128,0.35)]"
            : "w-30 sm:w-32 md:w-36 lg:w-38 drop-shadow-[0_8px_16px_rgba(16,35,128,0.18)] hover:-translate-y-1 opacity-95"
        }`}
      >
        <svg viewBox="0 0 245 299" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d={ARCH_PATH} fill={active ? "#102380" : "#FAF8F4"} />
          <path
            d={ARCH_PATH}
            fill="none"
            stroke="#FDD000"
            strokeWidth={active ? 5 : 3.5}
            transform="translate(122.5,149.5) scale(0.93) translate(-122.5,-149.5)"
          />
        </svg>

        <div className="relative flex h-full w-full flex-col items-center px-2 pt-[22%] text-center">
          {active && (
            <Sun
              aria-hidden="true"
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 h-5 w-5 text-gold shrink-0 drop-shadow-xs"
            />
          )}
          <div
            className="h-7 w-7 sm:h-8 sm:w-8 shrink-0"
            style={{ color: active ? "#ffffff" : "#102380" }}
          >
            <Icon />
          </div>
          <span
            className={`font-heading mt-1.5 sm:mt-2 text-base sm:text-lg font-bold leading-none ${
              active ? "text-white" : "text-navy"
            }`}
          >
            {name}
          </span>
          <span
            className={`mt-1 text-[11px] sm:text-xs leading-tight max-w-[125px] px-1 line-clamp-2 ${
              active ? "text-white/80" : "text-navy/60"
            }`}
          >
            {subtitle}
          </span>

          {/* Button is pinned at bottom with guaranteed vertical distance from subtitle */}
          <span
            className={`absolute bottom-3 sm:bottom-4 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
              active
                ? "bg-gold text-navy shadow-sm"
                : "border border-gold/50 text-navy hover:bg-gold/10"
            }`}
          >
            Lihat
            <ChevronRight aria-hidden="true" className="h-3 w-3" />
          </span>
        </div>
      </div>
    </>
  );
}

export default function PersyaratanSection() {
  const [active, setActive] = useState(0);

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const ActiveIcon = JENJANG[active].icon;

  const titleRef = useRef(null);
  const [dividerTop, setDividerTop] = useState();
  useEffect(() => {
    const el = titleRef.current;
    if (el) {
      setDividerTop(el.offsetTop + el.offsetHeight);
    }
  }, [active]);

  return (
    <section className="relative overflow-hidden bg-ivory py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="relative">
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2"
            style={{ top: isDesktop ? "-7rem" : "-5rem" }}
          >
            <img
              src="/images/admission/persyaratan-bg.png"
              alt=""
              className="h-full w-full object-cover object-top"
            />
          </div>

          <Reveal className="relative mx-auto max-w-2xl text-center">
            <Sun aria-hidden="true" className="mx-auto h-5 w-5 text-gold" />
            <span className="mt-3 block text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Persyaratan Pendaftaran
            </span>
            <h2 className="font-heading mt-4 text-4xl leading-[1.1] text-navy md:text-5xl">
              Pilih Jenjang Pendidikan
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-navy/70 sm:text-base">
              Setiap jenjang memiliki persyaratan yang berbeda.
              <br />
              Silakan pilih jenjang yang sesuai untuk melihat detail persyaratan.
            </p>
          </Reveal>

          <div
            className="relative mt-8 grid grid-cols-5 items-start gap-1.5 sm:mx-auto sm:mt-12 sm:flex sm:justify-center sm:items-end sm:gap-4 md:gap-5 lg:gap-6 lg:-mx-[min(4cm,calc((100vw-100%)/2-1rem))]"
          >
            {JENJANG.map((j, i) => {
              const isActive = active === i;
              return (
                <Reveal key={j.name} delay={i * 0.08} className="min-w-0 sm:shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="persyaratan-tab-btn flex w-full cursor-pointer flex-col items-center focus:outline-none"
                  >
                    <PersyaratanTab
                      active={isActive}
                      Icon={j.icon}
                      name={j.name}
                      subtitle={j.subtitle}
                    />
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal
          delay={0.1}
          className="mt-10 lg:-mx-[min(4cm,calc((100vw-100%)/2-1rem))]"
        >
          <SectionBox>
            <motion.div
              key={active}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-4">
                <div className="flex flex-col items-center gap-6 bg-navy px-6 py-5 text-center lg:pb-0 lg:pt-8">
                  <div className="flex w-full max-w-[220px] items-center gap-3">
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
                      <p className="font-heading text-2xl font-bold text-white">
                        {JENJANG[active].name}
                      </p>
                      <p className="text-sm text-white/60">{JENJANG[active].subtitle}</p>
                    </div>
                  </div>

                  <div className="hidden w-full max-w-[180px] items-center gap-3 lg:flex">
                    <span
                      className="h-px flex-1"
                      style={{ background: "linear-gradient(to right, transparent, #FDD000)" }}
                    />
                    <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
                    <span
                      className="h-px flex-1"
                      style={{ background: "linear-gradient(to right, #FDD000, transparent)" }}
                    />
                  </div>

                  <div className="relative hidden w-full max-w-[220px] lg:block" style={{ aspectRatio: "3192 / 1468" }}>
                    <img
                      src="/images/admission/persyaratan-tagline.png"
                      alt="Memberi Arti itu Attaufiq"
                      className="h-full w-full object-contain"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>

                  <FooterArchLineArt domeOnly className="hidden w-full max-w-[160px] lg:block" />
                </div>

                <div className="relative p-6 sm:p-8 lg:col-span-2">
                  <div
                    className="absolute hidden w-px bg-gold/30 sm:block"
                    style={{
                      left: "calc(50% + 1cm)",
                      top: dividerTop !== undefined ? dividerTop + 37.7952755906 : undefined,
                      bottom: "1.5cm",
                    }}
                  />

                  <h3
                    ref={titleRef}
                    className="font-heading text-2xl text-navy sm:text-3xl"
                  >
                    Persyaratan Pendaftaran {JENJANG[active].name}
                  </h3>

                  <div className="mt-4 flex flex-col gap-3 sm:mt-[1cm] sm:flex-row sm:gap-8">
                    <div
                      className="flex w-full flex-col sm:w-[calc(50%+1cm-1rem)]"
                      style={{ gap: isDesktop ? "calc(1rem + 0.5cm)" : "0.75rem" }}
                    >
                      {PERSYARATAN_ITEMS_LEFT.map((item) => (
                        <div key={item.name} className="flex items-start gap-2.5">
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          />
                          <div>
                            <p className="text-sm font-semibold text-navy">{item.name}</p>
                            <p className="mt-0.5 text-sm leading-relaxed text-navy/70 lg:text-xs">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      className="flex w-full flex-col sm:w-[calc(50%-1cm-1rem)]"
                      style={{ gap: isDesktop ? "calc(1rem + 0.5cm)" : "0.75rem" }}
                    >
                      {PERSYARATAN_ITEMS_RIGHT.map((item) => (
                        <div key={item.name} className="flex items-start gap-2.5">
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          />
                          <div>
                            <p className="text-sm font-semibold text-navy">{item.name}</p>
                            <p className="mt-0.5 text-sm leading-relaxed text-navy/70 lg:text-xs">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 sm:p-8 sm:pt-0 lg:pt-8">
                  <div
                    className="relative h-full overflow-hidden rounded-2xl border p-5"
                    style={{ borderColor: "rgba(253, 208, 0, 0.4)", backgroundColor: "#F3ECD9" }}
                  >
                    <img
                      src="/images/about/building-cropped.png"
                      alt=""
                      className="pointer-events-none absolute bottom-0 left-0 right-0 h-auto w-full object-cover object-bottom"
                      style={{
                        opacity: 0.4,
                        transform: "scale(1.1) translateY(22px)",
                        transformOrigin: "bottom center",
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                        maskImage:
                          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                      }}
                    />

                    <div className="relative z-10 flex flex-col gap-3 lg:gap-4">
                      <p className="font-heading text-center text-lg font-bold text-navy">
                        Catatan Penting
                      </p>

                      <div className="flex items-center gap-2">
                        <span
                          className="h-px flex-1"
                          style={{ background: "linear-gradient(to right, transparent, #FDD000)" }}
                        />
                        <Sun aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-gold" />
                        <span
                          className="h-px flex-1"
                          style={{ background: "linear-gradient(to right, #FDD000, transparent)" }}
                        />
                      </div>

                      {CATATAN_PENTING.map((item) => (
                        <div key={item.title} className="flex items-start gap-2.5">
                          <AlertCircle
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          />
                          <div>
                            <p className="text-sm font-semibold text-navy">{item.title}</p>
                            <p className="mt-0.5 text-sm leading-relaxed text-navy/70 lg:text-xs">
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
          </SectionBox>
        </Reveal>
      </div>
    </section>
  );
}
