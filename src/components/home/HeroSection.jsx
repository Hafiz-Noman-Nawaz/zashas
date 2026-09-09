"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Scissors, Award, Truck } from "lucide-react";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1920&q=85",
    tagline: "MAISON DE HAUTE COUTURE • EST. 2026",
    heading: "Heirloom Artistry Woven In Pure Silk",
    subtitle:
      "Handcrafted bridal peshwas, pure raw silks, and imperial zardozi needlework steeped in three centuries of Mughal heritage.",
    ctaText: "Acquire The Festive Edit",
    ctaLink: "/collections",
  },
  {
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1920&q=85",
    tagline: "REGAL WINTER FORMALS & VELVET",
    heading: "Majestic Silhouettes For The Discerning Muse",
    subtitle:
      "Plush silk micro-velvet tailored with antique tilla dori, hand-hammered bullion wire, and artisanal silk tassel closures.",
    ctaText: "Explore Velvet Formals",
    ctaLink: "/collections?category=Pret%20%26%20Formals",
  },
  {
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1920&q=85",
    tagline: "ORGANZA & HANDLOOM RESHAM",
    heading: "Ethereal Whispers of Rose Gold & Pearls",
    subtitle:
      "Gossamer sheer organza shirts adorned with delicate botanical resham vines, seed pearls, and four-sided scalloped borders.",
    ctaText: "Discover Pret & Formals",
    ctaLink: "/collections?filter=new",
  },
  {
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=1920&q=85",
    tagline: "UNSTITCHED FESTIVE LUXURY",
    heading: "Woven Traditions, Bespoke Grace",
    subtitle:
      "Authentic Banarasi brocade jacquard veils paired with heavy katan silk and handcrafted neckline motifs.",
    ctaText: "View Unstitched Edit",
    ctaLink: "/collections?category=Unstitched%20Luxury",
  },
];

const INTERVAL = 6000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section className="relative overflow-hidden bg-black text-white min-h-[92vh] lg:min-h-screen flex flex-col justify-between">
      {/* Background Slides with Slow Zoom & Cinematic Crossfade */}
      {SLIDES.map((slideItem, idx) => (
        <motion.div
          key={`hero-bg-${idx}`}
          className="absolute inset-0 z-0"
          initial={false}
          animate={{
            opacity: current === idx ? 1 : 0,
            scale: current === idx ? 1.04 : 1,
          }}
          transition={{
            opacity: { duration: 1.6, ease: "easeInOut" },
            scale: { duration: INTERVAL / 1000 + 1.5, ease: "easeOut" },
          }}
          style={{ pointerEvents: current === idx ? "auto" : "none" }}
        >
          <Image
            src={slideItem.image}
            alt={slideItem.heading}
            fill
            priority={idx === 0}
            className="object-cover object-center brightness-[0.72] contrast-[1.08]"
            sizes="100vw"
          />

          {/* Luxury Film Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/75" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80" />
        </motion.div>
      ))}

      {/* Decorative Gold Atelier Monogram Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif uppercase tracking-[0.25em] text-[#d4af37]/[0.025] select-none pointer-events-none whitespace-nowrap z-0">
        ZASHA
      </div>

      {/* Main Content Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 sm:pt-36 lg:pt-44 pb-12 flex-1 flex flex-col justify-center items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`slide-text-${current}`}
            initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* Haute Couture Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/50 bg-black/65 backdrop-blur-md text-[#d4af37] text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase mb-6 shadow-2xl">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
              <span>{slide.tagline}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            </div>

            {/* Editorial Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.08] mb-6 drop-shadow-2xl">
              {slide.heading.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={
                    ["Silk", "Muse", "Pearls", "Grace", "Artistry", "Heirloom"].includes(
                      word
                    )
                      ? "italic text-[#d4af37] font-normal"
                      : "text-white"
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-md">
              {slide.subtitle}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={slide.ctaLink}
                className="px-8 py-4 rounded-xl bg-[#d4af37] hover:bg-[#c59f2e] text-black font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-[0_4px_28px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_36px_rgba(212,175,55,0.55)] transition-all duration-300 hover:scale-105"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#lookbook"
                className="px-8 py-4 rounded-xl bg-black/60 hover:bg-black/85 text-white hover:text-[#d4af37] border border-white/20 hover:border-[#d4af37]/60 font-mono text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-md"
              >
                Shop The Lookbook
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Selector Indicators */}
        <div className="flex items-center gap-3 mt-12 relative z-20">
          {SLIDES.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: current === i ? 40 : 12,
                background: current === i ? "#d4af37" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Luxury Value Pillars Bar at Hero Base */}
      <div className="relative z-20 border-t border-[#d4af37]/20 bg-black/80 backdrop-blur-xl py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-[#d4af37]/15">
          <div className="flex items-center justify-center gap-2.5 px-2">
            <Award className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="text-[11px] font-mono tracking-wider text-neutral-300 uppercase">
              100% Pure Katan &amp; Silks
            </span>
          </div>

          <div className="flex items-center justify-center gap-2.5 px-2">
            <Scissors className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="text-[11px] font-mono tracking-wider text-neutral-300 uppercase">
              Handcrafted Zardozi Stitching
            </span>
          </div>

          <div className="flex items-center justify-center gap-2.5 px-2">
            <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="text-[11px] font-mono tracking-wider text-neutral-300 uppercase">
              Bespoke Atelier Tailoring
            </span>
          </div>

          <div className="flex items-center justify-center gap-2.5 px-2">
            <Truck className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="text-[11px] font-mono tracking-wider text-neutral-300 uppercase">
              Insured White-Glove Delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
