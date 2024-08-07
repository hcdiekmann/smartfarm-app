import { supabase } from "../../api/supabase/client";
import { Tables, TablesUpdate } from "types/database.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type Profile = Tables<'profiles'>;
export type ProfileUpdate = TablesUpdate<'profiles'>;

export const useFetchProfile = (id: string) => {
  return useQuery<Profile, Error>({
    queryKey: ["profile", id],
    queryFn: () => fetchProfile(id),
    enabled: !!id,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<Profile, Error, ProfileUpdate & { id: string }>({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", data.id],
      });
      toast.success("Profile updated successfully", {
        duration: 5000,
      });
    },
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

const updateProfile = async ({ id, ...profile }: ProfileUpdate & { id: string }) => {
    const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", id)
    .select()
    .single();

    if (error) {
        toast.error("Error updating profile", {
            duration: 4000,
        });
        throw new Error(error.message);
    }

    return data as Profile;
};