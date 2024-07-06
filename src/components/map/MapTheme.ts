
import type { MapTheme } from '@/map.types';
import type { MapStyle } from 'react-map-gl';
import { noLabels, labels } from "protomaps-themes-base";
import { LayerSpecification } from 'maplibre-gl';

 const getBaseLayers = (theme: MapTheme) => noLabels("protomaps", theme);
 const getLabelsLayer = (theme: MapTheme) => labels("protomaps", theme);

 const darkOverturePOIsColors = {
  beauty_salon: "#fb9a99",
  hotel: "#33a02c",
  landmark_and_historical_building: "#a6cee3",
  professional_services: "#fdbf6f",
  shopping: "#e31a1c",
  restaurant: "#1f78b4",
  school: "#ff7f00",
  accommodation: "#b2df8a",
  default: "#cab2d6",
};

const lightOverturePOIsColors = {
  beauty_salon: "#d4006a",
  hotel: "#006d2c",
  landmark_and_historical_building: "#08519c",
  professional_services: "#bd6e00",
  shopping: "#a50f15",
  restaurant: "#045a8d",
  school: "#b30000",
  accommodation: "#238b45",
  default: "#6a51a3",
};

 const getOvertureLayers = (theme: MapTheme) => ({
  id: "overture-pois",
  type: "circle",
  source: "supabase",
  "source-layer": "places",
  paint: {
    "circle-color": [
      "case",
      ["==", ["get", "main_category"], "beauty_salon"],
      theme === "dark" ? darkOverturePOIsColors.beauty_salon : lightOverturePOIsColors.beauty_salon,
      ["==", ["get", "main_category"], "hotel"],
      theme === "dark" ? darkOverturePOIsColors.hotel : lightOverturePOIsColors.hotel,
      ["==", ["get", "main_category"], "landmark_and_historical_building"],
      theme === "dark" ? darkOverturePOIsColors.landmark_and_historical_building : lightOverturePOIsColors.landmark_and_historical_building,
      ["==", ["get", "main_category"], "professional_services"],
      theme === "dark" ? darkOverturePOIsColors.professional_services : lightOverturePOIsColors.professional_services,
      ["==", ["get", "main_category"], "shopping"],
      theme === "dark" ? darkOverturePOIsColors.shopping : lightOverturePOIsColors.shopping,
      ["==", ["get", "main_category"], "restaurant"],
      theme === "dark" ? darkOverturePOIsColors.restaurant : lightOverturePOIsColors.restaurant,
      ["==", ["get", "main_category"], "school"],
      theme === "dark" ? darkOverturePOIsColors.school : lightOverturePOIsColors.school,
      ["==", ["get", "main_category"], "accommodation"],
      theme === "dark" ? darkOverturePOIsColors.accommodation : lightOverturePOIsColors.accommodation,
      theme === "dark" ? darkOverturePOIsColors.default : lightOverturePOIsColors.default,
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
    "circle-stroke-color": theme === "dark" ? "black" : "white",
  },
});

export const getOverturePOIsText = (theme: MapTheme) => ({
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
      theme === "dark" ? darkOverturePOIsColors.beauty_salon : lightOverturePOIsColors.beauty_salon,
      ["==", ["get", "main_category"], "hotel"],
      theme === "dark" ? darkOverturePOIsColors.hotel : lightOverturePOIsColors.hotel,
      ["==", ["get", "main_category"], "landmark_and_historical_building"],
      theme === "dark" ? darkOverturePOIsColors.landmark_and_historical_building : lightOverturePOIsColors.landmark_and_historical_building,
      ["==", ["get", "main_category"], "professional_services"],
      theme === "dark" ? darkOverturePOIsColors.professional_services : lightOverturePOIsColors.professional_services,
      ["==", ["get", "main_category"], "shopping"],
      theme === "dark" ? darkOverturePOIsColors.shopping : lightOverturePOIsColors.shopping,
      ["==", ["get", "main_category"], "restaurant"],
      theme === "dark" ? darkOverturePOIsColors.restaurant : lightOverturePOIsColors.restaurant,
      ["==", ["get", "main_category"], "school"],
      theme === "dark" ? darkOverturePOIsColors.school : lightOverturePOIsColors.school,
      ["==", ["get", "main_category"], "accommodation"],
      theme === "dark" ? darkOverturePOIsColors.accommodation : lightOverturePOIsColors.accommodation,
      theme === "dark" ? darkOverturePOIsColors.default : lightOverturePOIsColors.default,
    ],
    "text-halo-width": 1,
    "text-halo-color": theme === "dark" ? "black" : "white",
  },
});


export const getMapStyle = (theme: MapTheme, showPOIs: boolean): MapStyle => {
    const baseLayers: LayerSpecification[] = getBaseLayers(theme);
    const labelsLayer: LayerSpecification[] = getLabelsLayer(theme);
  
    return {
      version: 8,
      name: `${theme}-theme`,
      glyphs: "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
      // extract sources from getMapStyle into seprate and pass from the MapView component
      sources: {
        protomaps: {
          type: "vector",
          url: "pmtiles://https://amvlpfduasiuxfoevnry.supabase.co/storage/v1/object/public/public-maps/namibia.pmtiles",
          attribution: '<a href="https://github.com/protomaps/basemaps">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
        },
        supabase: {
          type: "vector",
          tiles: ["supabase://places/{z}/{x}/{y}"],
          attribution: '© <a href="https://overturemaps.org">Overture Maps Foundation</a>',
        },
      },
      layers: [
        ...baseLayers, 
        ...labelsLayer,
        ...(showPOIs ? [getOvertureLayers(theme), getOverturePOIsText(theme) as any] : []),
      ],
    };
  };