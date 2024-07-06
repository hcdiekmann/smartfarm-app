import { PopupInfo } from "@/map.types";
import { POIPopup } from "./popups/POIPopup";
import { AssetPopup } from "./popups/AssetPopup";

type PopupContentProps = {
  info: PopupInfo;
  expanded: boolean;
  onToggleExpanded: () => void;
};

export function PopupContent({ info, expanded, onToggleExpanded }: PopupContentProps) {

  switch (info.type) {
    case 'public_poi':
      return <POIPopup info={info} expanded={expanded} onToggleExpanded={onToggleExpanded} />;
    case 'custom_asset':
      return <AssetPopup info={info} expanded={expanded} onToggleExpanded={onToggleExpanded} />;
    default:
      return null;
  }
}