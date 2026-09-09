"use client";

import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function WhatsAppButton() {
  const link = `https://api.whatsapp.com/send?phone=+${WHATSAPP_NUMBER}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full text-xs font-medium bg-neutral-900/90 text-white shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-x-2 group-hover:translate-x-0 border border-white/10">
        Chat with us on WhatsApp 💬
      </span>

      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center rounded-full shadow-2xl hover:shadow-[0_8px_30px_rgb(37,211,102,0.4)]"
        style={{
          width: 58,
          height: 58,
          background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
          color: "#fff",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.0, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.553 4.113 1.519 5.845L.05 23.308a.5.5 0 00.642.642l5.463-1.469A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.582l-.386-.235-3.248.873.873-3.248-.235-.386A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>

        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping pointer-events-none"
          style={{
            background: "#25d366",
            opacity: 0.25,
            animationDuration: "2.5s",
          }}
        />
      </motion.a>
    </div>
  );
}
