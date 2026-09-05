#!/usr/bin/env node
/**
 * Fetches the studio's REAL Google reviews at BUILD TIME and writes them to
 * src/data/googleReviews.json, which Highlights.jsx imports. Because it runs
 * before `vite build`, the reviews get bundled and pre-rendered into the static
 * HTML — so Google and AI assistants read genuine, verifiable reviews (not
 * hand-written text). New reviews appear automatically on every deploy.
 *
 * Two sources, tried in priority order:
 *   1. FEATURABLE  — a free service that mirrors ALL of a business's Google
 *      reviews and exposes them as a public JSON feed (no API key / billing on
 *      our side, and NO 5-review cap). Set ONE of:
 *        FEATURABLE_WIDGET_ID   — the widget id from featurable.com
 *        FEATURABLE_FEED_URL    — the full feed URL (overrides the id)
 *   2. GOOGLE PLACES API — official, but capped at 5 reviews. Set:
 *        GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID
 *
 * Safe to fail: if nothing is configured or a request errors, it leaves the
 * existing JSON untouched (the 9 hand-transcribed real reviews) so the build
 * never breaks and the site keeps showing genuine reviews.
 */
import fs from "fs"
import path from "path"

const OUT = path.resolve("src/data/googleReviews.json")

const FEATURABLE_WIDGET_ID = process.env.FEATURABLE_WIDGET_ID
const FEATURABLE_FEED_URL = process.env.FEATURABLE_FEED_URL
const GOOGLE_KEY = process.env.GOOGLE_PLACES_API_KEY
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID

const firstLetter = (name) => (name ? [...name.trim()][0] || "?" : "?")

// star ratings can arrive as a number (5) or Google's enum string ("FIVE")
const STAR_WORDS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }
const toStars = (v) => {
  if (typeof v === "number") return v
  if (typeof v === "string" && STAR_WORDS[v.toUpperCase()]) return STAR_WORDS[v.toUpperCase()]
  const n = parseInt(v, 10)
  return Number.isFinite(n) && n >= 1 && n <= 5 ? n : 5
}

// turn an ISO date into a rough Georgian "N თვის/კვირის წინ" label
const relTime = (iso) => {
  if (!iso) return "Google"
  const then = new Date(iso).getTime()
  if (!then) return "Google"
  const days = Math.max(0, Math.round((Date.now() - then) / 86400000))
  if (days < 7) return "ამ კვირაში · Google"
  if (days < 30) return `${Math.round(days / 7)} კვირის წინ · Google`
  if (days < 365) return `${Math.round(days / 30)} თვის წინ · Google`
  return `${Math.round(days / 365)} წლის წინ · Google`
}

// normalise any provider's review object to our card shape
const normalise = (r) => {
  const name =
    (r.reviewer && r.reviewer.displayName) ||
    r.author_name ||
    r.name ||
    r.author ||
    "Google user"
  const text = (r.comment || r.text || r.review || "").trim()
  const iso = r.createTime || r.updateTime || r.time || r.date
  return {
    text,
    name,
    role: relTime(iso),
    initial: firstLetter(name),
    rating: toStars(r.starRating != null ? r.starRating : r.rating),
    time: iso ? new Date(iso).getTime() : 0,
  }
}

async function fetchFeaturable() {
  const url =
    FEATURABLE_FEED_URL ||
    (FEATURABLE_WIDGET_ID
      ? `https://featurable.com/api/v1/widgets/${encodeURIComponent(FEATURABLE_WIDGET_ID)}`
      : null)
  if (!url) return null
  const res = await fetch(url, { headers: { accept: "application/json" } })
  if (!res.ok) throw new Error(`Featurable HTTP ${res.status}`)
  const data = await res.json()
  // the feed may nest the array under a few possible keys
  const arr = data.reviews || data.data || (Array.isArray(data) ? data : [])
  return arr
}

async function fetchGooglePlaces() {
  if (!GOOGLE_KEY || !GOOGLE_PLACE_ID) return null
  const url =
    "https://maps.googleapis.com/maps/api/place/details/json" +
    `?place_id=${encodeURIComponent(GOOGLE_PLACE_ID)}` +
    "&fields=reviews,rating,user_ratings_total&reviews_sort=newest&language=ka" +
    `&key=${GOOGLE_KEY}`
  const res = await fetch(url)
  const data = await res.json()
  if (data.status !== "OK") throw new Error(`Google status ${data.status}`)
  return (data.result && data.result.reviews) || []
}

async function run() {
  const source = FEATURABLE_WIDGET_ID || FEATURABLE_FEED_URL
    ? "Featurable"
    : GOOGLE_KEY && GOOGLE_PLACE_ID
      ? "Google Places API"
      : null

  if (!source) {
    console.log(
      "[reviews] no FEATURABLE_WIDGET_ID / GOOGLE_PLACES_API_KEY set — keeping existing googleReviews.json (the 9 real seeded reviews)"
    )
    return
  }

  try {
    const raw =
      source === "Featurable" ? await fetchFeaturable() : await fetchGooglePlaces()
    const reviews = (raw || [])
      .map(normalise)
      .filter((r) => r.text && r.text.length > 0)
      .sort((a, b) => b.time - a.time)

    if (!reviews.length) {
      console.error(
        `[reviews] ${source} returned no text reviews — keeping existing file`
      )
      return
    }
    fs.writeFileSync(OUT, JSON.stringify(reviews, null, 2) + "\n")
    console.log(`[reviews] wrote ${reviews.length} review(s) from ${source} → ${path.relative(process.cwd(), OUT)}`)
  } catch (e) {
    console.error(`[reviews] ${source} fetch failed — keeping existing file:`, e.message)
  }
}

run()
