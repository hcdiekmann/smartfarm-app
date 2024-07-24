import MapComponent from "@/components/map/Map";

const FarmOverview: React.FC = () => {
  return (
    <>
      <h2 className="text-muted-foreground uppercase tracking-wide text-sm">
        Map
      </h2>
      <MapComponent />
    </>
  );
};

export default FarmOverview;
