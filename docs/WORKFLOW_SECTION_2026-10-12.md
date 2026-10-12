# Workflow and Creative Look section — 2026-10-12

TL;DR: Replace only the old “Start with skin.” chapter with the owner's real Resolve screenshot, node workflow and three Creative Look controls. Hero video and every other section retain the prior candidate behavior. Both Editorial routes remain synchronized. No push, merge or deployment authorized.

## Presentation and source fidelity

Owner source: `スクリーンショット 2569-10-12 午後7.43.01.png`, native 3840 × 904. Copied byte-for-byte into `assets/workflow/orange-teal-resolve-original.png`; SHA-256 `6adde304574dce932482a3d2cb07c8920302f0cf022e86373b5ca0d141032eac` (2.2 MB). No raster edits, UI recreation or AI-generated imagery. Original remains untouched.

SVG viewBox presents two crops of that same unmodified source: nodes `1480 360 1515 220`, Creative Look panel `3045 170 735 540`. The node screenshot itself labels the middle nodes Bal and EG; the readable semantic heading expands them as Balance and EasyGrade. The mobile panel moves ahead of its explanations and keeps original controls visible. HTML repeats three real controls at readable text sizes rather than depending on tiny UI labels.

## Control evidence

Read-only engineering reference checkout `Repos/easygrade-custom-look-main-a8ed42d`, live HEAD `870c802377a57410af19e5d91f51d45dbe981bb7`:

- `ofx/shotcorrection/src/EasyGradeShotCorrectionOFX.mm:266`: Skin in Scene, protected skin to skin following the Look; 50 Balanced.
- Same file `:275`: Orange Character pulls skin/warm colors toward orange; 50 Natural.
- Same file `:276`: Teal Character pulls colors outside warm range toward teal/blue; 50 Natural.
- `EasyGradeShotCorrectionLook.h:215`, `:220-231` corroborate skin participation, orange pull, teal pull and related chroma behavior.

Screenshot itself displays Orange & Teal selected, Skin in Scene 70, Orange Character 75 and Teal Character 75. Website says these are settings shown for this shot, not that the owner manually altered defaults. The three controls are explicitly Creative Look controls, not controls from the separate Skin feature. No claim of commercial availability, platform compatibility or quantified image improvement was added.

## Focused verification

Independent QA checked source fidelity, crop/control readability, truthful copy, zero eyebrow, and unchanged Hero at 320, 390 and 1280 px. Document overflow 0 in all three; values matched screenshot; both routes byte-identical. Static anti-slop: 0 HIGH; one MED keyword match for “Skin feature” is a real product-domain distinction, not a decorative structure label. Diff check passes.

Evidence: EasyGrade project `QA_Evidence/Website/editorial-workflow-20261012/` and independent QA's final viewport renders. Source-free P3 remains the root orchestrator's final visual-read step. Real iPhone Safari NOT RUN; no device PASS claim.
