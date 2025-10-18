import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// implemented createBrowserrouter+router instead of traditional browserrouter+route for v7 react-router upgrade
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],

);

const App = () => (
  <HelmetProvider>
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router}
        future={{ v7_startTransition: true }as any} />
      </TooltipProvider>
    </MotionConfig>
  </HelmetProvider>
);

export default App;
