import "maplibre-gl/dist/maplibre-gl.css";
import { useMap } from "@/hooks/map/useMap";
import { MapView } from "./MapView";
import { Toggle } from "../ui/toggle";
import { MapPinned, Moon, Satellite, Sun } from "lucide-react";
import { TractorIcon } from "../Icons";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { MapTheme } from "./mapTheme";

export default function MapComponent() {
  const {
    mapTheme,
    setMapTheme,
    showPOIs,
    setShowPOIs,
    showAssets,
    setShowAssets,
  } = useMap();

  const handleThemeChange = (value: string) => {
    setMapTheme(value as MapTheme);
  };

  const togglePOIs = () => {
    setShowPOIs(!showPOIs);
  };

  const toggleAssets = () => {
    setShowAssets(!showAssets);
  };

  return (
    <div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 sm:space-x-2 mb-1">
        <div className="flex flex-wrap gap-2">
          <Toggle
            aria-label="Toggle assets"
            variant="outline"
            size="sm"
            pressed={showAssets}
            onPressedChange={toggleAssets}
            className="flex-grow sm:flex-grow-0"
          >
            <TractorIcon className="h-4 w-4 mr-1" />
            Assets
          </Toggle>
          <Toggle
            aria-label="Toggle public POI"
            variant="outline"
            size="sm"
            pressed={showPOIs}
            onPressedChange={togglePOIs}
            className="flex-grow sm:flex-grow-0"
          >
            <MapPinned className="h-4 w-4 mr-1" />
            Public POI
          </Toggle>
        </div>
        <Tabs value={mapTheme} onValueChange={handleThemeChange} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="light">
              <Sun className="h-4 w-4 mr-1 sm:mr-2" />
              <span className=" sm:inline">Light</span>
            </TabsTrigger>
            <TabsTrigger value="dark">
              <Moon className="h-4 w-4 mr-1 sm:mr-2" />
              <span className=" sm:inline">Dark</span>
            </TabsTrigger>
            <TabsTrigger value="satellite">
              <Satellite className="h-4 w-4 mr-1 sm:mr-2" />
              <span className=" sm:inline">Satellite</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <MapView mapTheme={mapTheme} showPOIs={showPOIs} />
    </div>
  );
}
