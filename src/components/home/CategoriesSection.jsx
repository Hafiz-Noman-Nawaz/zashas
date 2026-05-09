"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchCategories } from "@/lib/api";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories({ limit: 20 })
      .then((res) => setCategories((res.data || []).filter((c) => c.isVisible)))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="section-spacer" style={{ background: "var(--bg-secondary)" }}>
        <div className="container-luxe">
          <SectionHeading title="Shop by Category" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="skeleton rounded-xl" style={{ aspectRatio: "4/5" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="section-spacer" style={{ background: "var(--bg-secondary)" }}>
      <div className="container-luxe">
        <SectionHeading
          title="Shop by Category"
          subtitle="Find your perfect style"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/collections?category=${encodeURIComponent(cat.name)}`}
                className="group block relative overflow-hidden rounded-xl"
                style={{ aspectRatio: "4 / 5" }}
              >
                {/* Background */}
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width:640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, var(--color-champagne), var(--color-blush))`,
                    }}
                  />
                )}

                {/* Overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-end pb-8 transition-all duration-500"
                  style={{
                    background: "linear-gradient(transparent 30%, rgba(13,13,13,0.6))",
                  }}
                >
                  <span
                    className="text-lg tracking-wider uppercase mb-2"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    {cat.name}
                  </span>
                  {/* Animated explore arrow */}
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-2"
                    style={{ color: "var(--color-gold-light)" }}
                  >
                    Explore →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
