import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sun } from "lucide-react";

const ASSET_NAVY = "#002672";

const NOTCH_CLIP_PATH =
  "polygon(" +
  [
    "0% 0%",
    "0.000% calc(100% - var(--divider-h) * 0.8800)",
    "2.879% calc(100% - var(--divider-h) * 0.8643)",
    "5.324% calc(100% - var(--divider-h) * 0.8207)",
    "7.422% calc(100% - var(--divider-h) * 0.7550)",
    "9.259% calc(100% - var(--divider-h) * 0.6726)",
    "10.923% calc(100% - var(--divider-h) * 0.5791)",
    "12.500% calc(100% - var(--divider-h) * 0.4800)",
    "14.077% calc(100% - var(--divider-h) * 0.3809)",
    "15.741% calc(100% - var(--divider-h) * 0.2874)",
    "17.578% calc(100% - var(--divider-h) * 0.2050)",
    "19.676% calc(100% - var(--divider-h) * 0.1393)",
    "22.121% calc(100% - var(--divider-h) * 0.0957)",
    "25.000% calc(100% - var(--divider-h) * 0.0800)",
    "27.879% calc(100% - var(--divider-h) * 0.0957)",
    "30.324% calc(100% - var(--divider-h) * 0.1393)",
    "32.422% calc(100% - var(--divider-h) * 0.2050)",
    "34.259% calc(100% - var(--divider-h) * 0.2874)",
    "35.923% calc(100% - var(--divider-h) * 0.3809)",
    "37.500% calc(100% - var(--divider-h) * 0.4800)",
    "39.077% calc(100% - var(--divider-h) * 0.5791)",
    "40.741% calc(100% - var(--divider-h) * 0.6726)",
    "42.578% calc(100% - var(--divider-h) * 0.7550)",
    "44.676% calc(100% - var(--divider-h) * 0.8207)",
    "47.121% calc(100% - var(--divider-h) * 0.8643)",
    "50.000% calc(100% - var(--divider-h) * 0.8800)",
    "52.879% calc(100% - var(--divider-h) * 0.8643)",
    "55.324% calc(100% - var(--divider-h) * 0.8207)",
    "57.422% calc(100% - var(--divider-h) * 0.7550)",
    "59.259% calc(100% - var(--divider-h) * 0.6726)",
    "60.923% calc(100% - var(--divider-h) * 0.5791)",
    "62.500% calc(100% - var(--divider-h) * 0.4800)",
    "64.077% calc(100% - var(--divider-h) * 0.3809)",
    "65.741% calc(100% - var(--divider-h) * 0.2874)",
    "67.578% calc(100% - var(--divider-h) * 0.2050)",
    "69.676% calc(100% - var(--divider-h) * 0.1393)",
    "72.121% calc(100% - var(--divider-h) * 0.0957)",
    "75.000% calc(100% - var(--divider-h) * 0.0800)",
    "77.879% calc(100% - var(--divider-h) * 0.0957)",
    "80.324% calc(100% - var(--divider-h) * 0.1393)",
    "82.422% calc(100% - var(--divider-h) * 0.2050)",
    "84.259% calc(100% - var(--divider-h) * 0.2874)",
    "85.923% calc(100% - var(--divider-h) * 0.3809)",
    "87.500% calc(100% - var(--divider-h) * 0.4800)",
    "89.077% calc(100% - var(--divider-h) * 0.5791)",
    "90.741% calc(100% - var(--divider-h) * 0.6726)",
    "92.578% calc(100% - var(--divider-h) * 0.7550)",
    "94.676% calc(100% - var(--divider-h) * 0.8207)",
    "97.121% calc(100% - var(--divider-h) * 0.8643)",
    "100.000% calc(100% - var(--divider-h) * 0.8800)",
    "100% 0%",
  ].join(", ") +
  ")";

export default function PageHeroBanner({
  heading,
  subheading,
  photoSrc,
  revealNotchBehind,
}) {
  const reduceMotion = useReducedMotion();

  const textInitial = reduceMotion ? undefined : { opacity: 0, y: 16 };
  const textAnimate = reduceMotion ? undefined : { opacity: 1, y: 0 };

  return (
    <section
      className={`relative overflow-hidden ${revealNotchBehind ? "z-10 [--divider-h:64px] sm:[--divider-h:80px] md:[--divider-h:96px]" : ""}`}
      style={{
        backgroundColor: ASSET_NAVY,
        ...(revealNotchBehind && {
          clipPath: NOTCH_CLIP_PATH,
        }),
      }}
    >
      {/* Pattern Desktop */}
      <div
        className="absolute inset-y-0 left-0 hidden w-full md:block"
        style={{ backgroundColor: ASSET_NAVY }}
      >
        <img
          src="/images/hero-banner/hero-banner-bg-left.png"
          alt=""
          className="h-full w-full object-contain object-left"
        />
      </div>

      {/* Foto Desktop/Tablet */}
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, scale: 1.06 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-y-0 right-0 hidden w-[42%] md:block"
        style={{ backgroundColor: ASSET_NAVY }}
      >
        <img
          src={photoSrc}
          alt=""
          className="h-full w-full object-cover"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 32%)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 32%)",
          }}
        />
      </motion.div>

      {/* Foto Mobile */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={photoSrc}
          alt=""
          className="h-full w-full object-cover opacity-35"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: ASSET_NAVY, opacity: 0.8 }}
        />
      </div>

      {/* Konten Teks */}
      <div className="relative mx-auto flex min-h-[420px] max-w-7xl flex-col justify-center px-6 py-20 sm:min-h-[480px] md:min-h-[560px] md:pl-[14rem] lg:min-h-[640px] lg:pl-[17rem] xl:min-h-[680px] xl:pl-[20rem]">
        <div className="max-w-[25rem] text-center sm:text-left md:pr-4">
          <motion.p
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F1B23A] sm:text-sm"
          >
            Sekolah Islam Attaufiq
          </motion.p>

          <motion.div
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
            className="mt-3 flex justify-center sm:justify-start"
          >
            <Sun aria-hidden="true" className="h-5 w-5 text-[#F1B23A]" />
          </motion.div>

          <motion.h1
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
            className="mt-3 font-serif text-5xl leading-[1.1] text-white sm:text-6xl md:text-6xl lg:text-7xl"
          >
            {heading}
          </motion.h1>

          <motion.div
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.6, delay: 0.42, ease: "easeOut" }}
            className="mx-auto mt-6 flex max-w-[220px] items-center gap-3 sm:mx-0"
          >
            <span className="h-px flex-1 bg-[#F1B23A]/50" />
            <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-[#F1B23A]" />
            <span className="h-px flex-1 bg-[#F1B23A]/50" />
          </motion.div>

          <motion.p
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.6, delay: 0.52, ease: "easeOut" }}
            className="mt-5 text-sm leading-relaxed text-white/80 sm:text-base"
          >
            {Array.isArray(subheading) ? (
              subheading.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))
            ) : (
              <span>{subheading}</span>
            )}
          </motion.p>
        </div>
      </div>

      {/* SVG Divider Bergelombang */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full sm:h-20 md:h-24"
      >
        {!revealNotchBehind && (
          <path
            d="M0,12 C180,12 180,92 360,92 C540,92 540,12 720,12 C900,12 900,92 1080,92 C1260,92 1260,12 1440,12 L1440,100 L0,100 Z"
            fill="#FAF8F5"
          />
        )}
        <path
          d="M0,12 C180,12 180,92 360,92 C540,92 540,12 720,12 C900,12 900,92 1080,92 C1260,92 1260,12 1440,12"
          fill="none"
          stroke="#F1B23A"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </section>
  );
}