// Crops a rectangle out of a PNG. Run: node scripts/crop-figma-export.mjs <in.png> <out.png> <x> <y> <w> <h>
//
// Why this exists: the do/don't frames in the Figma guidelines file bake the
// green "Do" / orange "Don't" footer bar into the frame, but `ExampleFigure`
// (apps/design-system/src/pages/PatternPage.tsx) draws that bar itself from
// tokens. Exporting a frame as-is would show the bar twice, so the bar has to
// be cropped off — and the surrounding card padding trimmed, since the template
// supplies its own. `sips` cannot do this: it ignores --cropOffset and always
// crops centred.
//
// Coordinates are in pixels of the input file. For a frame exported at 2x,
// double the coordinates Figma reports in `get_metadata`.
// See apps/design-system/README.md ("Pattern screenshots from Figma").
//
// Supports 8-bit non-interlaced PNG (what Figma exports).
import { readFileSync, writeFileSync } from "node:fs";
import { inflateSync, deflateSync } from "node:zlib";

const SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

const paeth = (a, b, c) => {
  const p = a + b - c;
  const pa = Math.abs(p - a),
    pb = Math.abs(p - b),
    pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
};

const [, , inPath, outPath, ...rect] = process.argv;
if (!inPath || !outPath || rect.length !== 4) {
  console.error(
    "usage: node scripts/crop-figma-export.mjs <in.png> <out.png> <x> <y> <w> <h>"
  );
  process.exit(1);
}
const [cropX, cropY, cropW, cropH] = rect.map(Number);

const png = readFileSync(inPath);
if (!png.subarray(0, 8).equals(SIG)) throw new Error(`${inPath} is not a PNG`);

let ihdr = null;
const idat = [];
for (let off = 8; off < png.length; ) {
  const len = png.readUInt32BE(off);
  const type = png.toString("ascii", off + 4, off + 8);
  const data = png.subarray(off + 8, off + 8 + len);
  if (type === "IHDR") ihdr = data;
  else if (type === "IDAT") idat.push(data);
  else if (type === "IEND") break;
  off += 12 + len;
}
if (!ihdr) throw new Error("missing IHDR");

const width = ihdr.readUInt32BE(0);
const height = ihdr.readUInt32BE(4);
const bitDepth = ihdr[8];
const colorType = ihdr[9];
const interlace = ihdr[12];

if (bitDepth !== 8) throw new Error(`bit depth ${bitDepth} unsupported`);
if (interlace !== 0) throw new Error("interlaced PNG unsupported");
const CHANNELS = { 0: 1, 2: 3, 4: 2, 6: 4 };
const bpp = CHANNELS[colorType];
if (!bpp) throw new Error(`color type ${colorType} unsupported`);
if (cropX < 0 || cropY < 0 || cropW < 1 || cropH < 1)
  throw new Error("invalid rectangle");
if (cropX + cropW > width || cropY + cropH > height)
  throw new Error(
    `rectangle ${cropX},${cropY} ${cropW}x${cropH} falls outside ${width}x${height}`
  );

const stride = width * bpp;
const raw = inflateSync(Buffer.concat(idat));

// Un-filter: every scanline is preceded by its filter byte.
const out = Buffer.alloc(stride * height);
for (let y = 0, pos = 0; y < height; y++) {
  const filter = raw[pos++];
  const row = raw.subarray(pos, pos + stride);
  pos += stride;
  const cur = out.subarray(y * stride, (y + 1) * stride);
  const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
  for (let x = 0; x < stride; x++) {
    const a = x >= bpp ? cur[x - bpp] : 0;
    const b = prev ? prev[x] : 0;
    const c = prev && x >= bpp ? prev[x - bpp] : 0;
    let v = row[x];
    if (filter === 1) v += a;
    else if (filter === 2) v += b;
    else if (filter === 3) v += (a + b) >> 1;
    else if (filter === 4) v += paeth(a, b, c);
    else if (filter !== 0) throw new Error(`invalid filter ${filter}`);
    cur[x] = v & 0xff;
  }
}

// Re-encode with filter 0 on every kept row.
const newStride = cropW * bpp;
const body = Buffer.alloc((newStride + 1) * cropH);
for (let y = 0; y < cropH; y++) {
  body[y * (newStride + 1)] = 0;
  const srcStart = (cropY + y) * stride + cropX * bpp;
  out.copy(body, y * (newStride + 1) + 1, srcStart, srcStart + newStride);
}

const newIhdr = Buffer.from(ihdr);
newIhdr.writeUInt32BE(cropW, 0);
newIhdr.writeUInt32BE(cropH, 4);

writeFileSync(
  outPath,
  Buffer.concat([
    SIG,
    chunk("IHDR", newIhdr),
    chunk("IDAT", deflateSync(body, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ])
);

console.log(`${inPath} ${width}x${height} → ${outPath} ${cropW}x${cropH}`);
