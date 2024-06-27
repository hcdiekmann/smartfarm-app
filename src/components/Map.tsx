import { useEffect } from "react";
import Map from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { default as layers } from 'protomaps-themes-base';
import { Protocol } from 'pmtiles';
import { supabase } from "../api/supabase/client";

export default function MapComponent() {
    useEffect(() => {
        let protocol = new Protocol();
        maplibregl.addProtocol('pmtiles', protocol.tile);
        return () => {
            maplibregl.removeProtocol('pmtiles');
        }
    }, []);

    function base64ToArrayBuffer(base64: string) {
        var binaryString = atob(base64)
        var bytes = new Uint8Array(binaryString.length)
        for (var i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        return bytes
    }

    return (
        <Map
        style={{width: '100%', height: '400px', borderRadius: '8px'}}
        mapStyle={{
            version: 8,
            glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
            sources: {
                protomaps: {
                    attribution: '<a href="https://github.com.protomaps/basemaps">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
                    type: 'vector',
                    url: 'pmtiles://https://amvlpfduasiuxfoevnry.supabase.co/storage/v1/object/public/public-maps/namibia.pmtiles'
                }
            },
            // @ts-ignore
            layers: layers('protomaps', 'dark') // or light, white, black, grayscale
        }}
        // @ts-ignore
        mapLib={maplibregl}
        />
    );

}
