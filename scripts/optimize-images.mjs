import sharp from 'sharp'
import fs from 'node:fs'

/**
 * Generates the responsive WebP variants used by the site.
 *
 * Sources:
 * - assets-src/products/sealsi-oceanic-packshot.png (master packshot, not deployed)
 * - public/assets/sealsi-oceanic-signature.webp (delivered handoff asset)
 *
 * The original delivered files stay in public/assets and remain valid fallbacks.
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

for (const [file, size] of outputs) {
  console.log(file, `${(size / 1024).toFixed(1)} kB`)
}
