// Notifies IndexNow (Bing, Yandex, Seznam, Naver — not Google) that the site's
// pages have changed, so they recrawl within hours instead of weeks.
//
// Run after every deploy:  npm run indexnow
//
// The key below is also published at /<key>.txt so IndexNow can verify it.
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HOST = 'bsinnovationsolutions.com'
const KEY = 'fcab5bf549f785510c588b554da41a0c'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const xml = await readFile(join(root, 'public', 'sitemap.xml'), 'utf8')
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

if (!urlList.length) {
  console.error('No URLs found in public/sitemap.xml — run `npm run sitemap` first.')
  process.exit(1)
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
})

console.log(`IndexNow: ${res.status} ${res.statusText} — submitted ${urlList.length} URLs`)
if (res.status !== 200 && res.status !== 202) {
  console.log(await res.text())
  process.exit(1)
}
