"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, Sparkles, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isDark } = useTheme();

  const freeShippingThreshold = 10000;
  const shippingProgress = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = freeShippingThreshold - cartTotal;

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 z-[110] w-full max-w-md shadow-2xl flex flex-col"
            style={{ background: "var(--bg-primary)" }}
          >
            {/* Header */}
            <div className="p-6 border-b" style={{ borderColor: "var(--border-default)" }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif flex items-center gap-2.5" style={{ color: "var(--text-primary)" }}>
                  <ShoppingBag size={22} style={{ color: "var(--color-gold)" }} />
                  Shopping Bag
                  <span className="text-xs font-sans font-normal px-2.5 py-0.5 rounded-full"
                        style={{ background: "rgba(201,169,110,0.15)", color: "var(--color-gold-dark)" }}>
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                  </span>
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                  aria-label="Close cart"
                >
                  <X size={22} style={{ color: "var(--text-secondary)" }} />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  {amountToFreeShipping > 0 ? (
                    <span>
                      Add <strong style={{ color: "var(--color-gold-dark)" }}>Rs. {amountToFreeShipping.toLocaleString()}</strong> for Free Delivery
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-medium" style={{ color: "var(--color-success)" }}>
                      <Sparkles size={13} /> Complimentary Delivery Unlocked!
                    </span>
                  )}
                  <span className="font-sans font-medium text-[11px]" style={{ color: "var(--color-gold-dark)" }}>{shippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden bg-black/10 dark:bg-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--color-gold), var(--color-gold-dark))" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center"
                       style={{ background: "rgba(201,169,110,0.1)" }}>
                    <ShoppingBag size={36} strokeWidth={1.5} style={{ color: "var(--color-gold)" }} />
                  </div>
                  <h3 className="text-xl font-serif" style={{ color: "var(--text-primary)" }}>Your Bag is Empty</h3>
                  <p className="text-sm max-w-xs" style={{ color: "var(--text-secondary)" }}>
                    Explore our luxury unstitched and ready-to-wear collections crafted for sophistication.
                  </p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="btn btn-gold text-xs py-3 px-8 mt-2"
                  >
                    Explore Collections
                  </button>
                </div>
              ) : (
                cartItems.map((item) => {
                  const itemTitle = item.title || item.name || "Luxury Piece";
                  const itemImg = item.images?.[0] || item.image || "/assets/placeholder.svg";
                  const itemPrice = item.discountedPrice || item.price || 0;

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      key={item.cartItemId}
                      className="flex gap-4 p-3.5 rounded-xl border relative transition-shadow hover:shadow-sm"
                      style={{ 
                        borderColor: "var(--border-light)", 
                        background: "var(--bg-secondary)" 
                      }}
                    >
                      {/* Item Image */}
                      <Link
                        href={`/product/${item._id || item.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="relative w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-black/5 dark:bg-white/5"
                      >
                        <Image
                          src={itemImg}
                          alt={itemTitle}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>

                      {/* Item Details */}
                      <div className="flex flex-col flex-1 py-0.5 min-w-0">
                        <div className="flex items-start justify-between gap-2 pr-1">
                          <Link 
                            href={`/product/${item._id || item.id}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-serif text-base leading-snug hover:text-[var(--color-gold)] transition-colors line-clamp-2" 
                            style={{ color: "var(--text-primary)" }}
                          >
                            {itemTitle}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="p-1 text-zinc-400 hover:text-red-500 rounded-md transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {item.selectedVariant && (
                          <p className="text-xs mt-1 inline-block" style={{ color: "var(--text-secondary)" }}>
                            <span className="opacity-70">Variant:</span> {item.selectedVariant}
                          </p>
                        )}

                        <div className="mt-auto pt-2 flex items-center justify-between">
                          <p className="text-sm font-semibold font-sans" style={{ color: "var(--color-gold-dark)" }}>
                            Rs. {Number(itemPrice).toLocaleString("en-PK")}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-lg bg-[var(--bg-primary)] overflow-hidden" 
                               style={{ borderColor: "var(--border-default)" }}>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                              style={{ color: "var(--text-primary)" }}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                              style={{ color: "var(--text-primary)" }}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer / Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t bg-[var(--bg-secondary)] space-y-4" style={{ borderColor: "var(--border-default)" }}>
                {/* Luxury Gift Packaging Addon */}
                <div className="p-3 rounded-xl border bg-[var(--bg-primary)] flex items-start gap-3" style={{ borderColor: "var(--border-light)" }}>
                  <input
                    type="checkbox"
                    id="luxury-gift-wrap"
                    className="mt-1 rounded text-[var(--color-gold)] border-[var(--border-default)] cursor-pointer"
                  />
                  <label htmlFor="luxury-gift-wrap" className="text-xs cursor-pointer select-none">
                    <span className="font-semibold block" style={{ color: "var(--text-primary)" }}>
                      🎁 Luxury Gift Packaging & Handwritten Note (+Rs. 350)
                    </span>
                    <span className="text-[11px] block mt-0.5" style={{ color: "var(--text-secondary)" }}>
                      Signature magnetic-closure rigid box, golden satin ribbon, and personalized calligraphy note.
                    </span>
                  </label>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span>Subtotal</span>
                    <span className="font-sans font-medium">Rs. {cartTotal.toLocaleString("en-PK")}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span>Nationwide Delivery</span>
                    <span className={amountToFreeShipping <= 0 ? "font-bold text-[#173326] dark:text-[#E8BE68] font-sans" : "text-xs"}>
                      {amountToFreeShipping <= 0 ? "FREE" : "Calculated at checkout"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: "var(--border-light)" }}>
                    <span className="text-base font-serif" style={{ color: "var(--text-primary)" }}>Estimated Total</span>
                    <span className="text-2xl font-serif font-bold" style={{ color: "var(--color-gold)" }}>
                      Rs. {cartTotal.toLocaleString("en-PK")}
                    </span>
                  </div>
                </div>

                <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="block w-full">
                  <button className="btn btn-gold w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold tracking-widest uppercase shadow-xl hover:shadow-2xl active:scale-[0.99] transition-all">
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </button>
                </Link>

                <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-wider font-semibold opacity-80" style={{ color: "var(--text-secondary)" }}>
                  <span>✓ Cash on Delivery</span>
                  <span>•</span>
                  <span>✓ JazzCash / EasyPaisa</span>
                  <span>•</span>
                  <span>✓ 7-Day Exchange</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
