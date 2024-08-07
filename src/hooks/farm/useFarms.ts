import { supabase } from "../../api/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "types/database.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type Farm = Tables<'farms'>;
export type FarmInsert = TablesInsert<'farms'>;
export type FarmUpdate = TablesUpdate<'farms'>;

export const useFetchFarms = () => {
  return useQuery<Farm[], Error>({
    queryKey: ["farms"],
    queryFn: fetchFarms,
  });
};

export const useCreateFarm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFarm,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["farms"] 
      });
    },
  });
};

// change to use FarmInsert
const createFarm = async (name: string) => {
  const { data: farm, error } = await supabase
    .from("farms")
    .insert({ name });
  if (error) {
    toast.error("Error creating farm", {
      duration: 4000,
    });
    throw new Error(error.message);
  }
  return farm;
};

const fetchFarms = async () => {
  const { data, error } = await supabase
  .from("farms")
  .select();
  if (error) {
    toast.error("Error loading farms", {
      duration: 4000,
    });
    throw new Error(error.message);
  }
  return data as Farm[];
};