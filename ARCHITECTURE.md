# Architecture

## What this is

A Next.js 16 App Router demo portal for showcasing AI capabilities across four surfaces:
- **360° panorama experiences** — hotspot-driven immersive demos (HR, classroom, construction, ecommerce)
- **Business function demos** — six categories backed by PostgreSQL (HR, marketing, support, ecommerce, ops, finance)
- **AI workforce agents** — chat interface over mock agents (ready for LLM integration)
- **Admin dashboard** — user whitelist and demo content management

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 — App Router, Server Components |
| UI | React 19, Radix UI primitives, lucide-react icons |
| Styling | Tailwind CSS v4 (PostCSS), Framer Motion |
| State | Zustand 5 |
| Database | Drizzle ORM + Neon PostgreSQL (serverless) |
| Auth | NextAuth v5 — Google OAuth + email whitelist + role injection |
| Panorama viewer | react-pannellum-next (equirectangular images) |
| Video | react-player |
| Language | TypeScript 5 (strict mode) |

---

## Directory Structure

```
app/                        # Next.js App Router
├── page.tsx                # Landing page (authenticated)
├── layout.tsx              # Root layout — fonts, providers
├── globals.css             # Tailwind tokens, animation utilities, hotspot CSS
├── providers.tsx           # SessionProvider wrapper
├── admin/                  # Admin dashboard (user + demo management)
├── demos/
│   ├── 360/[slug]/         # 360° panorama viewer pages
│   ├── business-functions/ # Business function demo pages
│   └── ai-agents/          # AI agent chat pages
├── api/auth/[...nextauth]/ # NextAuth route handler
├── signin/
└── unauthorized/

components/
├── panorama/               # 360° panorama system (highest complexity)
│   ├── Panorama360View.tsx # Pannellum viewer wrapper
│   ├── SceneViewport.tsx   # Full-screen orchestrator
│   ├── DemoPanel.tsx       # Slide panel (hotspot details)
│   ├── IntroModal.tsx
│   └── NavigationArrows.tsx
├── ui/                     # Radix UI primitives (button, card, dialog, input…)
├── business-function-cards.tsx
├── category-demos-grid.tsx
├── agent-chat.tsx
├── digital-workforce-section.tsx
└── panorama-experiences-section.tsx

lib/                        # Data layer
├── db.ts                   # Drizzle + Neon connection
├── auth.ts                 # Email whitelist + user queries
├── panorama-hotspots.ts    # Hotspot definitions + coordinate conversion
├── panorama-experiences.ts # 360° experience metadata (4 scenes)
├── demos-db.ts             # Business function demo DB queries
├── agents.ts               # Agent loader (currently from JSON mocks)
├── landing-categories.ts   # 6 business function category config
└── utils.ts                # cn() helper (clsx + tailwind-merge)

store/
└── useSceneStore.ts        # Zustand — active hotspot, panel state, nav index

db/
└── schema.ts               # Drizzle schema: users, businessFunctionDemos, aiAgents

drizzle/                    # SQL migration files

mocks/
└── agents.json             # AI agent definitions (mock — not yet DB-backed)

public/
├── images/                 # Equirectangular panorama images (.png)
└── media/                  # Hotspot video files (.mp4)
```

---

## Subsystems

### 1. Panorama 360° System

The most complex subsystem. Renders equirectangular images using Pannellum, overlays interactive hotspots, and synchronizes a slide panel with the camera.

Key concerns:
- **Coordinate conversion**: hotspot positions are stored as normalized x/y (0–1). `xToYaw()` and `yToPitch()` in `lib/panorama-hotspots.ts` convert these to Pannellum degrees.
- **Init timing**: `lookAt()` calls are queued if the viewer is not yet ready; `pendingLookAt` ref flushes on `onLoad`.
- **State bridge**: Zustand (`useSceneStore`) connects the Pannellum imperative API to the React component tree.
- **Responsive panel**: `DemoPanel` slides from the bottom on mobile and from the right on desktop.

Component responsibilities:

| Component | Responsibility |
|---|---|
| `Panorama360View` | Pannellum mount, hotspot rendering, camera animation |
| `SceneViewport` | Layout orchestration, prev/next navigation, panel open/close |
| `DemoPanel` | Framer Motion slide panel — hotspot title, description, video |
| `NavigationArrows` | Prev/next hotspot buttons |
| `IntroModal` | Welcome overlay on first load |

### 2. Business Function Demo System

Six categories stored as a PostgreSQL enum. Demos are fetched in parallel at landing via `getDemosForAllCategories()`. Admin can add/edit/reorder demos.

Landing: 3D flip cards (CSS `rotateY`). Category page: grid. Demo click: `DemoDetailModal`.

### 3. AI Workforce / Agent System

Agents defined in `mocks/agents.json`. `AgentChat` renders a chat UI with mock responses. Drizzle schema (`aiAgents` table) is ready but not yet wired to queries.

### 4. Authentication

Google OAuth → `signIn` callback checks email whitelist in `users` table → rejects with redirect to `/unauthorized` if not found. `session` callback attaches `user.role` (admin / presenter / viewer) to every session object.

---

## Database Schema

```
users
  id, email, name, role (admin|presenter|viewer), createdAt

businessFunctionDemos
  id, categorySlug (enum), title, description, narrative,
  metadata (url, imageUrl, tags), sortOrder, createdAt

aiAgents
  id, slug, name, role, department, status,
  description, welcomeMessage, imageUrl, capabilities[], actions[]
```

---

## Routing Map

```
/                                   Landing (hero, flip cards, agents, 360 cards)
/signin                             Google OAuth sign-in
/unauthorized                       Access denied
/admin                              Admin dashboard
/admin/business-functions           Manage business function demos
/demos/business-functions           All categories grid
/demos/business-functions/[slug]    Category-specific demo grid
/demos/360/[slug]                   Panorama viewer (hr, classroom, construction, ecommerce)
/demos/ai-agents                    Agent directory
/demos/ai-agents/[slug]             Agent chat
```

---

## Known Gaps / Future Work

- `AgentChat` sends mock responses — no LLM integration yet
- `aiAgents` Drizzle table exists but `lib/agents.ts` still reads from JSON mocks
- `/api/upload` route exists but is not used in current features
- Role-based access control is available on session but not enforced on routes beyond whitelist check
- Construction scene hotspots are mostly commented out (`lib/panorama-hotspots.ts`)
