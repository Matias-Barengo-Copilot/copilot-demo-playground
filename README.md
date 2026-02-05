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
| `/admin` | Admin area (avatar menu only; not in main nav) |

### Adding demos (config-driven)

Edit **`lib/demo-catalog.ts`**:

- **Business Functions:** add an entry to `BUSINESS_FUNCTION_DEMOS` (id, slug, title, description, narrative, optional tags).
- **AI Agents:** add to `AI_AGENT_DEMOS` (id, slug, title, description, agentName, narrative, type: `"simulation"`).

Slugs are used in URLs (e.g. `/demos/business-functions/hr-hiring`). Keep slugs URL-safe (lowercase, hyphens).

### Demo data in the database

The same demo list is stored in the **`demos`** table for when you switch to DB-driven content. Schema: `slug`, `category` (business_function | ai_agent | industry), `title`, `description`, `narrative`, `metadata` (jsonb for tags, agentName, externalUrl, industry, customerStory), `sort_order`. Apply the migration and seed:

```bash
npx drizzle-kit push   # or run migration 0002_demos.sql
npm run db:seed-demos  # or: npx tsx scripts/seed-demos.ts
```

The app currently reads from **`lib/demo-catalog.ts`**; the DB is ready for a future switch or for admin-managed demos.

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
