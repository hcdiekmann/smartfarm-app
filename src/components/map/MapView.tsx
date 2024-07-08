import "./popups/styles.css";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import Map, { Popup, MapRef, MapLayerMouseEvent } from "react-map-gl";
import { useMap } from "@/hooks/map/useMap";
import { PopupContent } from "./PopupContent";
import { initializeMapProtocols } from "./MapProtocols";
import { MapTheme } from "@/map.types";
import { getMapStyle } from "./MapTheme";

type MapViewProps = {
  mapTheme: MapTheme;
  showPOIs: boolean;
};

export function MapView({ mapTheme, showPOIs }: MapViewProps) {
  const mapRef = useRef<MapRef>(null);
  const { popupInfo, setPopupInfo, popupExpanded, setPopupExpanded } = useMap();

  useEffect(() => {
    const cleanup = initializeMapProtocols();
    return cleanup;
  }, [mapRef]);

  const handleMapClick = (event: MapLayerMouseEvent) => {
    const feature = event.features && event.features[0];
    if (feature) {
      const [longitude, latitude] = event.lngLat.toArray();
      switch (feature.layer.id) {
        case "overture-pois-text":
          handlePOIClick(longitude, latitude, feature.properties);
          break;
        case "custom-assets":
            // handleAssetClick(longitude, latitude, feature.properties);
            break;
        // Add more cases for other interactive layers here
        default:
          handleDefaultClick();
          break;
      }
      flyToLocation(longitude, latitude);
    } else {
      handleDefaultClick();
    }
  };

  const handlePOIClick = (
    longitude: number,
    latitude: number,
    properties: any
  ) => {
    setPopupInfo({
      type: "public_poi",
      longitude,
      latitude,
      properties,
    });
    setPopupExpanded(false);
  };

  const handleDefaultClick = () => {
    setPopupInfo(null);
    setPopupExpanded(false);
  };

  const flyToLocation = (
    longitude: number,
    latitude: number,
    zoom?: number
  ) => {
    const currentZoom = mapRef.current?.getZoom() || 0;
    const centerPoint = mapRef.current?.project([longitude, latitude]);
    if (centerPoint) {
      centerPoint.y += 120; // Adjust offset from the center here
      const newCenter = mapRef.current?.unproject(centerPoint);
      mapRef.current?.flyTo({
        center: newCenter,
        zoom: zoom ? Math.max(currentZoom, zoom) : Math.max(currentZoom, 14),
        duration: 1000,
      });
    }
  };

  const handlePopupClose = () => {
    setPopupInfo(null);
    setPopupExpanded(false);
  };

  return (
    <Map
      ref={mapRef}
      cursor="pointer"
      initialViewState={{
        longitude: 24,
        latitude: -20,
        zoom: 3,
      }}
      style={{ width: "100%", height: "36em", borderRadius: "6px" }}
      attributionControl={true}
      mapStyle={getMapStyle(mapTheme, showPOIs)}
      interactiveLayerIds={["overture-pois-text", "custom-assets"]}
      onClick={handleMapClick}
      // @ts-ignore
      mapLib={maplibregl}
    >
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
  );
}
