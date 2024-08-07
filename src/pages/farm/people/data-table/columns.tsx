import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions";
import { Person } from "@/hooks/farm/usePeople";
import { Badge } from "@/components/ui/badge";

const RoleBadge = ({ role }: { role: string }) => {
  const baseClasses = "uppercase text-xs font-semibold rounded-sm px-2 py-1";
  const roleColors = {
    worker: "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-100",
    owner: "bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-100",
    manager: "bg-orange-100 text-orange-800 dark:bg-orange-800/50 dark:text-orange-100",
  };

  return (
    <Badge className={`${baseClasses} ${roleColors[role as keyof typeof roleColors]}`}>
      {role}
    </Badge>
  );
};

export const columns: ColumnDef<Person>[] = [
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
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return <RoleBadge role={role} />;
    },
    meta: {
      lable: "Role",
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "joined_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Member Since" />
    ),
    meta: {
      lable: "Member Since",
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("joined_at"));
      return (
      <div>
        {date.toLocaleDateString()}{" "}
        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
