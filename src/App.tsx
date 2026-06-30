import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ResumeModalProvider } from "@/components/ResumeModal";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SectionLoader from "./components/SectionLoader";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));

// implemented createBrowserrouter+router instead of traditional browserrouter+route for v7 react-router upgrade
const router = createBrowserRouter(
  [
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
    {
      path: "*",
      element: <NotFound />,
    },
  ],

);

const App = () => (
  <HelmetProvider>
    <ResumeModalProvider>
      <Toaster />
      <RouterProvider router={router}
      future={{ v7_startTransition: true }as any} />
    </ResumeModalProvider>
  </HelmetProvider>
);

export default App;
