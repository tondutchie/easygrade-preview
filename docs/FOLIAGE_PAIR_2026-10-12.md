# Foliage before/after pair — 2026-10-12

TL;DR: Replace the two stock study cards with the creator-supplied original and Foliage-adjusted images of the same scene. Retain the paired-card geometry, theme and center crop; preserve prior Hero and Workflow sections. Both Editorial routes stay synchronized. Local review only; no push, merge or deployment.

## Assets and fidelity

Original desktop inputs remain untouched. Web assets are byte-for-byte copies, without recompression, resize, AI editing or extra CSS color filters. At approximately 3.4 and 3.7 MB, they preserve the supplied visual detail for review.

- `/Users/tondutchie/Desktop/mew eg2 - 00000001.jpg` → `assets/foliage/mew-original.jpg`, SHA-256 `8d6cb2ec72b68858c32c90b757b1356477c4d2577274250b7a0c05eaec68c2bc`.
- `/Users/tondutchie/Desktop/mew eg - 00000003.jpg` → `assets/foliage/mew-foliage.jpg`, SHA-256 `64bc0eca737ea0d1f0fd5c99a6b83afe352b82d356bc365c26f4522b969eeb46`.
- Both sources: 7008 × 4672. Both use `object-fit: cover; object-position: 50% 50%` in equal-size cards. Existing desktop 3:4 / mobile 4:5 card ratios retain the prior layout while showing aligned portions of the scene.

## Labels and recipe

Heading: “Same scene. Different foliage.” Labels: “Original” and “Foliage adjustment”. No Skin/Sky result or claim that only foliage pixels changed is asserted. The adjacent chapter describes Foliage, with no unavailable Sky clip or placeholder.

The owner-supplied settings screenshot `スクリーンショット 2569-10-12 午後9.13.11.png` shows Enable Foliage checked, Exposure −1.132, Saturation 0.853, Depth −0.039, Hue −60.0, Contrast 1.000 and Blend 1.000. The approved compact caption rounds informative values to Exposure −1.13 / Saturation 0.85 / Hue −60°. It says these are settings used for the shown result, not a preset/default or guarantee for other shots. Individual label/value pairs cannot split across lines.

Previous stock disclaimers in the adjacent annotation, footer and meta description were updated because the page now uses creator-supplied video, screenshot and image assets throughout. This does not add a commercial availability or compatibility claim.

## Focused evidence

P1 Chrome 320/390/1280: zero horizontal document overflow; both full-resolution assets loaded; equal card sizes (288×360, 358×447.5, 547.92×730.56 respectively); crop positions match. Actual Hero playback retained. Fresh pair renders inspected. Both routes byte-identical and diff check passes.

Static anti-slop: zero HIGH; the prior MED “Skin feature” keyword is a legitimate distinction in the existing Workflow section, not a decorative label. Independent QA separately checks final crop/labels/recipe/source bytes and Hero/Workflow scope. Root performs the final source-free read. Real iPhone Safari NOT RUN.

Evidence directory in the EasyGrade root: `QA_Evidence/Website/editorial-foliage-pair-20261012/`.
