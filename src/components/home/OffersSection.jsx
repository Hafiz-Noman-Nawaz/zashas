"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchOffers } from "@/lib/api";
import SectionHeading from "@/components/ui/SectionHeading";

export default function OffersSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers({ limit: 6 })
      .then((res) => {
        const active = (res.data || []).filter((o) => o.isActive);
        setOffers(active);
      })
      .catch(() => setOffers([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && offers.length === 0) return null;

  return (
    <section
      className="section-spacer"
      style={{
        background: "linear-gradient(135deg, #09130F 0%, #050C09 100%)",
      }}
    >
      <div className="container-luxe">
        <SectionHeading
          title="Special Offers"
          subtitle="Limited-time deals you don't want to miss"
          lightText
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,169,110,0.1)",
                  padding: 24,
                }}
              >
                <div className="skeleton" style={{ height: 32, width: "40%", marginBottom: 16, background: "rgba(255,255,255,0.06)" }} />
                <div className="skeleton" style={{ height: 18, width: "70%", marginBottom: 10, background: "rgba(255,255,255,0.05)" }} />
                <div className="skeleton" style={{ height: 14, width: "50%", marginBottom: 20, background: "rgba(255,255,255,0.04)" }} />
                <div className="skeleton" style={{ height: 36, width: "35%", borderRadius: 6, background: "rgba(201,169,110,0.15)" }} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, i) => (
              <OfferCard key={offer._id} offer={offer} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function OfferCard({ offer, index }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!offer.endsAt) return;
    const tick = () => {
      const diff = new Date(offer.endsAt) - new Date();
      if (diff <= 0) { setTimeLeft("Expired"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${d}d ${h}h ${m}m`);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [offer.endsAt]);

  return (
    <motion.div
      className="group relative rounded-xl p-7 overflow-hidden"
      style={{
        background: "rgba(23, 51, 38, 0.25)",
        border: "1px solid rgba(212, 160, 56, 0.2)",
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(212, 160, 56, 0.14) 0%, transparent 70%)",
        }}
      />

      {/* Discount badge */}
      <div className="flex items-baseline gap-2 mb-5 relative z-10">
        <span
          className="text-4xl font-bold"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            color: "var(--color-gold)",
          }}
        >
          {offer.discountPercentage}%
        </span>
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: "var(--color-gold-light)" }}
        >
          Off
        </span>
      </div>

      <h3
        className="text-xl mb-3 relative z-10"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 600,
          color: "#ffffff",
        }}
      >
        {offer.title}
      </h3>

      {offer.description && (
        <p className="text-sm mb-5 leading-relaxed relative z-10" style={{ color: "#9a9590" }}>
          {offer.description}
        </p>
      )}

      {timeLeft && (
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "#7a7570" }}>
            Ends in
          </span>
          <span
            className="text-sm font-semibold px-3 py-1 rounded-md"
            style={{
              color: "var(--color-gold-light)",
              background: "rgba(201,169,110,0.08)",
            }}
          >
            {timeLeft}
          </span>
        </div>
      )}

      <Link href="/collections?filter=sale" className="btn btn-gold text-xs py-2.5 px-7 relative z-10">
        Shop Now
      </Link>
    </motion.div>
  );
}
