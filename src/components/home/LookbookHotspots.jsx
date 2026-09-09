"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Check, ArrowRight, X } from "lucide-react";

const LOOKBOOK_ITEMS = [
  {
    id: "hotspot-1",
    title: "Hand-Embroidered Zardozi Dupatta",
    category: "Organza Silk Veil",
    price: 18500,
    x: 36, // percentage from left
    y: 26, // percentage from top
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    description:
      "4-sided scalloped hand-tilla cutwork on pure silk organza with dusted pearls.",
    productPayload: {
      _id: "lookbook-dupatta-01",
      title: "Hand-Embroidered Zardozi Dupatta",
      slug: "hand-embroidered-zardozi-dupatta",
      price: 18500,
      images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
      ],
      stock: 5,
    },
  },
  {
    id: "hotspot-2",
    title: "Heavily Embellished Raw Silk Kalidar",
    category: "Couture Shirt",
    price: 34000,
    x: 52,
    y: 48,
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    description:
      "Signature 80-kali silhouette featuring marodi needlework and dabka bodice.",
    productPayload: {
      _id: "lookbook-kalidar-02",
      title: "Heavily Embellished Raw Silk Kalidar",
      slug: "heavily-embellished-raw-silk-kalidar",
      price: 34000,
      images: [
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
      ],
      stock: 4,
    },
  },
  {
    id: "hotspot-3",
    title: "Banarasi Weave Flared Culottes",
    category: "Bottom Wear",
    price: 14500,
    x: 62,
    y: 76,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&q=80",
    description:
      "Handloom antique gold zari woven into raw silk with structured hem detailing.",
    productPayload: {
      _id: "lookbook-culottes-03",
      title: "Banarasi Weave Flared Culottes",
      slug: "banarasi-weave-flared-culottes",
      price: 14500,
      images: [
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&q=80",
      ],
      stock: 6,
    },
  },
];

