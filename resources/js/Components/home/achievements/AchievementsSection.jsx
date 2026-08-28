// resources/js/Components/home/achievements/AchievementsSection.jsx

import { useEffect, useRef } from "react";
import { Building2, Calendar, ChevronDown } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import Reveal from "@/Components/home/Reveal";
import { achievements as staticAchievements } from "@/data/achievements";

const BG_SRC = "/images/achievements/prestasi-bg-sky.png";
const STAR_SRC = "/images/achievements/prestasi-star.png";
const SUN_SRC = "/images/home/matahari.png";

const CENTER = { x: 50, y: 50 };

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}

const DEPART_SOURCE = { x: CENTER.x / 100, y: CENTER.y / 100 };
const HANDOFF_TO_CLOSING_WINDOW = 700;

const CARD_POSITIONS = [
  { x: 16, y: 28 },
  { x: 25, y: 44 },
  { x: 14, y: 63 },
  { x: 28, y: 87 },
  { x: 50, y: 94 },
  { x: 72, y: 87 },
  { x: 84, y: 28 },
  { x: 75, y: 44 },
  { x: 86, y: 63 },
];

function getCurveData(from, to, index) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / dist;
  const ny = dx / dist;
  const side = index % 2 === 0 ? 1 : -1;
  const bend = dist * 0.08 * side;
  const midX = (from.x + to.x) / 2 + nx * bend;
  const midY = (from.y + to.y) / 2 + ny * bend;
  return { midX, midY, endX: to.x, endY: to.y };
}

function handDrawnPath(from, to, index) {
  const { midX, midY, endX, endY } = getCurveData(from, to, index);
  return `M ${from.x},${from.y} Q ${midX},${midY} ${endX},${endY}`;
}

function getQuadraticBezierPoint(from, mid, to, t) {
  const oneMinusT = 1 - t;
  const x = oneMinusT * oneMinusT * from.x + 2 * oneMinusT * t * mid.x + t * t * to.x;
  const y = oneMinusT * oneMinusT * from.y + 2 * oneMinusT * t * mid.y + t * t * to.y;
  return { x, y };
}

const POSITIONS = CARD_POSITIONS.map((card, idx) => {
  const curve = getCurveData(CENTER, card, idx);
  return {
    card,
    mid: { x: curve.midX, y: curve.midY },
    end: { x: curve.endX, y: curve.endY },
  };
});

const COUNT = POSITIONS.length;

function burstProgress(t) {
  if (t < 0.3) return t / 0.3;
  if (t < 0.7) return 1;
  if (t < 1) return 1 - (t - 0.7) / 0.3;
  return 0;
}

