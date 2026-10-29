import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SectionLoader from "./components/SectionLoader";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

// Shared by the browser router (App.tsx) and the build-time prerender (entry-server.tsx),
// so both always render the same pages.
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/projects",
    element: (
      <Suspense fallback={<SectionLoader />}>
        <ProjectsPage />
      </Suspense>
    ),
  },
  {
    path: "/projects/:slug",
    element: (
      <Suspense fallback={<SectionLoader />}>
        <ProjectDetailPage />
      </Suspense>
    ),
  },
  // Reachable by direct link only: the blog URLs were shared with the submissions, so the
  // pages stay live, but nothing on the site navigates to them.
  {
    path: "/blogs",
    element: (
      <Suspense fallback={<SectionLoader />}>
        <BlogsPage />
      </Suspense>
    ),
  },
  {
    path: "/blogs/:slug",
    element: (
      <Suspense fallback={<SectionLoader />}>
        <BlogPostPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
