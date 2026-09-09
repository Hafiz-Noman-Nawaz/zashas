"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Scissors, Clock } from "lucide-react";

export default function HeritageStory() {
  return (
    <section className="py-24 bg-[#0a0908] text-[#f7f4ed] relative overflow-hidden border-t border-[#d4af37]/15">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Canvas: Tall Editorial Imagery with Gold Border Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=85"
                alt="Zasha's Master Embroiderer at Work"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Atelier Seal */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase">
                    Authentic Craftsmanship
                  </p>
                  <p className="text-sm font-serif text-white">
                    Heirloom Marodi &amp; Zardozi Stitching
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] font-serif text-xs font-bold">
                  Est. 26
                </div>
              </div>
            </div>

            {/* Overlapping Secondary Accent Card */}
            <div className="hidden sm:block absolute -top-6 -right-6 bg-[#161412]/95 border border-[#d4af37]/40 p-4 rounded-xl shadow-2xl backdrop-blur-lg max-w-[200px]">
              <p className="text-2xl font-serif text-[#d4af37] font-bold">
                120+
              </p>
              <p className="text-[11px] text-neutral-300 font-light leading-snug">
                Hours of bespoke needlework per bridal masterwork.
              </p>
            </div>
          </div>

          {/* Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-[#d4af37]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              The Art of Pakistani Couture
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-[1.15]">
              Preserving Centuries of <br />
              <span className="italic text-[#d4af37]">Imperial Needlecraft</span>
            </h2>

            <div className="w-20 h-[1.5px] bg-[#d4af37]/80 my-4" />

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              At Zasha&apos;s Collection, every silhouette is born in the historic ateliers of Lahore, where master karigars breathe life into pure katan silks, hand-hammered zardozi wires, and gossamer organza veils.
            </p>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              We reject mass production in pursuit of timeless heirloom value. Each ensemble is individually cut, tailored, and hand-embellished to honor the grandeur of South Asian royalty for the contemporary discerning woman.
            </p>

            {/* 4 Atelier Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white">
                    100% Pure Silks
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light">
                    Sourced from premier mills
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Scissors className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white">
                    Bespoke Tailoring
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light">
                    Made to your exact measurements
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white">
                    Heirloom Longevity
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light">
                    Preserved for generations
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white">
                    White-Glove Courier
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light">
                    Insured delivery nationwide
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-transparent hover:bg-[#d4af37] text-[#d4af37] hover:text-black border border-[#d4af37] font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:scale-105"
              >
                Read The Atelier Story →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
