"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isDark } = useTheme();

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
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[110] w-full max-w-md shadow-2xl flex flex-col"
            style={{ background: "var(--bg-primary)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--border-default)" }}>
              <h2 className="text-2xl font-serif flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <ShoppingBag size={24} style={{ color: "var(--color-gold)" }} />
                Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              >
                <X size={24} style={{ color: "var(--text-secondary)" }} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
                  <ShoppingBag size={64} strokeWidth={1} style={{ color: "var(--border-default)" }} />
                  <p className="text-lg font-serif" style={{ color: "var(--text-secondary)" }}>Your cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="btn btn-outline mt-4"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.cartItemId}
                    className="flex gap-4 p-4 rounded-xl border relative group"
                    style={{ 
                      borderColor: "var(--border-light)", 
                      background: "var(--bg-secondary)" 
                    }}
                  >
                    {/* Item Image */}
                    <div className="relative w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-zinc-800">
                      <Image
                        src={item.images?.[0]?.url || item.image || "/assets/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex flex-col flex-1 py-1">
                      <h3 className="font-serif text-lg leading-tight pr-8" style={{ color: "var(--text-primary)" }}>
                        {item.name}
                      </h3>
                      {item.selectedVariant && (
                        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                          Type: {item.selectedVariant}
                        </p>
                      )}
                      <p className="text-sm font-medium mt-1" style={{ color: "var(--color-gold)" }}>
                        Rs {item.salePrice || item.price}
                      </p>

                      {/* Quantity & Remove */}
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border rounded-md" style={{ borderColor: "var(--border-default)" }}>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            style={{ color: "var(--text-primary)" }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            style={{ color: "var(--text-primary)" }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t bg-[var(--bg-secondary)]" style={{ borderColor: "var(--border-default)" }}>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg" style={{ color: "var(--text-secondary)" }}>Subtotal</span>
                  <span className="text-2xl font-serif font-medium" style={{ color: "var(--text-primary)" }}>
                    Rs {cartTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs mb-4 text-center opacity-70" style={{ color: "var(--text-secondary)" }}>
                  Shipping & taxes calculated at checkout.
                </p>
                <div className="flex gap-4">
                  <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full">
                    <button className="btn btn-gold w-full flex justify-center py-4 text-base">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
