"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, BRAND_NAME } from "@/lib/constants";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark } = useTheme();
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const hamburgerColor = isDark ? "var(--color-gold)" : "var(--color-charcoal)";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: "var(--nav-height)",
          background: scrolled ? "var(--nav-glass)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--nav-border)"
            : "1px solid transparent",
          transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        }}
      >
        <div className="container-luxe h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 relative z-10 group">
            <motion.div whileHover={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 0.5 }}>
              <Image
                src="/assets/favicon.png"
                alt={BRAND_NAME}
                width={38}
                height={38}
                className="rounded-md"
                style={{ objectFit: "contain", width: "auto", height: "38px" }}
                priority
              />
            </motion.div>
            <span
              className="text-xl tracking-wide hidden sm:inline group-hover:text-[var(--color-gold)] transition-colors duration-300"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Zasha&apos;s
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link-luxe relative text-[0.7rem] font-medium tracking-[0.15em] uppercase py-1"
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    color: isActive ? "var(--color-gold)" : undefined,
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-[-4px] left-0 right-0 h-[1.5px] rounded-full"
                      style={{ background: "var(--color-gold)" }}
                      layoutId="nav-underline"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <div className="w-[1px] h-5 mx-1" style={{ background: "var(--border-default)" }} />
            <ThemeToggle />
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Open Cart"
            >
              <ShoppingBag size={20} style={{ color: "var(--text-primary)" }} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: "var(--color-gold)", color: "#fff" }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="w-[1px] h-5 mx-1" style={{ background: "var(--border-default)" }} />
            
            {isLoaded && !isSignedIn && (
              <Link
                href="/sign-in"
                className="nav-link-luxe relative text-[0.7rem] font-medium tracking-[0.15em] uppercase py-1"
                style={{ fontFamily: "var(--font-body), sans-serif", color: "var(--text-primary)" }}
              >
                Sign In
              </Link>
            )}
            {isLoaded && isSignedIn && (
              <UserButton 
                appearance={{ 
                  elements: { userButtonAvatarBox: "w-8 h-8", userButtonPopoverCard: "shadow-xl border border-[var(--border-light)] rounded-xl" } 
                }} 
              />
            )}
          </nav>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-3 relative z-10">
            <ThemeToggle />
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2"
              aria-label="Open Cart"
            >
              <ShoppingBag size={20} style={{ color: "var(--text-primary)" }} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: "var(--color-gold)", color: "#fff" }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              className="flex flex-col gap-[5px] p-2 ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.span className="block w-6 h-[1.5px] rounded-full" style={{ background: hamburgerColor }}
                animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
              <motion.span className="block w-6 h-[1.5px] rounded-full" style={{ background: hamburgerColor }}
                animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} transition={{ duration: 0.2 }} />
              <motion.span className="block w-6 h-[1.5px] rounded-full" style={{ background: hamburgerColor }}
                animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0" style={{ background: "var(--bg-overlay)" }}
              onClick={() => setMobileOpen(false)} />

            <motion.nav
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm flex flex-col pt-24 px-8 pb-8"
              style={{ background: "var(--bg-primary)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-4 text-lg tracking-wider uppercase border-b"
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "var(--color-gold)" : "var(--text-primary)",
                        borderColor: "var(--border-light)",
                      }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                      {isActive && (
                        <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-gold)" }} />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              
              <div className="my-4 border-b" style={{ borderColor: "var(--border-light)" }} />

              {isLoaded && !isSignedIn && (
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-between py-4 text-lg tracking-wider uppercase"
                    style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500, color: "var(--color-gold)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In →
                  </Link>
                </motion.div>
              )}
              
              {isLoaded && isSignedIn && (
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="py-4">
                  <UserButton showName appearance={{ elements: { userButtonBox: "flex flex-row-reverse w-full justify-between", userButtonOuterIdentifier: "text-lg tracking-wider uppercase font-serif text-[var(--text-primary)]" } }} />
                </motion.div>
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ height: "var(--nav-height)" }} />
    </>
  );
}
