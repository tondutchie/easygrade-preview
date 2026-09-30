# EasyGrade Website Preview

Static website prototypes for **EasyGrade**, a professional color-grading OFX for DaVinci Resolve.

This README is the handoff source for anyone continuing the website work. Read it before changing layout, copy, typography, imagery, routing, or QA status.

## Repository

- GitHub: `tondutchie/easygrade-preview`
- Primary branch: `main`
- Current pushed baseline: `d919e9e` — **Polish Editorial design and production QA**
- Root `index.html` currently redirects to **`./cinematic/`**
- No production deployment should be assumed from this repo alone.

## Current page variants

| Route | Files | Status |
| --- | --- | --- |
| `/editorial/` | `editorial/index.html`, `editorial.html` | Latest actively refined design. Production-style TOS 3-pass baseline reached. |
| `/cinematic/` | `cinematic/index.html`, `cinematic.html` | Existing variant. Not changed during the latest Editorial work. |
| `/bold/` | `bold/index.html`, `bold.html` | Existing variant. Not part of the latest Editorial work. |
| `/` | `index.html` | Redirects to `/cinematic/`. |

**Important:** do not silently switch the root redirect from Cinematic to Editorial. Treat that as an explicit product decision.

## Editorial direction

The current Editorial page is the strongest/most recent baseline.

Reference principles come from the current Apple Mac site: strong hierarchy, restrained tracking, large confident type, clear feature-card composition, disciplined whitespace, and minimal explanatory UI chrome. Use the principles, not a literal clone.

### Typography

The page uses the Apple system family when available:

- Display: `SF Pro Display`
- Text/UI: `SF Pro Text`
- Fallback: `-apple-system`, `BlinkMacSystemFont`, `Helvetica Neue`, Arial, sans-serif

Do **not** add or commit Apple font files.

Typography is controlled centrally with CSS variables such as:

- `--track-display`
- `--track-copy`
- `--track-label`
- `--track-ui`
- `--track-overline`

When the request is about **spacing between characters**, change `letter-spacing` / tracking. Do not accidentally change `line-height`, font size, or section spacing.

### Spacing and layout

Use design tokens and semantic component rules instead of one-off pixel patches. Current examples include:

- `--media-gap`
- `--study-radius`
- `--study-pad`
- `--study-card-ratio`
- `--study-section-pad`
- `--section-seam`

The section after the study cards uses the semantic modifier:

- `.chapter--continuation`

This exists specifically to keep the transition from the feature cards into the Environment chapter tight and intentional across desktop, tablet, mobile, and landscape.

### Content and visual rules

Avoid generated-template/AI-looking structure.

Do not reintroduce:

- numbered section labels such as `01 / 02`
- tiny all-caps category labels such as `PORTRAIT / SKIN`
- labels such as `Portrait controls`, `Environment controls`, or `Workflow note`
- decorative labels that explain the layout instead of helping the customer

If a category such as **Portrait** or **Environment** is useful, treat it as real content hierarchy, similar to an Apple feature card, not tiny metadata.

Current study-card imagery:

- Japanese portrait
- Japanese mountain-village landscape

Both cards share the same component geometry and visual weight.

Current card copy:

- **Portrait** — “Natural skin. Less setup.”
- **Environment** — “Shape the scene. Keep it coherent.”

## Copy baseline

A remote copy update was merged before the current baseline. Preserve the latest sales-copy intent when making visual changes.

Current hero/support direction includes concise customer-facing language such as:

- “Grade less. Create more.”
- “Skin, foliage, skies and more in one focused OFX. Less setup. More time grading.”
- “Product platform, trial, pricing and licensing details will be published after they are confirmed.”

Do not replace customer copy with design-review narration or internal implementation notes.

## TOS quality gate

TOS means the **Taste Operating System** in:

- `https://github.com/tondutchie/designskill`

For final/production-quality claims, use the full 3-pass gate in:

- `docs/TOS_3PASS_QA.md`

Relevant Editorial layers include:

- `web-commerce-design`
- `typography-spacing`
- `anti-slop`
- `editorial-studio`
- `taste-critic`

Required statuses:

1. **P1 Working PASS**
2. **P2 QA PASS**
3. **P3 FINAL PASS**

Never call a modified page final just because a script passes. Fresh renders and visual review are mandatory.

### Last known Editorial QA baseline

The latest production-style review covered representative widths including:

- 1728
- 1440
- 1024
- 761
- 760
- 390
- 320
- landscape 844×390

Baseline checks included:

- horizontal overflow = 0
- study cards equal in size at matched breakpoints
- images load and have alt text
- SF Pro Display / SF Pro Text resolve on the Mac test machine
- navigation anchors resolve
- trial modal opens
- focus moves to Close
- Escape closes the modal
- static Anti-Slop had no HIGH blockers
- no measurable slop-tell blocker

Any material change invalidates the previous visual PASS until the relevant checks are rerun.

## Local preview

From the repository root:

```bash
cd /Users/tondutchie/Documents/tdc/EasyGrade/easygrade-preview
python3 -m http.server 8765
```

Useful routes:

```text
http://127.0.0.1:8765/editorial/
http://127.0.0.1:8765/cinematic/
http://127.0.0.1:8765/bold/
```

When opening Chrome during assisted work, open a **new window** so the current ChatGPT/browser window is not replaced:

```bash
open -na "Google Chrome" --args --new-window "http://127.0.0.1:8765/editorial/"
```

## Working conventions

- Use **Remote Desktop Commander** for repository files, terminal, server, and build/verification work.
- Keep `editorial/index.html` and `editorial.html` synchronized.
- Before pushing, run:
  - `git diff --check`
  - a sync comparison for duplicate route/root files
  - the relevant TOS checks
  - fresh desktop/mobile visual review
- Do not modify Cinematic while working on Editorial unless explicitly requested.
- Do not overwrite newer remote work. Fetch before committing/pushing.

Recommended Git preflight:

```bash
git fetch origin main
git status
git rev-list --left-right --count HEAD...origin/main
```

If the remote is ahead, inspect its diff and merge/rebase intentionally before pushing.

## Current next steps

Unless the product direction changes, the safe continuation order is:

1. Use Editorial as the quality reference baseline.
2. Continue only requested Editorial refinements.
3. Revisit Cinematic separately; do not let its quality regress below the Editorial baseline.
4. Decide explicitly which variant should become the root/default experience.
5. Run full TOS 3-pass again before calling the chosen variant production-ready.
6. Deploy only after the default-route decision and final QA are complete.

## Handoff principle

Preserve intent before preserving individual CSS values.

The important system is:

- Apple-like clarity without copying Apple content
- EasyGrade product truth
- strong SF Pro hierarchy
- controlled tracking
- dynamic/tokenized spacing
- equal visual weight where paired imagery is intentional
- no AI-template labels
- responsive composition, not desktop shrinking
- fresh TOS evidence before a final claim
