import { AssetPopupInfo } from '@/map.types';

type AssetPopupProps = {
  info: AssetPopupInfo;
  expanded: boolean;
  onToggleExpanded: () => void;
};

export function AssetPopup({ info }: AssetPopupProps) {

  return (
    <div className="bg-white rounded-lg">
      <table className="text-sm text-left text-gray-500">
        <tbody>
          <tr>
            <td className="font-semibold text-gray-900">
              {info.assetName}
            </td>
          </tr>
          <tr>
            <td className="text-gray-500 text-sm">
              {/* {info.assetType} */}
            </td>
          </tr>
          <tr>
            <td>
             
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}