export default function LookbookHotspots() {
  const [activeSpot, setActiveSpot] = useState(LOOKBOOK_ITEMS[1]); // Default open center item
  const [addedItem, setAddedItem] = useState(null);
  const { addToCart } = useCart();

  const handleQuickAdd = (item, e) => {
    e.stopPropagation();
    addToCart(item.productPayload, 1, "Standard Atelier");
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 2400);
  };

  return (
    <section id="lookbook" className="py-20 lg:py-28 bg-gradient-to-b from-[#0f0e0d] via-[#141210] to-[#0c0b0a] text-[#f8f6f0] overflow-hidden relative border-y border-[#d4af37]/15">
      {/* Decorative Atelier watermark */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[12vw] font-serif uppercase tracking-[0.3em] text-[#d4af37]/[0.03] select-none pointer-events-none whitespace-nowrap">
        ZASHA COUTURE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] font-sans tracking-[0.25em] text-[#d4af37] uppercase mb-2">
            Curated Atelier Ensembles
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#fdfcf9]">
            Shop The Festive Look
          </h2>
          <div className="w-16 h-[1.5px] bg-[#d4af37] mx-auto my-4 opacity-80" />
          <p className="text-sm text-[#b8b3a8] font-light leading-relaxed">
            Every stitch tells a story of heritage artistry. Hover or tap the
            gilded pins to unveil and acquire each handcrafted masterpiece.
          </p>
        </div>

        {/* Lookbook Stage: 2-column or Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual with Pulsing Pins */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-2xl border border-[#d4af37]/25 aspect-[3/4] sm:aspect-[4/5] lg:aspect-[16/11] bg-black">
            <Image
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600&q=85"
              alt="Zasha's Festive Lookbook Ensemble"
              fill
              className="object-cover object-top opacity-95 transition-transform duration-1000 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Interactive Pulsing Hotspots */}
            {LOOKBOOK_ITEMS.map((item) => {
              const isActive = activeSpot?.id === item.id;
              return (
                <div
                  key={item.id}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  {/* Outer Pulsing Wave */}
                  <span className="absolute -inset-2.5 rounded-full bg-[#d4af37]/40 animate-ping pointer-events-none" />

                  {/* Pin Trigger Button */}
                  <button
                    onClick={() => setActiveSpot(item)}
                    aria-label={`View ${item.title}`}
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 shadow-xl ${
                      isActive
                        ? "bg-[#d4af37] text-black scale-125 ring-4 ring-[#d4af37]/30"
                        : "bg-black/85 text-[#d4af37] border border-[#d4af37] hover:scale-110 hover:bg-[#d4af37] hover:text-black"
                    }`}
                  >
                    <span className="text-[12px] font-serif font-bold">
                      {item.id.replace("hotspot-", "0")}
                    </span>
                  </button>

                  {/* Desktop Quick-Peek Floating Tag on Hover */}
                  <div
                    className={`hidden md:block absolute left-10 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-[#d4af37]/40 whitespace-nowrap shadow-2xl transition-all duration-200 pointer-events-none ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  >
                    <p className="text-[10px] uppercase font-sans tracking-[0.18em] text-[#d4af37]">
                      {item.category}
                    </p>
                    <p className="text-xs font-serif text-white font-medium">
                      Rs. {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Mobile Touch Instruction Pill */}
            <div className="absolute bottom-4 left-4 right-4 md:hidden bg-black/75 backdrop-blur-md py-2 px-3 rounded-lg border border-[#d4af37]/30 text-center">
              <p className="text-[11px] text-[#e8e4d8] font-light">
                Tap numbered pins on the image to inspect & add items
              </p>
            </div>
          </div>

          {/* Active Piece Glass Card / Sidebar */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {activeSpot ? (
              <div className="relative rounded-2xl bg-[#171513]/90 backdrop-blur-xl border border-[#d4af37]/30 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-sans tracking-[0.18em] uppercase text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded-full border border-[#d4af37]/25">
                    {activeSpot.category}
                  </span>
                  <span className="text-xs font-sans text-[#a39e93]">
                    Lookbook Item {activeSpot.id.replace("hotspot-", "0")}/03
                  </span>
                </div>

                {/* Mini Visual Preview */}
                <div className="relative h-44 rounded-xl overflow-hidden mb-5 border border-white/10 group">
                  <Image
                    src={activeSpot.image}
                    alt={activeSpot.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white font-serif text-lg font-medium">
                    Rs. {activeSpot.price.toLocaleString()}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-serif font-medium text-white mb-2 leading-snug">
                  {activeSpot.title}
                </h3>
                <p className="text-xs text-[#b8b3a8] font-light leading-relaxed mb-6">
                  {activeSpot.description}
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={(e) => handleQuickAdd(activeSpot, e)}
                    disabled={addedItem === activeSpot.id}
                    className={`w-full py-3 px-4 rounded-xl font-sans text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                      addedItem === activeSpot.id
                        ? "bg-emerald-600 text-white font-medium"
                        : "bg-[#d4af37] text-black hover:bg-[#c49f2e] font-semibold hover:shadow-[#d4af37]/20 hover:scale-[1.02]"
                    }`}
                  >
                    {addedItem === activeSpot.id ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Quick Add Piece
                      </>
                    )}
                  </button>

                  <Link
                    href="/collections"
                    className="w-full py-2.5 px-4 rounded-xl font-sans text-[11px] uppercase tracking-[0.18em] text-center text-[#d4af37] hover:text-white border border-[#d4af37]/30 hover:border-[#d4af37] flex items-center justify-center gap-2 transition-all"
                  >
                    Browse Full Collection <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : null}

            {/* Quick Item Switcher Ribbon */}
            <div className="mt-4 flex gap-2 justify-center">
              {LOOKBOOK_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSpot(item)}
                  className={`text-[11px] font-sans px-3 py-1.5 rounded-lg border transition-all ${
                    activeSpot?.id === item.id
                      ? "bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] font-semibold"
                      : "border-white/10 text-neutral-400 hover:text-white hover:border-white/25"
                  }`}
                >
                  Piece 0{item.id.replace("hotspot-", "")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
