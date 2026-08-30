import SwooshUnderline from "@/Components/ui/SwooshUnderline";
import HeroOrnament from "./HeroOrnament";

// Multi-stop, low-contrast-between-stops fade so the photo dissolves into
// the navy panel gradually instead of cutting off in one visible band.
const NAVY = "16, 35, 128"; // #102380 as rgb triplet, for alpha stops

function blendGradient(direction) {
  return `linear-gradient(${direction}, rgba(${NAVY},1) 0%, rgba(${NAVY},0.85) 30%, rgba(${NAVY},0.55) 55%, rgba(${NAVY},0.22) 78%, rgba(${NAVY},0) 100%)`;
}

export default function HeroSlideContent({ slide, priority = false }) {
  const textLeft = slide.textSide === "left";

  return (
    <>
      <HeroOrnament side={slide.textSide} />

      {/* Full-bleed photo, opposite side from the text on desktop */}
      <div
        className={`absolute inset-y-0 hidden w-[45%] md:block ${
          textLeft ? "right-0" : "left-0"
        }`}
      >
        <img
          src={slide.image}
          alt={slide.imageAlt}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-y-0 w-48"
          style={{
            [textLeft ? "left" : "right"]: 0,
            backgroundImage: blendGradient(textLeft ? "to right" : "to left"),
          }}
        />
      </div>

      {/* Container utama: Menggunakan flex-col-reverse di mobile agar Gambar dirender DI ATAS Teks */}
      <div
        className={`relative mx-auto flex min-h-[560px] max-w-7xl flex-col-reverse justify-end px-6 pb-12 pt-20 md:flex-col md:justify-center md:pb-24 md:pt-32 ${
          textLeft ? "md:pl-24" : "md:pr-24"
        }`}
      >
        {/* Teks: Di bawah pada Mobile, Sejajar di Desktop */}
        <div className={`mt-6 max-w-xl md:mt-0 ${textLeft ? "md:pr-10" : "md:pl-10 md:ml-auto"}`}>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {slide.titleParts.map((part, i) =>
              part.underline ? (
                <span key={i} className="relative inline-block">
                  {part.text}
                  <SwooshUnderline className="absolute inset-x-0 -bottom-1 h-3 w-full md:-bottom-2 md:h-4" />
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base md:mt-6 md:text-lg">
            {slide.description}
          </p>
        </div>

        {/* Mobile Photo Block: Diposisikan paling atas secara visual pada HP */}
        <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72 md:hidden">
          <img
            src={slide.image}
            alt={slide.imageAlt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}