# Canada Easy Guide

A static immigration blog (Express Entry, PNP, study permits, work permits, cost of living, settlement tips) that is ready to deploy to Cloudflare Pages.

## Problem found on `https://canadaeasyguide.pages.dev/`

The live URL was only showing a tiny placeholder page:

> Immigration Guide / Immigration Tips / Your guide to settling in Canada

The real blog code lived in `frontend/`, but it was not deployable to Cloudflare Pages as-is because:

1. **`frontend/next.config.ts` had no `output: "export"`**, so Cloudflare Pages could not produce the static files it needs.
2. **The pages read directly from PostgreSQL** (`frontend/src/db/index.ts` throws `DATABASE_URL is required`), so the build immediately failed on a static host.
3. **API routes + admin pages needed a server + Postgres**, which Cloudflare Pages static hosting cannot provide.
4. **`frontend/public/` was missing** (the hero background `/images/hero-bg.jpg` did not exist).
5. `backend/` contained an incomplete Koguma CMS project with no content, worker, or build config — it should not be used as the deployed static site.

## What was fixed

- Added a static content source: `frontend/src/lib/posts.ts` with real immigration articles.
- Replaced all PostgreSQL calls in the public pages with the static data helpers.
- Converted the blog/search pages to work without a server (client-side filtering, static `generateStaticParams` for posts/categories).
- Enabled `output: "export"` in `frontend/next.config.ts`.
- Removed the Postgres-backed admin/API routes from the static app (they still require a real server + database).
- Added `frontend/public/images/hero-bg.jpg`.
- Added a `.gitignore`.
- The production build now produces a `frontend/out/` directory with static HTML for every page.

## Build locally

```bash
cd frontend
npm install
npm run build
```

The static output is generated in `frontend/out/`. For a quick local check:

```bash
python3 -m http.server 3000 --directory frontend/out
```

## How to deploy to Cloudflare Pages

1. In the Cloudflare Pages project, set:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** `frontend`
2. Make sure the build environment has Node.js 20+.
3. Deploy. The live URL should then show the full blog pages instead of the placeholder.

## Notes

- If you later want the admin panel and database features back, deploy the original Next.js server app to a Node server (Vercel/Render) with a PostgreSQL `DATABASE_URL`, or complete the existing admin/API code under a server-compatible deployment.
- This repository contains an unused `backend/` Koguma scaffold. It is not the source used for the public static blog.
