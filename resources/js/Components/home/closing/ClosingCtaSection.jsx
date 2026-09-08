import React from 'react';
import { motion, useReducedMotion } from "framer-motion";
import { UserRound, CalendarDays, ArrowRight, Sparkle } from "lucide-react";

const BG_SRC = "images/closing/closing-cta-bg.png";

const RING_CENTER = { x: 47, y: 63 };
const SUN_FRACTION = { x: 50, y: 45 };

const RING_SPARKLES = [
  { x: -8, y: -6, size: 14, delay: "0s" },
  { x: 104, y: 8, size: 11, delay: "0.6s" },
  { x: 96, y: 92, size: 12, delay: "1.2s" },
];

function CornerOrnament() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-10 h-36 w-36 overflow-hidden rounded-br-[4rem] sm:h-44 sm:w-44 md:h-52 md:w-52"
    >
      <div className="absolute inset-0 bg-indigo-950/15 backdrop-blur-[1px]" />
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full opacity-40"
      >
        <defs>
          <pattern
            id="closing-corner-star"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20,4 L24,16 L36,20 L24,24 L20,36 L16,24 L4,20 L16,16 Z"
              fill="none"
              stroke="#FDD000"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#closing-corner-star)" />
      </svg>
      <div className="absolute inset-0 rounded-br-[4rem] border-b border-r border-amber-400/40" />
    </div>
  );
}

export default function ClosingCtaSection() {
  return (
    <section className="relative overflow-hidden bg-indigo-950">
      {/* 1. LAYER BAGIAN BAWAH (Foto Gedung) */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_SRC}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-[#FFFBEF]/85 via-[#FFFBEF]/25 to-transparent" />

        <div
          id="closing-sun-handoff"
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0"
          style={{ left: `${SUN_FRACTION.x}%`, top: `${SUN_FRACTION.y}%` }}
        />
      </div>

      <CornerOrnament />

      {/* Ring Ornamen */}
      <div
        className="pointer-events-none absolute aspect-square w-[38%] max-w-[440px] z-0"
        style={{
          left: `${RING_CENTER.x}%`,
          top: `${RING_CENTER.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {RING_SPARKLES.map((sp, idx) => (
          <Sparkle
            key={idx}
            className="absolute text-amber-400 animate-pulse"
            style={{
              left: `${sp.x}%`,
              top: `${sp.y}%`,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
              animationDelay: sp.delay,
            }}
          />
        ))}
      </div>

      {/* 2. LAYER ATAS MATAHARI (Teks & Tombol) */}
      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-3xl flex-col items-center px-6 pb-14 pt-16 text-center sm:min-h-[640px] md:min-h-[760px] md:pb-20 md:pt-20">
        <motion.div>
          <p className="text-sm font-semibold tracking-wide text-amber-500 sm:text-base">
            ✦ Perjalanan Hebat Dimulai di Sini ✦
          </p>
        </motion.div>

        <motion.div>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.15] text-indigo-950 sm:text-5xl md:text-6xl">
            Saatnya Memulai Perjalanan{" "}
            <span className="text-amber-500">Ananda</span>
          </h2>
        </motion.div>

        <motion.div>
          <div className="mx-auto flex w-[200px] items-center gap-3 mt-4">
            <span className="h-px flex-1 bg-amber-400/50" />
            <Sparkle aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-400" />
            <span className="h-px flex-1 bg-amber-400/50" />
          </div>
        </motion.div>

        <motion.div>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-indigo-950/80 sm:text-base">
            Bersama Attaufiq, tumbuh dalam ilmu, akhlak, dan prestasi untuk
            masa depan yang gemilang.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
