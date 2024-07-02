import "./styles.css";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import Map, { Popup, MapStyle, MapLayerMouseEvent, MapRef } from "react-map-gl";
import { Protocol } from "pmtiles";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../../api/supabase/client";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { getMapStyle } from "./mapStyles";
import { base64ToArrayBuffer } from "@/utils/utils";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, ExternalLink, Info } from "lucide-react";

type MapTheme = "light" | "dark";

export default function MapComponent() {
  const [showPOIs, setShowPOIs] = useState(false);
  const [mapTheme, setMapTheme] = useState<MapTheme>("light");
  const [mapStyle, setMapStyle] = useState<MapStyle>(
    getMapStyle(mapTheme, showPOIs)
  );
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const mapRef = useRef<MapRef>(null);

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

  const loadDetails = async (id: string) => {
    if (popupInfo.details) {
      setShowDetails(!showDetails);
    } else {
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
        setShowDetails(false);
        console.error(error);
        return;
      }

      setPopupInfo((prev: any) => ({
        ...prev,
        details: data,
      }));
      setShowDetails(true);
    }
  };

  const handleMapClick = (event: MapLayerMouseEvent) => {
    setShowDetails(false);
    const feature = event.features && event.features[0];
    if (feature) {
      const [longitude, latitude] = event.lngLat.toArray();
      setPopupInfo({
        longitude,
        latitude,
        properties: feature.properties,
      });

      const currentZoom = mapRef.current?.getZoom() || 0;
      const centerPoint = mapRef.current?.project([longitude, latitude]);
      if (centerPoint) {
        centerPoint.y += 120; // Adjust offset from the center here
        const newCenter = mapRef.current?.unproject(centerPoint);
        // Fly to the new center
        mapRef.current?.flyTo({
          center: newCenter,
          zoom: Math.max(currentZoom, 14), // Zoom in to at least level 14
          duration: 1000, // Animation duration in milliseconds
        });
      }
    } else {
      setPopupInfo(null);
    }
  };

  const renderDetails = (details: any) => {
    return (
      <div className="text-gray-900 mt-1 p-2 bg-gray-100 rounded-lg text-sm">
        {details.websites && details.websites.length > 0 && (
          <div>
            <strong>Websites:</strong>
            <div className="flex flex-wrap gap-2">
              {details.websites.map((website: string, index: number) => (
                <Button key={index} size="sm" variant="link">
                  <ExternalLink size={16} className="mr-1" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
        {details.socials && details.socials.length > 0 && (
          <div>
            <strong>Socials:</strong>
            <div className="flex flex-wrap gap-2">
              {details.socials.map((social: string, index: number) => (
                <Button key={index} size="sm" variant="link">
                  <ExternalLink size={16} className="mr-1" />
                  <a href={social} target="_blank" rel="noopener noreferrer">
                    Visit Page
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
        {details.phones && (
          <div className="mb-1">
            <strong>Phones:</strong>
            <div className="ml-4">{details.phones.join(", ")}</div>
          </div>
        )}
        {details.addresses && (
          <div>
            <strong>Address:</strong>
            {details.addresses.map((address: any, index: number) => (
              <div key={index} className="ml-4">
                {address.freeform && <div>{address.freeform}</div>}
                {address.locality && <span>{address.locality}, </span>}
                {address.postcode && <span>{address.postcode}, </span>}
                {address.region && <span>{address.region}, </span>}
                {address.country && <span>{address.country}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const formatMainCategory = (category: string): string => {
    return category?.replace(/_/g, " ").toUpperCase();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showPOIs"
            checked={showPOIs}
            onCheckedChange={() => setShowPOIs(!showPOIs)}
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
        ref={mapRef}
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
            onClose={() => {
              setPopupInfo(null);
              setShowDetails(false);
            }}
            anchor="top"
            className="custom-popup"
            maxWidth="300px"
          >
            <div className="bg-white rounded-lg">
              <table className="text-sm text-left text-gray-500">
                <tbody>
                  <tr>
                    <td className="font-semibold text-gray-900">
                      {popupInfo.properties.primary_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 text-sm">
                      {formatMainCategory(popupInfo.properties.main_category)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => loadDetails(popupInfo.properties.id)}
                      >
                        <Info size={16} className="mr-1" />
                        {showDetails ? "Hide Details" : "Show Details"}
                        {showDetails ? (
                          <ChevronUp className="ml-1" size={16} />
                        ) : (
                          <ChevronDown className="ml-1" size={16} />
                        )}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {showDetails &&
                popupInfo.details &&
                renderDetails(popupInfo.details)}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
