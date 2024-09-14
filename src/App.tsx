import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./global.css";

import { router } from "./routes";
import { Toaster } from "./components/ui/toaster";
import { queryClient } from "./lib/react-query";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizzashop" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </HelmetProvider>
  );
}
