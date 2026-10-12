# Editorial Hero video — 2026-10-12

TL;DR: Replace the cream Editorial cover photo with the owner-supplied Moji video. Keep the existing headline, copy, navigation, cover geometry and remaining page. Both `/editorial.html` and `/editorial/` use the same implementation. No deployment, push or merge in this task.

## Design intent

Foundation: Web Commerce Design. Direction: existing Editorial Studio with the documented Apple system type override. Audience: video makers exploring EasyGrade. Mood: considered. Existing warm paper, chapter rhythm and paired study media remain. One motion event: the supplied clip plays silently and loops; no extra grade, filter, wipe, reveal or page animation. Mobile retains the existing cover geometry with a deliberate 60% horizontal crop to keep the subject visible. Desktop follows the existing cover fit. Low-height landscape uses contain as the existing image did.

## Source and derivatives

- Original, read-only: `/Users/tondutchie/Desktop/EG Moji.mov`.
- Source: 1920 × 1080, 25 fps, 3.92 seconds, HEVC full-range BT.709 plus PCM audio.
- Shared derivative prepared by the parallel cinematic Dev: H.264 High Level 4.1, yuv420p, limited-range BT.709 converted from full-range source, CRF 18, faststart; no audio. Source timing and embedded color reveal remain unchanged.
- `assets/hero/eg-moji-hero-1080p.mp4`: 5,752,559 bytes; SHA-256 `b7875a204469b172941e7c1c5fd6d58568b9bad293c4c12dcb8de07d1c7a7c59`.
- `assets/hero/eg-moji-hero-poster.jpg`: source frame at 2.7 seconds; SHA-256 `17bcb12aa05556d7b84c8f0ebb579d56c14bd941fb20248be413d72dacafd228`.

## Behavior

Muted, inline playback; autoplay is enabled by JS only when reduced motion is not requested. A native named Play/Pause button follows the actual playing state. Autoplay rejection keeps a working Play button and static poster. Reduced motion stops autoplay and leaves manual playback available. A media error hides the failed video and retains its poster. Independent QA found that a failed MP4 source emits a source error without a video error; the final handler covers both events so no dead Play control remains. Without JavaScript the video stays still, with a poster and no inactive custom control.

Hero caption identifies the owner-supplied video rather than describing it as stock imagery or asserting an unverified plugin result. Stock disclosure remains with the separate stock media.

## P1 evidence

Fresh Chrome runtime at widths 320, 390, 760, 761, 981, 1024, 1280 and 1440: zero document overflow; actual video decode 1920 × 1080, readyState 4, advancing currentTime. Pause/play and reduced-motion initial load tested. Fresh desktop/mobile renders inspected. Original color treatment is not filtered by CSS. Static anti-slop: zero findings, zero HIGH. Exact browser taste_audit: zero HIGH and one LOW advisory about four geometric section seams; unchanged chapter-internal padding and rules maintain visible separation. slop_tells: no measurable slop tells. Both HTML files remain byte-identical. `git diff --check` passes.

Evidence directory: `QA_Evidence/Website/editorial-hero-video-dev-20261012/` in the EasyGrade project root. Independent P2 QA and source-free P3 are separate gates. Physical iPhone Safari: NOT RUN. Source/codec suitability is not a real-device PASS. No production readiness claim from P1 alone.
