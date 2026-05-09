"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ isFeatured: "true", limit: 8 })
      .then((res) => setProducts(res.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-spacer" style={{ background: "var(--bg-primary)" }}>
      <div className="container-luxe">
        <SectionHeading
          title="Featured Collection"
          subtitle="Hand-picked pieces from our finest selections"
        />

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} index={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="block text-4xl mb-4" style={{ color: "var(--color-gold-light)" }}>✦</span>
            <p className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", color: "var(--text-primary)" }}>
              Coming Soon
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Our featured collection is being curated. Check back soon!
            </p>
          </motion.div>
        )}

        {products.length > 0 && (
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/collections" className="btn btn-outline">
              View All Collections
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
