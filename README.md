This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## CoPilot Demo Portal

Login-protected demo portal. All demos are contextualized in **Mountain View Coffee**. See `docs/ACTION_PLAN.md` for the full project brief and roadmap.

### Portal structure

| Route | Description |
|-------|-------------|
| `/` | Hub: hero + category sections (Business Functions, Digital Workforce) |
| `/demos/business-functions` | Index of embedded, interactive demos (HR, Marketing, Support, etc.) |
| `/demos/business-functions/[slug]` | Individual business-function demo page |
| `/demos/ai-agents` | Index of AI agent simulations (Digital Workforce) |
| `/demos/ai-agents/[slug]` | Individual agent chat page |
| `/demos/360/[slug]` | 360° panorama viewer (hr, classroom, construction) |
| `/admin` | Admin area (avatar menu only; not in main nav) |

### Adding demos

- **Business Functions:** demos are stored in the database. Insert into the `demos` table with `category = 'business_function'`, `business_function_slug` set to one of the 6 categories (e.g. `recruitment-hr`), and `metadata` with `url`, optional `imageUrl` and `tags`. See `scripts/seed-demos.ts` and `db/schema.ts` for the shape. Run `npm run db:seed-demos` for example data.
- **AI Agents (Digital Workforce):** add an agent to `mocks/agents.json`; the app reads them via `lib/agents.ts` (mocks for now; replace with DB when ready).

Slugs are used in URLs (e.g. `/demos/business-functions/recruitment-hr`, `/demos/ai-agents/stacy`). Keep slugs URL-safe (lowercase, hyphens).

### Demo data in the database

The same demo list is stored in the **`demos`** table for when you switch to DB-driven content. Schema: `slug`, `category` (business_function | ai_agent | industry), `title`, `description`, `narrative`, `metadata` (jsonb for tags, agentName, externalUrl, industry, customerStory), `sort_order`. Apply the migration and seed:

```bash
npx drizzle-kit push   # or run migration 0002_demos.sql
npm run db:seed-demos  # or: npx tsx scripts/seed-demos.ts
```

Business Function demos are read from the DB via **`lib/demos-db.ts`**; AI agents from **`mocks/agents.json`** via **`lib/agents.ts`** (mocks; replace with DB when ready).

### 360° panorama experiences

The landing section **"Experience in 360°"** shows three cards (HR, Classroom, Construction) that link to full-screen 360° viewers. Data lives in **`lib/panorama-experiences.ts`** and **`lib/panorama-hotspots.ts`** (aligned with the main app’s lib-based config; can be moved to DB later). Panorama images go in **`public/images/`** (e.g. `office-panorama.png`). The viewer uses `react-pannellum-next`; if you see peer dependency conflicts with React 19, run **`npm install --legacy-peer-deps`**. Use the **left/right arrows** in the demo panel to move the camera to the previous/next hotspot.

**Console messages not from this app:** `PageTransport is not defined` comes from a browser extension (e.g. `content.1.bundle.js`). YouTube `postMessage` / origin errors when opening a hotspot with a video are from the embed on localhost and can be ignored.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# copilot-demo-playground
