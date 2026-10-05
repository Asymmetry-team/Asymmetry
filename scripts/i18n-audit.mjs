#!/usr/bin/env node
// EN/GE translation audit for asymmetry.ge (see I18N-PLAN.md).
//
//   node scripts/i18n-audit.mjs                 → audit EVERY route in English
//   node scripts/i18n-audit.mjs /services /     → only routes starting with these
//   node scripts/i18n-audit.mjs --ka-baseline   → save the Georgian snapshot
//   node scripts/i18n-audit.mjs --ka-diff       → Georgian must equal the snapshot
//
// Run after `npm run build`. Serves dist/ itself (Netlify-like: folders →
// index.html, everything else → spa.html), opens each page with ?lang=en at
// desktop (1440) and phone (375) width, opens menus/accordions/modals, then
// collects EVERY text node in the DOM (hidden ones too — a closed accordion
// still has to be translated) plus alt / aria-label / placeholder / title,
// <title> and meta description. Anything containing Georgian letters is a miss.
import http from "http"
import fs from "fs"
import path from "path"
import puppeteer from "puppeteer"

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..")
const DIST = path.join(ROOT, "dist")
const OUT_DIR = path.join(ROOT, ".i18n")
const PORT = 5181
const GEO = /[Ⴀ-ჿᲐ-Ჿ]/

const args = process.argv.slice(2)
const MODE = args.includes("--ka-baseline") ? "ka-baseline" : args.includes("--ka-diff") ? "ka-diff" : "en"
const FILTERS = args.filter((a) => !a.startsWith("--"))

// ---------- tiny Netlify-like static server ----------
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".mp4": "video/mp4", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain", ".ico": "image/x-icon" }
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0])
  let p = path.join(DIST, url)
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
    if (!url.endsWith("/")) { res.writeHead(301, { Location: url + "/" }); return res.end() }
    p = path.join(p, "index.html")
  }
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(DIST, "spa.html")
  res.writeHead(200, { "Content-Type": TYPES[path.extname(p).toLowerCase()] || "application/octet-stream" })
  fs.createReadStream(p).pipe(res)
})

// ---------- routes: every pre-rendered page + project pages + a 404 ----------
function listRoutes() {
  const out = []
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name === "index.html") {
        const rel = "/" + path.relative(DIST, path.dirname(p)).split(path.sep).join("/")
        out.push(rel === "/" ? "/" : rel + "/")
      }
    }
  }
  walk(DIST)
  return out.sort()
}

// what we harvest inside the page (EN or KA)
const harvest = () => {
  const items = []
  const describe = (el) => {
    if (!el || el.nodeType !== 1) return ""
    const cls = (el.getAttribute("class") || "").trim().split(/\s+/).slice(0, 2).join(".")
    return el.tagName.toLowerCase() + (cls ? "." + cls : "")
  }
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  while (w.nextNode()) {
    const n = w.currentNode
    const par = n.parentElement
    if (!par || ["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"].includes(par.tagName)) continue
    const t = n.nodeValue.replace(/\s+/g, " ").trim()
    if (t) items.push({ where: describe(par), text: t })
  }
  for (const el of document.querySelectorAll("[alt],[aria-label],[placeholder],[title]")) {
    for (const a of ["alt", "aria-label", "placeholder", "title"]) {
      const v = el.getAttribute(a)
      if (v && v.trim()) items.push({ where: describe(el) + "@" + a, text: v.trim() })
    }
  }
  items.push({ where: "<title>", text: document.title })
  const md = document.querySelector('meta[name="description"]')
  if (md) items.push({ where: "meta[description]", text: md.getAttribute("content") || "" })
  return items
}

// open everything that renders more text when opened
async function expandAll(page) {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    // accordions / FAQ / SEO blocks
    for (const b of document.querySelectorAll('[aria-expanded="false"]')) {
      try { b.click() } catch {}
    }
    await sleep(150)
    // mobile menu toggle (hamburger)
    const tog = document.querySelector(".toggle button, .toggle")
    if (tog) { try { tog.click() } catch {} }
    await sleep(150)
    // contact chooser + price bubble (rendered only when open)
    window.dispatchEvent(new CustomEvent("asymmetry:contact", { detail: { text: "x" } }))
    await sleep(150)
    for (const b of document.querySelectorAll(".price-bubble button, .price-fab, [class*=price-bubble] button")) {
      try { b.click() } catch {}
    }
    await sleep(250)
  })
}

async function auditRoute(browser, route, width, lang) {
  const page = await browser.newPage()
  await page.setViewport({ width, height: 900 })
  const errors = []
  page.on("pageerror", (e) => errors.push(String(e.message || e).slice(0, 160)))
  const url = `http://localhost:${PORT}${route}${lang ? `?lang=${lang}` : ""}`
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 })
  await page.waitForSelector("#root > *", { timeout: 20000 })
  if (lang === "en") {
    await page.waitForFunction(() => document.documentElement.getAttribute("lang") === "en", { timeout: 10000 }).catch(() => {})
  }
  await new Promise((r) => setTimeout(r, 1200))
  if (lang === "en") await expandAll(page)
  const items = await page.evaluate(harvest)
  await page.close()
  return { items, errors }
}

