import { Outlet } from "react-router-dom";
import FarmNav from "@/pages/farm/FarmNav";
import FarmHeader from "./FarmHeader";


const FarmLayout = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <FarmNav />
      <div className="flex flex-col h-screen">
        <FarmHeader />
        <main className="flex flex-1 flex-col gap-4 p-2 pt-4 lg:gap-6 lg:p-6 lg:pt-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FarmLayout;