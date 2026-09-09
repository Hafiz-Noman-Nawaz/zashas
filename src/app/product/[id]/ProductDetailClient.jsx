"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProductById, fetchProducts } from "@/lib/api";
import {
  formatPrice,
  discountPercent,
  whatsappLink,
  productInquiryMessage,
} from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import ProductCard from "@/components/ui/ProductCard";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, ShoppingBag } from "lucide-react";

export default function ProductDetailClient() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState("Unstitched");
  const [selectedSize, setSelectedSize] = useState("M");

  const selectedVariant = selectedType === "Stitched" ? `Stitched (${selectedSize})` : "Unstitched";

  useEffect(() => {
    setLoading(true);
    setSelectedImage(0);
    fetchProductById(id)
      .then((res) => {
        const p = res.data;
        setProduct(p);

        /* Fetch similar products from same category */
        if (p?.category) {
          fetchProducts({ category: p.category, limit: 4 })
            .then((r) =>
              setSimilar((r.data || []).filter((item) => item._id !== p._id).slice(0, 4))
            )
            .catch(() => setSimilar([]));
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div
        className="section-spacer container-luxe"
        style={{ minHeight: "60vh" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="skeleton" style={{ aspectRatio: "3/4" }} />
          <div className="space-y-4 py-4">
            <div className="skeleton" style={{ height: 14, width: "30%" }} />
            <div className="skeleton" style={{ height: 32, width: "70%" }} />
            <div className="skeleton" style={{ height: 20, width: "25%" }} />
            <div className="skeleton" style={{ height: 100, width: "100%" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="section-spacer container-luxe text-center"
        style={{ minHeight: "60vh" }}
      >
        <h2
          className="text-2xl mb-4"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          Product Not Found
        </h2>
        <Link href="/collections" className="btn btn-outline">
          Back to Collections
        </Link>
      </div>
    );
  }

  const off = discountPercent(product.price, product.discountedPrice);
  const images = product.images?.length > 0 ? product.images : [];
  const waMessage = `Hi Zasha's Collection! I'm interested in:\n\n*${product.title}*\nOption: ${selectedVariant}\nPrice: ${formatPrice(product.discountedPrice || product.price)}\n\nLink: ${typeof window !== "undefined" ? window.location.href : ""}\n\nPlease share more details and availability.`;
  const waLink = whatsappLink(WHATSAPP_NUMBER, waMessage);

  return (
    <>
      <section className="section-spacer" style={{ background: "var(--bg-primary)" }}>
        <div className="container-luxe">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-xs" style={{ color: "var(--text-secondary)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/collections" className="hover:underline">Collections</Link>
            {product.category && (
              <>
                <span>/</span>
                <Link
                  href={`/collections?category=${encodeURIComponent(product.category)}`}
                  className="hover:underline"
                >
                  {product.category}
                </Link>
              </>
            )}
            <span>/</span>
            <span style={{ color: "var(--text-primary)" }}>{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <div>
              {/* Main Image */}
              <motion.div
                className="img-cover rounded-xl mb-4"
                style={{
                  aspectRatio: "3 / 4",
                  background: "var(--color-ivory)",
                }}
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {images[selectedImage] ? (
                  <Image
                    src={images[selectedImage]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-xl"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ color: "var(--text-secondary)" }}>No Image</span>
                  </div>
                )}
              </motion.div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className="shrink-0 rounded-lg overflow-hidden transition-all"
                      style={{
                        width: 72,
                        height: 96,
                        border:
                          selectedImage === i
                            ? "2px solid var(--color-gold)"
                            : "2px solid transparent",
                        opacity: selectedImage === i ? 1 : 0.6,
                      }}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} ${i + 1}`}
                        width={72}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="py-2">
              {/* Category */}
              {product.category && (
                <p
                  className="text-[11px] tracking-[0.2em] uppercase mb-3"
                  style={{ color: "var(--color-gold-dark)" }}
                >
                  {product.category}
                </p>
              )}

              <h1
                className="text-3xl lg:text-4xl mb-4"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                {product.discountedPrice &&
                product.discountedPrice < product.price ? (
                  <>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "var(--color-danger)" }}
                    >
                      {formatPrice(product.discountedPrice)}
                    </span>
                    <span
                      className="text-base line-through"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {formatPrice(product.price)}
                    </span>
                    <span className="badge badge-sale">-{off}%</span>
                  </>
                ) : (
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.isNewArrival && (
                  <span className="badge badge-new">New Arrival</span>
                )}
                {product.isFeatured && (
                  <span className="badge badge-featured">Featured</span>
                )}
                {product.stock > 0 ? (
                  <span
                    className="badge"
                    style={{
                      background: "rgba(39,174,96,0.1)",
                      color: "var(--color-success)",
                    }}
                  >
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span
                    className="badge"
                    style={{
                      background: "rgba(192,57,43,0.1)",
                      color: "var(--color-danger)",
                    }}
                  >
                    Out of Stock
                  </span>
                )}
              </div>

              <hr className="divider-gold" style={{ margin: "24px 0" }} />

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h4
                    className="text-xs tracking-widest uppercase mb-3 font-semibold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Description
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {product.description}
                  </p>
                </div>
              )}

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {product.fabric && (
                  <DetailItem label="Fabric" value={product.fabric} />
                )}
                {product.colors?.length > 0 && (
                  <DetailItem
                    label="Colors"
                    value={product.colors.join(", ")}
                  />
                )}
                {product.tags?.length > 0 && (
                  <DetailItem label="Tags" value={product.tags.join(", ")} />
                )}
                {product.subcategory && (
                  <DetailItem label="Subcategory" value={product.subcategory} />
                )}
              </div>

              {/* Variant Selector: Unstitched vs Stitched */}
              <div className="mb-6 p-4 rounded-xl border" style={{ borderColor: "var(--border-default)", background: "var(--bg-secondary)" }}>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Suiting Option
                  </label>
                  <span className="text-xs font-semibold" style={{ color: "var(--color-gold-dark)" }}>
                    {selectedVariant}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-3">
                  {["Unstitched", "Stitched"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className="py-2.5 px-4 text-xs font-semibold rounded-lg border transition-all duration-300"
                      style={{
                        borderColor: selectedType === type ? "var(--color-gold)" : "var(--border-light)",
                        background: selectedType === type ? "rgba(201,169,110,0.15)" : "var(--bg-primary)",
                        color: selectedType === type ? "var(--color-gold-dark)" : "var(--text-primary)"
                      }}
                    >
                      {type} Piece
                    </button>
                  ))}
                </div>

                {selectedType === "Stitched" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-3 border-t"
                    style={{ borderColor: "var(--border-light)" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] tracking-wider uppercase font-medium" style={{ color: "var(--text-secondary)" }}>
                        Select Size
                      </label>
                      <span className="text-[10px] opacity-70" style={{ color: "var(--text-secondary)" }}>
                        Standard Sizing (Inches)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {["XS", "S", "M", "L", "XL"].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className="flex-1 py-2 text-xs font-semibold rounded-md border transition-all"
                          style={{
                            borderColor: selectedSize === sz ? "var(--color-gold)" : "var(--border-light)",
                            background: selectedSize === sz ? "var(--color-gold)" : "var(--bg-primary)",
                            color: selectedSize === sz ? "#ffffff" : "var(--text-primary)"
                          }}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quantity & Cart Actions */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center border rounded-md" style={{ borderColor: "var(--border-default)" }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-3 font-medium" style={{ color: "var(--text-primary)" }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => addToCart(product, quantity, selectedVariant)}
                    disabled={product.stock <= 0}
                    className="btn btn-outline w-full flex justify-center py-4 text-base tracking-widest gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag size={18} />
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>

                  <button
                    onClick={() => {
                      addToCart(product, quantity, selectedVariant);
                      router.push("/checkout");
                    }}
                    disabled={product.stock <= 0}
                    className="btn btn-gold w-full flex justify-center py-4 text-base tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Buy it Now
                  </button>
                </div>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp flex-1 text-xs py-3"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.553 4.113 1.519 5.845L.05 23.308a.5.5 0 00.642.642l5.463-1.469A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.582l-.386-.235-3.248.873.873-3.248-.235-.386A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Order via WhatsApp
                </a>
              </div>

              {/* PAKISTANI E-COMMERCE TRUST BADGES & DELIVERY ESTIMATOR */}
              <div className="mt-8 pt-6 border-t space-y-4" style={{ borderColor: "var(--border-light)" }}>
                <div className="p-4 rounded-xl border bg-[var(--bg-secondary)]" style={{ borderColor: "var(--border-light)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">🚚</span>
                    <span className="font-semibold text-xs tracking-wider uppercase" style={{ color: "var(--text-primary)" }}>
                      Express Delivery Across Pakistan
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Estimated delivery in <strong>2–3 business days</strong> to Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad & nationwide.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2.5 p-3 rounded-lg border bg-[var(--bg-card)]" style={{ borderColor: "var(--border-default)" }}>
                    <span className="text-lg">💵</span>
                    <div>
                      <strong className="block text-[11px] uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                        Cash on Delivery
                      </strong>
                      <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>
                        Pay safely at doorstep
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-lg border bg-[var(--bg-card)]" style={{ borderColor: "var(--border-default)" }}>
                    <span className="text-lg">📱</span>
                    <div>
                      <strong className="block text-[11px] uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                        JazzCash & EasyPaisa
                      </strong>
                      <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>
                        Instant digital transfer
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-lg border bg-[var(--bg-card)]" style={{ borderColor: "var(--border-default)" }}>
                    <span className="text-lg">✨</span>
                    <div>
                      <strong className="block text-[11px] uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                        100% Original Fabric
                      </strong>
                      <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>
                        Premium grade craftsmanship
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-lg border bg-[var(--bg-card)]" style={{ borderColor: "var(--border-default)" }}>
                    <span className="text-lg">🔄</span>
                    <div>
                      <strong className="block text-[11px] uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                        7-Day Easy Exchange
                      </strong>
                      <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>
                        Hassle-free guarantee
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="mt-6">
                <button
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "var(--text-secondary)" }}
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.title,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied!");
                    }
                  }}
                >
                  ↗ Share this product
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similar.length > 0 && (
        <section
          className="section-spacer"
          style={{ background: "var(--bg-secondary)" }}
        >
          <div className="container-luxe">
            <h2
              className="text-center text-2xl mb-10"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {similar.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* ── Detail item ─────────────────────────────────────── */
function DetailItem({ label, value }) {
  return (
    <div>
      <dt
        className="text-[10px] tracking-widest uppercase mb-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </dt>
      <dd
        className="text-sm"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </dd>
    </div>
  );
}
