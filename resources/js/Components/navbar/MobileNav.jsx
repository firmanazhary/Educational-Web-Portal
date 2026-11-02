import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { LinkButton } from "@/Components/ui/Button";

export default function MobileNav({ items, open, onClose }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          id="mobile-nav"
          className="overflow-hidden bg-[#051C42] lg:hidden shadow-2xl border-t border-white/10"
        >
          <div className="max-h-[calc(100svh-76px)] overflow-y-auto overscroll-contain">
            <ul className="flex flex-col divide-y divide-white/10 px-4">
              {items.map((item) => {
                const hasChildren = !!item.children?.length;
                const isExpanded = expanded === item.label;
                return (
                  <li key={item.label} className="py-1">
                    {hasChildren ? (
                      /* Jika menu punya dropdown: klik nama navigasi ke halaman induk, klik tombol panah buka dropdown */
                      <div className="flex min-h-12 w-full items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="flex-1 py-3 text-base font-medium text-white hover:text-gold transition-colors"
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-label={`Buka atau tutup submenu ${item.label}`}
                          aria-expanded={isExpanded}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setExpanded(isExpanded ? null : item.label);
                          }}
                          className="grid h-12 w-12 place-items-center text-gold cursor-pointer hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors"
                        >
                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm font-bold"
                          >
                            ▾
                          </motion.span>
                        </button>
                      </div>
                    ) : (
                      /* Menu langsung (tanpa dropdown) */
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex min-h-12 w-full items-center text-base font-medium text-white hover:text-gold transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}

                    {hasChildren && (
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden pl-4 pb-2 my-1 ml-2 border-l-2 border-gold/40 flex flex-col gap-1"
                          >
                            {item.children.map((child, idx) => (
                              <li key={child.href || idx}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="flex min-h-10 items-center text-sm text-white/80 hover:text-gold transition-colors"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="px-4 pb-6 pt-3">
              <LinkButton href="/admission" className="w-full" size="sm" onClick={onClose}>
                Kenali Attaufiq →
              </LinkButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
