# Editorial icon-teal comparison — 2026-10-12

Owner requested a separate comparison using the icon's teal. Original cream Editorial remains unchanged at commit5fab9fa (HTML SHAa4bbca360ac2605a7e0e11ffdfcb2b4b9762d44f9c1d5eca6abf54a9aae10053). New routes: editorial-teal.html and editorial-teal/index.html, byte-identical. No layout, typography, content or interaction redesign.

## Sample and roles

The actual owner-provided EasyGrade_Icon_2048.png was viewed before sampling. Source: Downloads/EasyGrade_Mobile_and_Brand_Asset_Pack/brand/EasyGrade_Icon_2048.png. Dominant interior cyan sample is **#23CBCE / RGB(35,203,206)**,6071 exact-color pixels after filtering cyan interior colors. Nearby interior pixels differ slightly, e.g.(1500,800)=(36,203,206), so the raster has tonal variation. The selected swatch is a real representative icon color, not a claim that the entire accent is uniform.

Exact #23CBCE is used for primary preview-button surfaces and the Create more. underline. Button text remains #171713; WCAG relative-luminance contrast is8.99:1. Cream remains #EEE7DA. Bright teal against cream is only1.63:1, so it is not used for readable text or keyboard focus. Focus outline uses derived dark teal **#0E6567**,5.55:1 against cream. This distinction preserves the exact bright brand sample prominently while keeping functional focus legible.

## Focused verification

Chrome390/1280 fresh renders: overflow0, exact teal button background RGB(35,203,206), ink Menu and CTA text RGB(23,23,19), two authored Hero lines. Menu open/Escape/focus and native preview-dialog open/Escape/focus return pass. Static Anti-Slop lint0 findings. Separate independent QA required before hosting.

Local evidence: outputs/editorial-teal-dev-20261012/390-viewport.png,1280-viewport.png and full-page equivalents. Device/Safari remains owner QA; browser automation does not establish real-device PASS.
