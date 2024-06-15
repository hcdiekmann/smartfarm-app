import { Route } from "react-router-dom";
import Private from "@/routes/Private";
import HomePage from "@/pages/HomePage";
import UpdatePasswordPage from "@/pages/UpdatePasswordPage";

const PrivateRoutes = () => {
  return (
    <>
      <Route path="/" element={<Private element={<HomePage />} />} />
      <Route
        path="/update-password"
        element={<Private element={<UpdatePasswordPage />} />}
      />
    </>
  );
};

export default PrivateRoutes;
