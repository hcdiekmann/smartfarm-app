import React, { useState } from 'react';
import { useFetchAssets } from '@/hooks/assets/useAssets';
import { Button } from '@/components/ui/button';
import { ChevronDown, CirclePlus } from 'lucide-react';
import { useFarm } from '@/provider/FarmProvider';
import { AddAssetDialog } from './AddAssetDialog';
import { columns } from './data-table/columns';
import { DataTable } from '@/pages/farm/assets/data-table/data-table';
import AssetsPageSkeleton from './AssetPageSkeleton';

const AssetsPage: React.FC = () => {
  const { currentFarm } = useFarm();
  const { data: assets, isPending } = useFetchAssets(currentFarm?.id);
  const [isAddAssetDialogOpen, setIsAddAssetDialogOpen] = useState(false);

  if (isPending) return <AssetsPageSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assets</h1>
        <Button onClick={() => setIsAddAssetDialogOpen(true)}>
          <CirclePlus className="mr-2 h-4 w-4" /> 
          Add Asset
          <ChevronDown className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Change to using a dropdown of asset types linking to a specific page*/}

      <AddAssetDialog
        isOpen={isAddAssetDialogOpen}
        setIsOpen={setIsAddAssetDialogOpen}
      />

      <DataTable columns={columns} data={assets || []} />
      
    </div>
  );
};

export default AssetsPage;