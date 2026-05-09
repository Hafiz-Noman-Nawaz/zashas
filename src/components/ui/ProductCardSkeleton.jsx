"use client";

import { motion } from "framer-motion";

export default function ProductCardSkeleton({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
        <div className="skeleton" style={{ aspectRatio: "3 / 4", borderRadius: 0 }} />
        <div className="p-4 space-y-3">
          <div className="skeleton" style={{ height: 8, width: "35%", borderRadius: 4 }} />
          <div className="skeleton" style={{ height: 14, width: "75%", borderRadius: 4 }} />
          <div className="skeleton" style={{ height: 12, width: "28%", borderRadius: 4 }} />
        </div>
      </div>
    </motion.div>
  );
}
