import { useEffect, useRef  } from 'react';
import maplibregl from 'maplibre-gl';
import Map, { MapRef } from 'react-map-gl/maplibre';
import {
  Popup,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl/maplibre";
import './popups/styles.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@hyvilo/maplibre-gl-draw/dist/maplibre-gl-draw.css'
import { useMap as useCustomMap } from "@/hooks/map/useMap";
import { PopupContent } from "./PopupContent";
import { initializeMapProtocols } from "./MapProtocols";
import { MapTheme } from "@/map.types";
import { getMapStyle } from "./MapTheme";
import DrawControl from './DrawControl';

type MapViewProps = {
  theme: MapTheme;
  showPOIs: boolean;
  showAssets: boolean;
  showDrawControls: boolean;
};

export function MapView({ theme, showPOIs, showAssets, showDrawControls = true }: MapViewProps) {
  const mapRef = useRef<MapRef>(null);

  const {
    popupInfo,
    popupExpanded,
    setPopupExpanded,
    handleMapClick,
    handlePopupClose,
  } = useCustomMap();

  useEffect(() => {
    const cleanup = initializeMapProtocols();
    return cleanup;
  }, []);

  return (
    <div>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 24,
          latitude: -20,
          zoom: 3,
        }}
        style={{ width: "100%", height: "48em", borderRadius: "6px" }}
        attributionControl={true}
        mapStyle={getMapStyle(theme, showPOIs, showAssets)}
        interactiveLayerIds={["overture-pois-text", "custom-assets"]}
        onClick={handleMapClick}
        mapLib={maplibregl}
      >
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <GeolocateControl position="bottom-left" />

        <DrawControl mapRef={mapRef.current} showDrawControls={showDrawControls} />

        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeButton={true}
            closeOnClick={false}
            onClose={handlePopupClose}
            anchor="top"
            className="custom-popup"
            maxWidth="300px"
          >
            <PopupContent
              info={popupInfo}
              expanded={popupExpanded}
              onToggleExpanded={() => setPopupExpanded(!popupExpanded)}
            />
          </Popup>
        )}
      </Map>
    </div>
  );
}