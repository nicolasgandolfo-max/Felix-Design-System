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
import { decodePng, encodePng } from "./lib/png.mjs";

const [, , inPath, outPath, ...rect] = process.argv;
if (!inPath || !outPath || rect.length !== 4) {
  console.error(
    "usage: node scripts/crop-figma-export.mjs <in.png> <out.png> <x> <y> <w> <h>"
  );
  process.exit(1);
}
const [cropX, cropY, cropW, cropH] = rect.map(Number);

const src = decodePng(inPath);
const { width, height, bpp } = src;

if (cropX < 0 || cropY < 0 || cropW < 1 || cropH < 1)
  throw new Error("invalid rectangle");
if (cropX + cropW > width || cropY + cropH > height)
  throw new Error(
    `rectangle ${cropX},${cropY} ${cropW}x${cropH} falls outside ${width}x${height}`
  );

const stride = width * bpp;
const newStride = cropW * bpp;
const pixels = Buffer.alloc(newStride * cropH);
for (let y = 0; y < cropH; y++) {
  const srcStart = (cropY + y) * stride + cropX * bpp;
  src.pixels.copy(pixels, y * newStride, srcStart, srcStart + newStride);
}

encodePng(outPath, {
  width: cropW,
  height: cropH,
  bpp,
  ihdr: src.ihdr,
  pixels,
});

console.log(`${inPath} ${width}x${height} → ${outPath} ${cropW}x${cropH}`);
