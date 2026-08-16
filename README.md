# Asymmetry

## Setup

Requires Node 18+.

```bash
npm install
npm approve-scripts puppeteer   # allows Chromium download (~170 MB, one-time)
npm install                     # re-run after approving
```

## Dev

```bash
npm run dev      # local dev server → http://localhost:5173
```

## Build

```bash
npm run build    # Vite build + pre-renders 9 routes with puppeteer
```

Pre-rendering requires Chromium (installed above). If it fails the build still succeeds — the site falls back to client-side rendering.
