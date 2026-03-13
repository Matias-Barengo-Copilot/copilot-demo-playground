# Implementation Plan: Support Mixed Video Sources in Demo Panel

## Summary of intended approach

- The change is **entirely contained in `DemoPanel.tsx`** — no other files need modification
- `ReactPlayer` is already imported (line 5) and `isDirectVideo()` is already defined (line 39–40) but neither is wired into the render path
- Replace the static `<video>` block (lines 91–97) with a conditional: if `isDirectVideo(url)` → render native `<video>`, else → render `<ReactPlayer>`
- Add a `width="100%"` / `height="100%"` constraint to `ReactPlayer` so it fills the existing aspect-ratio container without layout changes
- Add an `onError` handler to `ReactPlayer` for graceful degradation on invalid URLs

---

## Relevant code areas

| File | Change type | Detail |
|------|-------------|--------|
| `components/panorama/DemoPanel.tsx` | Modify | Replace video render block; wire up existing `isDirectVideo` and `ReactPlayer` |

No other files require changes. The `PanoramaHotspot` type, hotspot data, and store are read-only for this task.

---

## Execution steps

1. **Read `DemoPanel.tsx`** to confirm current state matches exploration findings (already done).

2. **Replace the media render block (lines 91–97)** with the following logic:

   ```tsx
   {activeHotspot.media && (
     <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
       {isDirectVideo(activeHotspot.media) ? (
         <video controls className="h-full w-full">
           <source src={activeHotspot.media} type="video/mp4" />
         </video>
       ) : (
         <ReactPlayer
           url={activeHotspot.media}
           controls
           width="100%"
           height="100%"
           onError={(e) => console.warn("ReactPlayer error:", e)}
         />
       )}
     </div>
   )}
   ```

3. **Remove `width="600"` from the old `<video>` element** — replace with `className="h-full w-full"` so it fills the container properly (the container already enforces aspect ratio).

4. **Verify `isDirectVideo` remains unchanged** — it already covers `.mp4`, `.webm`, `.ogg` via `/\.(mp4|webm|ogg)$/i.test(url)`. No modification needed.

5. **Run build** to confirm no TypeScript errors: `npm run build`.

6. **Manual validation** against the test matrix in the spec (see below).

---

## Validation plan

**Build / typecheck:**
- `npm run build` — must pass with 0 TypeScript errors

**Manual validation (test matrix):**

| Source value | Expected component rendered |
|---|---|
| `/media/acme-corp-hr-portal.mp4` | Native `<video>` with controls |
| YouTube URL (e.g. `https://www.youtube.com/watch?v=...`) | `ReactPlayer` with embedded YouTube |
| Vimeo URL (e.g. `https://vimeo.com/...`) | `ReactPlayer` with embedded Vimeo |
| Remote `.mp4` URL (e.g. `https://example.com/video.mp4`) | Native `<video>` with controls |
| Hotspot with no `media` field | No video block rendered, no errors |
| Invalid/garbage URL (e.g. `https://not-a-video.invalid`) | `ReactPlayer` renders, `onError` fires, no crash |

**Regression check:**
- Open Demo Panel for a hotspot without media — confirm title, description, link, close button, and nav arrows all work
- Open Demo Panel for a hotspot with media — confirm panel renders correctly in mobile and desktop layouts

---

## Assumptions

- `isDirectVideo()` detection by file extension is sufficient — no content-type sniffing needed
- Remote `.mp4` URLs (not local `/media/...` paths) should still use the native `<video>` element, not `ReactPlayer`
- `ReactPlayer` handles graceful degradation internally for unsupported or unreachable URLs; the `onError` console warning is sufficient
- `controls={true}` on `ReactPlayer` matches the existing native player behavior
- No autoplay behavior change is required
- The existing aspect-ratio container (`aspect-video`) correctly constrains `ReactPlayer` when given `width="100%" height="100%"`

---

## Risks

- **ReactPlayer SSR:** `react-player` has known SSR/hydration issues in Next.js. The component is already marked `"use client"`, which mitigates this — but confirm the build does not produce hydration warnings.
- **Slack URLs:** The current ecommerce hotspot uses a Slack file URL (`https://plumtree.slack.com/files/...`). This will be treated as an external URL and rendered via `ReactPlayer`, which may not be able to play it depending on Slack's access controls. This is a content/access issue, not a code issue — document in PR if observed.
- **Container height on mobile:** The panel is `h-[48vh]` on mobile. The aspect-video container + ReactPlayer at `height="100%"` may overflow or collapse. Validate on mobile viewport.

---

## Escalation points

- Escalate if `ReactPlayer` causes SSR/hydration errors that cannot be resolved without adding a dynamic import — this may require a minor structural change beyond the plan.
- Escalate if the Slack URL case requires a code-level workaround (e.g. a specific provider exclusion) — this would touch detection logic beyond the spec.
- Escalate if mobile layout breaks and the fix requires changing container dimensions or layout structure.

---

## PR reporting requirements

The PR must include:
- A summary of the actual implementation (what was changed, file by file)
- A section called **"Separation from implementation plan"** listing every meaningful deviation with:
  - **Planned:** what the plan said
  - **Actual:** what was done instead
  - **Why changed:** reason for the deviation
  - **Risk introduced or reduced:** net effect
- Automated validation performed (`npm run build` output)
- Manual validation performed (which test cases from the matrix were tested, environment used, result)
