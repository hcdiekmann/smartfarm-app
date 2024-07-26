import { ColumnDef } from "@tanstack/react-table";
import { Asset } from "@/hooks/assets/useAssets";
import { AssetActionsDropdown } from "./AssetActionDropdown";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "asset_type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("asset_type") as string;
      return <div>{type.charAt(0).toUpperCase() + type.slice(1)}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ); 
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("updated_at"));
      return (
        <div>
          {date.toLocaleDateString()}{" "}
          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const asset: Asset = row.original;
      return <AssetActionsDropdown asset={asset} />;
    },
  },
  // Add more columns as needed
];
