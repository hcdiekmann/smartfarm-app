import "maplibre-gl/dist/maplibre-gl.css";
import { useMap } from "@/hooks/map/useMap";
import { MapView } from "./MapView";
import { Toggle } from "../ui/toggle";
import { MapPinned, Moon, Satellite, Sun } from "lucide-react";
import { TractorIcon } from "../Icons";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { MapTheme } from "@/map.types";

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
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Toggle
          aria-label="Toggle assets"
          variant="outline"
          size="sm"
          pressed={showAssets}
          onPressedChange={toggleAssets}
          className="flex-grow sm:flex-grow-0 rounded-3xl"
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
          className="flex-grow sm:flex-grow-0 rounded-3xl"
        >
          <MapPinned className="h-4 w-4 mr-1" />
          Public POI
        </Toggle>
      </div>
      <div className="relative">
        <MapView mapTheme={mapTheme} showPOIs={showPOIs} />
        <div className="absolute top-2 right-2">
          <Tabs value={mapTheme} onValueChange={handleThemeChange} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3 bg-white bg-opacity-80">
              <TabsTrigger value="light" className="data-[state=active]:bg-opacity-100">
                <Sun className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="sm:inline">Light</span>
              </TabsTrigger>
              <TabsTrigger value="dark" className="data-[state=active]:bg-opacity-100">
                <Moon className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="sm:inline">Dark</span>
              </TabsTrigger>
              <TabsTrigger value="satellite" className="data-[state=active]:bg-opacity-100">
                <Satellite className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="sm:inline">Satellite</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}