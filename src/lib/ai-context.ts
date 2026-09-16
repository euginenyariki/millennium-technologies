import { BOOKING_SERVICES, CATEGORIES, PRODUCTS, SOLUTIONS } from "./data";
import { SITE } from "./site";

const CONTACT = `${SITE.phoneDisplay} (call/WhatsApp), ${SITE.email}, ${SITE.location}.`;
const WHY_LINKS =
  "Get a free quotation at /quote, book a service at /book, or chat on WhatsApp: " + SITE.phoneDisplay;

const CATEGORY_MAP: Record<string, { slug: string; keys: string[] }> = {};
for (const c of CATEGORIES) {
  const keys = [c.name, c.slug]
    .concat(c.name.split(/[ /]+/).filter((w) => w.length > 2))
    .map((k) => k.toLowerCase());
  CATEGORY_MAP[c.slug] = { slug: c.slug, keys };
}

const PRODUCT_ALIASES = PRODUCTS.map((p) => ({
  product: p,
  keys: new Set(
    p.name
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2)
  ),
}));

function findCategory(text: string) {
  const words = new Set(text.split(/[^a-z0-9]+/));
  for (const { slug, keys } of Object.values(CATEGORY_MAP)) {
    if (keys.some((k) => words.has(k) || text.includes(k))) return slug;
  }
  return null;
}

function findProducts(text: string, limit = 6) {
  const words = text.split(/[^a-z0-9]+/).filter((w) => w.length > 2);
  const hits = PRODUCT_ALIASES.map(({ product, keys }) => {
    let score = 0;
    for (const w of words) if (keys.has(w)) score++;
    return { product, score };
  })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return hits.map((h) => h.product);
}

function productLines(list: typeof PRODUCTS) {
  return list
    .map(
      (p) =>
        `• ${p.name} — KES ${p.price.toLocaleString("en-KE")} (${p.category}, warranty ${p.warranty}).`
    )
    .join("\n");
}

export function answerUser(messages: { role: string; content: string }[]): string {
  const last = [...messages].reverse().find((m) => m.role === "user");
  const text = (last?.content || "").trim();
  const q = text.toLowerCase();

  const has = (...words: string[]) => words.some((w) => q.includes(w));

  if (!q)
    return "Hi! I'm Millennium's assistant. Ask me about our CCTV, access control, electric fencing, gate automation, solar, networking, Starlink or IT support — prices, warranties, installation, or how to get a quotation. For our details: " + CONTACT;

  if (has("hi", "hello", "hey", "jambo", "habari", "sasa", "good morning", "good afternoon", "good evening")) {
    if (text.length < 30)
      return `Hello and welcome to ${SITE.name}! I can help with product prices, what's right for your home or business, warranties, and how to buy or book an installation. What do you need?`;
  }

  if (has("help me", "what can you do", "help me with", "how can you")) {
    return `I can help with:
• Prices, warranties and details for all our products (CCTV, access control, electric fencing, gates, solar, networking, Starlink, IT).
• Choosing the right solution for your home, office, shop, farm or institution.
• How to get a free quotation and how to book installation/service.
• Contact details and opening hours.

Try me: "How much is a CCTV camera?", "Electric fence price", "Solar inverter for home", "Book a Starlink installation".`;
  }

  if (has("thank", "asante", "sawa", "okay thanks")) {
    return `You're welcome! For a free quotation visit /quote, or reach us anytime on ${CONTACT}.`;
  }

  if (has("phone", "whatsapp", "call", "contact", "reach", "email", "address", "location", "where are you", "office")) {
    return `You can reach ${SITE.name} at: phone/WhatsApp ${SITE.phoneDisplay}, email ${SITE.email}, ${SITE.location}. Hours: Mon–Sat 8:00–18:00, emergency support 24/7. You can also request a free quotation at /quote or book a service at /book.`;
  }

  if (has("hour", "time", "open", "close", "open today", "how late")) {
    return `We're open Monday–Saturday, 8:00 AM – 6:00 PM. Emergency support is available 24/7. Call or WhatsApp ${SITE.phoneDisplay} anytime.`;
  }

  if (has("quote", "quotation", "quotes", "estimate", "get a price", "give me a price", "cost me")) {
    const cats = findCategory(q);
    const found = cats ? findProducts(q) : findProducts(q, 3);
    const body = found.length
      ? `Here are some prices to get you started:\n${productLines(found).slice(0, 700)}`
      : `We design a tailored solution for every site.`;
    return `${body}\n\nFor a detailed, binding free quotation, fill the quotation form at /quote and you'll receive a quote reference for follow-up. For installation & delivery costs (they vary by site), the team will confirm — ${CONTACT}`;
  }

  if (
    has("book", "booking", "schedule", "appointment", "install", "installation", "service", "repair", "maintenance", "visit", "come and check")
  ) {
    const services = BOOKING_SERVICES.map((s) => `• ${s.name} — ${s.desc}`).join("\n");
    return `We can book: \n${services}\n\nTo reserve a technician visit, use the booking form at /book — it takes under a minute and you'll get a confirmation. For urgent help, WhatsApp ${SITE.phoneDisplay}.`;
  }

  if (has("warrant", "guarantee", "warranty")) {
    return "Product warranties are stated in months (e.g. 12 months, 36 months; some items are point-of-sale with no warranty). Installation workmanship is handled per our service terms. For a specific product, name it and I'll tell you its warranty — or view it on the product page.";
  }

  if (has("buy", "order", "cart", "how to buy", "pay", "payment", "purchase")) {
    return "To buy: add products to the cart and checkout (we confirm payment details by phone). For custom/quoted work, use /quote. Installation, delivery and payment terms vary per site — the team confirms at +254 703 621 053.";
  }

  if (has("deliver", "shipping", "how long", "when", "stock", "in stock", "available", "ready")) {
    return `Delivery and installation times depend on the product and location. I can't guarantee stock or lead times here — the team confirms that instantly. Message ${CONTACT} or request a quotation at /quote and they'll update you.`;
  }

  if (has("starlink", "internet", "wifi")) {
    const list = findProducts(q, 8);
    if (list.length)
      return `Here are the connectivity products we supply & install:\n${productLines(list).slice(0, 700)}\n\nWant a survey? Book it at /book or get a quotation at /quote.`;
    return `We supply and install Starlink kits and networking (routers, switches, access points, cabling). Ask for a quotation at /quote — the team can also arrange a site survey.`;
  }

  const cat = findCategory(q);
  if (cat) {
    const list = findProducts(q, 8);
    const lines = list.length ? productLines(list).slice(0, 700) : `We cover the full ${cat} range — view it on the site.`;
    return `Here's what we have in ${cat}:\n${lines}\n\nPrices above are for the equipment. For installation and site-specific details request a free quotation at /quote or message ${SITE.phoneDisplay}.`;
  }

  const direct = findProducts(q, 5);
  if (direct.length) {
    return `Here's what I found:\n${productLines(direct).slice(0, 700)}\n\nView the full details on the product page, or request a quotation at /quote. For anything missing, the team is one message away — ${CONTACT}`;
  }

  return `I'm not sure about that one — I'm best with our products and services. Try asking for a product (e.g. "CCTV camera price"), a category ("electric fence", "solar panel", "access control"), or a solution for your home/business. For human help: ${CONTACT}, or a free quotation at /quote.`;
}

export function isAiConfigured() {
  return true;
}