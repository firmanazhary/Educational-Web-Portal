import { LinkButton } from "@/Components/ui/Button"; // Sesuaikan jalur/kapitalisasi komponen Anda
import PhotoFrame from "./PhotoFrame";

export default function JourneyCard({ step }) {
  const alignRight = step.side === "right";

  return (
    <div
      className={`relative z-10 mx-auto flex w-full max-w-md flex-col items-center justify-center text-center sm:items-start sm:text-left sm:gap-6 ${
        alignRight ? "sm:flex-row" : "sm:ml-auto sm:flex-row-reverse"
      }`}
    >
      {/* Container Card Estetis untuk Mobile */}
      <div className="flex w-full flex-col items-center rounded-3xl border border-[#D4AF37]/20 bg-white/40 p-5 shadow-sm backdrop-blur-xs sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none sm:items-start">
        
        {/* Bingkai Foto: Ukuran diperbesar di HP (w-44 / 176px) */}
        <div className="flex justify-center sm:justify-start shrink-0">
          <PhotoFrame
            src={step.photo}
            alt={step.name}
            className="aspect-[2/3] w-44 shrink-0 drop-shadow-md sm:w-36 md:w-44"
          />
        </div>

        {/* Konten Detail */}
        <div className="mt-5 flex w-full flex-col items-center sm:mt-0 sm:items-start">
          
          {/* Badge Langkah */}
          <span className="inline-block rounded-full border border-[#D4AF37]/70 bg-[#FBF6EA] px-3.5 py-1 text-xs font-bold tracking-wide text-[#A87C2C] shadow-2xs">
            Langkah {step.order}
          </span>

          {/* Judul & Usia */}
          <h3 className="mt-3 text-2xl font-bold text-[#102380] md:text-3xl">
            {step.name}
          </h3>
          <p className="mt-1 text-xs font-semibold tracking-wider text-[#102380]/70 uppercase sm:text-sm">
            {step.ageRange}
          </p>

          {/* Line Separator Halus khusus HP */}
          <div className="my-3 h-[1px] w-12 bg-[#D4AF37]/40 sm:hidden" />

          {/* Deskripsi */}
          <p className="text-sm leading-relaxed text-[#102380]/85 sm:mt-2 md:text-base">
            {step.description}
          </p>

          {/* Tombol CTA */}
          <div className="mt-5 flex justify-center w-full sm:w-auto sm:justify-start">
            <LinkButton href={step.ctaHref} size="sm" className="w-full sm:w-auto justify-center">
              {step.ctaLabel} →
            </LinkButton>
          </div>
        </div>

      </div>
    </div>
  );
}