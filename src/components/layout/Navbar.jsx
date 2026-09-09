"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_NAME } from "@/lib/constants";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CURATED_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "/collections?filter=new" },
  { label: "Shop The Look", href: "/#lookbook" },
  { label: "Sale", href: "/collections?filter=sale" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark } = useTheme();
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        {/* Subtle Luxury Top Bar (Unified with Header) */}
        <div className="bg-[#0d0c0a] text-[#c9a96e] text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase py-2 text-center border-b border-[#c9a96e]/15 px-4 select-none">
          <span>
            Complimentary Shipping Across Pakistan &bull; Bespoke Bridal Atelier &bull; Handcrafted in Lahore
          </span>
        </div>

        {/* Main Navigation Bar */}
        <div
          className="transition-all duration-300"
          style={{
            height: "68px",
            background: scrolled
              ? "var(--nav-glass)"
              : isDark
              ? "rgba(14, 14, 14, 0.95)"
              : "rgba(250, 247, 242, 0.96)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          <div className="container-luxe h-full flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 relative z-10 group">
              <Image
                src="/assets/logo-mark.svg"
                alt={BRAND_NAME}
                width={32}
                height={32}
                className="rounded-sm"
                style={{ objectFit: "contain", width: "auto", height: "30px" }}
                priority
              />
              <span
                className="text-2xl tracking-[0.12em] uppercase font-serif font-medium transition-colors"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                Zasha&apos;s
              </span>
            </Link>

            {/* Curated Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-9">
              {CURATED_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" &&
                    link.href !== "/#lookbook" &&
                    pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-[11px] font-sans font-medium tracking-[0.2em] uppercase py-1 transition-colors duration-200"
                    style={{
                      color: isActive
                        ? "var(--color-gold)"
                        : "var(--text-secondary)",
                    }}
                  >
                    <span className="hover:text-[var(--color-gold)] transition-colors">
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full"
                        style={{ background: "var(--color-gold)" }}
                        layoutId="nav-underline"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                aria-label="Open Cart"
              >
                <ShoppingBag
                  size={19}
                  style={{ color: "var(--text-primary)" }}
                />
                {cartCount > 0 && (
                  <span
                    className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: "var(--color-gold)", color: "#000" }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth / Sign In */}
              {isLoaded && !isSignedIn && (
                <Link
                  href="/sign-in"
                  className="hidden lg:inline-block text-[11px] font-sans tracking-[0.18em] uppercase py-1 text-[var(--text-secondary)] hover:text-[var(--color-gold)] transition-colors"
                >
                  Sign In
                </Link>
              )}
              {isLoaded && isSignedIn && (
                <div className="hidden lg:block scale-90">
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="md:hidden p-2 text-[var(--text-primary)]"
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Out Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-b border-[var(--border-light)]"
              style={{ background: "var(--bg-primary)" }}
            >
              <div className="px-6 py-8 space-y-5">
                {[
                  ...CURATED_LINKS,
                  { label: "Track Order", href: "/track-order" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-sans tracking-[0.2em] uppercase text-[var(--text-primary)] hover:text-[var(--color-gold)] transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                ))}

                {isLoaded && !isSignedIn && (
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-sans tracking-[0.2em] uppercase text-[var(--color-gold)] pt-4 border-t border-[var(--border-light)]"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer matching top banner (35px) + navbar (68px) = 103px */}
      <div style={{ height: "103px" }} />
    </>
  );
}
