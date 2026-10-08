import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import Reveal from "@/Components/home/Reveal";
import { Sparkles } from "lucide-react";

const DOME_PATH =
  "M640 20 C470 95 356 170 270 278 C184 386 112 515 108 643 C63 657 24 696 24 754 L24 1145 L1256 1145 L1256 754 C1256 696 1217 657 1172 643 C1168 515 1096 386 1010 278 C924 170 810 95 640 20 Z";
const DOME_INNER_TRIM_PATH =
  "M640 61 C486 130 382 200 305 300 C223 406 151 526 145 668 C96 670 63 708 63 757 L63 1125 L1217 1125 L1217 757 C1217 708 1184 670 1135 668 C1129 526 1057 406 975 300 C898 200 794 130 640 61 Z";

const NAVY = "#0B2559";
const GOLD = "#FDD000";

function KnowledgeIcon({ color }) {
  return (
    <svg viewBox="30 20 480 470" className="h-full w-full transition-transform duration-300 group-hover:scale-110" fill="none" stroke={color} aria-hidden="true">
      <path d="M155 320V205C205 190 240 200 270 230V365C240 335 205 325 155 340Z" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M270 230C300 200 335 190 385 205V340C335 325 300 335 270 365" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M270 230V365" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M185 240C215 232 235 240 250 252M185 275C215 267 235 275 250 287M185 310C215 302 235 310 250 322M290 252C305 240 325 232 355 240M290 287C305 275 325 267 355 275M290 322C305 310 325 302 355 310"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M270 365V415L295 390L320 415V340" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="270" cy="155" r="20" strokeWidth={12} />
      <path
        d="M270 115V92M270 218V195M230 155H207M333 155H310M242 127L225 110M298 183L315 200M298 127L315 110M242 183L225 200"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LoveIcon({ color }) {
  return (
    <svg viewBox="30 20 480 470" className="h-full w-full transition-transform duration-300 group-hover:scale-110" fill="none" stroke={color} aria-hidden="true">
      <path
        d="M270 395L145 275C90 222 105 135 180 125C225 119 255 145 270 170C285 145 315 119 360 125C435 135 450 222 395 275Z"
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GrowthIcon({ color }) {
  return (
    <svg viewBox="30 20 480 470" className="h-full w-full transition-transform duration-300 group-hover:scale-110" fill="none" stroke={color} aria-hidden="true">
      <path
        d="M155 405C175 370 205 365 235 385C255 365 285 365 305 385C335 365 365 370 385 405M120 425H420M270 385V180"
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M270 275C220 275 185 245 180 200C225 195 265 220 270 275Z" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M270 300C320 300 365 265 375 215C325 210 280 240 270 300Z" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M270 275L205 220M270 300L345 235" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M270 180C245 155 250 115 270 90C290 115 295 155 270 180Z" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M270 105V155" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PILLARS = [
  {
    title: "Ilmu",
    description:
      "Menumbuhkan rasa ingin tahu dan kecintaan pada ilmu melalui pembelajaran yang menyenangkan dan bermakna.",
    Icon: KnowledgeIcon,
    inverted: false,
  },
  {
    title: "Akhlak",
    description:
      "Membiasakan nilai-nilai Islam dan akhlak mulia dalam keseharian dengan keteladanan dan kasih sayang.",
    Icon: LoveIcon,
    inverted: true,
  },
  {
    title: "Kemandirian",
    description:
      "Melatih kemandirian, percaya diri, dan kemampuan sosial untuk menjadi pribadi yang siap tumbuh dan berkontribusi.",
    Icon: GrowthIcon,
    inverted: false,
  },
];

function PillarCard({ title, description, Icon, inverted }) {
  const bg = inverted ? GOLD : NAVY;
  const outline = inverted ? NAVY : GOLD;
  const iconColor = inverted ? NAVY : GOLD;

  return (
    <div
      className="group relative mx-auto w-full max-w-[280px] transition-transform duration-300 hover:-translate-y-2"
      style={{ aspectRatio: "1260 / 1145" }}
    >
      <svg
        viewBox="10 10 1260 1145"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full drop-shadow-md"
        aria-hidden="true"
      >
        <path d={DOME_PATH} fill={bg} />
        <path d={DOME_INNER_TRIM_PATH} fill="none" stroke={outline} strokeWidth="10" />
      </svg>

      <div
        className="absolute inset-0 z-10 flex flex-col items-center px-6 text-center"
        style={{ paddingTop: "calc(4rem - 0.5cm)" }}
      >
        <div className="h-14 w-14">
          <Icon color={iconColor} />
        </div>
        <h3 className={`font-serif mt-3 text-2xl font-bold ${inverted ? "text-[#0B2559]" : "text-white"}`}>
          {title}
        </h3>
        <p className={`mt-3 text-sm leading-relaxed ${inverted ? "text-[#0B2559]/80" : "text-white/80"}`}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default function JenjangPillarsSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF5EE]">
      <div className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 h-64 w-[500px] rounded-full bg-amber-200/25 blur-[120px]" />
      <div className="pointer-events-none absolute top-14 left-10 text-xl text-amber-500/30 animate-pulse">✦</div>
      <div className="pointer-events-none absolute top-16 right-12 text-sm text-amber-600/30 animate-ping" style={{ animationDuration: "3.5s" }}>✨</div>

      <div className="relative z-10 overflow-hidden px-6 pt-12 md:pt-16">
        <div className="relative mx-auto max-w-6xl">
          <Reveal className="flex flex-col items-center justify-center text-center">
            <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-[#B58900]">
              <Sparkles className="h-3 w-3" />
              <span>Pondasi Pendidikan Karakter</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <ScallopBadge n={1} />
              <h2 className="font-serif text-3xl font-bold tracking-wide text-[#0B2559] sm:text-4xl">
                3 Pilar Utama Kami
              </h2>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FDD000]" />
              <div className="h-1 w-12 rounded-full bg-[#FDD000]" />
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#FDD000]" />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.12}>
                <PillarCard {...pillar} />
              </Reveal>
            ))}
          </div>
        </div>

        <div style={{ height: "1.5cm" }} />
      </div>

      <div className="h-px w-full bg-[#FDD000]/25" />
      <div className="pb-16 md:pb-20" />
    </section>
  );
}