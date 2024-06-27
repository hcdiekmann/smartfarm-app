import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from "./App.tsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "./provider/ThemeProvider.tsx";
import 'react-subtle-nudge/dist/index.css';
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
