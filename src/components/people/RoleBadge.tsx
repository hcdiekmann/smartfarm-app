import { Badge } from "../ui/badge";

export const RoleBadge = ({ role }: { role: string | null }) => {
    const baseClasses = "uppercase text-xs font-semibold rounded-sm px-2 py-1";
    const roleColors = {
      worker: "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-100",
      owner: "bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-100",
      manager: "bg-orange-100 text-orange-800 dark:bg-orange-800/50 dark:text-orange-100",
    };

    if (!role) return <>-</>;
  
    return (
      <Badge className={`${baseClasses} ${roleColors[role as keyof typeof roleColors]}`}>
        {role}
      </Badge>
    );
  };