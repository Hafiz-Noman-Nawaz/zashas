"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1920&q=85",
    eyebrow: "FESTIVE ATELIER • SPRING '26",
    heading: "Elegance Woven Into Every Thread",
    subtitle:
      "Handcrafted bridal peshwas, pure raw silks, and heirloom zardozi embroidery steeped in centuries of heritage.",
    ctaText: "Explore Collection",
    ctaLink: "/collections",
  },
  {
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1920&q=85",
    eyebrow: "REGAL WINTER VELVET",
    heading: "Majestic Silhouettes, Modern Grace",
    subtitle:
      "Plush silk micro-velvet tailored with antique tilla dori, hand-hammered wire, and artisanal silk tassel closures.",
    ctaText: "Explore Formals",
    ctaLink: "/collections?category=Pret%20%26%20Formals",
  },
  {
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1920&q=85",
    eyebrow: "ORGANZA & RESHAM FORMALS",
    heading: "Whispers of Rose Gold & Pearls",
    subtitle:
      "Gossamer sheer organza shirts adorned with delicate botanical resham vines and luminous seed pearls.",
    ctaText: "View Pret Edit",
    ctaLink: "/collections?filter=new",
  },
  {
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=1920&q=85",
    eyebrow: "UNSTITCHED FESTIVE LAWN",
    heading: "Woven Traditions, Bespoke Art",
    subtitle:
      "Authentic Banarasi brocade jacquard veils paired with heavy katan silk and handcrafted neckline motifs.",
    ctaText: "Discover Unstitched",
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
    <section className="relative overflow-hidden bg-[#09130F] text-white min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-center items-center">
      {/* Background Slides with Slow Cinematic Dissolve */}
      {SLIDES.map((slideItem, idx) => (
        <motion.div
          key={`hero-slide-${idx}`}
          className="absolute inset-0 z-0"
          initial={false}
          animate={{
            opacity: current === idx ? 1 : 0,
            scale: current === idx ? 1.03 : 1,
          }}
          transition={{
            opacity: { duration: 1.4, ease: "easeInOut" },
            scale: { duration: INTERVAL / 1000 + 1, ease: "easeOut" },
          }}
          style={{ pointerEvents: current === idx ? "auto" : "none" }}
        >
          <Image
            src={slideItem.image}
            alt={slideItem.heading}
            fill
            priority={idx === 0}
            className="object-cover object-center brightness-[0.70]"
            sizes="100vw"
          />

          {/* Regal Mughal emerald dark wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09130F] via-black/40 to-black/65" />
        </motion.div>
      ))}

      {/* Main Editorial Copy */}
      <div className="max-w-5xl mx-auto px-6 relative z-10 py-20 text-center flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`slide-copy-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Eyebrow */}
            <p className="text-[11px] sm:text-xs font-sans tracking-[0.28em] text-[#D4A038] uppercase mb-5">
              {slide.eyebrow}
            </p>

            {/* Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-white tracking-tight leading-[1.12] mb-6 max-w-4xl drop-shadow-xl">
              {slide.heading}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-neutral-200 font-sans font-light leading-relaxed max-w-xl mx-auto mb-10">
              {slide.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link
                href={slide.ctaLink}
                className="px-8 py-3.5 rounded-full bg-[#D4A038] hover:bg-[#E8BE68] text-[#0E1C15] font-sans text-xs uppercase tracking-[0.18em] font-bold flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-[#D4A038]/20"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="#lookbook"
                className="px-8 py-3.5 rounded-full bg-[#173326]/45 hover:bg-[#173326]/85 text-white hover:text-[#E8BE68] border border-[#D4A038]/40 hover:border-[#D4A038] font-sans text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 backdrop-blur-md"
              >
                View Lookbook
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Minimal Slide Indicators */}
        <div className="flex items-center gap-2.5 mt-14 relative z-20">
          {SLIDES.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: current === i ? 28 : 10,
                background: current === i ? "#D4A038" : "rgba(212,160,56,0.35)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
