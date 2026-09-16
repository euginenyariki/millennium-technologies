import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import SolutionsGrid from "@/components/home/SolutionsGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Edge from "@/components/home/Edge";
import IndustriesStrip from "@/components/home/IndustriesStrip";
import Process from "@/components/home/Process";
import CTABand from "@/components/home/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <SolutionsGrid />
      <FeaturedProducts />
      <Edge />
      <IndustriesStrip />
      <Process />
      <CTABand />
    </>
  );
}