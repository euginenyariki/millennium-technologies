import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 200_000;
const AUTH_WINDOW = 5 * 60_000;

function isApiPath(pathname: string): boolean {
  return pathname.startsWith("/api");
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Security headers
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  res.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  // CSP — allow inline styles (Next.js) and Google Fonts
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; ")
  );

  const { pathname } = req.nextUrl;

  // Enforce a hard payload ceiling before request body is read.
  if (req.method === "POST" && isApiPath(pathname)) {
    const len = Number(req.headers.get("content-length") || 0);
    if (len > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
  }

  if (isApiPath(pathname)) {
    const ip = clientIp(req);
    let limit = 8;
    let windowMs = 60_000;
    let scope = "api";

    if (pathname === "/api/admin/auth") {
      limit = 5;
      windowMs = AUTH_WINDOW;
      scope = "admin-auth";
    } else if (pathname === "/api/chat") {
      limit = 12;
    } else if (req.method === "GET") {
      limit = 60;
      scope = "api-read";
    }

    const rl = rateLimit(ip, limit, windowMs, scope);
    if (!rl.ok) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(rl.retryAfter),
          },
        }
      );
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.svg|images/).*)"],
};