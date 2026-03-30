# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

Note: scripts in package.json reference `psychosite/node_modules/.bin/vite` (hardcoded path from repo restructuring). If vite isn't found, run `npm install` first.

## Architecture

This is a single-page personal website for a psychologist (Ukrainian language), built with React 19 + Vite and deployed on Vercel.

**Two routes** (react-router-dom, BrowserRouter):
- `/` — public landing page (`App.jsx`) with sections: loader animation, hero, about, products, TV projects, stats, consultation CTA, footer
- `/admin` — client-side admin panel (`Admin.jsx`) for editing all site text and images

**Content system** (`src/content.js`):
- All site text lives in a `defaults` object, organized by section (nav, hero, about, products, tv, stats, consultation, footer)
- Content is persisted to `localStorage` — the admin panel edits these values, and the public page reads them with fallback to defaults
- Images work the same way: defaults point to `/mainimg.JPG` and `/secondimg.JPG` in `public/`, admin can upload replacements stored as base64 data URLs in localStorage

**Admin panel** (`src/Admin.jsx`):
- Hardcoded credentials (`admin` / `admin123`), auth stored in `sessionStorage`
- Sidebar navigation maps to content sections; each section's fields are rendered dynamically from the content object

**Key patterns:**
- `useReveal()` hook + `<Reveal>` component — IntersectionObserver-based scroll animations
- `<Counter>` — animated number counter triggered on scroll
- `<Loader>` — intro animation (count to 100, then type name)
- No backend, no API calls — everything is client-side localStorage
