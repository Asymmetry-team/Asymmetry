#!/usr/bin/env node
// One-off asset optimizer: down-scales oversized photos and re-encodes them,
// KEEPING the same extension/format so no source references need to change.
// Run manually (not part of the build); the smaller files are committed.
//   node scripts/optimize-images.mjs [dir]
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(process.argv[2] || 'public/images')
const MAX_W = 1920 // gallery/hero never render wider than this
const MIN_BYTES = 120 * 1024 // skip already-light files
const exts = new Set(['.jpg', '.jpeg', '.png'])

let before = 0
let after = 0
let touched = 0

function walk(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (exts.has(path.extname(e.name).toLowerCase())) out.push(p)
  }
  return out
}

async function optimize(file) {
  const orig = fs.statSync(file).size
  if (orig < MIN_BYTES) return
  const ext = path.extname(file).toLowerCase()
  const img = sharp(file, { failOn: 'none' })
  const meta = await img.metadata()
  let pipe = img.rotate() // respect EXIF orientation
  if (meta.width && meta.width > MAX_W) pipe = pipe.resize({ width: MAX_W })
  if (ext === '.png') {
    pipe = pipe.png({ compressionLevel: 9, quality: 78, effort: 8, palette: true })
  } else {
    pipe = pipe.jpeg({ quality: 80, mozjpeg: true })
  }
  const buf = await pipe.toBuffer()
  before += orig
  if (buf.length < orig) {
    fs.writeFileSync(file, buf)
    after += buf.length
    touched++
    console.log(
      `  ${(orig / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB  ${path.relative(ROOT, file)}`
    )
  } else {
    after += orig // no gain, keep original
  }
}

const files = walk(ROOT)
console.log(`[optimize] scanning ${files.length} images in ${ROOT}`)
for (const f of files) {
  try {
    await optimize(f)
  } catch (e) {
    console.error(`  FAILED ${f}: ${e.message}`)
  }
}
console.log(
  `[optimize] done — ${touched} files, ${(before / 1048576).toFixed(1)}MB → ${(after / 1048576).toFixed(1)}MB`
)
