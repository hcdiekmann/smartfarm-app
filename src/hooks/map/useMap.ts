import { useState } from 'react';
import { MapTheme, PopupInfo } from '@/map.types';


export function useMap() {
  const [mapTheme, setMapTheme] = useState<MapTheme>('light');
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [popupExpanded, setPopupExpanded] = useState(false);
  const [showPOIs, setShowPOIs] = useState(false);

  return {
    mapTheme,
    setMapTheme,
    popupInfo,
    setPopupInfo,
    popupExpanded,
    setPopupExpanded,
    showPOIs,
    setShowPOIs,
  };
}