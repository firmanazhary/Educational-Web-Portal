"use client";

// Layer 5 control: simple numbered text pagination — replaces the earlier
// sun-badge + wavy-connector version, which doesn't match this redesign.
// The active slide is gold with an underline; inactive ones are dimmed
// white and clickable. Thin vertical dividers between each, matching the
// mockup.
export default function HeroPagination({ count, index, onSelect }) {
  return (
    <div className="flex items-center gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          {i > 0 && <span className="h-3 w-px bg-white/30" />}
          <button
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Ke slide ${i + 1}`}
            aria-current={i === index}
            className={`pb-0.5 text-sm font-medium transition-colors ${
              i === index
                ? "border-b-2 border-[#F1B23A] text-[#F1B23A]"
                : "text-white/60 hover:text-white"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        </div>
      ))}
    </div>
  );
}
