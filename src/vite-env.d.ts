/// <reference types="vite/client" />

// Set by the console easter egg script in index.html.
interface Window {
  wasih?: { unlock: (answer: string) => string; hint: string };
  __wasihQ?: string[];
}
