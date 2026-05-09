"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ── Hero slides — using images from /assets/Hero Images ── */
const SLIDES = [
  {
    image: "/assets/Hero Images/hero 1.png",
    tagline: "Luxury Pakistani Fashion",
    heading: "Elegance Woven Into Every Thread",
    subtitle: "Discover our curated collection of premium unstitched fabrics and exquisite designs.",
  },
  {
    image: "/assets/Hero Images/hero 2.png",
    tagline: "New Season Collection",
    heading: "Where Tradition Meets Modernity",
    subtitle: "Handpicked fabrics from the finest mills — crafted for the modern woman.",
  },
  {
    image: "/assets/Hero Images/hero 4.png",
    tagline: "Exclusive Designs",
    heading: "Draped in Grace & Luxury",
    subtitle: "From chiffon to organza — every thread tells a story of Pakistani craftsmanship.",
  },
  {
    image: "/assets/Hero Images/hero 5.png",
    tagline: "Timeless Elegance",
    heading: "Unveil Your Signature Style",
    subtitle: "Premium unstitched & stitched collections — designed for every occasion.",
  },
];

const INTERVAL = 5000; // 5 seconds between slides

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  /* Auto-rotate slides */
  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background Images with Crossfade and slow zoom */}
      {SLIDES.map((slideItem, idx) => (
        <motion.div
          key={`bg-${idx}`}
          className="absolute inset-0 z-0"
          initial={false}
          animate={{ 
            opacity: current === idx ? 1 : 0,
            scale: current === idx ? 1 : 1.05
          }}
          transition={{ 
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: INTERVAL / 1000 + 1, ease: "linear" } 
          }}
          style={{ pointerEvents: current === idx ? "auto" : "none" }}
        >
          <Image
            src={slideItem.image}
            alt={slideItem.heading}
            fill
            priority={idx === 0}
            className="object-cover"
            sizes="100vw"
          />
          {/* Elegant Dark/Glassmorphic Overlay for text readability */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.3) 50%, rgba(13,13,13,0.6) 100%)",
            }}
          />
        </motion.div>
      ))}

      {/* Gold shimmer particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: 200 + i * 50,
              height: 200 + i * 50,
              top: `${15 + i * 15}%`,
              left: `${-5 + i * 20}%`,
              background: `radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 25 * (i % 2 === 0 ? 1 : -1), 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container-luxe relative z-10 flex flex-col items-center justify-center text-center"
           style={{ minHeight: "100vh", padding: "60px 24px", paddingTop: "calc(var(--nav-height) + 40px)" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <p
              className="text-xs md:text-sm tracking-[0.35em] uppercase mb-6"
              style={{ color: "var(--color-gold)", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              {slide.tagline}
            </p>

            <h1
              className="mx-auto mb-6 drop-shadow-xl"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                color: "#ffffff",
                maxWidth: 800,
              }}
            >
              {slide.heading}
            </h1>

            <p
              className="mx-auto mb-10 text-base md:text-lg"
              style={{
                color: "rgba(255,255,255,0.85)",
                maxWidth: 520,
                lineHeight: 1.8,
                textShadow: "0 1px 2px rgba(0,0,0,0.5)"
              }}
            >
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA Buttons (static) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2 relative z-20">
          <Link href="/collections" className="btn btn-gold px-8 py-4 text-[0.8rem]">
            Explore Collection
          </Link>
          <Link href="/collections?filter=new" 
                className="btn btn-outline px-8 py-4 text-[0.8rem]"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff" }}>
            New Arrivals
          </Link>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-3 mt-16 relative z-20">
          {SLIDES.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-500"
              style={{
                width: current === i ? 36 : 8,
                height: 8,
                background: current === i ? "var(--color-gold)" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-[1px] h-12"
            style={{ background: "linear-gradient(to bottom, var(--color-gold-light), transparent)" }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0], translateY: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
