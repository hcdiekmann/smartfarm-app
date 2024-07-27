import React, { useState, useCallback, useRef } from 'react';
import MapLibreDraw from "@hyvilo/maplibre-gl-draw";
import { useControl, ControlPosition } from 'react-map-gl/maplibre';
import * as turf from '@turf/turf';
import { MapContextValue } from 'react-map-gl/dist/esm/components/map';

type DrawControlProps = {
  position?: ControlPosition;
};

function DrawControl({ position = "top-left" }: DrawControlProps) {
  const drawRef = useRef<MapLibreDraw | null>(null);
  const [area, setArea] = useState<number | null>(null);

  const updateArea = useCallback(() => {
    if (drawRef.current) {
      const data = drawRef.current.getAll();
      console.log('Draw data:', data);
      if (data.features.length > 0) {
        const area = turf.area(data);
        const roundedArea = Math.round(area * 100) / 100;
        setArea(roundedArea);
      } else {
        setArea(null);
      }
    }
  }, []);

  useControl<MapLibreDraw>(
    () => {
      drawRef.current = new MapLibreDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          // point: true, // use this for point drawing
          trash: true,
        },
        defaultMode: 'draw_polygon'
      });
      return drawRef.current;
    },
    ({ map }: MapContextValue) => {
      map.on('draw.create', updateArea);
      map.on('draw.delete', updateArea);
      map.on('draw.update', updateArea);
    },
    ({ map }: MapContextValue) => {
      if (drawRef.current) {
        map.off('draw.create', updateArea);
        map.off('draw.delete', updateArea);
        map.off('draw.update', updateArea);
      }
    },
    {
      position
    }
  );

  return (
    <div className="p-4 h-75 w-150 absolute bottom-12 left-2 bg-white bg-opacity-80 text-left rounded-sm">
      <p className="m-0 text-sm underline">
        {area ? 'Area:' : 'Draw a valid polygon'}
      </p>
      {area && (
        <div className='pt-1'>
          <p className="m-0 text-xs text-right">
            <strong>{(area / 10000).toFixed(2)}</strong> ha 
          </p>
          <p className="m-0 text-xs text-right">
            <strong>{area.toLocaleString()}</strong> m² 
          </p>
        </div>
      )}
    </div>
  );
}

export default React.memo(DrawControl);