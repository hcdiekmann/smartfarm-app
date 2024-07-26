import React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Asset, useDeleteAsset } from "@/hooks/assets/useAssets";

interface AssetActionsDropdownProps {
  asset: Asset;
}

export const AssetActionsDropdown: React.FC<AssetActionsDropdownProps> = ({
  asset,
}) => {
  const deleteAssetMutation = useDeleteAsset();

  const handleDelete = async () => {
    await deleteAssetMutation.mutateAsync({
      id: asset.id,
      farm_id: asset.farm_id,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
