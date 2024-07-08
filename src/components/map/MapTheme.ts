import type { MapStyle } from "react-map-gl";
import { noLabels, labels } from "protomaps-themes-base";
import { LayerSpecification } from "maplibre-gl";
import { mapSources } from "./mapSources";

export type MapTheme = 'light' | 'dark' | 'satellite' ;

export const getMapStyle = (theme: MapTheme, showPOIs: boolean): MapStyle => {
  let baseLayers: LayerSpecification[];
  let labelsLayer: LayerSpecification[];

  if (theme === "satellite") {
    // MapTiler for satellite theme
    baseLayers = getMaptilerBaseLayers();
    labelsLayer = getMaptilerLabelsLayer();
  } else {
    // Protomaps for light and dark themes
    baseLayers = getProtomapsBaseLayers(theme);
    labelsLayer = getProtomapsLabelsLayer(theme);
  }

  return {
    version: 8,
    name: `${theme}-theme`,
    glyphs:
      "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
    sources: mapSources,
    layers: [
      ...baseLayers,
      ...labelsLayer,
      ...(showPOIs
        ? [getOverturePOIsCircle(theme), getOverturePOIsText(theme) as any]
        : []),
    ],
  };
};

const getMaptilerBaseLayers = (): LayerSpecification[] => {
  return [
    {
      id: "satellite",
      type: "raster",
      source: "maptiler_satellite",
      minzoom: 0,
      maxzoom: 22,
    },
  ];
}

const getMaptilerLabelsLayer = (): LayerSpecification[] => {
  return [
    {
      id: "maptiler-labels-water",
      type: "symbol",
      source: "maptiler_labels",
      "source-layer": "water_name",
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 14,
      },
      paint: {
        "text-color": "rgba(255, 255, 255, 0.8)",
        "text-halo-color": "rgba(0, 0, 0, 0.7)",
        "text-halo-width": 1,
      },
    },
    {
      id: "maptiler-labels-roads",
      type: "symbol",
      source: "maptiler_labels",
      "source-layer": "transportation_name",
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "symbol-placement": "line",
      },
      paint: {
        "text-color": "rgba(255, 255, 255, 0.8)",
        "text-halo-color": "rgba(0, 0, 0, 0.7)",
        "text-halo-width": 1,
      },
    },
    {
      id: "maptiler-labels-places",
      type: "symbol",
      source: "maptiler_labels",
      "source-layer": "place",
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Noto Sans Regular"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 3, 12, 13, 22],
      },
      paint: {
        "text-color": "rgba(255, 255, 255, 0.8)",
        "text-halo-color": "rgba(0, 0, 0, 0.7)",
        "text-halo-width": 1,
      },
    },
  ];
};

const getProtomapsBaseLayers = (theme: MapTheme): LayerSpecification[] => {
  return noLabels("protomaps", theme);
};

const getProtomapsLabelsLayer = (theme: MapTheme): LayerSpecification[] => {
  return labels("protomaps", theme);
};

const darkOverturePOIsColors = {
  beauty_salon: "#fb9a99",
  hotel: "#33a02c",
  landmark_and_historical_building: "#a6cee3",
  professional_services: "#fdbf6f",
  shopping: "#e31a1c",
  restaurant: "#ff7f00",
  school: "#045a8d",
  accommodation: "#b2df8a",
  default: "#cab2d6",
};

const lightOverturePOIsColors = {
  beauty_salon: "#d4006a",
  hotel: "#006d2c",
  landmark_and_historical_building: "#08519c",
  professional_services: "#bd6e00",
  shopping: "#a50f15",
  restaurant: "#b30000",
  school: "#045a8d",
  accommodation: "#238b45",
  default: "#6a51a3",
};

const satelliteOverturePOIsColors = {
  beauty_salon: "#ff80ab",
  hotel: "#69f0ae",
  landmark_and_historical_building: "#40c4ff",
  professional_services: "#ffff00",
  shopping: "#ff5252",
  restaurant: "#ff9800",
  school: "#1e88e5",
  accommodation: "#76ff03",
  default: "#ffffff",
};


