#!/usr/bin/env node
// Generates dist/sitemap.xml at build time — static routes + locally-authored
// blog posts. All URLs are trailing-slash (canonical), matching how Netlify
// serves the pre-rendered pages. Safe to fail: if the whole thing throws, the
// existing dist/sitemap.xml (copied from public/) is left untouched.

import fs from 'fs'
import path from 'path'
import { localPosts } from '../src/data/localPosts.js'

const SITE = 'https://asymmetry.ge'
const DIST = path.resolve('dist')
const today = new Date().toISOString().slice(0, 10)

// [path (no leading slash, no trailing slash — '' = home), priority, changefreq]
const STATIC = [
  // priority order: 1) architecture service page, 2) home, 3) the rest
  ['services/arqiteqturuli-momsakhureba', '1.0', 'weekly'],
  ['', '0.9', 'weekly'],
  ['about', '0.8', 'monthly'],
  ['services', '0.8', 'monthly'],
  ['services/kerdzo-sakhlis-proeqtireba', '0.8', 'monthly'],
  ['services/korpusis-proeqtireba', '0.8', 'monthly'],
  ['services/1-klasis-shenobis-proeqtireba', '0.8', 'monthly'],
  ['services/konstruqciuli-momsakhureba', '0.8', 'monthly'],
  ['services/geologiuri-momsakhureba', '0.8', 'monthly'],
  ['services/sagzao-skhemebi', '0.7', 'monthly'],
  ['services/geodeziuri-samushaoebi', '0.7', 'monthly'],
  ['services/fasadis-daproeqteba', '0.8', 'monthly'],
  ['services/kotejis-agarakis-proeqti', '0.8', 'monthly'],
  ['services/interieris-dizaini', '0.8', 'monthly'],
  ['process/konsultacia', '0.6', 'monthly'],
  ['process/koncefcia', '0.6', 'monthly'],
  ['process/samushao-proeqti', '0.6', 'monthly'],
  ['process/avtoris-zedamxedveloba', '0.6', 'monthly'],
  ['projects', '0.8', 'monthly'],
  ['blog', '0.6', 'weekly'],
  ['content', '0.6', 'weekly'],
  ['contact', '0.7', 'yearly'],
]

// canonical loc: home is "/", everything else gets a trailing slash
const loc = (p) => (p === '' ? `${SITE}/` : `${SITE}/${p}/`)

const xml = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// images: [{ src, title }] → <image:image> entries, so Google Images can find
// the project renders and blog photos
function urlEntry({ href, lastmod, priority, changefreq, images = [] }) {
  return (
    `  <url>\n` +
    `    <loc>${href}</loc>\n` +
    images
      .map(
        (im) =>
          `    <image:image>\n      <image:loc>${xml(SITE + im.src)}</image:loc>\n` +
          (im.title ? `      <image:title>${xml(im.title)}</image:title>\n` : '') +
          `    </image:image>\n`
      )
      .join('') +
    (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
    (changefreq ? `    <changefreq>${changefreq}</changefreq>\n` : '') +
    (priority ? `    <priority>${priority}</priority>\n` : '') +
    `  </url>`
  )
}

async function run() {
  const entries = []

  for (const [p, priority, changefreq] of STATIC) {
    entries.push(
      urlEntry({
        href: loc(p),
        // the two top-priority pages always carry a fresh lastmod
        lastmod: p === '' || p === 'services/arqiteqturuli-momsakhureba' ? today : undefined,
        priority,
        changefreq,
      })
    )
  }

  // locally-authored posts
  for (const post of localPosts) {
    entries.push(
      urlEntry({
        href: loc(`blog/${post.slug}`),
        images: post.img && post.img.startsWith('/') ? [{ src: post.img, title: post.title }] : [],
        lastmod: (post.publishedAt || '').slice(0, 10) || undefined,
        priority: '0.7',
        changefreq: 'monthly',
      })
    )
  }

  // Local (non-Sanity) projects live in src/components/data/Data.jsx, which
  // node can't import (JSX + JSON import) — read id, name and images straight from the source.
  function localProjects() {
    const src = fs.readFileSync(path.resolve('src/components/data/Data.jsx'), 'utf8')
    const start = src.indexOf('const localProjects = [')
    if (start < 0) return []
    const end = src.slice(start).search(/\r?\n\];/)
    const block = src.slice(start, start + end)
    return block
      .split(/^ {2}\{\s*$/m)
      .map((chunk) => ({
        id: (chunk.match(/^ {4}id: (\d+),/m) || [])[1],
        name: (chunk.match(/^ {4}name: "([^"]+)"/m) || [])[1],
        images: [...chunk.matchAll(/"(\/images\/[^"]+\.jpg)"/g)].map((m) => m[1]),
      }))
      .filter((pr) => pr.id)
  }
  for (const pr of localProjects()) {
    entries.push(
      urlEntry({
        href: loc(`projects/${pr.id}`),
        priority: '0.6',
        changefreq: 'monthly',
        images: pr.images.map((src, i) => ({ src, title: i ? `${pr.name} — ${i + 1}` : pr.name })),
      })
    )
  }

  // Sanity-managed project pages
  try {
    const projects = JSON.parse(
      fs.readFileSync(path.resolve('src/data/projects.json'), 'utf8')
    )
    for (const pr of projects) {
      if (!pr || !pr.id) continue
      entries.push(
        urlEntry({
          href: loc(`projects/${pr.id}`),
          lastmod: (pr.publishedAt || '').slice(0, 10) || undefined,
          priority: '0.7',
          changefreq: 'monthly',
        })
      )
    }
  } catch {
    /* no Sanity projects yet — skip */
  }

  // the English copy of every page lives at /en/… (pre-rendered too)
  entries.push(...entries.map((e) => e.replace(`<loc>${SITE}/`, `<loc>${SITE}/en/`)))

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    entries.join('\n') +
    `\n</urlset>\n`

  fs.mkdirSync(DIST, { recursive: true })
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml)
  console.log(`[sitemap] wrote dist/sitemap.xml (${entries.length} urls)`)
}

run().catch((err) => {
  // never fail the build over the sitemap — the static public/sitemap.xml
  // (already copied to dist) stays in place
  console.error('[sitemap] generation failed, keeping static sitemap:', err.message)
})
