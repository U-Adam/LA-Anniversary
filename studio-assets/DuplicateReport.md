# Duplicate Report

Exact duplicates are determined by SHA-256 over original file bytes. No exact duplicate binary files were found.

Original website files were not deleted or relocated because that would alter production behavior. Duplicate *library classification* copies are placed under `studio-assets/archive/duplicates/`.

## Archive status

No files were copied into `archive/duplicates/` because no byte-identical source files exist.

## Reuse that is not duplication

- `public/assets/venues/palihotel-hollywood.jpg` is intentionally referenced 2 times: app/page.tsx:114, scripts/apply-confirmed-bookings.cjs:17.
- `public/assets/venues/universal-studios.jpeg` is intentionally referenced 3 times: app/page.tsx:126, app/page.tsx:138, scripts/apply-confirmed-tickets-calendar.cjs:12.
- `public/assets/events/dolphin-jump.png` is intentionally referenced 4 times: app/page.tsx:676, scripts/apply-production-visuals.mjs:19, scripts/apply-production-visuals.mjs:9, scripts/restore-original-dolphins.cjs:8.
- `public/assets/events/dolphin-rise.png` is intentionally referenced 5 times: app/page.tsx:675, scripts/apply-production-visuals.mjs:15, scripts/apply-production-visuals.mjs:17, scripts/apply-production-visuals.mjs:8, scripts/restore-original-dolphins.cjs:7.
- `public/assets/events/dolphin-swim.png` is intentionally referenced 7 times: app/page.tsx:674, scripts/apply-production-visuals.mjs:13, scripts/apply-production-visuals.mjs:14, scripts/apply-production-visuals.mjs:16, scripts/apply-production-visuals.mjs:18, scripts/apply-production-visuals.mjs:7, scripts/restore-original-dolphins.cjs:6.
- `public/assets/reference/comic-cover.webp` is intentionally referenced 4 times: app/globals.css:379, app/globals.css:587, app/page.tsx:386, app/page.tsx:620.