const getOverturePOIsCircle = (theme: MapTheme) => ({
  id: "overture-pois",
  type: "circle",
  source: "supabase",
  "source-layer": "places",
  paint: {
    "circle-color": [
      "case",
      ["==", ["get", "main_category"], "beauty_salon"],
      theme === "dark"
        ? darkOverturePOIsColors.beauty_salon
        : theme === "light"
        ? lightOverturePOIsColors.beauty_salon
        : satelliteOverturePOIsColors.beauty_salon,
      ["==", ["get", "main_category"], "hotel"],
      theme === "dark"
        ? darkOverturePOIsColors.hotel
        : theme === "light"
        ? lightOverturePOIsColors.hotel
        : satelliteOverturePOIsColors.hotel,
      ["==", ["get", "main_category"], "landmark_and_historical_building"],
      theme === "dark"
        ? darkOverturePOIsColors.landmark_and_historical_building
        : theme === "light"
        ? lightOverturePOIsColors.landmark_and_historical_building
        : satelliteOverturePOIsColors.landmark_and_historical_building,
      ["==", ["get", "main_category"], "professional_services"],
      theme === "dark"
        ? darkOverturePOIsColors.professional_services
        : theme === "light"
        ? lightOverturePOIsColors.professional_services
        : satelliteOverturePOIsColors.professional_services,
      ["==", ["get", "main_category"], "shopping"],
      theme === "dark"
        ? darkOverturePOIsColors.shopping
        : theme === "light"
        ? lightOverturePOIsColors.shopping
        : satelliteOverturePOIsColors.shopping,
      ["==", ["get", "main_category"], "restaurant"],
      theme === "dark"
        ? darkOverturePOIsColors.restaurant
        : theme === "light"
        ? lightOverturePOIsColors.restaurant
        : satelliteOverturePOIsColors.restaurant,
      ["==", ["get", "main_category"], "school"],
      theme === "dark"
        ? darkOverturePOIsColors.school
        : theme === "light"
        ? lightOverturePOIsColors.school
        : satelliteOverturePOIsColors.school,
      ["==", ["get", "main_category"], "accommodation"],
      theme === "dark"
        ? darkOverturePOIsColors.accommodation
        : theme === "light"
        ? lightOverturePOIsColors.accommodation
        : satelliteOverturePOIsColors.accommodation,
      theme === "dark"
        ? darkOverturePOIsColors.default
        : theme === "light"
        ? lightOverturePOIsColors.default
        : satelliteOverturePOIsColors.default,
    ],
    "circle-radius": ["interpolate", ["exponential", 2], ["zoom"], 0, 1, 19, 8],
    "circle-stroke-width": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      12,
      0,
      14,
      2,
    ],
    "circle-stroke-color": theme === 'satellite' ? "black" : theme === "dark" ? "black" : "white",
  },
});

const getOverturePOIsText = (theme: MapTheme) => ({
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
      theme === "dark"
        ? darkOverturePOIsColors.beauty_salon
        : theme === "light"
        ? lightOverturePOIsColors.beauty_salon
        : satelliteOverturePOIsColors.beauty_salon,
      ["==", ["get", "main_category"], "hotel"],
      theme === "dark"
        ? darkOverturePOIsColors.hotel
        : theme === "light"
        ? lightOverturePOIsColors.hotel
        : satelliteOverturePOIsColors.hotel,
      ["==", ["get", "main_category"], "landmark_and_historical_building"],
      theme === "dark"
        ? darkOverturePOIsColors.landmark_and_historical_building
        : theme === "light"
        ? lightOverturePOIsColors.landmark_and_historical_building
        : satelliteOverturePOIsColors.landmark_and_historical_building,
      ["==", ["get", "main_category"], "professional_services"],
      theme === "dark"
        ? darkOverturePOIsColors.professional_services
        : theme === "light"
        ? lightOverturePOIsColors.professional_services
        : satelliteOverturePOIsColors.professional_services,
      ["==", ["get", "main_category"], "shopping"],
      theme === "dark"
        ? darkOverturePOIsColors.shopping
        : theme === "light"
        ? lightOverturePOIsColors.shopping
        : satelliteOverturePOIsColors.shopping,
      ["==", ["get", "main_category"], "restaurant"],
      theme === "dark"
        ? darkOverturePOIsColors.restaurant
        : theme === "light"
        ? lightOverturePOIsColors.restaurant
        : satelliteOverturePOIsColors.restaurant,
      ["==", ["get", "main_category"], "school"],
      theme === "dark"
        ? darkOverturePOIsColors.school
        : theme === "light"
        ? lightOverturePOIsColors.school
        : satelliteOverturePOIsColors.school,
      ["==", ["get", "main_category"], "accommodation"],
      theme === "dark"
        ? darkOverturePOIsColors.accommodation
        : theme === "light"
        ? lightOverturePOIsColors.accommodation
        : satelliteOverturePOIsColors.accommodation,
      theme === "dark"
        ? darkOverturePOIsColors.default
        : theme === "light"
        ? lightOverturePOIsColors.default
        : satelliteOverturePOIsColors.default,
    ],
    "text-halo-width": 1,
    "text-halo-color": theme === 'satellite' ? "black" : theme === "dark" ? "black" : "white",
  },
});
