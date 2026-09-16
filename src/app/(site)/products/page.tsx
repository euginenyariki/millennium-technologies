import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductGrid from "@/components/products/ProductGrid";
import CTABand from "@/components/home/CTABand";

export const metadata: Metadata = {
  title: "Products & Equipment",
  description:
    "Browse CCTV cameras, access control, electric fencing, gate automation, solar, networking and IT equipment — certified components available for supply and professional installation.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Equipment Store"
        title={
          <>
            Products we <span className="gradient-text">supply</span>
          </>
        }
        sub="Certified, quality components only — available for outright purchase, with professional installation offered on every system. Prices shown are guide prices; confirm before ordering."
      />
      <Suspense fallback={<div className="py-24 text-center text-gray-500">Loading products…</div>}>
        <ProductGrid />
      </Suspense>
      <CTABand />
    </>
  );
}