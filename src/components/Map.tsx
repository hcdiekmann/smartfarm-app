import { useState, useEffect } from "react";
import Map, { Popup } from "react-map-gl"; // exports-mapbox.d.ts
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { noLabels, labels } from "protomaps-themes-base";
import { Protocol } from "pmtiles";
import { supabase } from "../api/supabase/client";

export default function MapComponent() {
  const [showPOIs, setShowPOIs] = useState(true);

  const baseLayers = noLabels("protomaps", "dark");
  const labelsLayer = labels("protomaps", "dark");
  const overtureLayers: any = {
    id: "overture-pois",
    type: "circle",
    source: "supabase",
    "source-layer": "places",
    paint: {
      "circle-color": [
        "case",
        ["==", ["get", "main_category"], "beauty_salon"],
        "#fb9a99",
        ["==", ["get", "main_category"], "hotel"],
        "#33a02c",
        ["==", ["get", "main_category"], "landmark_and_historical_building"],
        "#a6cee3",
        ["==", ["get", "main_category"], "professional_services"],
        "#fdbf6f",
        ["==", ["get", "main_category"], "shopping"],
        "#e31a1c",
        ["==", ["get", "main_category"], "restaurant"],
        "#1f78b4",
        ["==", ["get", "main_category"], "school"],
        "#ff7f00",
        ["==", ["get", "main_category"], "accommodation"],
        "#b2df8a",
        "#cab2d6",
      ],
      "circle-radius": [
        "interpolate",
        ["exponential", 2],
        ["zoom"],
        0,
        1,
        19,
        8,
      ],
      "circle-stroke-width": [
        "interpolate",
        ["exponential", 2],
        ["zoom"],
        12,
        0,
        14,
        2,
      ],
      "circle-stroke-color": "black",
    },
  };

  const overturePOIsText: any = {
    id: "overture-pois-text",
    type: "symbol",
    source: "supabase",
    "source-layer": "places",
    layout: {
      "text-field": "{primary_name}",
      "text-font": ["Noto Sans Regular"],
      "text-size": 10,
    },
    paint: {
      "text-color": [
        "case",
        ["==", ["get", "main_category"], "beauty_salon"],
        "#fb9a99",
        ["==", ["get", "main_category"], "hotel"],
        "#33a02c",
        ["==", ["get", "main_category"], "landmark_and_historical_building"],
        "#a6cee3",
        ["==", ["get", "main_category"], "professional_services"],
        "#fdbf6f",
        ["==", ["get", "main_category"], "shopping"],
        "#e31a1c",
        ["==", ["get", "main_category"], "restaurant"],
        "#1f78b4",
        ["==", ["get", "main_category"], "school"],
        "#ff7f00",
        ["==", ["get", "main_category"], "accommodation"],
        "#b2df8a",
        "#cab2d6",
      ],
      "text-halo-width": 1,
      "text-halo-color": "black",
    },
  };

  useEffect(() => {
    let protocol = new Protocol();
    // for basemap from storage bucket
    maplibregl.addProtocol("pmtiles", protocol.tile);

    // for PostGIS MVT RPC from places table
    maplibregl.addProtocol(
      "supabase",
      async (
        params: maplibregl.RequestParameters
      ): Promise<maplibregl.GetResourceResponse<ArrayBufferLike>> => {
        const re = new RegExp(/supabase:\/\/(.+)\/(\d+)\/(\d+)\/(\d+)/);
        const result = params.url.match(re);
        if (!result) {
          throw new Error("Invalid URL format");
        }
        const z = parseInt(result[2]);
        const x = parseInt(result[3]);
        const y = parseInt(result[4]);

        const { data, error } = await supabase.rpc("mvt", { z, x, y });
        if (!error) {
          if (data != null) {
            const encoded = base64ToArrayBuffer(data);
            return { data: encoded };
          }
        } else {
          throw new Error(`Tile fetch error: ${error?.message}`);
        }
        return { data: new ArrayBuffer(0) };
      }
    );

    return () => {
      maplibregl.removeProtocol("pmtiles");
      maplibregl.removeProtocol("supabase");
    };
  }, []);

  function base64ToArrayBuffer(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  const handleCheckboxChange = () => {
    setShowPOIs(!showPOIs);
  };

  const loadDetails = async (id: string) => {
    const { data, error } = await supabase
      .from("places")
      .select(
        `
        websites,
        socials,
        phones,
        addresses,
        source: sources->0->dataset
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }
  };

  return (
    <>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showPOIs}
            onChange={handleCheckboxChange}
          />
          {" "}Public POI
        </label>
      </div>
      <Map
        style={{ width: "100%", height: "400px", borderRadius: "8px" }}
        mapStyle={{
          version: 8,
          glyphs:
            "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
          sources: {
            protomaps: {
              attribution:
                '<a href="https://github.com/protomaps/basemaps">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
              type: "vector",
              url: "pmtiles://https://amvlpfduasiuxfoevnry.supabase.co/storage/v1/object/public/public-maps/namibia.pmtiles",
            },
            supabase: {
              type: "vector",
              tiles: ["supabase://namibia/{z}/{x}/{y}"],
              attribution:
                '© <a href="https://overturemaps.org">Overture Maps Foundation</a>',
            },
          },
          layers: [
            ...(baseLayers as any),
            ...(labelsLayer as any),
            ...(showPOIs ? [overtureLayers, overturePOIsText] : []),
          ],
        }}
        // @ts-ignore
        mapLib={maplibregl}
      />
    </>
  );
}
