import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const source = path.join(root, 'public/images/farhan.png');
const iconsDir = path.join(root, 'public/icons');
const publicDir = path.join(root, 'public');

async function circularPng(size) {
  const radius = size / 2;
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="white"/></svg>`
  );

  return sharp(source)
    .resize(size, size, { fit: 'cover', position: 'top' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function main() {
  await mkdir(iconsDir, { recursive: true });

  const sizes = [
    { file: 'icon-16.png', size: 16 },
    { file: 'icon-32.png', size: 32 },
    { file: 'icon-180.png', size: 180 },
    { file: 'icon-192.png', size: 192 },
    { file: 'icon-512.png', size: 512 },
  ];

  for (const { file, size } of sizes) {
    const buf = await circularPng(size);
    await writeFile(path.join(iconsDir, file), buf);
  }

  const favicon32 = await circularPng(32);
  const favicon16 = await circularPng(16);

  // Minimal ICO with 16x16 and 32x32 PNG entries
  const pngToIcoEntry = (pngBuf, size) => {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(1, 4);

    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(pngBuf.length, 8);
    entry.writeUInt32LE(22, 12);
    return { header, entry, pngBuf };
  };

  const e16 = pngToIcoEntry(favicon16, 16);
  const e32 = pngToIcoEntry(favicon32, 32);
  const dir = Buffer.alloc(6);
  dir.writeUInt16LE(0, 0);
  dir.writeUInt16LE(1, 2);
  dir.writeUInt16LE(2, 4);

  e16.entry.writeUInt32LE(22 + e16.entry.length + e32.entry.length, 12);
  e32.entry.writeUInt32LE(22 + e16.entry.length + e32.entry.length + e16.pngBuf.length, 12);

  const ico = Buffer.concat([
    dir,
    e16.entry,
    e32.entry,
    e16.pngBuf,
    e32.pngBuf,
  ]);
  await writeFile(path.join(publicDir, 'favicon.ico'), ico);

  const svg192 = await circularPng(192);
  const base64 = svg192.toString('base64');
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><circle cx="96" cy="96" r="96" fill="#030308"/><image href="data:image/png;base64,${base64}" width="192" height="192" preserveAspectRatio="xMidYMid slice" clip-path="url(#c)"/><defs><clipPath id="c"><circle cx="96" cy="96" r="96"/></clipPath></defs></svg>`;
  await writeFile(path.join(publicDir, 'favicon.svg'), faviconSvg);

  console.log('Icons generated successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
