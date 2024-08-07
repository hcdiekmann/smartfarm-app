import { useState } from "react";
import { Row } from "@tanstack/react-table";
import {
  Asset,
  useArchiveAsset,
  useDeleteAsset,
  useRestoreAsset,
} from "@/hooks/farm/useAssets";

import {
  MoreHorizontal,
  FilePenLine,
  Archive,
  ArchiveRestore,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const asset = row.original as Asset;
  const archiveAssetMutation = useArchiveAsset();
  const deleteAssetMutation = useDeleteAsset();
  const restoreAssetMutation = useRestoreAsset();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleArchive = async () => {
    await archiveAssetMutation.mutateAsync({
      id: asset.id,
      farm_id: asset.farm_id,
    });
  };

  const handleDelete = async () => {
    try {
      await deleteAssetMutation.mutateAsync({
        id: asset.id,
        farm_id: asset.farm_id,
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleRestore = async () => {
    await restoreAssetMutation.mutateAsync({
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
        <DropdownMenuItem>
          <FilePenLine className="mr-2 h-4 w-4 " />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {asset.status === "archived" && (
          <DropdownMenuItem onClick={handleRestore}>
            <ArchiveRestore className="mr-2 h-4 w-4" />
            Restore
          </DropdownMenuItem>
        )}
        {asset.status === "active" ? (
          <DropdownMenuItem onClick={handleArchive}>
            <Archive className="mr-2 h-4 w-4 " />
            Archive
          </DropdownMenuItem>
        ) : (
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(event) => {
                  event.preventDefault();
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this {asset.asset_type}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  asset and remove its data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button onClick={handleDelete}
                  variant="destructive"
                  >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
