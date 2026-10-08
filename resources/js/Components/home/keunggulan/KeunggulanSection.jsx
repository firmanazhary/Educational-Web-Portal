import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function KeunggulanSection({
  currentItem,
  dataKeunggulan = [],
  activeIndex = 0,
  sunX,
  sunY,
}) {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="relative h-[450vh] bg-[#FFFBEF] flex flex-col items-center pt-8 md:pt-20"
    >
      {/* Glow Ornamen Belakang */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-amber-200/30 blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="relative z-30 text-center max-w-5xl px-4 md:px-6 mb-2 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/60 shadow-sm mb-3"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <p className="text-amber-700 font-bold tracking-wider text-[10px] md:text-sm uppercase">
            KEUNGGULAN ATTAUFIQ
          </p>
        </motion.div>

        <h2 className="text-lg md:text-4xl font-extrabold text-indigo-950 leading-snug md:leading-tight px-2">
          Fondasi kuat yang menjadi alasan orang tua percaya, dan anak–anak tumbuh luar biasa.
        </h2>
      </div>

      {/* Container Sticky untuk Scroll Animation */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start pt-6 md:pt-14">

        {/* Ornamen Awan & Bintang */}
        <motion.div
          animate={{ x: [0, 25, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute top-8 md:top-12 left-[4%] md:left-[8%] opacity-40 pointer-events-none z-10"
        >
          <svg className="w-16 h-8 md:w-24 md:h-12 text-amber-200/70 fill-current" viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ x: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute top-16 md:top-20 right-[4%] md:right-[10%] opacity-30 pointer-events-none z-10"
        >
          <svg className="w-20 h-10 md:w-28 md:h-14 text-amber-300/60 fill-current" viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
        </motion.div>

        <div className="absolute top-24 md:top-32 left-[12%] md:left-[20%] text-amber-400 opacity-60 animate-pulse pointer-events-none text-xs md:text-base">✦</div>
        <div className="absolute top-12 md:top-16 right-[14%] md:right-[22%] text-amber-300 opacity-70 animate-bounce pointer-events-none text-xs md:text-base">✦</div>

        {/* Gambar Garis Lintasan Matahari */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 scale-x-105 md:scale-x-110">
          <img
            src="images/home/garisMatahari.png"
            alt="Garis Lintasan Matahari"
            className="w-full h-full object-contain opacity-90 filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]"
          />
        </div>

        {/* Gedung Latar Belakang */}
        <AnimatePresence mode="wait">
          {currentItem && (
            <motion.div
              key={`gedung-${currentItem.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute bottom-0 h-[50vh] md:h-[85vh] w-3/4 md:w-5/12 pointer-events-none z-0 ${
                currentItem.position === "left"
                  ? "right-0"
                  : "left-0 transform -scale-x-100"
              }`}
            >
              <img
                src="images/home/gedung-right.png"
                alt="Gedung Latar"
                className="w-full h-full object-cover object-bottom opacity-20 md:opacity-25"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* MATAHARI BERJALAN (Hanya Aktif di Laptop via hidden md:block) */}
        <motion.div
          style={{ left: sunX, top: sunY }}
          className="hidden md:block absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-28 h-28 bg-yellow-400/40 rounded-full blur-xl animate-pulse" />
            <img
              src="images/home/matahari.png"
              alt="Matahari"
              className="w-28 h-28 object-contain drop-shadow-[0_0_32px_rgba(253,224,71,0.95)] relative z-10"
            />
          </div>
        </motion.div>

        {/* KONTEN UTAMA (KARTU FOTO & TEKS) */}
        <div className="relative z-10 w-full max-w-4xl px-4 md:px-8 h-full flex flex-col items-center justify-start md:justify-center pt-32 md:pt-16">
          <AnimatePresence mode="wait">
            {currentItem && (
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`relative md:absolute md:inset-x-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 ${
                  currentItem.position === "right"
                    ? "md:flex-row-reverse"
                    : "md:flex-row"
                }`}
              >
                {/* FOTO DENGAN KUBAH KEEL ARCH */}
                <div className="w-full md:w-1/2 flex justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-300/40 to-sky-300/30 blur-xl transform scale-105 pointer-events-none" />

                  <div className="relative w-[180px] md:w-[280px] h-[260px] md:h-[380px] flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 140"
                      className="absolute inset-0 w-full h-full drop-shadow-xl z-20 pointer-events-none"
                    >
                      <defs>
                        <linearGradient id="frameGold" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FDE68A" />
                          <stop offset="50%" stopColor="#F59E0B" />
                          <stop offset="100%" stopColor="#D97706" />
                        </linearGradient>

                        <clipPath id="keelArchClip" clipPathUnits="objectBoundingBox">
                          <path d="M 0.5 0 C 0.45 0.05 0.2 0.12 0.12 0.22 C 0.05 0.28 0.02 0.32 0.02 0.38 L 0.02 0.98 C 0.02 0.99 0.03 1 0.05 1 L 0.95 1 C 0.97 1 0.98 0.99 0.98 0.98 L 0.98 0.38 C 0.98 0.32 0.95 0.28 0.88 0.22 C 0.8 0.12 0.55 0.05 0.5 0 Z" />
                        </clipPath>
                      </defs>

                      <path
                        d="M 50 2 C 45 9 20 18 12 32 C 5 40 2 46 2 54 L 2 138 C 2 139 3 140 5 140 L 95 140 C 97 140 98 139 98 138 L 98 54 C 98 46 95 40 88 32 C 80 18 55 9 50 2 Z"
                        fill="none"
                        stroke="url(#frameGold)"
                        strokeWidth="3.5"
                      />
                      <path
                        d="M 50 6 C 45 12 22 21 15 34 C 8 41 5 47 5 54 L 5 137 L 95 137 L 95 54 C 95 47 92 41 85 34 C 78 21 55 12 50 6 Z"
                        fill="none"
                        stroke="#FEF3C7"
                        strokeWidth="1"
                        strokeOpacity="0.8"
                      />
                    </svg>

                    <div
                      className="relative w-[94%] h-[97%] bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 flex items-center justify-center text-center p-4 shadow-inner"
                      style={{
                        clipPath: "url(#keelArchClip)",
                        WebkitClipPath: "url(#keelArchClip)",
                      }}
                    >
                      {currentItem.photo ? (
                        <img
                          src={currentItem.photo}
                          alt={currentItem.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white/90 font-semibold text-xs md:text-base drop-shadow-md relative z-10 px-2">
                          Foto — {currentItem.title}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-sky-900/10 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* TEKS DESKRIPSI */}
                <div
                  className={`w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left ${
                    currentItem.position === "right" ? "md:pt-16 md:ml-10" : "pt-0"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <span className="text-lg md:text-2xl font-black text-amber-500/80 tracking-tight">
                      0{currentItem.id}
                    </span>
                    <div className="h-[2px] w-6 md:w-8 bg-amber-400/60 rounded-full" />
                  </div>

                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200/80 flex items-center justify-center mb-1.5 md:mb-3 shadow-md border border-amber-300/60">
                    {currentItem.icon}
                  </div>

                  <h3 className="text-base md:text-3xl font-bold text-indigo-950 mb-1 md:mb-2 leading-tight">
                    {currentItem.title}
                  </h3>

                  <p className="text-gray-600 text-[11px] md:text-sm leading-relaxed max-w-xs md:max-w-md">
                    {currentItem.desc}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* INDICATOR DOTS */}
          <div className="absolute bottom-6 md:bottom-12 flex items-center gap-2 z-30 bg-amber-100/60 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-200/60 shadow-sm">
            {dataKeunggulan.map((item, idx) => (
              <div
                key={item.id}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? "w-5 md:w-6 h-1.5 md:h-2 bg-amber-500"
                    : "w-1.5 md:w-2 h-1.5 md:h-2 bg-amber-300/80"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}