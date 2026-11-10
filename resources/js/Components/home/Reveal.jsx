"use client";

import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, className = "", style, viewport = { once: true, margin: "0px" } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}