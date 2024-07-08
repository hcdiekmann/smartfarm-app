import { Json } from "./database.types";

export type Coordinate = {
    longitude: number;
    latitude: number;
  };
  
  export type POIPopupInfo = Coordinate & {
    type: 'public_poi';
    properties: POIProperties;
  };

  export type POIProperties = {
    id: string;
    primary_name: string;
    main_category: string;
  };
  
  export type POIDetails = {
    websites: string[] | null;
    socials: string[] | null;
    phones: string[] | null;
    addresses: Json;
    source: Json;
  };
  
  export type AssetPopupInfo = Coordinate & {
    type: 'custom_asset';
    assetId: string;
    assetName: string;
    assetType: string;
    customData?: Record<string, unknown>;
  };
  
  export type PopupInfo = POIPopupInfo | AssetPopupInfo;