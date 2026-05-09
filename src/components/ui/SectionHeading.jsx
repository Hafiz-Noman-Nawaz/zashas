"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle, align = "center", lightText = false }) {
  return (
    <motion.div
      className="section-heading mb-12"
      style={{ textAlign: align }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 style={lightText ? { color: "#faf7f2" } : undefined}>{title}</h2>
      {subtitle && (
        <p className="mt-3" style={lightText ? { color: "#b5b5b5" } : undefined}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
