# Architecture Overview

_Generated: 2026-03-12_

## Summary

A Next.js 16 App Router demo portal showcasing AI capabilities across four surfaces:
1. **360° panorama experiences** — immersive hotspot-driven demos (HR, classroom, construction, ecommerce)
2. **Business function demos** — six categories (HR, marketing, support, ecommerce, operations, finance) backed by PostgreSQL
3. **AI workforce agents** — chat interface for mock AI agents (ready for LLM integration)
4. **Admin dashboard** — user whitelist and demo management

Authentication is Google OAuth + email whitelist via NextAuth v5. State is managed with Zustand. Styling uses Tailwind CSS v4 + Framer Motion.

---

## Key Directories

| Directory | Purpose |
|---|---|
| `app/` | Next.js App Router pages and layouts |
| `app/demos/360/[slug]/` | 360° panorama viewer routes |
| `app/demos/business-functions/` | Business function demo pages |
| `app/demos/ai-agents/` | AI agent chat routes |
| `app/admin/` | Admin dashboard (users, demos) |
| `app/api/auth/` | NextAuth route handler |
| `components/panorama/` | Panorama viewer system (most complex) |
| `components/ui/` | Radix UI primitives |
| `lib/` | Data layer — DB queries, hotspot data, agent data |
| `store/` | Zustand state (scene/panel/hotspot state) |
| `db/` | Drizzle ORM schema |
| `drizzle/` | Database migrations |
| `mocks/` | JSON mock data (agents, demos) |
| `public/images/` | Panorama equirectangular images |
| `public/media/` | Hotspot video files |

---

## Important Files

| File | Role |
|---|---|
| `app/layout.tsx` | Root layout — fonts, providers |
| `auth.ts` | NextAuth config — Google OAuth, email whitelist, role injection |
| `lib/db.ts` | Drizzle + Neon DB connection |
| `db/schema.ts` | DB tables: users, businessFunctionDemos, aiAgents |
| `store/useSceneStore.ts` | Zustand store — active hotspot, panel state, navigation index |
| `lib/panorama-hotspots.ts` | Hotspot definitions + coordinate conversion (x/y ↔ pitch/yaw) |
| `lib/panorama-experiences.ts` | 360° experience metadata (4 scenes) |
| `components/panorama/Panorama360View.tsx` | Pannellum viewer wrapper, hotspot rendering, camera animation |
| `components/panorama/SceneViewport.tsx` | Full-screen orchestrator — viewer + panel + intro modal |
| `components/panorama/DemoPanel.tsx` | Slide panel (mobile: bottom, desktop: right) with hotspot details |
| `lib/demos-db.ts` | Business function demo DB queries |
| `lib/agents.ts` | Agent data loader (currently from mocks/agents.json) |
| `components/agent-chat.tsx` | Chat interface (mock responses, ready for LLM) |
| `app/globals.css` | Tailwind v4 tokens, 3D flip card utilities, hotspot styles |

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| React | 19.2.3 |
| Styling | Tailwind CSS v4 + Framer Motion |
| State | Zustand 5 |
| Database | Drizzle ORM + Neon PostgreSQL (serverless) |
| Auth | NextAuth v5 — Google OAuth + email whitelist |
| Panorama | react-pannellum-next (equirectangular) |
| Video | react-player |
| UI Primitives | Radix UI |
| Icons | lucide-react |
| TypeScript | v5 strict mode |

---

## Complexity Areas

### 1. Panorama 360° System (highest complexity)
- **Coordinate mapping**: normalized x/y → Pannellum pitch/yaw degrees (`lib/panorama-hotspots.ts`)
- **Timing**: pending `lookAt()` queue handles race between viewer init and hotspot click
- **State sync**: Zustand bridges the Pannellum imperative API with React component tree
- **Responsive panel**: `DemoPanel` uses different slide direction on mobile vs. desktop
- **Navigation**: `SceneViewport` handles prev/next with wrap-around, camera transitions, and panel sync

### 2. Authentication Flow
- Google OAuth → `signIn` callback checks email whitelist in DB → redirect to `/unauthorized` if not allowed
- `session` callback attaches `user.role` (admin/presenter/viewer) to every session
- Protected routes check session server-side via `auth()` helper

### 3. Business Function Demo Data
- 6 categories as DB enum; demos loaded in parallel via `getDemosForAllCategories()`
- Admin can add/edit/reorder demos; they hydrate landing flip cards and category grids

### 4. Mock → DB Migration Path
- `lib/agents.ts` loads from `mocks/agents.json`; comments indicate DB query drop-in
- Agents schema exists in `db/schema.ts` but queries are not yet wired

### 5. Data Flow: Panorama Hotspot Click
```
User clicks hotspot
  → Panorama360View.handleHotspotClick(id)
  → Zustand: setActiveHotspotWithIndex(id, index), openPanel()
  → SceneViewport detects store change
  → camera animates via lookAt(pitch, yaw, duration)
  → DemoPanel slides in with hotspot title/description/video
  → NavigationArrows allow prev/next with wrap-around
```
