import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "./provider/ThemeProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  </React.StrictMode>
);
