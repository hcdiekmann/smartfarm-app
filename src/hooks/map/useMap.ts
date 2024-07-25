import { useState, useCallback } from 'react';
import { MapLayerMouseEvent } from 'react-map-gl/maplibre';
import { PopupInfo } from '@/map.types';

export function useMap() {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [popupExpanded, setPopupExpanded] = useState(false);

  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor(undefined), []);

  const handleMapClick = useCallback((event: MapLayerMouseEvent) => {
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
        default:
          handleDefaultClick();
          break;
      }
      const map = event.target;
      if (map) {
        map.flyTo({ center: [longitude, latitude], curve: 2, speed: 0.5 });
      }
    } else {
      handleDefaultClick();
    }
  }, []);

  const handlePOIClick = useCallback((
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
  }, []);

  const handleDefaultClick = useCallback(() => {
    setPopupInfo(null);
    setPopupExpanded(false);
  }, []);

  const handlePopupClose = useCallback(() => {
    setPopupInfo(null);
    setPopupExpanded(false);
  }, []);

  return {
    cursor,
    onMouseEnter,
    onMouseLeave,
    popupInfo,
    setPopupInfo,
    popupExpanded,
    setPopupExpanded,
    handleMapClick,
    handlePopupClose,
  };
}