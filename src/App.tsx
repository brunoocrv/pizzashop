import { RouterProvider } from "react-router-dom";
import "./global.css";
import { router } from "./routes";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "./components/ui/toaster";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizzashop" />
      <RouterProvider router={router} />
      <Toaster />
    </HelmetProvider>
  );
}
