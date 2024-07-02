import "maplibre-gl/dist/maplibre-gl.css";
import { useState, useEffect } from "react";
import Map, { Popup, MapStyle } from "react-map-gl";
import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";
import { supabase } from "../../api/supabase/client";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { getMapStyle } from "./mapStyles";

type MapTheme = "light" | "dark";

export default function MapComponent() {
  const [showPOIs, setShowPOIs] = useState(false);
  const [mapTheme, setMapTheme] = useState<MapTheme>("light");
  const [mapStyle, setMapStyle] = useState<MapStyle>(
    getMapStyle(mapTheme, showPOIs)
  );
  const [popupInfo, setPopupInfo] = useState<any>(null);

  useEffect(() => {
    setMapStyle(getMapStyle(mapTheme, showPOIs));
  }, [mapTheme, showPOIs]);

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
        const relation = result[1];
        const z = parseInt(result[2]);
        const x = parseInt(result[3]);
        const y = parseInt(result[4]);

        const { data, error } = await supabase.rpc("mvt", {
          relation,
          z,
          x,
          y,
        });
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

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
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
        style={{ width: "100%", height: "36em", borderRadius: "6px" }}
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
            <div className="bg-white text rounded-lg shadow-sm">
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
    </div>
  );
}
