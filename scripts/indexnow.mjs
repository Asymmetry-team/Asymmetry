// Ping IndexNow (Bing, Yandex, Seznam…; Bing feeds ChatGPT search) with every
// URL in the live sitemap. Run AFTER a deploy is live — the engines fetch
// https://asymmetry.ge/<key>.txt to check ownership:
//   node scripts/indexnow.mjs
const KEY = '4fc8e9005d75ac18aef13842979d3d56'
const HOST = 'asymmetry.ge'

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})
console.log(`[indexnow] ${urlList.length} URLs → HTTP ${res.status}`)
