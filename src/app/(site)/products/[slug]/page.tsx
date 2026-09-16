import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, ChevronRight, Info } from "lucide-react";
import { CATEGORIES, PRODUCTS, availabilityLabel } from "@/lib/data";
import ProductImage from "@/components/ProductImage";
import ProductActions from "@/components/products/ProductActions";
import ProductCard from "@/components/ProductCard";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.short,
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.slug === product.category)!;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const avail = availabilityLabel[product.availability];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-green-400">Home</Link></li>
            <li><ChevronRight className="h-3.5 w-3.5" /></li>
            <li><Link href="/products" className="hover:text-green-400">Products</Link></li>
            <li><ChevronRight className="h-3.5 w-3.5" /></li>
            <li><Link href={`/products?category=${category.slug}`} className="hover:text-green-400">{category.name}</Link></li>
            <li><ChevronRight className="h-3.5 w-3.5" /></li>
            <li className="text-gray-300">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="gradient-border relative overflow-hidden rounded-3xl">
              <ProductImage art={product.art} slug={product.slug} label={product.name.split("—")[0].trim()} className="aspect-[4/3]" />
              <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-mt-950/80 px-3 py-1.5 text-xs font-medium backdrop-blur">
                <span className={`h-1.5 w-1.5 rounded-full ${avail.dot}`} />
                {avail.label}
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-green-500/90 px-3 py-1.5 text-xs font-bold text-mt-950">
                {category.name}
              </span>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.07]">
              <ProductImage art={product.art} slug={product.slug} label={product.name.split("—")[0].trim()} className="aspect-[16/9]" />
            </div>
            <p className="mt-3 text-center text-xs text-gray-500">
              Representative photo of this equipment type — installed and maintained by Millennium Technologies.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-green-500/80">
              {category.name} · {product.subcategory}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white text-balance">
              {product.name}
            </h1>
            <p className="mt-3 text-gray-400">{product.short}</p>

            <div className="mt-10">
              <ProductActions product={product} />
            </div>

            <div className="mt-10 space-y-3 text-sm text-gray-400">
              <p className="flex items-start gap-2.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                Quotes are free and non-binding. Final pricing depends on configuration, cabling distance and site conditions.
              </p>
              <p className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                Nationwide delivery and installation available across Kenya.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <div className="card lg:col-span-2">
            <h2 className="text-xl font-semibold text-white">Product Description</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">{product.description}</p>

            <h3 className="mt-8 text-base font-semibold text-white">Key Features</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-white">Specifications</h2>
            <dl className="mt-4 space-y-3">
              {product.specs.map((s) => {
                const [key, ...rest] = s.split(":");
                return (
                  <div key={s} className="flex gap-3 border-b border-white/[0.06] pb-3 last:border-0">
                    <dt className="w-1/3 shrink-0 text-xs font-medium uppercase tracking-wide text-gray-500">
                      {key}
                    </dt>
                    <dd className="text-sm text-gray-300">{rest.join(":")}</dd>
                  </div>
                );
              })}
            </dl>
            <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/[0.05] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-green-400">Warranty</p>
              <p className="mt-1.5 text-sm text-gray-300">{product.warranty}</p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-white/[0.06] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-white">Related Products</h2>
              <Link href={`/products?category=${category.slug}`} className="text-sm font-medium text-green-400 hover:text-green-300">
                View all {category.name}
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}