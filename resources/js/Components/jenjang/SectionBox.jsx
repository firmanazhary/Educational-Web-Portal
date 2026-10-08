// Shared "shell" reused by sections 2-5 on the jenjang detail page (Mengapa
// Memilih, Fasilitas, Kegiatan, Cara Bergabung) — one big box filling the
// section, slightly elevated.
//
// The box is the SAME color as the page's own ivory background (not
// white) — per instruction, nothing but the shadow should read as "this
// is a box."
//
// Two earlier passes at a plain (even layered) box-shadow both still
// read as a wide dark band that cuts off abruptly — because a regular
// box-shadow is exactly as wide as the box itself, its blur has to fully
// resolve to transparent across that ENTIRE width, and any large flat
// span of near-uniform shadow reads as a "band," not a soft glow,
// however gradual the math actually is. So instead of one edge-to-edge
// shadow, this is a dedicated blob BEHIND the box, wider than the box on
// the left/right (not inset into it), with TWO independent mask
// gradients combined (mask-composite: intersect — takes the overlap of
// both, i.e. an actual 2D fade, not just one axis): vertically it fades
// in from the box's own top edge and fades out the further it extends
// below; horizontally it stays solid across the box's own width and
// only starts fading out past the box's edges, so it reads as "wider
// than the box, softening at the far left/right" rather than either a
// hard-edged full-width band OR a shadow narrower than the box.

export default function SectionBox({ children }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0"
        style={{
          left: "-3cm",
          right: "-3cm",
          top: "0.75rem",
          bottom: "-2.5rem",
          background: "rgba(16,35,128,0.25)",
          filter: "blur(28px)",
          maskImage: [
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9) 55%, transparent)",
            "linear-gradient(to right, transparent, black 3cm, black calc(100% - 3cm), transparent)",
          ].join(", "),
          WebkitMaskImage: [
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9) 55%, transparent)",
            "linear-gradient(to right, transparent, black 3cm, black calc(100% - 3cm), transparent)",
          ].join(", "),
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <div className="relative z-10 overflow-hidden rounded-3xl border border-navy/[0.06] bg-ivory shadow-[0_2px_8px_rgba(16,35,128,0.08)]">
        {children}
      </div>
    </div>
  );
}