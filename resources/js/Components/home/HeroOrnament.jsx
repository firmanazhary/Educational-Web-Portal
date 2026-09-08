export default function HeroOrnament({ side = "left" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 z-10 w-20 overflow-hidden opacity-95 sm:w-28 md:w-40 lg:w-52 ${
        side === "left" ? "left-0" : "right-0 -scale-x-100"
      }`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
      }}
    >
      <img
        src="/images/hero/hero-ornament-arch-v2.png"
        alt=""
        width={1080}
        height={1350}
        className="h-full w-auto max-w-none object-cover object-left-top"
      />
    </div>
  );
}
