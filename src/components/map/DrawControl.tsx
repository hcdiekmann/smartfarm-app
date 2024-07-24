import React, { useState, useCallback, useRef } from 'react';
import MapLibreDraw from "@hyvilo/maplibre-gl-draw";
import { useControl, ControlPosition } from 'react-map-gl/maplibre';
import * as turf from '@turf/turf';
import { MapContextValue } from 'react-map-gl/dist/esm/components/map';

type DrawControlProps = {
  position?: ControlPosition;
};

function DrawControl({ position = "top-left" }: DrawControlProps) {
  const [area, setArea] = useState<number | null>(null);
  const drawRef = useRef<MapLibreDraw | null>(null);

  const updateArea = useCallback(() => {
    console.log('updateArea called');
    if (drawRef.current) {
      const data = drawRef.current.getAll();
      console.log('Draw data:', data);
      if (data.features.length > 0) {
        const area = turf.area(data);
        const roundedArea = Math.round(area * 100) / 100;
        setArea(roundedArea);
        console.log('Area calculated:', roundedArea);
      } else {
        setArea(null);
        console.log('No features found');
      }
    }
  }, []);

  useControl<MapLibreDraw>(
    () => {
      drawRef.current = new MapLibreDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        },
      });
      return drawRef.current;
    },
    ({ map }: MapContextValue) => {
      console.log('Draw control added to map');
      map.on('draw.create', updateArea);
      map.on('draw.delete', updateArea);
      map.on('draw.update', updateArea);
    },
    ({ map }: MapContextValue) => {
      console.log('Cleaning up draw control');
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

  const handleDrawButtonClick = useCallback(() => {
    if (drawRef.current) {
      drawRef.current.changeMode('draw_polygon');
      console.log('Changed mode to draw_polygon');
    }
  }, []);

  return (
    <div className="calculation-box" style={{
      height: 75,
      width: 150,
      position: 'absolute',
      bottom: 40,
      left: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: 15,
      textAlign: 'center'
    }}>
      <button onClick={handleDrawButtonClick}>Start Drawing</button>
      <p style={{ fontFamily: 'Open Sans', margin: 0, fontSize: 13 }}>
        Draw a polygon using the draw tools.
      </p>
      {area !== null && (
        <div id="calculated-area">
          <p style={{ fontFamily: 'Open Sans', margin: 0, fontSize: 13 }}>
            <strong>{area}</strong>
          </p>
          <p style={{ fontFamily: 'Open Sans', margin: 0, fontSize: 13 }}>
            square meters
          </p>
        </div>
      )}
    </div>
  );
}

export default React.memo(DrawControl);