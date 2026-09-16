export const HONEYPOT_FIELD = "_website";

const MAX_BODY_BYTES = 200_000;

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RE_PHONE = /^\+?[0-9][0-9 ()-]{6,18}$/;

export function str(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const s = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  if (s.length === 0 || s.length > max) return null;
  return s;
}

export function strOrNull(v: unknown, max: number): string | null {
  if (v === undefined || v === null) return null;
  if (typeof v !== "string") return null;
  const s = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  if (s.length === 0) return null;
  if (s.length > max) return null;
  return s;
}

export function isEmail(v: string): boolean {
  return RE_EMAIL.test(v) && v.length <= 120;
}

export function isPhone(v: string): boolean {
  return RE_PHONE.test(v);
}

function isBot(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status: number };

export async function readJson<T extends {}>(req: Request): Promise<ValidationResult<T>> {
  try {
    const len = Number(req.headers.get("content-length") || 0);
    if (len > MAX_BODY_BYTES) {
      return { ok: false, error: "Payload too large", status: 413 };
    }
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) {
      return { ok: false, error: "Payload too large", status: 413 };
    }
    const body = JSON.parse(text) as T & Record<string, unknown>;
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return { ok: false, error: "Invalid request body", status: 400 };
    }
    if (isBot(body)) {
      return { ok: false, error: "Invalid request", status: 400 };
    }
    return { ok: true, data: body };
  } catch {
    return { ok: false, error: "Invalid JSON body", status: 400 };
  }
}

type In = Record<string, unknown>;

export type QuoteIn = {
  serviceType: string;
  propertyType: string;
  location: string;
  phone: string;
  email?: string | null;
  requirements?: string | null;
  preferredDate?: string | null;
  budgetRange?: string | null;
  product?: string | null;
  dynamicAnswers?: Record<string, unknown>;
};

export function validateQuote(b: In): ValidationResult<QuoteIn> {
  const serviceType = str(b.serviceType, 80);
  const propertyType = str(b.propertyType, 80);
  const location = str(b.location, 120);
  const phone = str(b.phone, 20);
  if (!serviceType || !propertyType || !location || !phone) {
    return { ok: false, error: "Missing or invalid required fields", status: 400 };
  }
  if (!isPhone(phone)) {
    return { ok: false, error: "Invalid phone number", status: 400 };
  }
  const email = strOrNull(b.email, 120);
  if (email !== null && !isEmail(email)) {
    return { ok: false, error: "Invalid email address", status: 400 };
  }
  let dynamicAnswers: Record<string, unknown> = {};
  if (b.dynamicAnswers !== undefined && b.dynamicAnswers !== null) {
    if (typeof b.dynamicAnswers !== "object" || Array.isArray(b.dynamicAnswers)) {
      return { ok: false, error: "Invalid dynamic answers", status: 400 };
    }
    try {
      const raw = JSON.stringify(b.dynamicAnswers);
      if (raw.length > 5_000) {
        return { ok: false, error: "Dynamic answers too large", status: 400 };
      }
      dynamicAnswers = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return { ok: false, error: "Invalid dynamic answers", status: 400 };
    }
  }
  return {
    ok: true,
    data: {
      serviceType,
      propertyType,
      location,
      phone,
      email,
      requirements: strOrNull(b.requirements, 2000),
      preferredDate: strOrNull(b.preferredDate, 80),
      budgetRange: strOrNull(b.budgetRange, 80),
      product: strOrNull(b.product, 80),
      dynamicAnswers,
    },
  };
}

export type ContactIn = {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
};

export function validateContact(b: In): ValidationResult<ContactIn> {
  const name = str(b.name, 100);
  const email = str(b.email, 120);
  const subject = str(b.subject, 150);
  const message = str(b.message, 3000);
  if (!name || !email || !subject || !message) {
    return { ok: false, error: "Missing or invalid required fields", status: 400 };
  }
  if (!isEmail(email)) {
    return { ok: false, error: "Invalid email address", status: 400 };
  }
  const phone = strOrNull(b.phone, 20);
  if (phone !== null && !isPhone(phone)) {
    return { ok: false, error: "Invalid phone number", status: 400 };
  }
  return { ok: true, data: { name, email, phone, subject, message } };
}

export type BookingIn = {
  service: string;
  location: string;
  date?: string | null;
  description?: string | null;
  name: string;
  phone: string;
  email?: string | null;
  urgent: boolean;
};

export function validateBooking(b: In): ValidationResult<BookingIn> {
  const service = str(b.service, 100);
  const location = str(b.location, 120);
  const name = str(b.name, 100);
  const phone = str(b.phone, 20);
  if (!service || !location || !name || !phone) {
    return { ok: false, error: "Missing or invalid required fields", status: 400 };
  }
  if (!isPhone(phone)) {
    return { ok: false, error: "Invalid phone number", status: 400 };
  }
  const email = strOrNull(b.email, 120);
  if (email !== null && !isEmail(email)) {
    return { ok: false, error: "Invalid email address", status: 400 };
  }
  return {
    ok: true,
    data: {
      service,
      location,
      date: strOrNull(b.date, 40),
      description: strOrNull(b.description, 2000),
      name,
      phone,
      email,
      urgent: Boolean(b.urgent),
    },
  };
}

export type OrderItemIn = { name: string; qty: number; price: number };

export type OrderIn = {
  items: OrderItemIn[];
  total: number;
  name: string;
  phone: string;
  email?: string | null;
  location?: string | null;
  notes?: string | null;
  method: string;
};

export function validateOrder(b: In): ValidationResult<OrderIn> {
  const name = str(b.name, 100);
  const phone = str(b.phone, 20);
  if (!name || !phone) {
    return { ok: false, error: "Missing or invalid required fields", status: 400 };
  }
  if (!isPhone(phone)) {
    return { ok: false, error: "Invalid phone number", status: 400 };
  }
  if (!Array.isArray(b.items) || b.items.length === 0 || b.items.length > 100) {
    return { ok: false, error: "Invalid items", status: 400 };
  }
  const items: OrderItemIn[] = [];
  for (const it of b.items) {
    if (typeof it !== "object" || it === null) {
      return { ok: false, error: "Invalid items", status: 400 };
    }
    const r = it as Record<string, unknown>;
    const itemName = str(r.name, 150);
    const qty = typeof r.qty === "number" && Number.isFinite(r.qty) ? Math.floor(r.qty) : 0;
    const price = typeof r.price === "number" && Number.isFinite(r.price) ? r.price : 0;
    if (!itemName || qty < 1 || qty > 999 || price < 0 || price > 100_000_000) {
      return { ok: false, error: "Invalid item details", status: 400 };
    }
    items.push({ name: itemName, qty, price });
  }
  const total =
    typeof b.total === "number" && Number.isFinite(b.total) ? b.total : items.reduce((s, i) => s + i.price * i.qty, 0);
  if (total < 0 || total > 100_000_000) {
    return { ok: false, error: "Invalid total", status: 400 };
  }
  const email = strOrNull(b.email, 120);
  if (email !== null && !isEmail(email)) {
    return { ok: false, error: "Invalid email address", status: 400 };
  }
  const method = strOrNull(b.method, 30) || "checkout";
  return {
    ok: true,
    data: {
      items,
      total,
      name,
      phone,
      email,
      location: strOrNull(b.location, 2000),
      notes: strOrNull(b.notes, 2000),
      method,
    },
  };
}