"use client";

import Link from "next/link";

export default function AtelierMarquee() {
  return (
    <aside aria-label="Announcement" className="relative z-50 bg-[#0c0b0a] text-[#d4af37] text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase py-2 border-b border-[#d4af37]/20 overflow-hidden">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-6 overflow-hidden whitespace-nowrap">
          <span className="flex items-center gap-2 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
            HAUTE COUTURE FESTIVE EDIT &apos;26
          </span>
          <span className="hidden md:inline text-neutral-500">•</span>
          <span className="hidden md:inline text-[#e6e2d8]">
            COMPLIMENTARY WHITE-GLOVE VIP SHIPPING ACROSS PAKISTAN
          </span>
          <span className="hidden lg:inline text-neutral-500">•</span>
          <span className="hidden lg:inline text-[#e6e2d8]">
            COMPLIMENTARY BESPOKE TAILORING ON BRIDAL ENSEMBLES
          </span>
        </div>

        <Link
          href="/contact"
          className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#d4af37] hover:text-white transition-colors underline underline-offset-4 decoration-[#d4af37]/50 whitespace-nowrap pl-4"
        >
          Book Atelier Consultation →
        </Link>
      </div>
    </aside>
  );
}
