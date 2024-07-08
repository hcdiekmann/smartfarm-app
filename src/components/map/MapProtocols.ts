import maplibregl from 'maplibre-gl';
import { Protocol } from 'pmtiles';
import { supabase } from '@/api/supabase/client';
import { base64ToArrayBuffer } from '@/utils/utils';

export function initializeMapProtocols() {
  const pmtilesProtocol = new Protocol();
  
  maplibregl.addProtocol("pmtiles", pmtilesProtocol.tile);
  maplibregl.addProtocol("supabase", createSupabaseProtocol());

  return () => {
    maplibregl.removeProtocol("pmtiles");
    maplibregl.removeProtocol("supabase");
  };
}

function createSupabaseProtocol() {
  return async (
    params: maplibregl.RequestParameters
  ): Promise<maplibregl.GetResourceResponse<ArrayBufferLike>> => {
    const re = new RegExp(/supabase:\/\/(.+)\/(\d+)\/(\d+)\/(\d+)/);
    const result = params.url.match(re);
    if (!result) {
      throw new Error("Invalid URL format");
    }
    const [, relation, zStr, xStr, yStr] = result;
    const z = parseInt(zStr);
    const x = parseInt(xStr);
    const y = parseInt(yStr);

    try {
      const { data, error } = await supabase.rpc("mvt", { relation, z, x, y });
      if (error) throw error;
      if (data !== null) {
        const encoded = base64ToArrayBuffer(data);
        return { data: encoded };
      }
    } catch (error) {
      console.error('Tile fetch error:', error);
    }
    return { data: new ArrayBuffer(0) };
  };
}