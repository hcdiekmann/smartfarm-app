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
import { useNavigate } from "react-router-dom";

export function AvatarMenu() {
  const { user } = useAuth();
  const handleSignOut = useLogout();
  const navigate = useNavigate();

  return (
    <>
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
            <span className="sr-only">Toggle account menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button
              className="flex items-center w-full"
              onClick={() => navigate("/account")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              className="flex items-center w-full"
              onClick={() =>navigate("/account#settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
