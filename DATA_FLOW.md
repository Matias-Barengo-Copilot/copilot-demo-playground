# Data Flow

How data moves through the application for each major user journey.

---

## 1. Authentication

```
User visits any protected route
  → next-auth middleware runs (auth.ts)
  → no session → redirect to /signin

User clicks "Sign in with Google"
  → Google OAuth callback → /api/auth/[...nextauth]
  → NextAuth signIn callback:
      isEmailAllowed(email) → SELECT from users WHERE email = ?
      → not found → return false → redirect to /unauthorized
      → found → return true
  → NextAuth session callback:
      getUserByEmail(email) → attach user.role to session token
  → Session cookie set
  → User lands on /
```

---

## 2. Landing Page Load

```
GET /
  → auth() server-side → redirect to /signin if no session
  → parallel DB queries:
      getDemosForAllCategories()    → 6 x SELECT from businessFunctionDemos
      (agent data from mocks/agents.json — no DB call)
  → React Server Component renders:
      <Hero />
      <BusinessFunctionCards categories={categories} />   ← DB data
      <DigitalWorkforceSection agents={agents} />         ← mock data
      <PanoramaExperiencesSection />                      ← static config
```

---

## 3. 360° Panorama Experience

### Page load
```
GET /demos/360/[slug]
  → getPanoramaExperienceBySlug(slug) from lib/panorama-experiences.ts (static)
  → getHotspotsForScene(slug) from lib/panorama-hotspots.ts (static)
  → Render <SceneViewport experience={...} hotspots={[...]} />
      → <Panorama360View />     (dynamic import, SSR disabled)
      → <DemoPanel />           (hidden initially)
      → <IntroModal />          (shown on mount)
```

### Hotspot click
```
User clicks a Pannellum hotspot marker
  → Panorama360View.handleHotspotClick(hotspotId)
  → Zustand: setActiveHotspotWithIndex(id, index)
  → Zustand: openPanel()
  → SceneViewport detects activeHotspotId change
  → Resolve pitch/yaw from hotspot data
      → lookAt(pitch, yaw, 1000ms) on Pannellum viewer
      → if viewer not ready → store in pendingLookAt ref → flush on onLoad
  → DemoPanel animates in (Framer Motion spring)
      → renders hotspot.title, hotspot.description, hotspot.mediaUrl (video)
```

### Hotspot navigation (prev / next)
```
User clicks NavigationArrows in DemoPanel
  → SceneViewport.handleNavigate("prev" | "next")
  → Compute newIndex with wrap-around
  → Zustand: setCurrentHotspotIndex(newIndex)
  → setActiveHotspotId(hotspots[newIndex].id)
  → Camera animates to new hotspot pitch/yaw
  → DemoPanel content updates to new hotspot
```

### Panel close
```
User clicks X in DemoPanel
  → Zustand: closePanel(), clearActiveHotspot()
  → DemoPanel animates out
```

---

## 4. Business Function Demo

### Category landing
```
GET /demos/business-functions
  → getDemosForAllCategories() → 6 parallel SELECTs
  → Render <CategoryDemosGrid /> per category
```

### Demo detail
```
User clicks demo card
  → BusinessFunctionCards: setSelectedDemo(demo)
  → <DemoDetailModal /> opens (client state, no route change)
  → Renders demo.title, demo.narrative, demo.metadata.url, demo.metadata.tags
```

---

## 5. AI Agent Chat

```
GET /demos/ai-agents/[slug]
  → getAgentBySlug(slug) → reads mocks/agents.json
  → Render <AgentChat agent={...} />

User types message → submit
  → AgentChat: append user message to local state
  → Generate mock response (hardcoded delay + static text)
  → Append assistant message to local state
  ← (LLM integration not yet implemented)
```

---

## 6. Admin — Demo Management

```
GET /admin/business-functions
  → Fetch all demos grouped by category from DB
  → Render admin table

POST /admin (Server Action)
  → Validate form input
  → INSERT or UPDATE businessFunctionDemos
  → Revalidate path → re-render admin page
```

---

## State Ownership Summary

| State | Owner | Scope |
|---|---|---|
| Session / auth | NextAuth (server cookie) | Global |
| Active hotspot, panel open, nav index | Zustand `useSceneStore` | Panorama session |
| Selected business demo (modal) | React local state in `BusinessFunctionCards` | Component |
| Agent chat messages | React local state in `AgentChat` | Component |
| Demo data | PostgreSQL via Drizzle | Persistent |
| Agent data | `mocks/agents.json` | Build-time static |
| Panorama hotspot / experience config | `lib/panorama-hotspots.ts`, `lib/panorama-experiences.ts` | Build-time static |

---

## External Dependencies

| Service | Purpose |
|---|---|
| Google OAuth | User authentication |
| Neon PostgreSQL | Demo content, user whitelist, roles |
| react-pannellum-next | Equirectangular panorama rendering |
| (No LLM API yet) | Agent chat currently uses mock responses |
