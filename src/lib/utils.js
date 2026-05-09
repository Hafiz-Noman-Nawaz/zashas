/**
 * Format a number as Pakistani Rupees
 */
export function formatPrice(price) {
  if (price == null) return "";
  return `Rs. ${Number(price).toLocaleString("en-PK")}`;
}

/**
 * Calculate discount percentage between original & discounted price
 */
export function discountPercent(original, discounted) {
  if (!original || !discounted || discounted >= original) return 0;
  return Math.round(((original - discounted) / original) * 100);
}

/**
 * Build a WhatsApp message link
 */
export function whatsappLink(phone, message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Create product inquiry WhatsApp message
 */
export function productInquiryMessage(product, baseUrl = "") {
  const link = `${baseUrl}/product/${product._id}`;
  return `Hi! I'm interested in:\n\n*${product.title}*\nProduct ID: ${product._id}\nPrice: ${formatPrice(product.discountedPrice || product.price)}\n\nLink: ${link}\n\nPlease share more details.`;
}

/**
 * Truncate text to a max length
 */
export function truncate(str, max = 80) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "…" : str;
}

/**
 * cn – simple className merge helper
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
