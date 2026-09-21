// Minimal dependency-free PNG decode/encode (8-bit, non-interlaced — what Figma
// exports). Used by scripts/crop-figma-export.mjs and scripts/composite-emoji.mjs.
import { readFileSync, writeFileSync } from "node:fs";
import { inflateSync, deflateSync } from "node:zlib";

const SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const CHANNELS = { 0: 1, 2: 3, 4: 2, 6: 4 };

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

/** Returns { width, height, bpp, colorType, ihdr, pixels } — pixels unfiltered. */
export function decodePng(path) {
  const png = readFileSync(path);
  if (!png.subarray(0, 8).equals(SIG)) throw new Error(`${path} is not a PNG`);

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
  if (ihdr[8] !== 8) throw new Error(`bit depth ${ihdr[8]} unsupported`);
  if (ihdr[12] !== 0) throw new Error("interlaced PNG unsupported");
  const bpp = CHANNELS[ihdr[9]];
  if (!bpp) throw new Error(`color type ${ihdr[9]} unsupported`);

  const stride = width * bpp;
  const raw = inflateSync(Buffer.concat(idat));
  const pixels = Buffer.alloc(stride * height);
  for (let y = 0, pos = 0; y < height; y++) {
    const filter = raw[pos++];
    const row = raw.subarray(pos, pos + stride);
    pos += stride;
    const cur = pixels.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;
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
  return { width, height, bpp, colorType: ihdr[9], ihdr, pixels };
}

/** Writes { width, height, bpp, ihdr, pixels } back out with filter 0. */
export function encodePng(path, { width, height, bpp, ihdr, pixels }) {
  const stride = width * bpp;
  const body = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    body[y * (stride + 1)] = 0;
    pixels.copy(body, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const newIhdr = Buffer.from(ihdr);
  newIhdr.writeUInt32BE(width, 0);
  newIhdr.writeUInt32BE(height, 4);
  writeFileSync(
    path,
    Buffer.concat([
      SIG,
      chunk("IHDR", newIhdr),
      chunk("IDAT", deflateSync(body, { level: 9 })),
      chunk("IEND", Buffer.alloc(0)),
    ])
  );
}
