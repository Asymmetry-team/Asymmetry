#!/usr/bin/env node
/**
 * Fetches the projects authored in the Sanity Studio at BUILD TIME and writes
 * them to src/data/projects.json, which Data.jsx imports and merges with the
 * local projects. Because it runs BEFORE `vite build`, the projects get bundled
 * and pre-rendered into the static HTML — so Google reads them like any other
 * project (no SEO penalty). New projects appear automatically on the next build.
 *
 * No API key needed: published documents in a public dataset are readable over
 * the public query API.
 *
 * Safe to fail: on any error (offline build, API hiccup) it leaves the existing
 * projects.json untouched, so the build never breaks.
 */
import fs from "fs"
import path from "path"

const PROJECT_ID = process.env.SANITY_PROJECT_ID || "k73axqvx"
const DATASET = process.env.SANITY_DATASET || "production"
const OUT = path.resolve("src/data/projects.json")

// GROQ: newest first; resolve each image asset to its CDN URL so the app can
// use plain <img src> exactly like the local projects.
const QUERY = `*[_type == "project"]|order(publishedAt desc){
  "id": slug.current,
  name,
  desc,
  location,
  price,
  year,
  "images": images[].asset->url,
  publishedAt
}`

// api.sanity.io (not apicdn) → freshest published content at build time.
const URL =
  `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}` +
  `?query=${encodeURIComponent(QUERY)}`

async function run() {
  try {
    const res = await fetch(URL, { headers: { accept: "application/json" } })
    if (!res.ok) throw new Error(`Sanity HTTP ${res.status}`)
    const data = await res.json()
    const projects = (data.result || [])
      // only usable projects: must have a slug (URL) and at least one image
      .filter((p) => p && p.id && Array.isArray(p.images) && p.images.length)
      .map((p) => ({
        id: p.id,
        name: p.name || "",
        desc: p.desc || "",
        location: p.location || "",
        price: p.price || "",
        year: p.year || "",
        images: p.images.filter(Boolean),
        publishedAt: p.publishedAt || null,
      }))

    fs.writeFileSync(OUT, JSON.stringify(projects, null, 2) + "\n")
    console.log(
      `[projects] wrote ${projects.length} project(s) from Sanity → ${path.relative(process.cwd(), OUT)}`
    )
  } catch (e) {
    console.error(
      `[projects] Sanity fetch failed — keeping existing projects.json:`,
      e.message
    )
  }
}

run()
