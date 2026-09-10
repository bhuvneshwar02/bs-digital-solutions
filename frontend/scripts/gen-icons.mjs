// Generates the raster favicons / app icons from a single source SVG.
// Run: node scripts/gen-icons.mjs   (sharp is a devDependency)
import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

// "BS" drawn as vector paths so it renders identically everywhere, with no
// dependency on a system font being present in the rasteriser.
const NAVY = '#12172B'
const PAPER = '#F5F6F0'
const MARIGOLD = '#F2A93B'

// 512x512 master. Rounded square, bold "BS", accent dot top-right.
const master = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="${NAVY}"/>
  <text x="256" y="258" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="248"
        letter-spacing="-8" fill="${PAPER}">BS</text>
  <circle cx="398" cy="118" r="46" fill="${MARIGOLD}"/>
</svg>`

// Fallback master with the letters as outlines (used if the text above does
// not rasterise). We render both and keep whichever has more ink.
const masterPaths = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="${NAVY}"/>
  <g fill="${PAPER}">
    <path d="M104 132h96c44 0 74 24 74 62 0 26-14 44-36 52 28 6 46 27 46 58 0 42-32 68-82 68h-98zm44 38v72h48c24 0 38-14 38-36s-14-36-38-36zm0 108v76h50c26 0 42-14 42-38s-16-38-42-38z"/>
    <path d="M304 300h44c1 26 20 42 52 42 30 0 48-14 48-34 0-22-18-30-52-38-46-10-84-24-84-72 0-42 34-70 86-70 54 0 88 28 90 74h-44c-2-24-19-38-46-38-26 0-42 13-42 32 0 22 19 29 52 37 47 11 84 25 84 73 0 44-36 72-92 72-58 0-90-30-92-80z"/>
  </g>
  <circle cx="398" cy="118" r="46" fill="${MARIGOLD}"/>
</svg>`

async function ink(svg) {
  const { data } = await sharp(Buffer.from(svg)).resize(64, 64).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  let sum = 0
  for (let i = 0; i < data.length; i += 4) if (data[i] > 200 && data[i + 3] > 128) sum++ // near-white pixels
  return sum
}

const src = (await ink(master)) > 200 ? master : masterPaths
console.log(src === master ? 'using <text> master' : 'using outlined-path master')

const png = (size) => sharp(Buffer.from(src)).resize(size, size).png({ compressionLevel: 9 }).toBuffer()

await writeFile(join(pub, 'favicon.svg'), src.replace(' width="512" height="512"', ''))
await writeFile(join(pub, 'favicon-96x96.png'), await png(96))
await writeFile(join(pub, 'favicon-192x192.png'), await png(192))
await writeFile(join(pub, 'favicon-512x512.png'), await png(512))
await writeFile(join(pub, 'apple-touch-icon.png'), await png(180))

// Minimal ICO wrapping a 32x32 and 16x16 PNG (PNG-in-ICO is valid since Vista).
function ico(entries) {
  const head = Buffer.alloc(6 + entries.length * 16)
  head.writeUInt16LE(0, 0)
  head.writeUInt16LE(1, 2)
  head.writeUInt16LE(entries.length, 4)
  let offset = head.length
  const body = []
  entries.forEach((buf, i) => {
    const b = 6 + i * 16
    const dim = i === 0 ? 32 : 16
    head.writeUInt8(dim % 256, b)
    head.writeUInt8(dim % 256, b + 1)
    head.writeUInt8(0, b + 2)
    head.writeUInt8(0, b + 3)
    head.writeUInt16LE(1, b + 4)
    head.writeUInt16LE(32, b + 6)
    head.writeUInt32LE(buf.length, b + 8)
    head.writeUInt32LE(offset, b + 12)
    offset += buf.length
    body.push(buf)
  })
  return Buffer.concat([head, ...body])
}
await writeFile(join(pub, 'favicon.ico'), ico([await png(32), await png(16)]))

console.log('icons written to public/')
