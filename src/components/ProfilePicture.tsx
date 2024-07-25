import { useAuth } from "@/provider/AuthProvider";
import { CircleUserIcon } from "lucide-react";

export function ProfilePicture() {
  const { user } = useAuth();

  return (
    <div>
      {user?.user_metadata.avatar_url ? (
        <img
          src={user?.user_metadata.avatar_url}
          alt="User avatar"
          className="h-20 w-20 rounded-full"
        />
      ) : (
        <CircleUserIcon className="h-20 w-20" />
      )}
      <span className="sr-only">Toggle account menu</span>
    </div>
  );
}
