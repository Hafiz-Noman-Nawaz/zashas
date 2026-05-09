"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice, discountPercent } from "@/lib/utils";

export default function ProductCard({ product, index = 0 }) {
  const off = discountPercent(product.price, product.discountedPrice);
  const mainImage = product.images?.[0];
  const secondImage = product.images?.[1];

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
    >
      <Link
        href={`/product/${product._id}`}
        className="block group"
        id={`product-card-${product._id}`}
      >
        {/* Image container */}
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            aspectRatio: "3 / 4",
            background: "var(--bg-secondary)",
          }}
        >
          {mainImage ? (
            <>
              <Image
                src={mainImage}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-all duration-700 ease-out"
                style={{ transform: "scale(1)" }}
              />
              {/* Second image on hover (if exists) */}
              {secondImage && (
                <Image
                  src={secondImage}
                  alt={`${product.title} alt`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}
              {/* Zoom on hover */}
              <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out" />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span className="text-xs tracking-wider uppercase" style={{ color: "var(--text-secondary)" }}>
                No Image
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNewArrival && <span className="badge badge-new">New</span>}
            {product.isOnSale && off > 0 && (
              <span className="badge badge-sale">-{off}%</span>
            )}
            {product.isFeatured && !product.isNewArrival && (
              <span className="badge badge-featured">Featured</span>
            )}
          </div>

          {/* Quick-view overlay */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-all duration-500"
            style={{
              background: "linear-gradient(transparent 40%, rgba(0,0,0,0.45))",
            }}
          >
            <motion.span
              className="text-xs tracking-[0.15em] uppercase px-6 py-2.5 rounded-full backdrop-blur-sm"
              style={{
                background: "rgba(255,255,255,0.9)",
                color: "#2a2a2a",
                fontWeight: 500,
              }}
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              View Details →
            </motion.span>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 pb-2 px-1">
          {product.category && (
            <p
              className="text-[10px] tracking-[0.2em] uppercase mb-1.5"
              style={{ color: "var(--color-gold-dark)" }}
            >
              {product.category}
            </p>
          )}
          <h3
            className="text-base mb-2 line-clamp-1 group-hover:text-[var(--color-gold-dark)] transition-colors duration-300"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2.5">
            {product.discountedPrice && product.discountedPrice < product.price ? (
              <>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-danger)" }}
                >
                  {formatPrice(product.discountedPrice)}
                </span>
                <span
                  className="text-xs line-through"
                  style={{ color: "var(--text-secondary)", opacity: 0.7 }}
                >
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span
                className="text-sm font-semibold"
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
