# MentorEx Digital — Cinematic Multi-page Portfolio

A cinematic, streaming-inspired agency portfolio for MentorEx Digital, built with React, TypeScript, Vite and Framer Motion.

## Experience and pages

- **Opening brand reveal:** a full-screen MentorEx logo/wordmark animation before the site appears.
- **Home:** agency introduction and navigation to the main areas.
- **Reels:** five video placeholders.
- **Projects:** five project placeholders, each opening its own project detail page.
- **Project detail pages:** dedicated page for each project, with a website-demo video area and space for project information.
- **Our Stories:** studio approach and process.
- **Contact:** email enquiry page.

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

## Add your logo

Upload the official MentorEx logo as:

```
public/images/mentorex-logo.png
```

The opening animation and navbar use this path. A wordmark fallback appears until the logo file is added.

## Add your five reels

Upload MP4 videos here:

```
public/videos/reels/reel-1.mp4
public/videos/reels/reel-2.mp4
public/videos/reels/reel-3.mp4
public/videos/reels/reel-4.mp4
public/videos/reels/reel-5.mp4
```

Optional poster thumbnails:

```
public/images/reels/reel-1.jpg
...
public/images/reels/reel-5.jpg
```

## Add your five project demo videos

Each project has its own route:
- `/projects/project-01`
- `/projects/project-02`
- `/projects/project-03`
- `/projects/project-04`
- `/projects/project-05`

Upload each website walkthrough/demo video:

```
public/videos/projects/project-1-demo.mp4
public/videos/projects/project-2-demo.mp4
public/videos/projects/project-3-demo.mp4
public/videos/projects/project-4-demo.mp4
public/videos/projects/project-5-demo.mp4
```

Optional project thumbnails:

```
public/images/projects/project-1.jpg
...
public/images/projects/project-5.jpg
```

Project titles, descriptions and categories are currently generic placeholders in `src/App.tsx`. They can be replaced when you provide the five project names and details.

## Contact and brand details

- Email: `contact@mentorex.in`
- Tagline: `An Educated Choice`

Official social profile links and WhatsApp contact can be added when supplied.

## Stack

React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · Framer Motion 11.
