/**
 * Downloads and optimizes the new-website-launch hero image.
 *
 * Usage:
 *   npm install sharp        # one-time
 *   node scripts/download-hero.mjs
 *
 * Saves to: public/images/blog/new-website-launch-hero.webp (~900×700, <150KB)
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const SRC_URL = 'https://bridge-assets.spark0.io/flows/cmqqrsiel0003w3rvv5ld8sp7/032eb5ac7b2ee453-ChatGPT_Image_Jun_18-_2026-_10_08_46_AM.png';
const OUT_PATH = path.join(__dirname, '../public/images/blog/new-website-launch-hero.webp');
const TMP_PATH = path.join(__dirname, '../public/images/blog/.hero-raw-tmp.png');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (e) => { file.close(); try { fs.unlinkSync(dest); } catch (_) {} reject(e); });
  });
}

console.log('Downloading source image…');
await download(SRC_URL, TMP_PATH);
const rawSize = fs.statSync(TMP_PATH).size;
console.log(`Downloaded: ${(rawSize / 1024).toFixed(0)} KB`);

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error('\nError: sharp is not installed. Run:  npm install sharp\n');
  fs.unlinkSync(TMP_PATH);
  process.exit(1);
}

console.log('Converting and optimizing…');
await sharp(TMP_PATH)
  .resize(900, 700, { fit: 'cover', position: 'centre' })
  .webp({ quality: 78, effort: 6 })
  .toFile(OUT_PATH);

fs.unlinkSync(TMP_PATH);

const outSize = fs.statSync(OUT_PATH).size;
console.log(`Done → ${OUT_PATH}`);
console.log(`Size:  ${(rawSize / 1024).toFixed(0)} KB → ${(outSize / 1024).toFixed(0)} KB`);
console.log('\nNext steps:');
console.log('  git add public/images/blog/new-website-launch-hero.webp');
console.log('  git commit -m "Add optimized hero image for new-website-launch"');
