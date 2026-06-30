// Build-time render of the résumé PDF -> high-res WebP for an instant in-page preview.
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas, DOMMatrix, Path2D, ImageData } from "@napi-rs/canvas";
import { readFileSync, writeFileSync } from "fs";

// pdfjs expects these in the global scope when running under Node.
globalThis.DOMMatrix = DOMMatrix;
globalThis.Path2D = Path2D;
globalThis.ImageData = ImageData;

const PDF = "public/abdul-wasih-resume.pdf";
const OUT = "public/abdul-wasih-resume-preview.webp";
const SCALE = 2.5; // ~1530px wide -> crisp at the ~820px display cap (retina)

const data = new Uint8Array(readFileSync(PDF));
const doc = await getDocument({
  data,
  standardFontDataUrl: "node_modules/pdfjs-dist/standard_fonts/",
  useSystemFonts: true,
}).promise;

const page = await doc.getPage(1);
const viewport = page.getViewport({ scale: SCALE });
const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

await page.render({ canvasContext: ctx, viewport }).promise;

const webp = await canvas.encode("webp", 80);
writeFileSync(OUT, webp);
console.log(`wrote ${OUT} (${canvas.width}x${canvas.height}, ${(webp.length / 1024).toFixed(1)} KB)`);
