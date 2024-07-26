import { ColumnDef } from "@tanstack/react-table";
import { Asset } from "@/hooks/assets/useAssets";
import { Checkbox } from "@/components/ui/checkbox";

import { assets } from "./filter-options";
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Asset>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    meta: {
      lable: "Name",
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "asset_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    meta: {
      lable: "Type",
    },
    cell: ({ row }) => {
      const type = assets.find(
        (type) => type.value === row.getValue("asset_type")
      );
      if (!type) return null;
      return (
        <div className="flex w-[100px] items-center">
          {type.icon && (
            <type.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{type.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    meta: {
      lable: "Last Updated",
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    meta: {
      lable: "Created",
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return (
      <div>
        {date.toLocaleDateString()}
        {/* {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} */}
      </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  // Add more columns as needed
];
