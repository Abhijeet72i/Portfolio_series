# MentorEx Digital — Cinematic Multi-page Portfolio

React 18 · TypeScript · Vite · Framer Motion · Vercel-ready SPA routing.

## Pages
- `/` Home
- `/reels` — vertical reel cards with hover-to-play MP4 previews
- `/projects` — project showcase cards with hover-to-play MP4 previews
- `/projects/project-01` through `/projects/project-05` — separate project detail pages with website demo video players
- `/stories` Our Stories
- `/contact` Contact, email and WhatsApp

The first visit in a browser session plays a full-screen MentorEx logo reveal before the site appears. The reveal is shown once per session.

## Run locally
```bash
npm install
npm run dev
npm run build
```

## Add your videos
### Reels
Replace the five MP4 files at:
`public/videos/reels/reel-01.mp4` through `reel-05.mp4`


### Projects
Replace the five website walkthrough MP4 files at:
`public/videos/projects/project-01.mp4` through `project-05.mp4`

Each project card previews its video on hover and opens a separate URL with its video player, project summary, and previous/next navigation. Update project names and descriptions in the `projects` array in `src/App.tsx`.

## WhatsApp
The contact page and floating WhatsApp shortcut use **+91 80912 24491**.

## Hosting
The repository includes `vercel.json` with SPA route rewrites. Import this GitHub repository into Vercel and use the defaults: build command `npm run build`, output directory `dist`.

### Homepage hover showreel
Store your cinematic landscape hero video at:
`public/videos/hero/ww1.mp4`

The homepage hero video starts playing muted only while a visitor hovers over the hero area, then fades out and stops being requested for playback when the pointer leaves. The **WATCH NOW** button opens the Reels page. The current hero clip is `ww1.mp4` (1280×720, H.264, about 10 seconds).
