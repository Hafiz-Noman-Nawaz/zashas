"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const AUTH_IMAGES = [
  "/assets/Hero Images/hero 3.png",
  "/assets/Hero Images/hero 6.png",
  "/assets/Hero Images/hero 7.png",
];

export default function AuthLayout({ children }) {
  const [current, setCurrent] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % AUTH_IMAGES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Mobile Background (Slideshow) */}
      <div className="absolute inset-0 lg:hidden z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-bg-${current}`}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Image src={AUTH_IMAGES[current]} alt="Background" fill priority className="object-cover" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,13,0.9), rgba(13,13,13,0.6))", backdropFilter: "blur(8px)" }} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Side - Slideshow (Desktop) */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-black z-10 shadow-2xl">
        {AUTH_IMAGES.map((img, idx) => (
          <motion.div
            key={`auth-bg-${idx}`}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: current === idx ? 1 : 0,
              scale: current === idx ? 1 : 1.05
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 6, ease: "linear" }
            }}
            style={{ pointerEvents: current === idx ? "auto" : "none" }}
          >
            <Image
              src={img}
              alt={`Luxury Collection ${idx + 1}`}
              fill
              priority={idx === 0}
              className="object-cover"
              sizes="55vw"
            />
            {/* Elegant gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, rgba(13,13,13,0.1) 0%, rgba(13,13,13,0.6) 100%)",
              }}
            />
          </motion.div>
        ))}
        
        {/* Brand Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-20 z-20">
          <Link href="/">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2 className="text-6xl mb-6 drop-shadow-lg" style={{ fontFamily: "var(--font-cormorant), serif", color: "#ffffff" }}>
                Zasha's
              </h2>
              <p className="text-xl max-w-lg drop-shadow-md" style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
                Discover premium Pakistani unstitched and stitched clothing. Elegance woven into every thread.
              </p>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12 relative z-10">
        <Link href="/" className="absolute top-8 left-8 lg:hidden text-4xl drop-shadow-lg" style={{ fontFamily: "var(--font-cormorant), serif", color: "var(--color-gold)" }}>
          Zasha's
        </Link>
        
        <motion.div 
          className="w-full max-w-md flex justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
