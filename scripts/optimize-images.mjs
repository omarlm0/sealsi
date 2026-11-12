import sharp from 'sharp'
import fs from 'node:fs'

/**
 * Generates the responsive WebP variants and the Open Graph card.
 *
 * Sources:
 * - assets-src/products/sealsi-oceanic-packshot.png (master packshot, not deployed)
 * - assets-src/products/oceanic-hero.png (master hero scene, not deployed)
 * - public/assets/sealsi-oceanic-signature.webp (delivered handoff asset)
 *
 * The delivered WebP files in public/assets remain valid fallbacks.
 */

const outputs = []

async function convert(src, out, width) {
  await sharp(src).resize({ width }).webp({ quality: 84, effort: 5 }).toFile(out)
  outputs.push([out, fs.statSync(out).size])
}

const packshot = 'assets-src/products/sealsi-oceanic-packshot.png'
const hero = 'assets-src/products/oceanic-hero.png'

if (!fs.existsSync(packshot)) {
  throw new Error(`Master packshot missing: ${packshot}`)
}

if (!fs.existsSync(hero)) {
  throw new Error(`Master hero missing: ${hero}`)
}

for (const width of [320, 480, 640]) {
  await convert(
    packshot,
    `public/assets/sealsi-oceanic-packshot-${width}.webp`,
    width,
  )
}

const signature = 'public/assets/sealsi-oceanic-signature.webp'

for (const width of [700, 1000]) {
  await convert(
    signature,
    `public/assets/sealsi-oceanic-signature-${width}.webp`,
    width,
  )
}

/**
 * Responsive hero variants for both languages. The full-size 1672 px WebP
 * stays the `1672w` candidate; the inline head script in index.html preloads
 * the variant that matches the URL.
 */
const heroAr = 'assets-src/products/oceanic-hero-ar.png'

if (!fs.existsSync(heroAr)) {
  throw new Error(`Arabic master hero missing: ${heroAr}`)
}

for (const width of [640, 960, 1280]) {
  await convert(hero, `public/assets/oceanic-hero-${width}.webp`, width)
  await convert(heroAr, `public/assets/oceanic-hero-ar-${width}.webp`, width)
}

/**
 * 1200 × 630 Open Graph card. The hero scene already reserves its left half
 * for readable text, so the card keeps the real product scene instead of a
 * synthetic mockup. A left gradient guarantees text contrast.
 */
async function buildOpenGraphCard() {
  const width = 1200
  const height = 630
  const scene = await sharp(hero)
    .resize({ width, height, fit: 'cover', position: 'centre' })
    .toBuffer()

  const text = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="veil" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#04152f" stop-opacity="0.96" />
          <stop offset="0.34" stop-color="#04152f" stop-opacity="0.88" />
          <stop offset="0.6" stop-color="#04152f" stop-opacity="0.3" />
          <stop offset="0.8" stop-color="#04152f" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#veil)" />
      <text x="80" y="128" fill="#70dfef" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="6">SEALSI / OCEANIC SCENT</text>
      <text x="80" y="248" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="700" letter-spacing="-2">Le propre.</text>
      <text x="80" y="332" fill="#d7f8fe" font-family="Segoe UI, Arial, sans-serif" font-size="66" font-weight="500" letter-spacing="-2">Une vague</text>
      <text x="80" y="408" fill="#d7f8fe" font-family="Segoe UI, Arial, sans-serif" font-size="66" font-weight="500" letter-spacing="-2">de fraîcheur.</text>
      <rect x="80" y="446" width="70" height="3" fill="#d6b15d" />
      <text x="80" y="500" fill="#c9d8ea" font-family="Segoe UI, Arial, sans-serif" font-size="26">Lessive liquide 5 L — 3 bouteilles par carton</text>
      <text x="80" y="544" fill="#9db3cc" font-family="Segoe UI, Arial, sans-serif" font-size="22">1 carton = 15 litres · Tarif sur confirmation</text>
    </svg>
  `)

  const out = 'public/assets/sealsi-og.jpg'
  await sharp(scene)
    .composite([{ input: text }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out)
  outputs.push([out, fs.statSync(out).size])
}

await buildOpenGraphCard()

for (const [file, size] of outputs) {
  console.log(file, `${(size / 1024).toFixed(1)} kB`)
}
