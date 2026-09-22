// Alpha-composites a small RGBA PNG onto a base PNG at one or more positions.
// Run: node scripts/composite-emoji.mjs <base.png> <overlay.png> <out.png> <x,y> [<x,y> ...]
//   node scripts/composite-emoji.mjs shot.png scripts/assets/emoji-br.png shot.png 374,139 443,267
//
// Why this exists: Figma does not rasterise flag emoji on export. A frame whose
// copy reads "R$5,85 🇧🇷" comes out with a blank gap where the flag should be —
// which silently guts any example whose point *is* the flag. The fix is to paste
// the platform emoji (Apple Color Emoji) over the gap the export left.
//
// Node cannot rasterise Apple Color Emoji, so the glyph comes from a browser:
// draw it on a canvas, crop to its alpha bounds, save the PNG. The one for
// Brazil is committed at scripts/assets/emoji-br.png (26x19, drawn at
// font-size 28 — its ink sits ~2px above the text baseline at that size).
// See apps/design-system/README.md ("Pattern screenshots from Figma").
import { decodePng, encodePng } from "./lib/png.mjs";

const [, , basePath, overPath, outPath, ...spots] = process.argv;
if (!basePath || !overPath || !outPath || spots.length === 0) {
  console.error(
    "usage: node scripts/composite-emoji.mjs <base.png> <overlay.png> <out.png> <x,y> [<x,y> ...]"
  );
  process.exit(1);
}

const base = decodePng(basePath);
const over = decodePng(overPath);
if (over.bpp !== 4)
  throw new Error(`${overPath} must be RGBA (it has ${over.bpp} channels)`);

for (const spot of spots) {
  const [ox, oy] = spot.split(",").map(Number);
  if (!Number.isFinite(ox) || !Number.isFinite(oy))
    throw new Error(`bad position "${spot}" — expected x,y`);

  for (let y = 0; y < over.height; y++) {
    for (let x = 0; x < over.width; x++) {
      const dx = ox + x;
      const dy = oy + y;
      if (dx < 0 || dy < 0 || dx >= base.width || dy >= base.height) continue;

      const so = (y * over.width + x) * over.bpp;
      const a = over.pixels[so + 3] / 255;
      if (a === 0) continue;

      const to = dy * base.width * base.bpp + dx * base.bpp;
      for (let ch = 0; ch < 3; ch++) {
        base.pixels[to + ch] = Math.round(
          over.pixels[so + ch] * a + base.pixels[to + ch] * (1 - a)
        );
      }
      if (base.bpp === 4) {
        const da = base.pixels[to + 3] / 255;
        base.pixels[to + 3] = Math.round(255 * (a + da * (1 - a)));
      }
    }
  }
  console.log(`  composited ${over.width}x${over.height} at ${ox},${oy}`);
}

encodePng(outPath, base);
console.log(`${outPath} ${base.width}x${base.height}`);
