import { Outlet} from "react-router-dom";
import RootNav from "./RootNav";
import RootHeader from "./RootHeader";



const RootPage = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <RootNav />
      <div className="flex flex-col">
        <RootHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootPage;
