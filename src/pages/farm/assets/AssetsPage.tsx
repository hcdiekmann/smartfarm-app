import React, { useState } from 'react';
import { useFetchAssets, Asset } from '@/hooks/assets/useAssets';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { useFarm } from '@/provider/FarmProvider';
import { AddAssetDialog } from './AddAssetDialog';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

const AssetsPage: React.FC = () => {
  const { currentFarm } = useFarm();
  const { data: assets, isPending, isError, error } = useFetchAssets(currentFarm?.id);
  const [isAddAssetDialogOpen, setIsAddAssetDialogOpen] = useState(false);

  if (isPending) return <div>Loading assets...</div>;
  if (isError) return <div>Error loading assets: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assets</h1>
        <Button onClick={() => setIsAddAssetDialogOpen(true)}>
          <CirclePlus className="mr-2 h-4 w-4" /> Add Asset
        </Button>
      </div>

      <AddAssetDialog
        isOpen={isAddAssetDialogOpen}
        setIsOpen={setIsAddAssetDialogOpen}
      />

      <DataTable columns={columns} data={assets || []} />
      
    </div>
  );
};

export default AssetsPage;