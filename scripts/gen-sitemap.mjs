#!/usr/bin/env node
// Generates dist/sitemap.xml at build time — static routes + locally-authored
// blog posts + every published Sanity blog post. All URLs are trailing-slash
// (canonical), matching how Netlify serves the pre-rendered pages.
// Safe to fail: if Sanity is unreachable we still write the static + local URLs,
// and if the whole thing throws the existing dist/sitemap.xml (copied from
// public/) is left untouched.

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { localPosts } from '../src/data/localPosts.js'

const SITE = 'https://asymmetry.ge'
const DIST = path.resolve('dist')
const today = new Date().toISOString().slice(0, 10)

// [path (no leading slash, no trailing slash — '' = home), priority, changefreq]
const STATIC = [
  ['', '1.0', 'monthly'],
  ['about', '0.8', 'monthly'],
  ['services', '0.9', 'monthly'],
  ['services/arqiteqturuli-momsakhureba', '0.9', 'monthly'],
  ['services/kerdzo-sakhlis-proeqtireba', '0.9', 'monthly'],
  ['services/korpusis-proeqtireba', '0.8', 'monthly'],
  ['services/1-klasis-shenobis-proeqtireba', '0.8', 'monthly'],
  ['services/konstruqciuli-momsakhureba', '0.8', 'monthly'],
  ['services/geologiuri-momsakhureba', '0.8', 'monthly'],
  ['services/sagzao-skhemebi', '0.7', 'monthly'],
  ['services/geodeziuri-samushaoebi', '0.7', 'monthly'],
  ['process/konsultacia', '0.6', 'monthly'],
  ['process/koncefcia', '0.6', 'monthly'],
  ['process/samushao-proeqti', '0.6', 'monthly'],
  ['process/avtoris-zedamxedveloba', '0.6', 'monthly'],
  ['projects', '0.9', 'monthly'],
  ['blog', '0.6', 'weekly'],
  ['content', '0.6', 'weekly'],
  ['contact', '0.7', 'yearly'],
]

// canonical loc: home is "/", everything else gets a trailing slash
const loc = (p) => (p === '' ? `${SITE}/` : `${SITE}/${p}/`)

async function sanityPosts() {
  try {
    const client = createClient({
      projectId: 'k73axqvx',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    })
    const rows = await client.fetch(
      `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, "mod": coalesce(_updatedAt, publishedAt) }`
    )
    console.log(`[sitemap] ${rows.length} Sanity post(s)`)
    return rows
  } catch (e) {
    console.error('[sitemap] Sanity fetch failed, continuing without:', e.message)
    return []
  }
}

function urlEntry({ href, lastmod, priority, changefreq }) {
  return (
    `  <url>\n` +
    `    <loc>${href}</loc>\n` +
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
        lastmod: p === '' ? today : undefined,
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
        lastmod: (post.publishedAt || '').slice(0, 10) || undefined,
        priority: '0.7',
        changefreq: 'monthly',
      })
    )
  }

  // Sanity posts (skip any slug that collides with a local post)
  const localSlugs = new Set(localPosts.map((p) => p.slug))
  for (const row of await sanityPosts()) {
    if (!row.slug || localSlugs.has(row.slug)) continue
    entries.push(
      urlEntry({
        href: loc(`blog/${row.slug}`),
        lastmod: (row.mod || '').slice(0, 10) || undefined,
        priority: '0.7',
        changefreq: 'monthly',
      })
    )
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
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
