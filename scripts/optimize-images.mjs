import sharp from 'sharp'
import fs from 'node:fs'

/**
 * Generates the responsive WebP variants and the Open Graph card.
 *
 * Sources:
 * - assets-src/products/sealsi-oceanic-packshot.png (master packshot, not deployed)
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

if (!fs.existsSync(packshot)) {
  throw new Error(`Master packshot missing: ${packshot}`)
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
 * 1200 × 630 Open Graph card. The packshot is composited over a navy card so
 * social previews use a light, correctly sized JPG instead of the 1.7 MB PNG.
 */
async function buildOpenGraphCard() {
  const width = 1200
  const height = 630
  const bottle = await sharp(packshot)
    .resize({ height: 560, fit: 'inside' })
    .png()
    .toBuffer()
  const bottleMeta = await sharp(bottle).metadata()
  const bottleWidth = bottleMeta.width ?? 280
  const bottleHeight = bottleMeta.height ?? 560
  const bottleLeft = width - bottleWidth - 90
  const bottleTop = height - bottleHeight - 28

  const overlay = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#020e24" />
          <stop offset="1" stop-color="#0750b9" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" />
      <circle cx="1020" cy="90" r="230" fill="#69dff0" opacity="0.08" />
      <circle cx="90" cy="620" r="270" fill="#69dff0" opacity="0.06" />
      <text x="80" y="150" fill="#69dff0" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="6">SEALSI / OCEANIC SCENT</text>
      <text x="80" y="275" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="76" font-weight="700" letter-spacing="-3">Le propre.</text>
      <text x="80" y="360" fill="#d7f8fe" font-family="Georgia, Times New Roman, serif" font-size="76" font-style="italic" letter-spacing="-2">L’esprit léger.</text>
      <rect x="80" y="410" width="70" height="3" fill="#d5ac50" />
      <text x="80" y="474" fill="#c1d0e3" font-family="Segoe UI, Arial, sans-serif" font-size="27">Lessive liquide 5 L — 3 bouteilles par carton</text>
      <text x="80" y="520" fill="#8fa8c7" font-family="Segoe UI, Arial, sans-serif" font-size="23">1 carton = 15 litres · Tarif sur confirmation</text>
    </svg>
  `)

  const out = 'public/assets/sealsi-og.jpg'
  await sharp(overlay)
    .composite([{ input: bottle, left: bottleLeft, top: bottleTop }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out)
  outputs.push([out, fs.statSync(out).size])
}

await buildOpenGraphCard()

for (const [file, size] of outputs) {
  console.log(file, `${(size / 1024).toFixed(1)} kB`)
}
