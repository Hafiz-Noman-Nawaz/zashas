import { Cormorant_Garamond, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CartDrawer from "@/components/cart/CartDrawer";
import { Toaster } from "react-hot-toast";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Zasha's Collection — Luxury Pakistani Clothing",
  description:
    "Discover premium Pakistani unstitched and stitched clothing. Luxury fabrics, elegant designs, and timeless style at Zasha's Collection.",
  keywords:
    "Pakistani clothing, luxury fashion, unstitched, lawn, chiffon, Zasha's Collection",
  openGraph: {
    title: "Zasha's Collection — Luxury Pakistani Clothing",
    description:
      "Discover premium Pakistani unstitched and stitched clothing.",
    type: "website",
    locale: "en_PK",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col">
          <ThemeProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <WhatsAppButton />
              <CartDrawer />
              <Toaster 
                position="bottom-center"
                toastOptions={{
                  style: {
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-light)",
                    fontFamily: "var(--font-inter)",
                  }
                }}
              />
            </CartProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
