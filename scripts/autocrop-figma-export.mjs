// Crops pattern screenshots exported from Figma at 2x, finding the content by
// its pixels instead of by hand-measured coordinates.
//
//   node scripts/autocrop-figma-export.mjs pair <do.png> <dont.png> <do-out.png> <dont-out.png>
//   node scripts/autocrop-figma-export.mjs hero <hero-frame.png> <out.png>
//
// pair — a do/don't frame bakes in the green/orange verdict bar that
//   `ExampleFigure` already draws, plus the card's border and rounded corners.
//   Everything that is not the frame's background, above the bar and inside the
//   border, is the content. Both frames of a pair are cut with ONE rectangle —
//   the union of their contents — so the do and the don't come out the same
//   size and line up side by side.
// hero — a pattern hero frame (1280×463) has the title copy on the left and the
//   WhatsApp bubbles on the right. The bubbles are found in the right-hand part
//   and cut as a single composition, the way Figma stacks them.
//
// Output stays at 2x; the template declares these files as 2x, so they render
// at their real Figma size. See apps/design-system/README.md.
import { decodePng, encodePng } from "./lib/png.mjs";

const BAR = 118; // verdict bar, 59px at 1x
const EDGE = 6; // past the frame's 1px border at 2x
const CORNER = 64; // rounded corners fall outside the curve: not content
const TOL = 3; // white bubbles vs the linen background differ by only ~6

const px = (im, x, y) => {
  const i = (y * im.width + x) * im.bpp;
  return [
    im.pixels[i],
    im.pixels[i + 1],
    im.pixels[i + 2],
    im.bpp === 4 ? im.pixels[i + 3] : 255,
  ];
};
const diff = (a, b) =>
  Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]), Math.abs(a[2] - b[2]));
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function bbox(im, [rx0, ry0, rx1, ry1], bg) {
  let x0 = Infinity,
    y0 = Infinity,
    x1 = -1,
    y1 = -1;
  for (let y = ry0; y < ry1; y++)
    for (let x = rx0; x < rx1; x++) {
      if (
        (x < CORNER || x >= im.width - CORNER) &&
        (y < CORNER || y >= im.height - CORNER)
      )
        continue;
      const p = px(im, x, y);
      if (p[3] > 0 && diff(p, bg) > TOL) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  if (x1 < 0) throw new Error("no content found");
  return { x0, y0, x1: x1 + 1, y1: y1 + 1 };
}

function crop(im, x, y, w, h) {
  const stride = im.width * im.bpp,
    ns = w * im.bpp,
    out = Buffer.alloc(ns * h);
  for (let r = 0; r < h; r++)
    im.pixels.copy(
      out,
      r * ns,
      (y + r) * stride + x * im.bpp,
      (y + r) * stride + (x + w) * im.bpp
    );
  return { ...im, width: w, height: h, pixels: out };
}

// Top of the verdict bar: walk up from the bottom while the pixel is still the
// saturated green or orange. Falls back to the standard 59px bar.
function barTop(im) {
  const isBar = (p) =>
    (p[1] > 150 && p[0] < 140 && p[2] < 140) ||
    (p[0] > 200 && p[1] < 150 && p[2] < 90);
  let y = im.height - 20;
  if (!isBar(px(im, 40, y))) return im.height - BAR;
  while (y > 0 && isBar(px(im, 40, y))) y--;
  return y + 1;
}

function pair(doIn, dontIn, doOut, dontOut, margin = 24) {
  const A = decodePng(doIn),
    B = decodePng(dontIn);
  if (A.width !== B.width || A.height !== B.height)
    throw new Error(
      `the do and the don't frames differ in size: ${A.width}×${A.height} vs ${B.width}×${B.height}`
    );
  const top = Math.min(barTop(A), barTop(B));
  const region = [EDGE, EDGE, A.width - EDGE, top - EDGE];
  const a = bbox(A, region, px(A, 40, 40)),
    b = bbox(B, region, px(B, 40, 40));
  const x = clamp(Math.min(a.x0, b.x0) - margin, EDGE, A.width - EDGE);
  const y = clamp(Math.min(a.y0, b.y0) - margin, EDGE, top - EDGE);
  const w = clamp(Math.max(a.x1, b.x1) + margin, EDGE, A.width - EDGE) - x;
  const h = clamp(Math.max(a.y1, b.y1) + margin, EDGE, top - EDGE) - y;
  encodePng(doOut, crop(A, x, y, w, h));
  encodePng(dontOut, crop(B, x, y, w, h));
  console.log(
    `${doOut}, ${dontOut}: ${w}×${h} at ${x},${y} (${w / 2}×${h / 2} at 1x)`
  );
}

function hero(inPath, outPath, margin = 16, fromX = 1250) {
  const im = decodePng(inPath);
  const b = bbox(
    im,
    [fromX, EDGE, im.width - EDGE, im.height - EDGE],
    px(im, fromX + 40, 40)
  );
  const x = clamp(b.x0 - margin, EDGE, im.width - EDGE),
    y = clamp(b.y0 - margin, EDGE, im.height - EDGE);
  const w = clamp(b.x1 + margin, EDGE, im.width - EDGE) - x,
    h = clamp(b.y1 + margin, EDGE, im.height - EDGE) - y;
  encodePng(outPath, crop(im, x, y, w, h));
  console.log(`${outPath}: ${w}×${h} at ${x},${y} (${w / 2}×${h / 2} at 1x)`);
}

const [, , mode, ...args] = process.argv;
if (mode === "pair" && args.length === 4) pair(...args);
else if (mode === "hero" && args.length === 2) hero(...args);
else {
  console.error(
    "usage:\n  node scripts/autocrop-figma-export.mjs pair <do.png> <dont.png> <do-out.png> <dont-out.png>\n  node scripts/autocrop-figma-export.mjs hero <hero-frame.png> <out.png>"
  );
  process.exit(1);
}