function backEaseOut(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function cardLocalT(bp, index) {
  const stagger = 0.06;
  const span = 1 - stagger * (COUNT - 1);
  const start = stagger * index;
  return Math.min(Math.max((bp - start) / span, 0), 1);
}

const TWINKLES = [
  { x: 10, y: 12, size: 16, delay: "0s" },
  { x: 90, y: 14, size: 14, delay: "0.8s" },
  { x: 6, y: 66, size: 12, delay: "1.5s" },
  { x: 94, y: 68, size: 13, delay: "0.4s" },
  { x: 50, y: 6, size: 11, delay: "1.1s" },
];

const WHEEL_RANGE = 1500;
const PROGRESS_RATE_PER_MS = 1500 / 1100;
const MAX_ELAPSED_MS = 32;

export default function AchievementsSection({ achievementsData = [] }) {
  // Gunakan data dinamis jika ada dari DB, jika kosong gunakan data statis
  const achievements = achievementsData && achievementsData.length > 0
    ? achievementsData
    : staticAchievements;

  const containerRef = useRef(null);
  const starRefs = useRef([]);
  const lineRefs = useRef([]);
  const cardRefs = useRef([]);
  const reduceMotion = useReducedMotion();

  const lockedRef = useRef(false);
  const progressRef = useRef(0);
  const lastTickTimeRef = useRef(null);
  const lockedScrollYRef = useRef(null);
  const justReleasedScrollYRef = useRef(null);

  const applyFrame = (progress) => {
    const t = Math.min(Math.max(progress, 0), 1);
    const bp = burstProgress(t);

    POSITIONS.forEach((pos, i) => {
      const localT = cardLocalT(bp, i);
      const eased = backEaseOut(localT);

      const starEl = starRefs.current[i];
      if (starEl) {
        const point = getQuadraticBezierPoint(CENTER, pos.mid, pos.end, localT);
        starEl.style.left = `${point.x}%`;
        starEl.style.top = `${point.y}%`;
        starEl.style.opacity = String(Math.min(localT * 3, 1));
        starEl.style.transform = `translate(-50%, -50%) scale(${0.6 + 0.5 * localT})`;
      }

      const lineEl = lineRefs.current[i];
      if (lineEl) {
        lineEl.style.strokeDashoffset = String(1 - localT);
        lineEl.style.opacity = String(Math.min(localT * 2, 1) * 0.85);
      }

      const cardEl = cardRefs.current[i];
      if (cardEl) {
        cardEl.style.opacity = String(Math.min(localT * 2.5, 1));
        cardEl.style.transform = `translate(-50%, -50%) scale(${0.8 + 0.2 * eased})`;
        cardEl.style.pointerEvents = localT > 0.4 ? "auto" : "none";
      }
    });
  };

  useEffect(() => {
    if (!reduceMotion) applyFrame(0);
  }, [reduceMotion]);

  const positionSun = () => {
    const sticky = document.getElementById("achievements-sticky-container");
    const sun = document.getElementById("prestasi-sun-handoff");
    const closingAnchor = document.getElementById("closing-sun-handoff");
    if (!sticky || !sun || !closingAnchor) return;

    const stickyRect = sticky.getBoundingClientRect();
    const stickyTop = stickyRect.top;

    if (stickyTop >= 0) {
      sun.style.position = "absolute";
      sun.style.left = `${CENTER.x}%`;
      sun.style.top = `${CENTER.y}%`;
      sun.style.transform = "translate(-50%, -50%)";
      sun.style.opacity = "1";
      sun.style.zIndex = "50";
      return;
    }

    if (progressRef.current !== 1) {
      progressRef.current = 1;
      applyFrame(1);
    }

    const raw = -stickyTop;
    const t = clamp(raw / HANDOFF_TO_CLOSING_WINDOW, 0, 1);

    const sourceX = stickyRect.left + DEPART_SOURCE.x * stickyRect.width;
    const sourceY = stickyRect.top + DEPART_SOURCE.y * stickyRect.height;

    const closingRect = closingAnchor.getBoundingClientRect();
    const targetX = closingRect.left;
    const targetY = closingRect.top;

    sun.style.position = "fixed";
    sun.style.left = `${lerp(sourceX, targetX, t)}px`;
    sun.style.top = `${lerp(sourceY, targetY, t)}px`;
    sun.style.transform = "translate(-50%, -50%)";
    sun.style.opacity = t < 0.8 ? "1" : String(Math.max(0, 1 - (t - 0.8) / 0.2));
    sun.style.zIndex = "10";
  };

  useEffect(() => {
    if (reduceMotion) return;

    const applyDelta = (deltaY) => {
      const now = performance.now();
      const elapsedMs = Math.min(
        lastTickTimeRef.current === null ? MAX_ELAPSED_MS : now - lastTickTimeRef.current,
        MAX_ELAPSED_MS
      );
      lastTickTimeRef.current = now;

      const cap = Math.max(elapsedMs * PROGRESS_RATE_PER_MS, 1);
      const step = Math.min(Math.max(deltaY, -cap), cap);

      progressRef.current = Math.min(
        Math.max(progressRef.current + step / WHEEL_RANGE, 0),
        1
      );
      applyFrame(progressRef.current);
      positionSun();

      if (
        (progressRef.current >= 1 && deltaY > 0) ||
        (progressRef.current <= 0 && deltaY < 0)
      ) {
        lockedRef.current = false;
        lockedScrollYRef.current = null;
        justReleasedScrollYRef.current = window.scrollY;
      }
    };

    const onWheel = (e) => {
      const container = containerRef.current;
      if (!container) return;

      if (lockedRef.current && lockedScrollYRef.current !== null) {
        if (window.scrollY !== lockedScrollYRef.current) {
          window.scrollTo(0, lockedScrollYRef.current);
        }
      }

      if (!lockedRef.current) {
        if (justReleasedScrollYRef.current !== null) {
          if (window.scrollY === justReleasedScrollYRef.current) {
            return;
          }
          justReleasedScrollYRef.current = null;
        }

        const rect = container.getBoundingClientRect();
        const slack = rect.bottom - rect.top - window.innerHeight;
        const pinned = rect.top <= 0 && rect.bottom > window.innerHeight;

        if (
          pinned &&
          ((progressRef.current >= 1 && e.deltaY > 0) ||
            (progressRef.current <= 0 && e.deltaY < 0))
        ) {
          return;
        }

        if (!pinned) {
          const crossingFromAbove =
            e.deltaY > 0 && rect.top > 0 && rect.top - e.deltaY <= 0;
          const crossingFromBelow =
            e.deltaY < 0 && rect.top < -slack && rect.top - e.deltaY >= -slack;

          if (crossingFromAbove || crossingFromBelow) {
            const consumed = crossingFromAbove ? rect.top : rect.top + slack;
            window.scrollBy(0, consumed);
            e.preventDefault();
            lockedRef.current = true;
            lockedScrollYRef.current = window.scrollY;
            applyDelta(e.deltaY - consumed);
          }
          return;
        }

        lockedRef.current = true;
        lockedScrollYRef.current = window.scrollY;
      }

      e.preventDefault();
      applyDelta(e.deltaY);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    const onScroll = () => {
      if (lockedRef.current && lockedScrollYRef.current !== null) {
        if (window.scrollY !== lockedScrollYRef.current) {
          window.scrollTo(0, lockedScrollYRef.current);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const maybePositionSun = () => {
      const sticky = document.getElementById("achievements-sticky-container");
      if (!sticky) return;
      if (sticky.getBoundingClientRect().top >= 0) return;
      positionSun();
    };

    maybePositionSun();
    window.addEventListener("scroll", maybePositionSun, { passive: true });
    window.addEventListener("resize", maybePositionSun);
    return () => {
      window.removeEventListener("scroll", maybePositionSun);
      window.removeEventListener("resize", maybePositionSun);
    };
  }, [reduceMotion]);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] z-30">
      <div
        id="achievements-sticky-container"
        className="sticky top-0 w-full h-screen flex flex-col justify-between px-6 md:px-16 lg:px-24"
      >
        {/* Sky Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={BG_SRC}
            alt="Prestasi Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111936]/60 via-transparent to-[#0a1026]/80 pointer-events-none" />
        </div>

        {/* Twinkle Stars */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {TWINKLES.map((t, idx) => (
            <img
              key={idx}
              src={STAR_SRC}
              alt=""
              className="absolute animate-pulse"
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: `${t.size}px`,
                height: `${t.size}px`,
                animationDelay: t.delay,
              }}
            />
          ))}
        </div>

        {/* Header Text Overlay */}
        <div className="relative z-10 pt-16 px-4 text-center max-w-xl mx-auto pointer-events-none">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-serif font-normal text-white tracking-wide drop-shadow-md">
              Prestasi Siswa
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-sm md:text-base text-slate-200 max-w-xs md:max-w-md mx-auto drop-shadow leading-relaxed font-light">
              Mendukung setiap siswa untuk berkembang, berprestasi, dan tumbuh menjadi generasi yang cerdas, mandiri serta berlandaskan nilai-nilai islami.
            </p>
          </Reveal>
        </div>

        {/* Gambar Matahari Utama */}
        <img
          id="prestasi-sun-handoff"
          src={SUN_SRC}
          alt="Matahari Attaufiq"
          className="absolute z-50 w-36 h-36 md:w-48 md:h-48 -translate-x-1/2 -translate-y-1/2 object-contain filter drop-shadow-[0_0_45px_rgba(251,191,36,0.9)] pointer-events-none"
          style={{
            left: `${CENTER.x}%`,
            top: `${CENTER.y}%`,
          }}
        />

        {/* SVG Rays */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {POSITIONS.map((pos, idx) => {
            const pathData = handDrawnPath(CENTER, pos.card, idx);
            return (
              <path
                key={idx}
                ref={(el) => (lineRefs.current[idx] = el)}
                d={pathData}
                fill="none"
                stroke="rgba(251, 207, 51, 0.85)"
                strokeWidth="0.35"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                filter="url(#glow)"
                className="transition-opacity duration-300"
              />
            );
          })}
        </svg>

        {/* Bintang-bintang Ujung */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {POSITIONS.map((_, idx) => (
            <img
              key={idx}
              ref={(el) => (starRefs.current[idx] = el)}
              src={STAR_SRC}
              alt=""
              className="absolute w-5 h-5 md:w-6 md:h-6 -translate-x-1/2 -translate-y-1/2 opacity-0 filter drop-shadow-[0_0_10px_rgba(251,191,36,1)]"
              style={{
                left: `${CENTER.x}%`,
                top: `${CENTER.y}%`,
              }}
            />
          ))}
        </div>

        {/* Floating Cards */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {achievements.map((item, idx) => {
            const pos = CARD_POSITIONS[idx] || CARD_POSITIONS[0];
            return (
              <div
                key={item.id || idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="absolute opacity-0 transition-all duration-300"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%) scale(0.8)",
                }}
              >
                <div className="w-[280px] md:w-[320px] bg-[#1e295d]/90 backdrop-blur-md border-2 border-amber-400/90 rounded-2xl p-3 shadow-[0_0_30px_rgba(251,191,36,0.45)] hover:shadow-[0_0_40px_rgba(251,191,36,0.7)] transition-all duration-300 group flex items-center gap-3">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-600 to-blue-800 flex items-center justify-center p-2 text-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-xs font-bold text-white leading-tight drop-shadow">
                        {item.school || item.badgeText || "Attaufiq"}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pr-1">
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-amber-400 truncate">
                      {item.level || item.category || "Tingkat Kota"}
                    </p>

                    <div className="mt-2 space-y-0.5 text-[10px] text-slate-300">
                      {item.organizer && (
                        <div className="flex items-center gap-1.5 truncate">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{item.organizer}</span>
                        </div>
                      )}
                      {item.date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{item.date}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Hint */}
        <div className="relative z-10 pb-6 text-center pointer-events-none">
          <div className="inline-flex items-center gap-2 text-xs text-amber-200/90 bg-[#131b40]/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-amber-400/30 shadow-sm">
            <span>Scroll untuk mengeksplorasi</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
