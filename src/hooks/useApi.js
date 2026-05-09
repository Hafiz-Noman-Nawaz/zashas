"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useApi — React hook for API calls with loading / error / success states
 *
 * @param {Function} apiFn   — an async function from `@/lib/api` (e.g. fetchProducts)
 * @param {Object}   params  — query params to pass to the API function
 * @param {Object}   options — { immediate: bool, onSuccess: fn, onError: fn }
 *
 * Returns: { data, meta, loading, error, success, refetch }
 *
 * ─── Example ───────────────────────────────────────────
 *
 *   import { fetchProducts } from "@/lib/api";
 *   import { useApi } from "@/hooks/useApi";
 *
 *   function ProductGrid() {
 *     const { data: products, meta, loading, error, refetch } = useApi(
 *       fetchProducts,
 *       { isFeatured: "true", limit: 8 }
 *     );
 *
 *     if (loading)  return <Skeleton />;
 *     if (error)    return <ErrorCard message={error} onRetry={refetch} />;
 *     if (!products.length) return <EmptyState />;
 *
 *     return products.map(p => <ProductCard key={p._id} product={p} />);
 *   }
 *
 * ─── State Flow ────────────────────────────────────────
 *
 *   IDLE → loading:true → success:true (data populated)
 *                       → error:"message" (data stays empty)
 *
 *   Call refetch() to re-run the request at any time.
 */

export function useApi(apiFn, params = {}, options = {}) {
  const { immediate = true, onSuccess, onError } = options;

  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  /* Serialize params to detect changes */
  const paramsKey = JSON.stringify(params);
  const prevParamsKey = useRef(paramsKey);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await apiFn(params);
      const responseData = res.data ?? res;
      const responseMeta = res.meta ?? null;

      setData(Array.isArray(responseData) ? responseData : responseData);
      setMeta(responseMeta);
      setSuccess(true);
      onSuccess?.(res);
    } catch (err) {
      const message = err?.message || "An error occurred";
      setError(message);
      onError?.(err);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFn, paramsKey]);

  /* Auto-fetch on mount and when params change */
  useEffect(() => {
    if (immediate) {
      execute();
    }
    prevParamsKey.current = paramsKey;
  }, [execute, immediate, paramsKey]);

  return { data, meta, loading, error, success, refetch: execute };
}

/**
 * useApiLazy — Same as useApi but does NOT auto-fetch.
 *              Call `execute()` manually when needed.
 *
 * Usage:
 *   const { execute, data, loading, error } = useApiLazy(fetchProductById);
 *   <button onClick={() => execute("product-id-123")}>Load</button>
 */
export function useApiLazy(apiFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const res = await apiFn(...args);
        const responseData = res.data ?? res;
        setData(responseData);
        setSuccess(true);
        return responseData;
      } catch (err) {
        const message = err?.message || "An error occurred";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFn]
  );

  return { execute, data, loading, error, success };
}
