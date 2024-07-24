import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { ThemeProvider } from "./provider/ThemeProvider.tsx";
import "react-subtle-nudge/dist/index.css";
import "./index.css";
import { MapProvider } from "react-map-gl/maplibre";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MapProvider>
          <App />
          <Toaster richColors position="top-center" />
        </MapProvider>
      </ThemeProvider>
    </QueryClientProvider>
    <ReactQueryDevtools client={queryClient} initialIsOpen={false} />
  </React.StrictMode>
);
