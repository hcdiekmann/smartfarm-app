import React, { useEffect, useState, useCallback, useRef } from 'react';
import MapLibreDraw from "@hyvilo/maplibre-gl-draw";
import { MapRef } from 'react-map-gl/maplibre';
import * as turf from '@turf/turf';

type DrawControlProps = {
  mapRef: MapRef | null;
  showDrawControls: boolean;
};

function DrawControl({ mapRef, showDrawControls }: DrawControlProps) {
  const [area, setArea] = useState<number | null>(null);
  const drawRef = useRef<MapLibreDraw | null>(null);

  const updateArea = useCallback(() => {
    console.log('updateArea');
    if (drawRef.current) {
      const data = drawRef.current.getAll();
      if (data.features.length > 0) {
        const area = turf.area(data);
        const roundedArea = Math.round(area * 100) / 100;
        setArea(roundedArea);
      } else {
        setArea(null);
      }
    }
  }, []);

  useEffect(() => {
    if (!mapRef || !showDrawControls) return;

    const map = mapRef.getMap();
    
    if (!drawRef.current) {
      console.log('Initializing draw');
      const drawInstance = new MapLibreDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        }
      });

      map.addControl(drawInstance, 'top-left');
      drawRef.current = drawInstance;

      map.on('draw.create', updateArea);
      map.on('draw.delete', updateArea);
      map.on('draw.update', updateArea);
    }

    return () => {
      if (map && drawRef.current) {
        map.off('draw.create', updateArea);
        map.off('draw.delete', updateArea);
        map.off('draw.update', updateArea);
        map.removeControl(drawRef.current);
        drawRef.current = null;
      }
    };
  }, [mapRef, showDrawControls, updateArea]);

  if (!showDrawControls) return null;

  return (
    <div className="calculation-box">
      <p>Draw a polygon using the draw tools.</p>
      {area !== null && (
        <div id="calculated-area">
          <p><strong>{area}</strong></p>
          <p>square meters</p>
        </div>
      )}
    </div>
  );
}

export default React.memo(DrawControl);