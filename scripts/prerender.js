#!/usr/bin/env node
// Prerenders each route using Vite's preview server + puppeteer.
// Run after `vite build`. Writes dist/<route>/index.html for each route.
// Safe to fail: a non-zero exit is caught by the "|| echo" in postbuild.

import { preview } from 'vite'
import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const ROUTES = [
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

async function run() {
  // Vite preview serves dist/ with correct MIME types — required for ESM scripts
  const server = await preview({
    preview: { port: 4174, strictPort: true, open: false },
  })

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let ok = 0
  try {
    for (const route of ROUTES) {
      // one route failing must not abort the rest
      try {
        const page = await browser.newPage()
        // Mark the crawl as "ReactSnap" so scroll-triggered animations
        // (CountUp, project-card reveal) stay in their initial state during
        // pre-render and match the client's first render — no hydration mismatch.
        await page.setUserAgent('ReactSnap')
        await page.goto(`http://localhost:4174${route}`, {
          waitUntil: 'networkidle2',
          timeout: 30000,
        })
        // wait until React has actually rendered content into #root
        await page.waitForSelector('#root > *', { timeout: 20000 })
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
