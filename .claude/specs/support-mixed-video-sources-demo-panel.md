# Task Spec: Support Mixed Video Sources in Demo Panel

## Objective

The Demo Panel currently renders all video sources using a native HTML5 `<video>` element with `type="video/mp4"` hardcoded. This works for local `.mp4` files but fails silently for external video URLs (YouTube, Vimeo, or other hosted streams), which cannot be embedded as a raw `<video>` source.

The goal is to make the Demo Panel automatically detect the type of video source and render it using the correct player — native video for direct files, and an embedded player for external links — without any manual flag required in the hotspot data.

`react-player` is already installed in the project and handles both source types. The task is primarily a rendering update in `DemoPanel.tsx`.

---

## Scope

- Detect whether `activeHotspot.media` is a direct video file or an external URL
- Render direct video files (`.mp4`, `.webm`, `.ogg`) with the native HTML5 `<video>` element
- Render external video URLs (YouTube, Vimeo, and other hosted URLs supported by `react-player`) using `ReactPlayer`
- Detection must be automatic based on the URL string — no new props or data fields required
- Graceful fallback if the source is unsupported or invalid (no crash, no broken layout)

---

## Out of scope

- Changing the layout, sizing, or visual design of the Demo Panel
- Adding new hotspot data fields (e.g., a `mediaType` flag)
- Video transcoding or format conversion
- Adding video controls beyond what currently exist
- Modifying the `PanoramaHotspot` type definition
- Changes to any component other than `DemoPanel.tsx` (unless a small shared utility is needed)
- Refactoring unrelated Demo Panel code

---

## Context / affected areas

| File | Role |
|------|------|
| `components/panorama/DemoPanel.tsx` | Primary change target — video rendering logic lives here |
| `lib/panorama-hotspots.ts` | Defines `PanoramaHotspot.media?: string` — read-only for this task |
| `package.json` | `react-player@^3.4.0` already installed, no new dependencies needed |

Current hotspot `media` values in use:
- `/media/acme-corp-hr-portal.mp4` — local MP4 file (HR scene)
- `https://plumtree.slack.com/files/...` — hosted external URL (Ecommerce scene)

---

## Constraints

- Do not add a `mediaType` field or any other new property to `PanoramaHotspot`
- Do not change the Demo Panel's layout, container dimensions, or visual design
- Do not introduce a new dependency — use the existing `react-player` package
- Preserve the existing close button, navigation arrows, title, description, and link behavior
- Detection logic must be pure (no async calls, no network requests to probe the URL)

---

## Acceptance criteria

- [ ] When `activeHotspot.media` ends with `.mp4`, `.webm`, or `.ogg`, the native `<video>` element renders the video with browser controls
- [ ] When `activeHotspot.media` is a YouTube URL, `ReactPlayer` renders the embedded YouTube player
- [ ] When `activeHotspot.media` is a Vimeo URL, `ReactPlayer` renders the embedded Vimeo player
- [ ] When `activeHotspot.media` is another hosted URL (non-direct-file), `ReactPlayer` is used as the fallback renderer
- [ ] When `activeHotspot.media` is `undefined` or empty, no video element is rendered and the panel shows no crash or layout break
- [ ] When `activeHotspot.media` is an invalid or unreachable URL, the component fails gracefully (no JS error thrown, no broken layout)
- [ ] All existing Demo Panel behavior is preserved: title, description, link, close button, prev/next navigation

---

## Testing requirements

**Manual validation (required — no automated test suite currently exists for this component):**

| Case | Expected result |
|------|----------------|
| Hotspot with `/media/acme-corp-hr-portal.mp4` | Native `<video>` renders with controls |
| Hotspot with a YouTube URL | `ReactPlayer` renders embedded YouTube player |
| Hotspot with a Vimeo URL | `ReactPlayer` renders embedded Vimeo player |
| Hotspot with a hosted `.mp4` URL (remote) | Native `<video>` renders |
| Hotspot with no `media` field | No video section rendered, no errors |
| Hotspot with a garbage/invalid URL | No crash, graceful degradation |

**Build validation (required):**
- `npm run build` must pass with no TypeScript errors

---

## Out-of-scope protocol

- Minor necessary deviations may proceed if documented in the PR.
- Material deviations (new data fields, layout changes, new dependencies) require escalation before proceeding.

---

## Open questions / assumptions

- **Assumption:** `react-player` can be used as a unified player for external URLs — this is its primary design purpose and is confirmed by the installed version (`^3.4.0`).
- **Assumption:** YouTube and Vimeo are the primary external providers to support. Other providers supported by `react-player` are a bonus, not a requirement.
- **Open question:** Should `ReactPlayer` also handle hosted `.mp4` URLs (remote direct files), or should it remain native `<video>`? **Assumption for now:** Keep native `<video>` for any direct file extension, regardless of whether it is local or remote.
- **Open question:** Should `ReactPlayer` be rendered with `controls={true}`? **Assumption:** Yes, for consistency with the native `<video>` behavior.
- **Open question:** Should video autoplay on panel open? **Assumption:** No change to current autoplay behavior (currently not autoplaying).
