# Duplicate Report

Exact duplicates are determined by SHA-256 over original file bytes. No exact duplicate binary files were found.

Same-subject legacy alternates are determined by normalized asset identity plus current source usage. They are not claimed to be byte-identical.

Original website files were not deleted or relocated because that would alter production behavior. Archive copies live under `studio-assets/archive/`.

## Exact byte duplicates

No byte-identical files were found.

## Same-subject legacy alternates

| Subject key | Canonical current source | Archived alternate | Canonical dimensions | Alternate dimensions | Archive copy |
|---|---|---|---:|---:|---|
| `academy-museum` | `public/assets/venues/academy-museum.jpg` | `public/assets/food/academy-museum.jpg` | 800 × 800 | 1100 × 650 | `archive/alternates/public/assets/food/academy-museum.jpg` |
| `cara-restaurant` | `public/assets/venues/cara-restaurant.webp` | `public/assets/food/cara.jpg` | 1500 × 750 | 1100 × 650 | `archive/alternates/public/assets/food/cara.jpg` |
| `firefly` | `public/assets/venues/firefly.jpg` | `public/assets/food/firefly.jpg` | 1200 × 800 | 1100 × 650 | `archive/alternates/public/assets/food/firefly.jpg` |
| `kismet` | `public/assets/venues/kismet.jpg` | `public/assets/food/kismet.jpg` | 810 × 810 | 1100 × 650 | `archive/alternates/public/assets/food/kismet.jpg` |
| `lacma-urban-light` | `public/assets/venues/lacma-urban-light.webp` | `public/assets/food/lacma.jpg` | 2560 × 1934 | 1100 × 650 | `archive/alternates/public/assets/food/lacma.jpg` |
| `mother-wolf` | `public/assets/venues/mother-wolf.jpg` | `public/assets/food/mother-wolf.jpg` | 1200 × 800 | 1100 × 650 | `archive/alternates/public/assets/food/mother-wolf.jpg` |
| `musso-and-frank-grill` | `public/assets/venues/musso-and-frank-grill.jpg` | `public/assets/food/musso-and-frank-grill.jpg` | 1600 × 1060 | 1100 × 650 | `archive/alternates/public/assets/food/musso-and-frank-grill.jpg` |
| `yamashiro-hollywood` | `public/assets/venues/yamashiro-hollywood.jpg` | `public/assets/food/yamashiro-hollywood.jpg` | 576 × 383 | 1100 × 650 | `archive/alternates/public/assets/food/yamashiro-hollywood.jpg` |
| `cara-hotel` | `public/assets/venues/cara-hotel.webp` | `public/assets/hotels/cara-hotel.jpg` | 1500 × 1000 | 1100 × 650 | `archive/alternates/public/assets/hotels/cara-hotel.jpg` |
| `hollywood-franklin` | `public/assets/venues/hollywood-franklin.webp` | `public/assets/hotels/hollywood-franklin.jpg` | 1280 × 720 | 1100 × 650 | `archive/alternates/public/assets/hotels/hollywood-franklin.jpg` |
| `los-angeles-athletic-club` | `public/assets/venues/los-angeles-athletic-club.jpg` | `public/assets/hotels/los-angeles-athletic-club.jpg` | 1920 × 850 | 1100 × 650 | `archive/alternates/public/assets/hotels/los-angeles-athletic-club.jpg` |
| `the-biltmore` | `public/assets/venues/the-biltmore.webp` | `public/assets/hotels/the-biltmore.jpg` | 712 × 400 | 1100 × 650 | `archive/alternates/public/assets/hotels/the-biltmore.jpg` |
| `the-delphi` | `public/assets/venues/the-delphi.jpg` | `public/assets/hotels/the-delphi.jpg` | 700 × 1050 | 1100 × 650 | `archive/alternates/public/assets/hotels/the-delphi.jpg` |
| `the-line-la` | `public/assets/venues/the-line-la.webp` | `public/assets/hotels/the-line-la.jpg` | 1280 × 1920 | 1100 × 650 | `archive/alternates/public/assets/hotels/the-line-la.jpg` |
## Reuse that is not duplication

- `public/assets/venues/palihotel-hollywood.jpg` is intentionally referenced 2 times: app/page.tsx:114, scripts/apply-confirmed-bookings.cjs:17.
- `public/assets/venues/universal-studios.jpeg` is intentionally referenced 3 times: app/page.tsx:126, app/page.tsx:138, scripts/apply-confirmed-tickets-calendar.cjs:12.
- `public/assets/events/dolphin-jump.png` is intentionally referenced 4 times: app/page.tsx:676, scripts/apply-production-visuals.mjs:19, scripts/apply-production-visuals.mjs:9, scripts/restore-original-dolphins.cjs:8.
- `public/assets/events/dolphin-rise.png` is intentionally referenced 5 times: app/page.tsx:675, scripts/apply-production-visuals.mjs:15, scripts/apply-production-visuals.mjs:17, scripts/apply-production-visuals.mjs:8, scripts/restore-original-dolphins.cjs:7.
- `public/assets/events/dolphin-swim.png` is intentionally referenced 7 times: app/page.tsx:674, scripts/apply-production-visuals.mjs:13, scripts/apply-production-visuals.mjs:14, scripts/apply-production-visuals.mjs:16, scripts/apply-production-visuals.mjs:18, scripts/apply-production-visuals.mjs:7, scripts/restore-original-dolphins.cjs:6.
- `public/assets/reference/comic-cover.webp` is intentionally referenced 4 times: app/globals.css:379, app/globals.css:587, app/page.tsx:386, app/page.tsx:620.