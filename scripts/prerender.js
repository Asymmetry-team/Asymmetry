#!/usr/bin/env node
// Prerenders each route using Vite's preview server + puppeteer.
// Run after `vite build`. Writes dist/<route>/index.html for each route.
// Safe to fail: a non-zero exit is caught by the "|| echo" in postbuild.

import { preview } from 'vite'
import puppeteer from 'puppeteer'
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const STATIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/blog',
  '/contact',
  '/privacy-policy',
  '/return-policy',
  '/terms',
]

const DIST = path.resolve('dist')

// Fetch every published blog slug from Sanity (Node → no CORS) so each post
// gets its own pre-rendered page. A Sanity hiccup must never break the build.
async function blogRoutes() {
  try {
    const sanity = createClient({
      projectId: 'k73axqvx',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    })
    const slugs = await sanity.fetch(
      `*[_type == "post" && defined(slug.current)].slug.current`
    )
    const routes = (slugs || []).map((s) => `/blog/${s}`)
    console.log(`[prerender] ${routes.length} blog post(s) from Sanity`)
    return routes
  } catch (e) {
    console.error('[prerender] could not fetch blog slugs:', e.message)
    return []
  }
}

async function run() {
  const ROUTES = [...STATIC_ROUTES, ...(await blogRoutes())]

  // Vite preview serves dist/ with correct MIME types — required for ESM scripts
  const server = await preview({
    preview: { port: 4174, strictPort: true, open: false },
  })

  // `--disable-dev-shm-usage` is critical on Netlify/CI: the container's
  // /dev/shm is tiny, so Chrome exhausts it and CRASHES after the first page —
  // which is why home pre-rendered but every sub-page shipped an empty #root.
  const launchArgs = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
  ]
  const launch = () => puppeteer.launch({ args: launchArgs })
  let browser = await launch()

  let ok = 0
  try {
    for (const route of ROUTES) {
      // one route failing must not abort the rest
      try {
        // if the browser died on a previous route, bring it back up
        if (!browser.connected) browser = await launch()
        const page = await browser.newPage()
        // Mark the crawl as "ReactSnap" so scroll-triggered animations
        // (CountUp, project-card reveal) stay in their initial state during
        // pre-render and match the client's first render — no hydration mismatch.
        await page.setUserAgent('ReactSnap')
        // NOTE: do NOT wait for networkidle — a slow/hanging third-party
        // request (e.g. the Cormorant font on sub-pages) would time the whole
        // route out and ship an empty #root. domcontentloaded + waiting for
        // React to render is enough; fonts/icons don't change the HTML content.
        await page.goto(`http://localhost:4174${route}`, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        })
        // wait until React has actually rendered content into #root
        await page.waitForSelector('#root > *', { timeout: 20000 })
        // blog pages fetch their content from Sanity async — wait for the
        // "ready" marker the page renders once the fetch resolves, so the
        // post's real content is captured in the static HTML (SEO)
        if (route.startsWith('/blog')) {
          await page
            .waitForSelector('[data-blog-ready]', { timeout: 15000 })
            .catch(() => {})
        }
        await new Promise((r) => setTimeout(r, 400))
        const html = await page.content()
        await page.close()

        const outDir = route === '/' ? DIST : path.join(DIST, route)
        fs.mkdirSync(outDir, { recursive: true })
        fs.writeFileSync(path.join(outDir, 'index.html'), html)
        console.log(`[prerender] ${route} ✓`)
        ok++
      } catch (e) {
        console.error(`[prerender] ${route} FAILED: ${e.message}`)
      }
    }
    console.log(`[prerender] ${ok}/${ROUTES.length} routes pre-rendered`)
  } finally {
    await browser.close()
    server.httpServer.close()
  }
}

run().catch((err) => {
  console.error('[prerender] failed:', err.message)
  process.exit(1)
})
