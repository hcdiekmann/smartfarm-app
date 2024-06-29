import FarmSideNav from "@/components/FarmSideNav";
import FarmOverview from "./FarmOverview";
import Header from "@/components/header/Header";

const FarmPage = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <FarmSideNav />
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
          <FarmOverview />
        </main>
      </div>
    </div>
  );
};

export default FarmPage;
