import { motion, useReducedMotion } from "framer-motion";
import { Users } from "lucide-react";

// Siluet ArchBadge yang sama dengan VisiMisiSection
const ARCH_PATH =
  "M122.5,0 C128.2,4.5 145.4,19.4 156.8,26.9 C168.2,34.4 180.9,37.9 191.1,44.9 C201.3,51.8 211.9,59.8 218.1,68.8 C224.2,77.7 223.8,90.7 227.9,98.7 C231.9,106.6 239.7,105.6 242.6,116.6 C245.4,127.6 244.6,156.5 245,164.5 L245,296 Q245,299 242.6,299 L2.4,299 Q0,299 0,296 L0,164.5 C0.4,156.5 -0.4,127.6 2.4,116.6 C5.3,105.6 13.1,106.6 17.1,98.7 C21.2,90.7 20.8,77.7 26.9,68.8 C33.1,59.8 43.7,51.8 53.9,44.9 C64.1,37.9 76.8,34.4 88.2,26.9 C99.6,19.4 116.8,4.5 122.5,0 Z";

function UsiaBadge({ ageLabel }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      className="absolute bottom-0 right-6 z-20 h-48 w-32 translate-y-1/3 drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] sm:right-10 md:right-14"
    >
      <svg viewBox="0 0 245 299" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={ARCH_PATH} fill="#0B2559" />
        <path
          d={ARCH_PATH}
          fill="none"
          stroke="#FDD000"
          strokeWidth="5"
          transform="translate(122.5,149.5) scale(0.93) translate(-122.5,-149.5)"
        />
      </svg>
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center gap-2 px-4 pb-4 text-center"
        style={{ transform: "translateY(0.5cm)" }}
      >
        <Users aria-hidden="true" className="h-8 w-8 text-[#FDD000]" strokeWidth={1.6} />
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-amber-200/80">Usia</p>
          <p className="text-sm font-bold text-white">{ageLabel}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Formula kalkulasi Catmull-Rom -> cubic Bezier
function catmullRomPath(pts) {
  if (pts.length < 2) return "";
  let d = `L${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

const RIGHT_BOTTOM = [1440, 55];
const VALLEY_RIGHT = [936, 80];
const PEAK = [720, 10];
const VALLEY_LEFT = [504, 80];
const LEFT_BOTTOM = [0, 55];

const leftCurve = catmullRomPath([LEFT_BOTTOM, VALLEY_LEFT, PEAK]);
const rightCurve = catmullRomPath([PEAK, VALLEY_RIGHT, RIGHT_BOTTOM]);
const WAVE_D = `M${LEFT_BOTTOM[0]},${LEFT_BOTTOM[1]} ${leftCurve.slice(leftCurve.indexOf(" C"))} ${rightCurve.slice(rightCurve.indexOf(" C"))}`;

export default function JenjangDetailHero({
  photoSrc = "/images/jenjang/pg-hero.jpg",
  heading = (
    <>
      SMA (Sekolah Menengah <br /> Atas)
    </>
  ),
  headingSizeClassName = "text-4xl sm:text-5xl md:text-6xl",
  tagline = "Tempat terbaik untuk langkah pertama mereka.",
  description = "Lingkungan belajar yang hangat, aman, dan menyenangkan untuk menumbuhkan kemandirian, rasa ingin tahu, dan kecintaan pada Islam sejak dini.",
  ageLabel = "15 - 18 Tahun",
}) {
  const reduceMotion = useReducedMotion();
  const textInitial = reduceMotion ? undefined : { opacity: 0, y: 16 };
  const textAnimate = reduceMotion ? undefined : { opacity: 1, y: 0 };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 85% 65% at 75% 85%, rgba(130, 160, 195, 0.45) 0%, rgba(20, 50, 105, 0) 70%),
          linear-gradient(135deg, #071C4D 0%, #0E2E6D 38%, #1E468A 65%, #597A9F 100%)
        `,
      }}
    >
      {/* Ornamen Bintang Estetis */}
      <div className="pointer-events-none absolute top-16 left-8 select-none text-2xl text-amber-400/40 animate-pulse sm:left-14">
        ✦
      </div>
      <div className="pointer-events-none absolute top-28 right-[46%] select-none text-3xl text-blue-200/20">
        ✦
      </div>

      {/* Panel Foto Desktop (50% sisi kanan) dengan efek mask blur halus */}
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, scale: 1.06 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block overflow-hidden"
      >
        <img
          src={photoSrc}
          alt=""
          className="h-full w-full object-cover"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 20%, black 55%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 20%, black 55%)",
          }}
        />
      </motion.div>

      {/* Overlay Foto untuk Mobile */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden md:hidden">
        <img src={photoSrc} alt="" className="h-full w-full object-cover opacity-25" />
      </div>

      {/* Area Teks (50% sisi kiri, tanpa garis batas kiri) */}
      <div className="relative z-10 flex min-h-[440px] flex-col justify-center px-8 py-20 text-left sm:min-h-[500px] sm:px-16 md:min-h-[560px] md:w-[55%] lg:w-1/2">
        <div className="w-full max-w-xl">
          <motion.h1
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className={`font-serif font-semibold whitespace-nowrap leading-[1.15] text-white tracking-wide drop-shadow-sm ${headingSizeClassName}`}
          >
            {heading}
          </motion.h1>

          <motion.p
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
            className="mt-4 max-w-lg font-serif font-semibold text-2xl leading-snug text-[#E5C158] drop-shadow-sm sm:text-3xl"
          >
            {tagline}
          </motion.p>

          <motion.p
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.6, delay: 0.34, ease: "easeOut" }}
            className="mt-6 max-w-xl font-light text-base leading-relaxed text-slate-200/90 sm:text-lg"
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Wave Pembatas Bawah dengan warna fill serasi dengan pilar (#FAF5EE) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 w-full sm:h-24 md:h-28"
      >
        <path d={`${WAVE_D} L1440,100 L0,100 Z`} fill="#FAF5EE" />
        <path
          d={WAVE_D}
          fill="none"
          stroke="#FDD000"
          strokeWidth="3.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <UsiaBadge ageLabel={ageLabel} />
    </section>
  );
}