# NexGuard Technologies — Website

Marketing site + lead-capture platform for NexGuard Technologies Ltd (security, technology and solar solutions in Kenya).

Built with Next.js 15 (App Router), React 19, Prisma, Tailwind CSS v4.

## Stack

- **Frontend**: Next.js 15 / React 19 / Tailwind CSS v4 / Framer Motion
- **Backend**: Next.js Route Handlers (`/api/*`) — quotes, bookings, contact, orders, chat, admin
- **Database**: Prisma ORM — SQLite locally, PostgreSQL in production
- **Admin**: Password-protected dashboard at `/admin` (HMAC cookie session)
- **Chat**: Built-in rule-based assistant (no external AI API)

## Local Development

```bash
npm install
cp .env.example .env     # then edit ADMIN_PASSWORD etc.
npm run db:push          # creates local SQLite database
npm run dev              # http://localhost:3000
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_PROVIDER` | Yes | `sqlite` (dev) or `postgresql` (prod) |
| `DATABASE_URL` | Yes | SQLite file path or Postgres connection string |
| `ADMIN_PASSWORD` | Yes | Password for the `/admin` dashboard |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Company name |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL (used in sitemap/SEO) |
| `NEXT_PUBLIC_PHONE` | Yes | Phone for `tel:` links |
| `NEXT_PUBLIC_PHONE_DISPLAY` | Yes | Formatted phone for display |
| `NEXT_PUBLIC_EMAIL` | Yes | Contact email |
| `NEXT_PUBLIC_WHATSAPP` | Yes | WhatsApp number |
| `NEXT_PUBLIC_LOCATION` | Yes | Office location |

## Live

- **Site**: https://nexguard-technologies.vercel.app (Vercel free tier — $0/month)
- **Database**: Neon free tier PostgreSQL — schema pushed to the `production` branch
- **Repository**: https://github.com/euginenyariki/nexguard-technologies

## Deploy (Vercel + Neon, $0/month)

1. Create a free PostgreSQL database on [Neon](https://neon.tech), copy the pooled connection string.
2. Install the Vercel CLI and log in:
   ```bash
   npm i -g vercel
   vercel login
   ```
3. Set production env vars in Vercel:
   ```bash
   vercel env add DATABASE_PROVIDER   # postgresql
   vercel env add DATABASE_URL        # neon connection string
   vercel env add ADMIN_PASSWORD
   vercel env add NEXT_PUBLIC_SITE_URL    # https://nexguard-technologies.vercel.app
   vercel env add NEXT_PUBLIC_SITE_NAME NEXT_PUBLIC_PHONE NEXT_PUBLIC_PHONE_DISPLAY NEXT_PUBLIC_EMAIL NEXT_PUBLIC_WHATSAPP NEXT_PUBLIC_LOCATION
   ```
4. Push database schema:
   ```bash
   DATABASE_PROVIDER=postgresql DATABASE_URL="$NEON_URL" npx prisma db push
   ```
5. Deploy:
   ```bash
   vercel --prod
   ```
6. Auto-deploy on push: connect the GitHub repo in the Vercel dashboard
   (Settings → Git), then every `git push` to `main` redeploys automatically.

The build runs `scripts/set-db-provider.mjs` which rewrites `prisma/schema.prisma` to the correct provider before `prisma generate`, so the same repo works for both SQLite (dev) and PostgreSQL (prod).

## Production Scripts

| Command | Purpose |
|---|---|
| `npm run build` | Provider switch + Prisma generate + Next build |
| `npm run db:push` | Push schema to DB |
| `npm run lint` | ESLint |

## Security

- `src/middleware.ts` adds security headers (CSP, HSTS, X-Frame-Options, etc.)
- `/admin` and `/api/admin/*` are protected by the `ADMIN_PASSWORD` HMAC cookie
- `robots.txt` (auto-generated) disallows `/admin` and `/api/`
- `.env` is gitignored — never commit secrets