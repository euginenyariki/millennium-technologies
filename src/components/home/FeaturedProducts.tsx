import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { Reveal, SectionHeader } from "@/components/ui";

export default function FeaturedProducts() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  return (
    <section className="section-pad-alt">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Equipment Store"
              title="Quality products. Certified components."
              sub="Browse our range of security, solar and technology equipment — ready for supply, with professional installation available on every system."
              center={false}
            />
            <Link href="/products" className="btn-secondary mb-12 shrink-0">
              <Package className="h-4 w-4 text-green-400" />
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}