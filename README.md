# MentorEx Digital — Agency Portfolio

A cinematic, responsive portfolio for MentorEx Digital, adapted from the original React/Vite portfolio starter.

## Sections
- Home / studio introduction
- Reels with modal video playback
- Selected Projects with case-study overlays
- Our Stories / studio approach
- Contact with email CTA

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Add your real media

The interface uses named local asset paths so the gallery is ready for your approved media.

### Reels
Add MP4 files and poster images:
- `public/videos/reels/restaurant-promo.mp4`
- `public/videos/reels/hotel-promo.mp4`
- `public/videos/reels/website-showcase.mp4`
- `public/videos/reels/digital-ad.mp4`
- Poster images with matching names in `public/images/reels/` (JPG).

### Project images
Add approved screenshots or photography:
- `public/images/projects/ahmed-foodverse.jpg`
- `public/images/projects/hospitality.jpg`
- `public/images/projects/business-websites.jpg`
- `public/images/projects/campaign-studio.jpg`

Until these assets are added, the layout still renders with its dark visual fallback; the media paths are not real project evidence.

## Update contact and social links

The contact email is currently `contact@mentorex.in`. Add the official Instagram, LinkedIn and WhatsApp URLs once the correct business profiles/number are confirmed. No social account or phone number is fabricated in this starter.

## Stack

React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · Framer Motion 11 · Lenis (dependency retained from starter).
