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
    <section id="lookbook" className="py-20 lg:py-28 bg-gradient-to-b from-[#07130E] via-[#0D2218] to-[#050C09] text-[#FAF7F2] overflow-hidden relative border-y border-[#D4A038]/20">
      {/* Decorative Atelier watermark */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[12vw] font-serif uppercase tracking-[0.3em] text-[#D4A038]/[0.03] select-none pointer-events-none whitespace-nowrap">
        ZASHA COUTURE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] font-sans tracking-[0.25em] text-[#D4A038] uppercase mb-2 font-medium">
            Curated Atelier Ensembles
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#FAF7F2]">
            Shop The Festive Look
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4A038] mx-auto my-4 opacity-80" />
          <p className="text-sm text-[#c8d4ce] font-light leading-relaxed">
            Every stitch tells a story of heritage artistry. Hover or tap the
            gilded pins to unveil and acquire each handcrafted masterpiece.
          </p>
        </div>

        {/* Lookbook Stage: 2-column or Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual with Pulsing Pins */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-2xl border border-[#D4A038]/30 aspect-[3/4] sm:aspect-[4/5] lg:aspect-[16/11] bg-[#07130E]">
            <Image
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600&q=85"
              alt="Zasha's Festive Lookbook Ensemble"
              fill
              className="object-cover object-top opacity-95 transition-transform duration-1000 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07130E]/85 via-transparent to-[#07130E]/30 pointer-events-none" />

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
                  <span className="absolute -inset-2.5 rounded-full bg-[#D4A038]/40 animate-ping pointer-events-none" />

                  {/* Pin Trigger Button */}
                  <button
                    onClick={() => setActiveSpot(item)}
                    aria-label={`View ${item.title}`}
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 shadow-xl ${
                      isActive
                        ? "bg-[#D4A038] text-[#0E1C15] scale-125 ring-4 ring-[#D4A038]/30 font-bold"
                        : "bg-[#09130F]/90 text-[#D4A038] border border-[#D4A038] hover:scale-110 hover:bg-[#D4A038] hover:text-[#0E1C15]"
                    }`}
                  >
                    <span className="text-[12px] font-serif font-bold">
                      {item.id.replace("hotspot-", "0")}
                    </span>
                  </button>

                  {/* Desktop Quick-Peek Floating Tag on Hover */}
                  <div
                    className={`hidden md:block absolute left-10 top-1/2 -translate-y-1/2 bg-[#09130F]/95 backdrop-blur-md px-3 py-1.5 rounded-md border border-[#D4A038]/40 whitespace-nowrap shadow-2xl transition-all duration-200 pointer-events-none ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  >
                    <p className="text-[10px] uppercase font-sans tracking-[0.18em] text-[#D4A038]">
                      {item.category}
                    </p>
                    <p className="text-xs font-serif text-[#FAF7F2] font-medium">
                      Rs. {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Mobile Touch Instruction Pill */}
            <div className="absolute bottom-4 left-4 right-4 md:hidden bg-[#09130F]/85 backdrop-blur-md py-2 px-3 rounded-lg border border-[#D4A038]/30 text-center">
              <p className="text-[11px] text-[#e8ebe9] font-light">
                Tap numbered pins on the image to inspect & add items
              </p>
            </div>
          </div>

          {/* Active Piece Glass Card / Sidebar */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {activeSpot ? (
              <div className="relative rounded-2xl bg-[#0E2017]/90 backdrop-blur-xl border border-[#D4A038]/35 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-sans tracking-[0.18em] uppercase text-[#D4A038] bg-[#D4A038]/15 px-2.5 py-1 rounded-full border border-[#D4A038]/30">
                    {activeSpot.category}
                  </span>
                  <span className="text-xs font-sans text-[#a7b5af]">
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
                <h3 className="text-xl font-serif font-medium text-[#FAF7F2] mb-2 leading-snug">
                  {activeSpot.title}
                </h3>
                <p className="text-xs text-[#c8d4ce] font-light leading-relaxed mb-6">
                  {activeSpot.description}
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={(e) => handleQuickAdd(activeSpot, e)}
                    disabled={addedItem === activeSpot.id}
                    className={`w-full py-3 px-4 rounded-xl font-sans text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                      addedItem === activeSpot.id
                        ? "bg-[#173326] text-[#FAF7F2] border border-[#D4A038] font-medium"
                        : "bg-[#D4A038] text-[#0E1C15] hover:bg-[#E8BE68] font-bold hover:shadow-[#D4A038]/20 hover:scale-[1.02]"
                    }`}
                  >
                    {addedItem === activeSpot.id ? (
                      <>
                        <Check className="w-4 h-4 text-[#D4A038]" /> Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Quick Add Piece
                      </>
                    )}
                  </button>

                  <Link
                    href="/collections"
                    className="w-full py-2.5 px-4 rounded-xl font-sans text-[11px] uppercase tracking-[0.18em] text-center text-[#D4A038] hover:text-white border border-[#D4A038]/30 hover:border-[#D4A038] flex items-center justify-center gap-2 transition-all"
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
                      ? "bg-[#D4A038]/20 border-[#D4A038] text-[#D4A038] font-semibold"
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
