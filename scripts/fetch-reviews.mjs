#!/usr/bin/env node
/**
 * Fetches the studio's REAL Google reviews at BUILD TIME and writes them to
 * src/data/googleReviews.json, which Highlights.jsx imports. Because it runs
 * before `vite build`, the reviews get bundled and pre-rendered into the static
 * HTML — so Google and AI assistants read genuine, verifiable reviews (not
 * hand-written text). New reviews appear automatically on every deploy.
 *
 * Requires two Netlify build env vars (Site settings → Environment variables):
 *   GOOGLE_PLACES_API_KEY  — a Google Cloud key with "Places API" enabled
 *   GOOGLE_PLACE_ID        — the studio's Google Place ID
 *
 * Safe to fail: if the key/Place ID is missing or Google errors, it leaves the
 * existing JSON untouched so the build never breaks and the site falls back to
 * its built-in sample reviews.
 *
 * NOTE: the classic Places Details endpoint returns up to 5 reviews — a Google
 * limitation, not ours. That's still real, auto-updating social proof.
 */
import fs from "fs"
import path from "path"

const OUT = path.resolve("src/data/googleReviews.json")
const KEY = process.env.GOOGLE_PLACES_API_KEY
const PLACE_ID = process.env.GOOGLE_PLACE_ID

const firstLetter = (name) => {
  if (!name) return "?"
  // works for Georgian/Latin/Cyrillic — take the first visible character
  return [...name.trim()][0] || "?"
}

async function run() {
  if (!KEY || !PLACE_ID) {
    console.log(
      "[reviews] GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID not set — keeping existing googleReviews.json (site uses fallback reviews)"
    )
    return
  }

  const url =
    "https://maps.googleapis.com/maps/api/place/details/json" +
    `?place_id=${encodeURIComponent(PLACE_ID)}` +
    "&fields=reviews,rating,user_ratings_total" +
    "&reviews_sort=newest" +
    "&language=ka" +
    `&key=${KEY}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    if (data.status !== "OK") {
      console.error(
        `[reviews] Google returned status ${data.status}${
          data.error_message ? " — " + data.error_message : ""
        } — keeping existing file`
      )
      return
    }

    const raw = (data.result && data.result.reviews) || []
    const reviews = raw
      // only reviews that actually have written text are useful as testimonials
      .filter((r) => r.text && r.text.trim().length > 0)
      .map((r) => ({
        text: r.text.trim(),
        name: r.author_name || "Google user",
        role: r.relative_time_description || "Google review",
        initial: firstLetter(r.author_name),
        rating: r.rating || 5,
        time: r.time || 0,
      }))
      // newest first (defensive — the API sort isn't always honoured)
      .sort((a, b) => b.time - a.time)

    fs.writeFileSync(OUT, JSON.stringify(reviews, null, 2) + "\n")
    console.log(
      `[reviews] wrote ${reviews.length} real Google review(s) → ${path.relative(
        process.cwd(),
        OUT
      )} (rating ${data.result.rating}, ${data.result.user_ratings_total} total)`
    )
  } catch (e) {
    console.error("[reviews] fetch failed — keeping existing file:", e.message)
  }
}

run()
