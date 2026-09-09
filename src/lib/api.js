import axios from "axios";

/* ─────────────────────────────────────────────────────
 *  Centralized API Service for Zasha's Collection
 *
 *  Base URL comes from env:  NEXT_PUBLIC_API_BASE_URL
 *  Default fallback:         http://localhost:4000/api
 *
 *  Every function returns the raw Axios response `data`
 *  shaped as: { success, data, meta? }
 *
 *  Usage in components:
 *    import { fetchProducts } from "@/lib/api";
 *    const res = await fetchProducts({ isFeatured: "true", limit: 8 });
 *    console.log(res.data);  // product array
 *    console.log(res.meta);  // { page, limit, total, totalPages }
 *
 *  Or use the React hook for automatic loading/error/success:
 *    import { useApi } from "@/lib/api";
 *    const { data, loading, error, refetch } = useApi(fetchProducts, { limit: 8 });
 * ───────────────────────────────────────────────────── */

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

/* ── Axios Instance ────────────────────────────────── */

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

/* ── Response interceptor ──────────────────────────── */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    const status = error.response?.status || 500;
    return Promise.reject({ message, status, raw: error });
  }
);

/* ═══════════════════════════════════════════════════════
 *  PRODUCTS  (public endpoints from Postman)
 *
 *  GET /products?page=&limit=&search=&category=&categoryId=
 *       &tags=&isFeatured=&isOnSale=&isNewArrival=
 *       &minPrice=&maxPrice=&sort=
 *  GET /products/:id
 * ═══════════════════════════════════════════════════════ */

export async function fetchProducts(params = {}) {
  const { data } = await api.get("/products", { params });
  return data;
}

export async function fetchProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

/* ═══════════════════════════════════════════════════════
 *  CATEGORIES  (public)
 *
 *  GET /categories?page=&limit=&search=
 * ═══════════════════════════════════════════════════════ */

export async function fetchCategories(params = {}) {
  const { data } = await api.get("/categories", { params });
  return data;
}

/* ═══════════════════════════════════════════════════════
 *  OFFERS  (public)
 *
 *  GET /offers?page=&limit=&search=
 * ═══════════════════════════════════════════════════════ */

export async function fetchOffers(params = {}) {
  const { data } = await api.get("/offers", { params });
  return data;
}

/* ═══════════════════════════════════════════════════════
 *  HEALTH
 *
 *  GET /health
 * ═══════════════════════════════════════════════════════ */

export async function healthCheck() {
  const { data } = await api.get("/health");
  return data;
}

/* ═══════════════════════════════════════════════════════
 *  ORDERS  (public)
 *
 *  POST /orders
 * ═══════════════════════════════════════════════════════ */

export async function createOrder(payload) {
  const { data } = await api.post("/orders", payload);
  return data;
}

export async function trackOrder({ orderId, phone }) {
  const params = new URLSearchParams();
  if (orderId) params.append("orderId", orderId);
  if (phone) params.append("phone", phone);
  const { data } = await api.get(`/orders/track?${params.toString()}`);
  return data;
}

/* ═══════════════════════════════════════════════════════
 *  PAYMENT METHODS  (public)
 *
 *  GET /payment-methods/active
 * ═══════════════════════════════════════════════════════ */

export async function fetchActivePaymentMethods() {
  const { data } = await api.get("/payment-methods/active");
  return data;
}

export default api;
