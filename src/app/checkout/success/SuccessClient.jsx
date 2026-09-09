"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

export default function SuccessClient() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const orderId = searchParams.get("orderId");
  const method = searchParams.get("method") || "";
  const isCod = method.toLowerCase().includes("cod");

  useEffect(() => {
    setMounted(true);
    // Clear the cart when they successfully land on this page
    clearCart();
  }, [clearCart]);

  if (!mounted) return null;

  const waMessage = isCod 
    ? `Hello Zasha's Collection! I have placed a Cash on Delivery order on your website.\n\nTracking / Order ID: ${orderId || "N/A"}\n\nPlease confirm my delivery.`
    : `Hello Zasha's Collection! I have placed an order on your website (${method || "Payment"}).\n\nTracking / Order ID: ${orderId || "N/A"}\n\nI am attaching my payment screenshot.`;
  const waLink = whatsappLink(WHATSAPP_NUMBER, waMessage);

  return (
    <div className="section-spacer bg-[var(--bg-primary)] min-h-[80vh] flex flex-col items-center justify-center">
      <div className="container-luxe max-w-2xl text-center">
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-8"
          style={{ background: "rgba(201,169,110,0.1)" }}
        >
          <CheckCircle size={48} style={{ color: "var(--color-gold)" }} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl font-serif mb-6" style={{ color: "var(--text-primary)" }}>
            Order Placed Successfully!
          </h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
            Thank you for shopping with Zasha's Collection. Your order #{orderId ? orderId.slice(-8) : ""} has been securely logged into our system.
          </p>

          <div className="card-luxe p-8 mb-10 max-w-md mx-auto text-left">
            <h3 className="font-medium mb-3 text-center" style={{ color: "var(--text-primary)" }}>
              {isCod ? "Cash on Delivery Confirmed" : "Final Step: Payment Confirmation"}
            </h3>
            <p className="text-sm text-center mb-6" style={{ color: "var(--text-secondary)" }}>
              {isCod 
                ? "Your parcel will be prepared for dispatch. Our courier rider will collect payment at your doorstep upon delivery." 
                : "Please share your payment transfer screenshot on our WhatsApp to finalize processing and dispatch your parcel."}
            </p>
            
            <a 
              href={waLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full flex justify-center py-4 text-base"
            >
              {isCod ? "Contact Us on WhatsApp" : "Send Screenshot on WhatsApp"}
            </a>
          </div>

          <Link href="/collections">
            <button className="btn btn-outline">
              Continue Shopping
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
