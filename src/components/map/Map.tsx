import "maplibre-gl/dist/maplibre-gl.css";
import { useMap } from '@/hooks/map/useMap';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';
import { MapView } from './MapView';

export default function MapComponent() {
  const {
    mapTheme,
    setMapTheme,
    showPOIs,
    setShowPOIs,
  } = useMap();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showPOIs"
            checked={showPOIs}
            onCheckedChange={() => setShowPOIs(!showPOIs)}
          />
          <label htmlFor="showPOIs">Public POIs</label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="mapTheme"
            checked={mapTheme === "dark"}
            onCheckedChange={() =>
              setMapTheme(mapTheme === "dark" ? "light" : "dark")
            }
          />
          <label htmlFor="showPOIs">Dark</label>
        </div>
      </div>
      <MapView
        mapTheme={mapTheme}
        showPOIs={showPOIs}
      />
    </div>
  );
}