/* ── Brand constants ─── */

export const BRAND_NAME = "Zasha's Collection";
export const BRAND_TAGLINE = "Luxury Pakistani Clothing";
export const WHATSAPP_NUMBER = "923034066871"; // Actual WhatsApp number
export const EMAIL = "collectionszashas@gmail.com";
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "/collections?filter=new" },
  { label: "Sale", href: "/collections?filter=sale" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const CATEGORIES = [
  "2 Piece",
  "3 Piece",
  "Fancy Dresses",
  "Casual Wear",
  "Unstitched Collection",
  "Stitched Collection",
  "Seasonal Collections",
  "Sale Collection",
];

export const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Featured", value: "featured" },
];

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/zashascollection",
  facebook: "https://facebook.com/zashascollection",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
};
