import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { CircleUserIcon, User, Settings, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/provider/AuthProvider";
import useLogout from "@/hooks/auth/useLogout";

export function AvatarMenu() {
  const { user } = useAuth();
  const handleSignOut = useLogout();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {user?.user_metadata.avatar_url ? (
            <img
              src={user?.user_metadata.avatar_url}
              alt="User avatar"
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <CircleUserIcon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
