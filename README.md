# MentorEx Digital — Cinematic Multi-page Portfolio

React 18 · TypeScript · Vite · Framer Motion · Vercel-ready SPA routing.

## Pages
- `/` Home
- `/reels` — five vertical reel cards with native MP4 playback
- `/projects` — five project showcase cards
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

The matching designed poster slots are:
`public/images/reels/reel-01.svg` through `reel-05.svg`
You can replace these with your own JPG/PNG posters by changing the `poster` paths in `src/App.tsx`.

### Projects
Replace the five website walkthrough MP4 files at:
`public/videos/projects/project-01.mp4` through `project-05.mp4`

Matching designed poster slots:
`public/images/projects/project-01.svg` through `project-05.svg`

Each project card opens a separate URL with its own video player, project summary, and previous/next navigation. Update the project names and descriptions in the `projects` array in `src/App.tsx`.

## WhatsApp
The contact page and floating WhatsApp shortcut use **+91 80912 24491**.

## Hosting
The repository includes `vercel.json` with SPA route rewrites. Import this GitHub repository into Vercel and use the defaults: build command `npm run build`, output directory `dist`.

### Homepage hover showreel
Add your cinematic landscape hero video at:
`public/videos/hero/hero-showreel.mp4`

The homepage hero video starts playing muted only while a visitor hovers over the hero area, then fades out and stops being requested for playback when the pointer leaves. The **WATCH NOW** button opens the Reels page. Use a compressed 16:9 MP4 (H.264), ideally 10–25 seconds and under 15 MB, for a fast cinematic preview.
