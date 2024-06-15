import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider } from "@/provider/AuthProvider";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {PublicRoutes()}
          {PrivateRoutes()}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
