"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice, discountPercent } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag } from "lucide-react";

const SIZES = ["Unstitched", "S", "M", "L", "XL"];

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const off = discountPercent(product.price, product.discountedPrice);
  const mainImage = product.images?.[0];
  const secondImage = product.images?.[1] || product.images?.[0];

  const handleQuickAdd = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, size);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/product/${product._id}`}
        className="block"
        id={`product-card-${product._id}`}
      >
        {/* Image Frame with Dual-Angle Reveal */}
        <div
          className="relative overflow-hidden rounded-2xl transition-all duration-500 shadow-xs group-hover:shadow-xl"
          style={{
            aspectRatio: "3 / 4",
            background: "var(--bg-secondary)",
          }}
        >
          {mainImage ? (
            <>
              {/* Primary Photo */}
              <Image
                src={mainImage}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Secondary Close-Up Embroidery Angle */}
              {secondImage && (
                <Image
                  src={secondImage}
                  alt={`${product.title} detail`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              )}
            </>
          ) : (
            <Image
              src="/assets/placeholder.svg"
              alt={product.title || "Zasha's Collection"}
              fill
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
            {product.isNewArrival && (
              <span className="badge badge-new shadow-sm backdrop-blur-md">New Atelier</span>
            )}
            {product.isOnSale && off > 0 && (
              <span className="badge badge-sale shadow-sm backdrop-blur-md">-{off}%</span>
            )}
            {product.isFeatured && !product.isNewArrival && (
              <span className="badge badge-featured shadow-sm backdrop-blur-md">Featured</span>
            )}
          </div>

          {/* Floating Magnetic Wishlist Button */}
          <button
            onClick={toggleWishlist}
            aria-label="Add to wishlist"
            className={`absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
              isWishlisted
                ? "bg-rose-500 text-white scale-110"
                : "bg-white/80 dark:bg-black/60 text-neutral-800 dark:text-neutral-200 backdrop-blur-md hover:bg-white dark:hover:bg-neutral-900 hover:scale-110"
            }`}
          >
            <Heart
              size={16}
              className={`transition-colors ${isWishlisted ? "fill-white text-white" : ""}`}
            />
          </button>

          {/* Haute Couture Quick-Add Size Flyout Pill Bar */}
          <div className="absolute inset-x-3 bottom-3 z-20 overflow-hidden pointer-events-none group-hover:pointer-events-auto">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-2 rounded-xl bg-neutral-900/90 dark:bg-neutral-950/95 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--color-gold)] flex items-center gap-1">
                      <ShoppingBag size={11} /> Quick Select & Add
                    </span>
                    <span className="text-[9px] text-white/50">Instant Add</span>
                  </div>

                  <div className="grid grid-cols-5 gap-1 pt-0.5">
                    {SIZES.map((sz) => (
                      <button
                        key={sz}
                        onClick={(e) => handleQuickAdd(e, sz)}
                        className="py-1 px-1 text-[10px] font-semibold rounded-md border border-white/15 text-white hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] hover:text-black transition-all duration-200 text-center truncate"
                        title={`Add ${sz} to Cart`}
                      >
                        {sz === "Unstitched" ? "Unstitch" : sz}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Product Information */}
        <div className="pt-4 pb-2 px-1">
          {product.category && (
            <p
              className="text-[10px] tracking-[0.25em] uppercase mb-1 font-medium"
              style={{ color: "var(--color-gold)" }}
            >
              {product.category}
            </p>
          )}

          <h3
            className="text-base mb-1.5 line-clamp-1 group-hover:text-[var(--color-gold)] transition-colors duration-300"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {product.title}
          </h3>

          {/* Pricing with Subtle Luxury Typography */}
          <div className="flex items-center gap-2.5">
            {product.discountedPrice && product.discountedPrice < product.price ? (
              <>
                <span
                  className="text-sm font-semibold tracking-wide"
                  style={{ color: "var(--color-gold)" }}
                >
                  {formatPrice(product.discountedPrice)}
                </span>
                <span
                  className="text-xs line-through opacity-50 font-light"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span
                className="text-sm font-medium tracking-wide"
                style={{ color: "var(--text-primary)" }}
              >
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

