import { useFetchAssets } from '@/hooks/farm/useAssets';
import { useFarm } from '@/provider/FarmProvider';
import { columns } from './data-table/columns';
import { DataTable } from '@/pages/farm/assets/data-table/data-table';
import AssetsPageSkeleton from './AssetPageSkeleton';
import AddAssetDropdown from './AddAssetDropdown';

const AssetsPage = () => {
  const { currentFarm } = useFarm();
  const { data: fetchedAssets, isPending } = useFetchAssets(currentFarm?.id);

  if (isPending) return <AssetsPageSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Assets</h1>
        <AddAssetDropdown />
      </div>

      <DataTable columns={columns} data={fetchedAssets || []} />
    </div>
  );
};

export default AssetsPage;