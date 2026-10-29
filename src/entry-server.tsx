// Build-time renderer: turns each route into static HTML so search engines, AI crawlers and
// link previews see real content without running JavaScript. Used by scripts/prerender.mjs.
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { ResumeModalProvider } from "@/components/ResumeModal";
import { routes } from "./routes";

export { projects, slugify } from "./data/projects";
export { blogs } from "./data/blogs";
export { site } from "./data/site";
export { experiences, formatMonth } from "./data/experience";

const handler = createStaticHandler(routes);

export async function render(url: string) {
  const request = new Request(new URL(url, "http://localhost"));
  const context = await handler.query(request);
  if (context instanceof Response) throw new Error(`Unexpected redirect while rendering ${url}`);

  const router = createStaticRouter(handler.dataRoutes, context);
  const helmetContext: { helmet?: HelmetServerState } = {};

  // Stream so lazy pages (Suspense) finish before the HTML is collected.
  const html = await new Promise<string>((resolve, reject) => {
    let out = "";
    const sink = new PassThrough();
    sink.on("data", (chunk) => (out += chunk));
    sink.on("end", () => resolve(out));
    const stream = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <ResumeModalProvider>
          <StaticRouterProvider router={router} context={context} hydrate={false} />
        </ResumeModalProvider>
      </HelmetProvider>,
      {
        onAllReady: () => stream.pipe(sink),
        onShellError: reject,
        onError: (err) => reject(err),
      },
    );
  });

  const h = helmetContext.helmet;
  const head = h
    ? [h.title, h.meta, h.link, h.script].map((part) => part.toString()).filter(Boolean).join("\n    ")
    : "";
  return { html, head };
}
