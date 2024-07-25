import { SourceSpecification } from "maplibre-gl";

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

export const mapSources: { [key: string]: SourceSpecification } = {
  protomaps: {
    type: "vector",
    url: "pmtiles://https://amvlpfduasiuxfoevnry.supabase.co/storage/v1/object/public/public-maps/namibia.pmtiles",
    attribution: '<a href="https://protomaps.com/">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
  },
  supabase: {
    type: "vector",
    tiles: ["supabase://places/{z}/{x}/{y}"],
    attribution: '© <a href="https://overturemaps.org">Overture Maps Foundation</a>',
  },
  maptiler_satellite: {
    type: "raster",
    tiles: [`https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=${MAPTILER_API_KEY}`],
    tileSize: 512,
    maxzoom: 22,
  },
  maptiler_labels: {
    type: "vector",
    url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${MAPTILER_API_KEY}`,
  }
};