async function run() {
  if (!fs.existsSync(path.join(DIST, "spa.html"))) {
    console.error("dist/ not built — run `npm run build` first"); process.exit(1)
  }
  await new Promise((r) => server.listen(PORT, r))
  fs.mkdirSync(OUT_DIR, { recursive: true })

  let routes = listRoutes()
  // project detail pages (client-rendered) + a 404
  routes.push("/projects/16", "/this-page-does-not-exist")
  if (FILTERS.length) routes = routes.filter((r) => FILTERS.some((f) => r === f || r.startsWith(f.endsWith("/") ? f : f + "/") || r === f + "/"))

  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-dev-shm-usage"] })
  const widths = [1440, 375]
  const report = {}
  let totalMisses = 0
  const kaSnap = {}
  const errorsAll = {}

  const queue = []
  for (const r of routes) for (const w of widths) queue.push([r, w])
  const workers = Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const [route, w] = queue.shift()
      try {
        if (MODE === "en") {
          const { items, errors } = await auditRoute(browser, route, w, "en")
          const misses = items.filter((i) => GEO.test(i.text))
          const key = `${route} @${w}`
          const uniq = new Map()
          for (const m of misses) uniq.set(m.where + " | " + m.text, m)
          report[key] = [...uniq.values()]
          totalMisses += uniq.size
          if (errors.length) errorsAll[key] = errors
        } else {
          const { items } = await auditRoute(browser, route, w, "ka")
          kaSnap[`${route} @${w}`] = items.map((i) => i.where + " | " + i.text).join("\n")
        }
      } catch (e) {
        errorsAll[`${route} @${w}`] = ["AUDIT FAILED: " + e.message]
      }
    }
  })
  await Promise.all(workers)
  await browser.close()
  server.close()

  if (MODE === "en") {
    const file = path.join(OUT_DIR, "en-report.json")
    fs.writeFileSync(file, JSON.stringify({ when: new Date().toISOString(), totalMisses, report, errors: errorsAll }, null, 1))
    const keys = Object.keys(report).sort()
    for (const k of keys) {
      const n = report[k].length
      console.log(`${n === 0 ? "✓" : "✗"} ${k.padEnd(62)} ${n} Georgian fragment(s)`)
    }
    // per-text summary (deduped across routes) — the actual to-do list
    const byText = new Map()
    for (const k of keys) for (const m of report[k]) {
      const t = m.text.slice(0, 120)
      if (!byText.has(t)) byText.set(t, { where: m.where, routes: new Set() })
      byText.get(t).routes.add(k.split(" @")[0])
    }
    console.log(`\nUNIQUE untranslated strings: ${byText.size}  (full report: ${path.relative(ROOT, file)})`)
    if (args.includes("--list")) {
      for (const [t, v] of byText) console.log(`  - [${v.where}] ${t}   ← ${[...v.routes].slice(0, 3).join(", ")}${v.routes.size > 3 ? " …" : ""}`)
    }
    if (Object.keys(errorsAll).length) console.log("\nPAGE ERRORS:", JSON.stringify(errorsAll, null, 1))
    console.log(`\nTOTAL: ${totalMisses} Georgian fragment(s) across ${keys.length} page/width combos`)
  } else if (MODE === "ka-baseline") {
    fs.writeFileSync(path.join(OUT_DIR, "ka-baseline.json"), JSON.stringify(kaSnap, null, 1))
    console.log(`Georgian baseline saved for ${Object.keys(kaSnap).length} page/width combos → .i18n/ka-baseline.json`)
  } else {
    const basePath = path.join(OUT_DIR, "ka-baseline.json")
    if (!fs.existsSync(basePath)) { console.error("no baseline — run with --ka-baseline first"); process.exit(1) }
    const base = JSON.parse(fs.readFileSync(basePath, "utf8"))
    let changed = 0
    for (const k of Object.keys(kaSnap).sort()) {
      if (!(k in base)) { console.log(`? ${k} (not in baseline)`); continue }
      if (base[k] !== kaSnap[k]) {
        changed++
        const a = new Set(base[k].split("\n")), b = new Set(kaSnap[k].split("\n"))
        const gone = [...a].filter((x) => !b.has(x)).slice(0, 5)
        const added = [...b].filter((x) => !a.has(x)).slice(0, 5)
        console.log(`✗ ${k}\n   - ${gone.join("\n   - ")}\n   + ${added.join("\n   + ")}`)
      }
    }
    console.log(changed ? `\nGeorgian CHANGED on ${changed} page/width combo(s)` : `✓ Georgian identical to baseline on all ${Object.keys(kaSnap).length} combos`)
    if (Object.keys(errorsAll).length) console.log("\nERRORS:", JSON.stringify(errorsAll, null, 1))
  }
}

run().catch((e) => { console.error(e); server.close(); process.exit(1) })
