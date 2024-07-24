import  CustomMap  from "./Map";
import { MapPinned } from "lucide-react";
import { TractorIcon } from "../Icons";
import MapThemeSelector from "./MapThemeSelector";
import { useState } from "react";
import { MapTheme } from "@/map.types";
import { Tabs, TabsTrigger, TabsList } from "../ui/tabs";

export default function OverviewMap() {
  const [mapTheme, setMapTheme] = useState<MapTheme>("light");
  const [showPOIs, setShowPOIs] = useState(false);
  const [showAssets, setShowAssets] = useState(true);

  const handleMapLayerChange = (value: string) => {
    switch (value) {
      case "private":
        setShowAssets(true);
        setShowPOIs(false);
        break;
      case "public":
        setShowPOIs(true);
        setShowAssets(false);
        break;
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex gap-1 justify-between items-center">
          <Tabs
            value={showAssets ? "private" : "public"}
            onValueChange={handleMapLayerChange}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="private"
                className="data-[state=active]:bg-opacity-100"
              >
                <TractorIcon className=" mr-1 h-4 w-4 " />
                <span className="sm:inline">Private Assets</span>
              </TabsTrigger>
              <TabsTrigger
                value="public"
                className="data-[state=active]:bg-opacity-100"
              >
                <MapPinned className="h-4 w-4 mr-1" />
                <span className="sm:inline">Public POI</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <MapThemeSelector mapTheme={mapTheme} setMapTheme={setMapTheme} />
      </div>
      <div className="">
        <CustomMap theme={mapTheme} showPOIs={showPOIs} showAssets={showAssets} showDrawControls={true} />
      </div>
    </div>
  );
}
