const store = new Map<string, { count: number; resetAt: number }>();
let lastCleanup = 0;

export function rateLimit(
  ip: string,
  limit: number,
  windowMs: number,
  scope: string
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();

  if (now - lastCleanup > 60_000) {
    for (const [key, b] of store) {
      if (b.resetAt < now) store.delete(key);
    }
    lastCleanup = now;
  }

  const key = `${scope}:${ip}`;
  let bucket = store.get(key);
  if (!bucket || bucket.resetAt < now) {
    bucket = { count: 0, resetAt: now + windowMs };
    store.set(key, bucket);
  }
  bucket.count += 1;

  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true };
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}