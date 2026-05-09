"use client";

import { motion } from "framer-motion";

export default function ComingSoon({ title = "Coming Soon" }) {
  return (
    <motion.div
      className="card-luxe flex flex-col items-center justify-center text-center p-10"
      style={{
        minHeight: 280,
        background:
          "linear-gradient(135deg, var(--color-ivory) 0%, var(--color-champagne) 100%)",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Diamond icon */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        style={{ color: "var(--color-gold)", marginBottom: 16 }}
      >
        <path d="M6 3h12l4 6-10 13L2 9z" />
        <path d="M2 9h20" />
        <path d="M10 3l-4 6 6 13 6-13-4-6" />
      </svg>
      <h3
        className="text-xl mb-2"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 600,
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h3>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Something exquisite is on its way
      </p>
    </motion.div>
  );
}
