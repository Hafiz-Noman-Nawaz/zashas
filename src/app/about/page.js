"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{ minHeight: 460, background: "var(--hero-bg)" }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)" }} />
        </div>

        <div className="container-luxe py-28 relative z-10">
          <motion.p
            className="text-xs tracking-[0.35em] uppercase mb-5"
            style={{ color: "var(--color-gold-dark)" }}
            {...fadeUp}
          >
            Our Story
          </motion.p>
          <motion.h1
            className="text-4xl lg:text-6xl mb-5"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              lineHeight: 1.1,
            }}
            {...fadeUp}
          >
            About Zasha&apos;s Collection
          </motion.h1>
          <motion.p
            className="text-base mx-auto"
            style={{ color: "var(--text-secondary)", maxWidth: 480 }}
            {...fadeUp}
          >
            Where tradition meets modern elegance
          </motion.p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-spacer" style={{ background: "var(--bg-primary)" }}>
        <div className="container-luxe">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              className="rounded-2xl overflow-hidden group"
              style={{ aspectRatio: "4/5", background: "var(--bg-secondary)" }}
              {...fadeUp}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src="/assets/Zasha,s.png"
                  alt="Zasha's Collection"
                  width={280}
                  height={280}
                  className="rounded-full transition-transform duration-700 group-hover:scale-105"
                  style={{ objectFit: "cover", opacity: 0.9 }}
                />
              </div>
            </motion.div>

            {/* Text */}
            <div>
              <motion.h2
                className="text-3xl lg:text-4xl mb-8"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                }}
                {...fadeUp}
              >
                Crafted with Passion
              </motion.h2>

              <div className="space-y-5">
                {[
                  "Zasha's Collection was born from a love for Pakistani fashion heritage and a vision to bring premium quality clothing to the modern woman. We believe every piece of fabric tells a story — one of artistry, tradition, and timeless beauty.",
                  "Our curated collections feature the finest unstitched fabrics from the most trusted mills across Pakistan. From luxurious lawn and chiffon to rich velvet and organza, every material is hand-selected to ensure unmatched quality and elegance.",
                  "We don't just sell clothing — we deliver an experience. An experience where every thread weaves together comfort, sophistication, and the pride of Pakistani craftsmanship.",
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    className="text-sm leading-[1.9]"
                    style={{ color: "var(--text-secondary)" }}
                    {...stagger}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacer" style={{ background: "var(--bg-secondary)" }}>
        <div className="container-luxe">
          <motion.h2
            className="text-3xl lg:text-4xl text-center mb-14"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}
            {...fadeUp}
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✦",
                title: "Premium Quality",
                desc: "Every fabric is sourced from top Pakistani mills and inspected for perfection.",
              },
              {
                icon: "❋",
                title: "Elegant Design",
                desc: "Timeless aesthetics that blend traditional artistry with contemporary fashion.",
              },
              {
                icon: "◈",
                title: "Customer First",
                desc: "Personalized service and attention to detail at every step of your journey.",
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                className="group text-center p-10 rounded-2xl transition-all duration-500 hover:shadow-lg"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-light)",
                }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
              >
                <span
                  className="block text-3xl mb-5 group-hover:scale-110 transition-transform duration-500"
                  style={{ color: "var(--color-gold)" }}
                >
                  {v.icon}
                </span>
                <h3
                  className="text-xl mb-3"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
