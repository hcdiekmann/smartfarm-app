import maplibregl from 'maplibre-gl';
import { Protocol } from 'pmtiles';
import { supabase } from '@/api/supabase/client';
import { base64ToArrayBuffer } from '@/utils/utils';

export function initializeMapProtocols() {
  const pmtilesProtocol = new Protocol();
  
  maplibregl.addProtocol("pmtiles", pmtilesProtocol.tile);
  maplibregl.addProtocol("supabase", createSupabaseProtocol()); // fix this to work with Maplibre 3.x
  
  return () => {
    maplibregl.removeProtocol("pmtiles");
    maplibregl.removeProtocol("supabase");
  };
}

function createSupabaseProtocol() {
  return (params: maplibregl.RequestParameters, callback: maplibregl.ResponseCallback<any>) => {
    const re = new RegExp(/supabase:\/\/(.+)\/(\d+)\/(\d+)\/(\d+)/);
    const result = params.url.match(re);
    if (!result) {
      callback(new Error("Invalid URL format"));
      return { cancel: () => {} };
    }
    const [, relation, zStr, xStr, yStr] = result;
    const z = parseInt(zStr);
    const x = parseInt(xStr);
    const y = parseInt(yStr);

    supabase.rpc("mvt", { relation, z, x, y })
      .then(({ data, error }) => {
        if (error) {
          console.error('Tile fetch error:', error);
          callback(new Error('Tile fetch error'));
        } else if (data !== null) {
          const encoded = base64ToArrayBuffer(data);
          callback(null, encoded, null, null);
        } else {
          callback(null, new ArrayBuffer(0), null, null);
        }
      })

    return { cancel: () => {} };
  };
}

// This works for Maplibre v4.0.0 and above with the Promise-based protocol API
// function createSupabaseProtocol() {
//   return async (
//     params: maplibregl.RequestParameters
//   ): Promise<maplibregl.GetResourceResponse<ArrayBufferLike>> => {
//     const re = new RegExp(/supabase:\/\/(.+)\/(\d+)\/(\d+)\/(\d+)/);
//     const result = params.url.match(re);
//     if (!result) {
//       throw new Error("Invalid URL format");
//     }
//     const [, relation, zStr, xStr, yStr] = result;
//     const z = parseInt(zStr);
//     const x = parseInt(xStr);
//     const y = parseInt(yStr);

//     try {
//       const { data, error } = await supabase.rpc("mvt", { relation, z, x, y });
//       if (error) throw error;
//       if (data !== null) {
//         const encoded = base64ToArrayBuffer(data);
//         return { data: encoded };
//       }
//     } catch (error) {
//       console.error('Tile fetch error:', error);
//     }
//     return { data: new ArrayBuffer(0) };
//   };
// }