import { useState, useEffect } from "react";
import Map, { Layer, Source, Popup, MapStyle } from "react-map-gl"; // Import Layer and Source components
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { noLabels, labels } from "protomaps-themes-base";
import { Protocol } from "pmtiles";
import { supabase } from "../api/supabase/client";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";

type MapTheme = "light" | "dark";

export default function MapComponent() {
  const [showPOIs, setShowPOIs] = useState(false);
  const [mapTheme, setMapTheme] = useState<MapTheme>("light");
  const [popupInfo, setPopupInfo] = useState<any>(null);

  const baseLayers = noLabels("protomaps", mapTheme);
  const labelsLayer = labels("protomaps", mapTheme);

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
      "circle-stroke-color": `${mapTheme === "dark" ? "black" : "white"}`,
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
      "text-halo-color": `${mapTheme === "dark" ? "black" : "white"}`,
    },
  };

  useEffect(() => {
    let protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
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

    setPopupInfo((prev: any) => ({
      ...prev,
      details: data,
    }));
  };

  const handleMapClick = (event: any) => {
    const feature = event.features && event.features[0];
    if (feature) {
      setPopupInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        properties: feature.properties,
      });
    } else {
      setPopupInfo(null);
    }
  };

  const renderDetails = (details: any) => {
    return (
      <div className="mt-2 p-2 bg-gray-100 rounded">
        <div>
          <strong>Websites:</strong>{" "}
          {details.websites ? details.websites.join(", ") : "None"}
        </div>
        <div>
          <strong>Socials:</strong>{" "}
          {details.socials ? details.socials.join(", ") : "None"}
        </div>
        <div>
          <strong>Phones:</strong>{" "}
          {details.phones ? details.phones.join(", ") : "None"}
        </div>
        <div>
          <strong>Addresses:</strong>
          {details.addresses ? (
            details.addresses.map((address: any, index: number) => (
              <div key={index} className="ml-4">
                {address.freeform && <div>{address.freeform}</div>}
                {address.locality && <div>{address.locality}</div>}
                {address.postcode && <div>{address.postcode}</div>}
                {address.region && <div>{address.region}</div>}
                {address.country && <div>{address.country}</div>}
              </div>
            ))
          ) : (
            <div>None</div>
          )}
        </div>
        <div>
          <strong>Source:</strong> {details.source}
        </div>
      </div>
    );
  };

  // Define the complete style object
  const mapStyle: MapStyle = {
    version: 8,
    glyphs:
      "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
    sources: {
      protomaps: {
        type: "vector",
        url: "pmtiles://https://amvlpfduasiuxfoevnry.supabase.co/storage/v1/object/public/public-maps/namibia.pmtiles",
        attribution:
          '<a href="https://github.com/protomaps/basemaps">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
      },
      supabase: {
        type: "vector",
        tiles: ["supabase://namibia/{z}/{x}/{y}"],
        attribution:
          '© <a href="https://overturemaps.org">Overture Maps Foundation</a>',
      },
    },
    layers: [
      ...baseLayers,
      ...labelsLayer,
      ...(showPOIs ? [overtureLayers, overturePOIsText] : []),
    ],
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showPOIs"
            checked={showPOIs}
            onCheckedChange={handleCheckboxChange}
          />
          <label
            htmlFor="showPOIs"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Public POIs
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="mapTheme"
            checked={mapTheme === "dark"}
            onCheckedChange={() =>
              setMapTheme(mapTheme === "dark" ? "light" : "dark")
            }
          />
          <label
            htmlFor="showPOIs"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Dark
          </label>
        </div>
      </div>
      <Map
        cursor="pointer"
        initialViewState={{
          longitude: 24,
          latitude: -20,
          zoom: 3,
        }}
        style={{ width: "100%", height: "32em", borderRadius: "6px" }}
        attributionControl={true}
        mapStyle={mapStyle}
        //@ts-ignore
        mapLib={maplibregl}
        interactiveLayerIds={["overture-pois", "overture-pois-text"]}
        onClick={handleMapClick}
      >
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
            anchor="top"
          >
            <div className="p-2 bg-white rounded-lg shadow-md">
              <table className="text-sm text-left text-gray-500">
                <tbody>
                  <tr>
                    <td className="font-semibold text-gray-900">
                      {popupInfo.properties.primary_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-900">
                      {popupInfo.properties.main_category}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        className="cursor-pointer text-blue-500 underline"
                        onClick={() => loadDetails(popupInfo.properties.id)}
                      >
                        Show details
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              {popupInfo.details && renderDetails(popupInfo.details)}
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
}
