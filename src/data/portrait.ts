// Hero portrait files (public/portrait), both cut from one 1024px Real-ESRGAN upscale. 512px is the
// smallest on purpose: "open image in new tab" and "save image" give whatever file the page loaded.
// Shared by both <picture>s in Hero.tsx and the preload in pages/Index.tsx so they always
// pick the same file.
export const portraitSrcSet = (ext: 'webp' | 'jpg') =>
  `/portrait/avatar.${ext} 512w, /portrait/avatar-1024.${ext} 1024w`;

// Desktop shows it at 88px; zooming in makes the browser pick a bigger file, up to 1024.
// Below 1024px it shows at 56px, but pinch-zoom on phones never fetches a bigger file, so
// phones get the 512 up front (168px x 3 = 504) and stay sharp when zoomed.
export const portraitSizes = '(min-width: 1024px) 88px, 168px';
