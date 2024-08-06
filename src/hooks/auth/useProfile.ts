import { supabase } from "../../api/supabase/client";
import { Tables } from "types/database.types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export type Profile = Tables<'profiles'>;

export const useFetchProfile = (id: string) => {
  return useQuery<Profile, Error>({
    queryKey: ["profile", id],
    queryFn: () => fetchProfile(id),
    enabled: !!id, //
  });
};

const fetchProfile = async (id: string) => {
  const { data, error } = await supabase
  .from("profiles")
    .select()
    .eq("id", id)
    .single();

    if (error) {
        toast.error("Error loading profile", {
            duration: 4000,
        });
        throw new Error(error.message);
    }
    
  return data as Profile;
};