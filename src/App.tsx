import { Toaster } from "@/components/ui/toaster";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectsPage from "./pages/ProjectsPage";

// implemented createBrowserrouter+router instead of traditional browserrouter+route for v7 react-router upgrade
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/projects",
      element: <ProjectsPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],

);

const App = () => (
  <HelmetProvider>
    <Toaster />
    <RouterProvider router={router}
    future={{ v7_startTransition: true }as any} />
  </HelmetProvider>
);

export default App;
