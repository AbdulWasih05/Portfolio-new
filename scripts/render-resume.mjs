// Build-time render of the résumé PDF -> high-res WebP for an instant in-page preview.
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas, DOMMatrix, Path2D, ImageData } from "@napi-rs/canvas";
import { readFileSync, writeFileSync } from "fs";

// pdfjs expects these in the global scope when running under Node.
globalThis.DOMMatrix = DOMMatrix;
globalThis.Path2D = Path2D;
globalThis.ImageData = ImageData;

const PDF = "public/abdul-wasih-resume.pdf";

// Two renders. The first is the preview the modal opens with, sized for the ~820px cap on a
// retina screen. The second is only fetched when a phone reader zooms in, where the page is
// drawn near 900 CSS px on a 3x screen and the smaller file would go soft.
const OUTPUTS = [
  { out: "public/abdul-wasih-resume-preview.webp", scale: 2.5, quality: 80 },
  { out: "public/abdul-wasih-resume-preview-2x.webp", scale: 4.5, quality: 78 },
];

const data = new Uint8Array(readFileSync(PDF));
const doc = await getDocument({
  data,
  standardFontDataUrl: "node_modules/pdfjs-dist/standard_fonts/",
  useSystemFonts: true,
}).promise;

const page = await doc.getPage(1);

for (const { out, scale, quality } of OUTPUTS) {
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: ctx, viewport }).promise;

  const webp = await canvas.encode("webp", quality);
  writeFileSync(out, webp);
  console.log(`wrote ${out} (${canvas.width}x${canvas.height}, ${(webp.length / 1024).toFixed(1)} KB)`);
}
