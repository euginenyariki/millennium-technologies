import Link from "next/link";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";
import Logo from "./Logo";

const solutionLinks = [
  { href: "/solutions#cctv", label: "CCTV Surveillance" },
  { href: "/solutions#access", label: "Access Control" },
  { href: "/solutions#fence", label: "Electric Fence" },
  { href: "/solutions#gate", label: "Gate Automation" },
  { href: "/solutions#solar", label: "Solar & Green Energy" },
  { href: "/solutions#network", label: "Networking & Connectivity" },
  { href: "/solutions#starlink", label: "Starlink Installation" },
  { href: "/solutions#it", label: "IT Support" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/industries", label: "Industries" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-mt-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-400">
              {SITE.tagline}. Integrated security, technology and solar solutions designed,
              supplied and professionally installed for homes, businesses and institutions.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-2.5 text-sm text-green-400">
              <ShieldCheck className="h-4 w-4" />
              Certified, quality components only
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Solutions
            </h3>
            <ul className="mt-5 space-y-2.5">
              {solutionLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 transition-colors hover:text-green-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Company
            </h3>
            <ul className="mt-5 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 transition-colors hover:text-green-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <a href={`tel:${SITE.phone.replace(/\D/g, "")}`} className="hover:text-green-400">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <a href={`mailto:${SITE.email}`} className="break-all hover:text-green-400">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                {SITE.location}
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                Mon – Sat: 8:00am – 6:00pm
                <br />
                24/7 emergency support
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Protecting Assets. Securing Spaces. Powering Connectivity.
          </p>
        </div>
      </div>
    </footer>
  );
}