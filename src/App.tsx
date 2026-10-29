import { Toaster } from "@/components/ui/toaster";
import { ResumeModalProvider } from "@/components/ResumeModal";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { routes } from "./routes";

// implemented createBrowserrouter+router instead of traditional browserrouter+route for v7 react-router upgrade
const router = createBrowserRouter(routes);

const App = () => (
  <HelmetProvider>
    <ResumeModalProvider>
      <Toaster />
      <RouterProvider router={router}
      future={{ v7_startTransition: true }} />
    </ResumeModalProvider>
  </HelmetProvider>
);

export default App;
