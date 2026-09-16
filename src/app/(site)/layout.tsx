import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import ChatWidget from "@/components/ChatWidget";
import { SITE } from "@/lib/site";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  image: `${SITE.url}/images/photos/hero-bg.jpg`,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  url: SITE.url,
  priceRange: "$$",
  openingHours: "Mo-Sa 08:00-18:00",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <CartDrawer />
      <ChatWidget />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
    </CartProvider>
  );
}