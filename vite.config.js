import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Sanity blog API only allows whitelisted browser origins (asymmetry.ge +
// localhost). When previewing the dev server from a phone over the LAN the
// origin is an IP, so the browser fetch is CORS-blocked. In dev we route the
// Sanity query through the dev server itself (server-side → no browser CORS),
// so the blog loads from any device. Production is untouched (see sanity/client).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Every icon is bundled up front (iconData.js → addCollection), so use
      // Iconify's OFFLINE component: it renders the <svg> on the very first
      // render. The default one renders an empty <span> until mounted, which
      // never matches the pre-rendered HTML → React discards the hydration.
      { find: /^@iconify\/react$/, replacement: '@iconify/react/dist/offline' },
    ],
  },
  server: {
    host: true, // expose on the LAN so the dev server opens on a phone too
    proxy: {
      '/__sanity': {
        target: 'https://k73axqvx.apicdn.sanity.io',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/__sanity/, ''),
      },
    },
  },
})
