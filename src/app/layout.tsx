import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Smart Security & Reliable Technology Solutions`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "NexGuard Technologies — integrated security, technology and solar solutions. CCTV, access control, electric fencing, gate automation, solar, networking, Starlink and IT support for homes, businesses and institutions in Kenya.",
  keywords: [
    "CCTV installation Kenya",
    "smart security systems",
    "access control",
    "electric fence",
    "gate automation",
    "solar installation Kenya",
    "Starlink installation Kenya",
    "networking",
    "IT support",
    "NexGuard Technologies",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Integrated security, technology and solar solutions designed, supplied and professionally installed for homes, businesses and institutions.",
    images: [
      {
        url: "/images/photos/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Integrated security, technology and solar solutions for homes, businesses and institutions.",
    images: ["/images/photos/hero-bg.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040605",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}