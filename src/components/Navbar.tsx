"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV, SITE } from "@/lib/site";
import { useCart } from "./CartContext";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const [open, setOpenMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMobile(false);
    setSolutionsOpen(false);
  }, [pathname]);

  const solutions = NAV.find((n) => n.href === "/solutions");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled || open
          ? "border-white/[0.06] bg-mt-900/90 backdrop-blur-xl shadow-lg shadow-black/30"
          : "border-transparent bg-gradient-to-b from-black/60 to-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="NexGuard Technologies — Home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            if (item.href === "/solutions") {
              return (
                <div key={item.href} className="relative" onMouseEnter={() => setSolutionsOpen(true)} onMouseLeave={() => setSolutionsOpen(false)}>
                  <Link
                    href="/solutions"
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      pathname.startsWith("/solutions")
                        ? "text-green-400"
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    Solutions
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  </Link>
                  {solutionsOpen && (
                    <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2">
                      <div className="rounded-2xl border border-white/[0.08] bg-mt-800/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
                        <div className="grid grid-cols-1">
                          {solutions?.children?.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              className="rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-green-500/10 hover:text-green-400"
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-green-400"
                    : "text-gray-300 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="relative rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
            aria-label={`Shopping cart, ${count} items`}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-green-500 px-1 text-[10px] font-bold text-mt-950">
                {count}
              </span>
            )}
          </button>
          <a
            href={`tel:${SITE.phone.replace(/\D/g, "")}`}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-green-400 xl:flex"
          >
            <Phone className="h-4 w-4" />
            {SITE.phoneDisplay}
          </a>
          <Link href="/quote" className="btn-primary hidden px-5 py-2.5 sm:inline-flex">
            Get a Quote
          </Link>
          <button
            onClick={() => setOpenMobile((v) => !v)}
            className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-white/[0.06] transition-[max-height,opacity] duration-300",
          open ? "max-h-[80vh] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-1 px-4 py-4 sm:px-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-green-500/10 text-green-400"
                  : "text-gray-200 hover:bg-white/5"
              )}
            >
              {item.label}
              {item.children && <ChevronDown className="h-4 w-4 rotate-[-90deg] opacity-40" />}
            </Link>
          ))}
          <div className="mt-3 grid gap-3">
            <Link href="/quote" className="btn-primary w-full">
              Get a Quote
            </Link>
            <a href={`tel:${SITE.phone.replace(/\D/g, "")}`} className="btn-secondary w-full">
              <Phone className="h-4 w-4" />
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}