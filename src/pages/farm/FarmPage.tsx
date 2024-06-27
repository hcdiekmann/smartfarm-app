
import FarmSideNav from "@/components/FarmSideNav";
import OverviewPage from "./FarmDashboard";
import Header from "@/components/header/Header";

const FarmPage = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <FarmSideNav />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <OverviewPage />
        </main>
      </div>
    </div>
  );
};

export default FarmPage;
