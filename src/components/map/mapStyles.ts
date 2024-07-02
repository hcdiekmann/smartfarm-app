import type { MapStyle } from 'react-map-gl';
import { noLabels, labels } from "protomaps-themes-base";

type MapTheme = "light" | "dark";

const darkThemeColors = {
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
  
  const lightThemeColors = {
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

export const getBaseLayers = (theme: MapTheme) => noLabels("protomaps", theme);
export const getLabelsLayer = (theme: MapTheme) => labels("protomaps", theme);

export const getOvertureLayers = (theme: MapTheme) => ({
  id: "overture-pois",
  type: "circle",
  source: "supabase",
  "source-layer": "places",
  paint: {
    "circle-color": [
      "case",
      ["==", ["get", "main_category"], "beauty_salon"],
      theme === "dark" ? darkThemeColors.beauty_salon : lightThemeColors.beauty_salon,
      ["==", ["get", "main_category"], "hotel"],
      theme === "dark" ? darkThemeColors.hotel : lightThemeColors.hotel,
      ["==", ["get", "main_category"], "landmark_and_historical_building"],
      theme === "dark" ? darkThemeColors.landmark_and_historical_building : lightThemeColors.landmark_and_historical_building,
      ["==", ["get", "main_category"], "professional_services"],
      theme === "dark" ? darkThemeColors.professional_services : lightThemeColors.professional_services,
      ["==", ["get", "main_category"], "shopping"],
      theme === "dark" ? darkThemeColors.shopping : lightThemeColors.shopping,
      ["==", ["get", "main_category"], "restaurant"],
      theme === "dark" ? darkThemeColors.restaurant : lightThemeColors.restaurant,
      ["==", ["get", "main_category"], "school"],
      theme === "dark" ? darkThemeColors.school : lightThemeColors.school,
      ["==", ["get", "main_category"], "accommodation"],
      theme === "dark" ? darkThemeColors.accommodation : lightThemeColors.accommodation,
      theme === "dark" ? darkThemeColors.default : lightThemeColors.default,
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
      theme === "dark" ? darkThemeColors.beauty_salon : lightThemeColors.beauty_salon,
      ["==", ["get", "main_category"], "hotel"],
      theme === "dark" ? darkThemeColors.hotel : lightThemeColors.hotel,
      ["==", ["get", "main_category"], "landmark_and_historical_building"],
      theme === "dark" ? darkThemeColors.landmark_and_historical_building : lightThemeColors.landmark_and_historical_building,
      ["==", ["get", "main_category"], "professional_services"],
      theme === "dark" ? darkThemeColors.professional_services : lightThemeColors.professional_services,
      ["==", ["get", "main_category"], "shopping"],
      theme === "dark" ? darkThemeColors.shopping : lightThemeColors.shopping,
      ["==", ["get", "main_category"], "restaurant"],
      theme === "dark" ? darkThemeColors.restaurant : lightThemeColors.restaurant,
      ["==", ["get", "main_category"], "school"],
      theme === "dark" ? darkThemeColors.school : lightThemeColors.school,
      ["==", ["get", "main_category"], "accommodation"],
      theme === "dark" ? darkThemeColors.accommodation : lightThemeColors.accommodation,
      theme === "dark" ? darkThemeColors.default : lightThemeColors.default,
    ],
    "text-halo-width": 1,
    "text-halo-color": theme === "dark" ? "black" : "white",
  },
});

export const getMapStyle = (theme: MapTheme, showPOIs: boolean): MapStyle => {
    const baseLayers = getBaseLayers(theme);
    const labelsLayer = getLabelsLayer(theme);
  
    return {
      version: 8,
      name: `${theme}-theme`,
      glyphs: "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
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