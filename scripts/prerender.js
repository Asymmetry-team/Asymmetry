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

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage()
      await page.goto(`http://localhost:4174${route}`, {
        waitUntil: 'networkidle0',
        timeout: 15000,
      })
      const html = await page.content()
      await page.close()

      const outDir = route === '/' ? DIST : path.join(DIST, route)
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'index.html'), html)
      console.log(`[prerender] ${route} ✓`)
    }
  } finally {
    await browser.close()
    server.httpServer.close()
  }
}

run().catch((err) => {
  console.error('[prerender] failed:', err.message)
  process.exit(1)
})
