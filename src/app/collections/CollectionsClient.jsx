"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProducts, fetchCategories } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import SectionHeading from "@/components/ui/SectionHeading";
import { SORT_OPTIONS } from "@/lib/constants";

export default function CollectionsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const currentCategory = searchParams.get("category") || "";
  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sort") || "newest";
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentFilter = searchParams.get("filter") || "";

  const buildParams = useCallback(() => {
    const params = { page: currentPage, limit: 12, sort: currentSort };
    if (currentCategory) params.category = currentCategory;
    if (currentSearch) params.search = currentSearch;
    if (currentFilter === "new") params.isNewArrival = "true";
    if (currentFilter === "sale") params.isOnSale = "true";
    if (currentFilter === "featured") params.isFeatured = "true";
    return params;
  }, [currentPage, currentSort, currentCategory, currentSearch, currentFilter]);

  useEffect(() => {
    setLoading(true);
    fetchProducts(buildParams())
      .then((res) => {
        setProducts(res.data || []);
        setMeta(res.meta || { page: 1, totalPages: 1, total: 0 });
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [buildParams]);

  useEffect(() => {
    fetchCategories({ limit: 50 })
      .then((res) => setCategories((res.data || []).filter((c) => c.isVisible)))
      .catch(() => setCategories([]));
  }, []);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== "page") params.set("page", "1");
    router.push(`/collections?${params.toString()}`, { scroll: false });
  };

  const filterTitle =
    currentFilter === "new" ? "New Arrivals"
    : currentFilter === "sale" ? "On Sale"
    : currentFilter === "featured" ? "Featured"
    : currentCategory ? currentCategory
    : "All Collections";

  return (
    <section className="section-spacer" style={{ background: "var(--bg-primary)" }}>
      <div className="container-luxe">
        <SectionHeading title={filterTitle} />

        {/* Toolbar */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6"
          style={{ borderBottom: "1px solid var(--border-light)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Search */}
          <div className="flex-1 min-w-[200px] max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              defaultValue={currentSearch}
              onKeyDown={(e) => { if (e.key === "Enter") updateParam("search", e.target.value); }}
              className="input-luxe"
              id="search-products"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={currentSort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="input-luxe cursor-pointer"
              style={{ width: "auto", padding: "10px 14px" }}
              id="sort-products"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <button
              className="lg:hidden btn btn-outline text-xs py-2.5 px-5"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? "Close" : "Filters"}
            </button>
          </div>
        </motion.div>

        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className={`shrink-0 w-56 ${filtersOpen ? "block" : "hidden"} lg:block`}>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: "var(--text-secondary)" }}>
              Categories
            </h4>

            <ul className="space-y-1">
              <li>
                <button
                  className="text-sm w-full text-left py-2 px-3 rounded-lg transition-all duration-300"
                  style={{
                    background: !currentCategory ? "rgba(201,169,110,0.1)" : "transparent",
                    color: !currentCategory ? "var(--color-gold-dark)" : "var(--text-secondary)",
                    fontWeight: !currentCategory ? 600 : 400,
                  }}
                  onClick={() => updateParam("category", "")}
                >
                  All
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <button
                    className="text-sm w-full text-left py-2 px-3 rounded-lg transition-all duration-300 hover:bg-[rgba(201,169,110,0.06)]"
                    style={{
                      background: currentCategory === cat.name ? "rgba(201,169,110,0.1)" : "transparent",
                      color: currentCategory === cat.name ? "var(--color-gold-dark)" : "var(--text-secondary)",
                      fontWeight: currentCategory === cat.name ? 600 : 400,
                    }}
                    onClick={() => updateParam("category", cat.name)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>

            <div className="my-6" style={{ height: 1, background: "var(--border-light)" }} />

            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: "var(--text-secondary)" }}>
              Quick Filters
            </h4>
            <ul className="space-y-1">
              {[
                { label: "New Arrivals", value: "new" },
                { label: "On Sale", value: "sale" },
                { label: "Featured", value: "featured" },
              ].map((f) => (
                <li key={f.value}>
                  <button
                    className="text-sm w-full text-left py-2 px-3 rounded-lg transition-all duration-300 hover:bg-[rgba(201,169,110,0.06)]"
                    style={{
                      background: currentFilter === f.value ? "rgba(201,169,110,0.1)" : "transparent",
                      color: currentFilter === f.value ? "var(--color-gold-dark)" : "var(--text-secondary)",
                      fontWeight: currentFilter === f.value ? 600 : 400,
                    }}
                    onClick={() => updateParam("filter", currentFilter === f.value ? "" : f.value)}
                  >
                    {f.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <p className="text-xs mb-6" style={{ color: "var(--text-secondary)" }}>
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full animate-pulse" style={{ background: "var(--color-gold)" }} />
                  Loading...
                </span>
              ) : (
                `${meta.total} product${meta.total !== 1 ? "s" : ""} found`
              )}
            </p>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeleton"
                  className="grid grid-cols-2 md:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <ProductCardSkeleton key={i} index={i} />
                  ))}
                </motion.div>
              ) : products.length > 0 ? (
                <motion.div
                  key="products"
                  className="grid grid-cols-2 md:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {products.map((p, i) => (
                    <ProductCard key={p._id} product={p} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="text-center py-28"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="block text-4xl mb-4" style={{ color: "var(--color-gold-light)" }}>◇</span>
                  <p className="text-xl mb-2"
                    style={{ fontFamily: "var(--font-cormorant), serif", color: "var(--text-primary)" }}>
                    No products found
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Try adjusting your filters or search term
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {meta.totalPages > 1 && (
              <motion.div
                className="flex items-center justify-center gap-4 mt-14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  className="btn btn-outline text-xs py-2.5 px-6"
                  disabled={currentPage <= 1}
                  onClick={() => updateParam("page", String(currentPage - 1))}
                  style={{ opacity: currentPage <= 1 ? 0.4 : 1 }}
                >
                  ← Previous
                </button>
                <span className="text-sm px-4 py-2 rounded-md"
                  style={{ color: "var(--text-secondary)", background: "var(--bg-secondary)" }}>
                  {meta.page} / {meta.totalPages}
                </span>
                <button
                  className="btn btn-outline text-xs py-2.5 px-6"
                  disabled={currentPage >= meta.totalPages}
                  onClick={() => updateParam("page", String(currentPage + 1))}
                  style={{ opacity: currentPage >= meta.totalPages ? 0.4 : 1 }}
                >
                  Next →
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
