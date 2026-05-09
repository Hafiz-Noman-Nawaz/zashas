import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoriesSection from "@/components/home/CategoriesSection";
import NewArrivals from "@/components/home/NewArrivals";
import OffersSection from "@/components/home/OffersSection";

export const metadata = {
  title: "Zasha's Collection — Luxury Pakistani Clothing",
  description:
    "Discover premium Pakistani unstitched and stitched clothing. Luxury fabrics, elegant designs, and timeless style.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <NewArrivals />
      <OffersSection />
    </>
  );
}
