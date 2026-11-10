import React, { useEffect, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SwooshUnderline from "@/Components/ui/SwooshUnderline";

export default function DesktopNavItem({ item }) {
  const { url } = usePage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Normalize path without query or hash
  const pathname = (url || "/").split("?")[0].split("#")[0] || "/";

  const isActive =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  const hasChildren = !!item.children?.length;
  const isRightAligned = item.label === "Programs" || item.label === "Events";

  // Tutup dropdown jika user klik di luar area menu
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  // Tutup dropdown otomatis jika rute halaman berpindah
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <li
      ref={containerRef}
      className="relative flex items-center"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      {/* Klik nama menu: Langsung navigasi ke halaman induk */}
      <Link
        href={item.href}
        className={`relative inline-flex items-center px-1 py-2 text-sm font-medium transition-colors duration-200 ${
          isActive ? "text-white" : "text-white/85 hover:text-gold"
        }`}
      >
        <span>{item.label}</span>
        {isActive && (
          <SwooshUnderline className="absolute inset-x-0 -bottom-1 h-2 w-full" />
        )}
      </Link>

      {/* Klik tombol dropdown: Khusus toggle buka/tutup submenu */}
      {hasChildren && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label={`Buka submenu ${item.label}`}
          className="p-1 -ml-0.5 text-white/70 hover:text-gold transition-colors cursor-pointer rounded"
        >
          <ChevronDown
            aria-hidden="true"
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              open ? "rotate-180 text-gold" : "text-white/70"
            }`}
          />
        </button>
      )}

      {/* Daftar submenu */}
      {hasChildren && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`absolute top-full z-40 min-w-[240px] max-h-[75vh] overflow-y-auto rounded-xl bg-white py-2 shadow-2xl custom-scrollbar border border-gold/20 ${
                isRightAligned ? "right-0" : "left-0"
              }`}
            >
              {item.children.map((child, idx) => (
                <Link
                  key={child.href || idx}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-navy hover:bg-ivory hover:text-navy transition-colors font-medium"
                >
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </li>
  );
}
