import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export default function CTABand() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="gradient-border overflow-hidden rounded-3xl">
          <div className="relative overflow-hidden rounded-3xl bg-mt-900 px-6 py-16 sm:px-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative mx-auto max-w-2xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
                Get started today
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
                Ready to secure, connect and power your space?
              </h2>
              <p className="mt-4 text-gray-400">
                Send us your requirements for a free, no-obligation quotation — or speak to our
                technical team directly.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/quote" className="btn-primary w-full sm:w-auto">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:${SITE.phone.replace(/\D/g, "")}`} className="btn-secondary w-full sm:w-auto">
                  <Phone className="h-4 w-4 text-green-400" />
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}