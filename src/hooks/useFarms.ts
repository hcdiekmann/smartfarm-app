// useFarms.ts
import { supabase } from "../api/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createFarm = async (name: string) => {
  const { data: farm, error } = await supabase
    .from("farms")
    .insert({ name });
  if (error) {
    toast.error("Error creating farm", {
      duration: 4000,
      description: `${error.message}`,
    });
    throw new Error(error.message);
  }
  return farm;
};

const fetchFarms = async () => {
  const { data: farms, error } = await supabase
  .from("farms")
  .select();
  if (error) {
    toast.error("Error fetching farms", {
      duration: 4000,
      description: `${error.message}`,
    });
    throw new Error(error.message);
  }
  return farms;
};


export const useFetchFarms = () => {
  return useQuery({
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
