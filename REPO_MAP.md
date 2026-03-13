# Repo Map

Directories and files that matter. Excludes `node_modules`, `.next`, `drizzle/` (generated migrations), and build artifacts.

---

## Root

| File | Purpose |
|---|---|
| `CLAUDE.md` | AI workflow rules — spec-first process, git conventions, PR requirements |
| `ARCHITECTURE.md` | System overview, stack, subsystems, routing map |
| `DATA_FLOW.md` | How data moves through each user journey |
| `IMPORTANT_FILES.md` | Annotated file reference with change guidance |
| `REPO_MAP.md` | This file |
| `auth.ts` | NextAuth v5 config — Google OAuth, email whitelist check, role injection |
| `next.config.ts` | Next.js config — allowed remote image domains |
| `tsconfig.json` | TypeScript config — strict mode, `@/*` path alias |
| `drizzle.config.ts` | Drizzle migration config — schema path, DB credentials |
| `components.json` | Radix UI / shadcn component registry config |
| `postcss.config.mjs` | PostCSS config — Tailwind v4 plugin |
| `eslint.config.mjs` | ESLint 9 flat config |
| `planner_guidelines.txt` | Rules for writing specs and implementation plans |
| `executor_guidelines.txt` | Rules for implementing and validating tasks |

---

## `app/`

Next.js App Router. All routes, layouts, and server actions live here.

| Path | Purpose |
|---|---|
| `app/layout.tsx` | Root layout — fonts (Geist, Playfair Display), wraps `<Providers>` |
| `app/page.tsx` | Landing page — Hero, Business Function cards, Digital Workforce, 360° Experiences |
| `app/globals.css` | Tailwind v4 tokens, 3D flip card utilities, hotspot styles, keyframe animations |
| `app/providers.tsx` | `SessionProvider` wrapper for NextAuth client hooks |
| `app/signin/` | Google OAuth sign-in page |
| `app/unauthorized/` | Access denied page (non-whitelisted email) |
| `app/admin/` | Admin dashboard — user whitelist management, business demo CRUD |
| `app/admin/actions.ts` | Server actions for admin form submissions |
| `app/demos/360/[slug]/` | 360° panorama viewer page for a given experience slug |
| `app/demos/business-functions/` | Business function demo index and category pages |
| `app/demos/business-functions/[categorySlug]/` | Demo grid for a single category |
| `app/demos/ai-agents/` | AI agent directory page |
| `app/demos/ai-agents/[slug]/` | Individual agent chat page |
| `app/api/auth/[...nextauth]/` | NextAuth route handler (OAuth callback) |
| `app/api/upload/` | File upload endpoint (unused in current features) |

---

## `components/`

React components. Server Components unless marked `"use client"`.

### `components/panorama/` — 360° viewer system (most complex)

| File | Purpose |
|---|---|
| `Panorama360View.tsx` | Pannellum viewer wrapper — mounts equirectangular image, renders hotspot markers, animates camera via `lookAt()` |
| `SceneViewport.tsx` | Full-screen orchestrator — composes viewer + panel + modal, owns prev/next navigation logic |
| `DemoPanel.tsx` | Framer Motion slide panel — hotspot title, description, video, navigation arrows. Slides from bottom (mobile) or right (desktop) |
| `NavigationArrows.tsx` | Prev/next hotspot buttons rendered inside `DemoPanel` |
| `IntroModal.tsx` | Welcome overlay shown on panorama entry |

### `components/ui/` — Radix UI primitives

`button`, `card`, `dialog`, `input`, `alert`, `badge`, `select`, `label` — thin wrappers over Radix with Tailwind variants.

### Other components

| File | Purpose |
|---|---|
| `hero.tsx` | Landing hero section |
| `business-function-cards.tsx` | 3D flip cards for 6 business categories — front: image/icon, back: demo buttons |
| `demo-detail-modal.tsx` | Modal for full demo detail (narrative, tags, external link) |
| `category-demos-grid.tsx` | Demo grid for a single category page |
| `panorama-experiences-section.tsx` | 360° experience cards on landing |
| `digital-workforce-section.tsx` | AI workforce section on landing |
| `ai-workforce-cards.tsx` | Agent card grid |
| `agent-chat.tsx` | Chat UI — message history, input, mock responses (LLM not yet integrated) |
| `user-avatar-menu.tsx` | Session avatar dropdown + sign out |

---

## `lib/`

Data layer and shared utilities. No React — safe to import from Server Components.

| File | Purpose |
|---|---|
| `db.ts` | Drizzle ORM + Neon serverless connection — import `db` for all queries |
| `auth.ts` | `isEmailAllowed()` and `getUserByEmail()` — called during NextAuth callbacks |
| `panorama-hotspots.ts` | Hotspot definitions per scene + `xToYaw()` / `yToPitch()` coordinate conversion |
| `panorama-experiences.ts` | Static metadata for 4 experiences (slug, title, image paths) |
| `demos-db.ts` | Drizzle queries for business function demos — single category, all categories, counts |
| `agents.ts` | Agent loader — reads `mocks/agents.json`; swap for DB queries when ready |
| `landing-categories.ts` | Static config for 6 business function categories (icon, label, route) |
| `business-function-cards-config.ts` | Visual config for category flip cards (colors, images) |
| `ai-workforce-display.ts` | Display helpers for AI workforce section |
| `cafe-customers.ts` | Customer data loader (reads `mocks/cafe-customers.json`) |
| `utils.ts` | `cn()` — clsx + tailwind-merge helper |

---

## `store/`

| File | Purpose |
|---|---|
| `useSceneStore.ts` | Zustand store — `activeHotspotId`, `currentHotspotIndex`, `panelOpen`. Bridges Pannellum's imperative API with React state |

---

## `db/`

| File | Purpose |
|---|---|
| `schema.ts` | Drizzle schema — `users`, `businessFunctionDemos`, `aiAgents` tables and enums. Source of truth for DB shape. |

---

## `mocks/`

Static JSON used in place of DB queries where integration is not yet complete.

| File | Purpose |
|---|---|
| `agents.json` | AI agent definitions (id, slug, name, role, capabilities, welcomeMessage…) |
| `cafe-customers.json` | Customer data for demo scenarios |
| `demos/` | Additional mock demo content |
| `README.md` | Notes on mock data structure and intended DB migration path |

---

## `scripts/`

One-off Node scripts run via `npm run db:*`.

| File | Purpose |
|---|---|
| `seed-allowed-email.ts` | Insert an email into the `users` whitelist |
| `seed-demos.ts` | Seed `businessFunctionDemos` table with initial content |
| `run-migrate.ts` | Apply pending Drizzle migrations to the database |

---

## `public/`

Static assets served directly.

| Path | Purpose |
|---|---|
| `public/images/` | Equirectangular panorama images (`office-panorama.png`, `classroom-panorama.png`, `construction-panorama.png`, `ecommerce-panorama.png`) and UI images |
| `public/media/` | Hotspot video files (`.mp4`) referenced by `panorama-hotspots.ts` |

---

## `.claude/`

Workflow artifacts for the spec-first AI-assisted development process.

| Path | Purpose |
|---|---|
| `.claude/specs/` | Task specs — objective, scope, acceptance criteria (one file per task) |
| `.claude/plans/` | Implementation plans — approach, affected files, execution steps (one file per task) |
| `.claude/docs/` | Architecture notes, ADRs, cross-task reference (`architecture-overview.md`) |
| `.claude/validation/` | Manual validation records — what was tested, environment, result |
