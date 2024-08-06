import { supabase } from "../../api/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "types/database.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type Asset = Tables<'assets'>;
export type AssetInsert = TablesInsert<'assets'>;
export type AssetUpdate = TablesUpdate<'assets'>;

export const useFetchAssets = (farmId?: string) => {
  return useQuery<Asset[], Error>({
    queryKey: ["assets", farmId],
    queryFn: () => fetchAssets(farmId),
  });
};

export const useCreateAsset = () => {
  const queryClient = useQueryClient();
  return useMutation<Asset, Error, AssetInsert>({
    mutationFn: createAsset,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["assets", data.farm_id],
      });
      toast.success("Asset added successfully", {
        duration: 5000,
      });
    },
  });
};

export const useUpdateAsset = () => {
  const queryClient = useQueryClient();
  return useMutation<Asset, Error, AssetUpdate & { id: string }>({
    mutationFn: updateAsset,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["assets", data.farm_id],
      });
    },
  });
};

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();
  return useMutation<{ id: string; farm_id: string | null }, Error, { id: string; farm_id: string | null }>({
    mutationFn: deleteAsset,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["assets", data.farm_id],
      });
      toast.success("Asset deleted successfully", {
        duration: 5000,
      });
    },
  });
};

const fetchAssets = async (farmId?: string) => {
  let query = supabase.from("assets").select();
  
  if (farmId) {
    query = query.eq('farm_id', farmId);
  }

  const { data, error } = await query;

  if (error) {
    toast.error("Error loading assets", {
      duration: 4000,
      description: `${error.message}`,
    });
    throw new Error(error.message);
  }

  return data as Asset[];
};

const createAsset = async (asset: AssetInsert): Promise<Asset> => {
  const { data, error } = await supabase.from("assets")
    .insert(asset)
    .select()
    .single();

  if (error) {
    toast.error("Error creating asset", {
      duration: 4000,
      description: `${error.message}`,
    });
    throw new Error(error.message);
  }

  return data;
};

const updateAsset = async (asset: AssetUpdate & { id: string }): Promise<Asset> => {
  const { id, ...updateData } = asset;
  const { data, error } = await supabase
    .from("assets")
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    toast.error("Error updating asset", {
      duration: 5000,
      description: `${error.message}`,
    });
    throw new Error(error.message);
  }

  return data;
};

const deleteAsset = async (asset: { id: string; farm_id: string | null }): Promise<{ id: string; farm_id: string | null }> => {
  const { error } = await supabase
    .from("assets")
    .delete()
    .eq('id', asset.id);

  if (error) {
    toast.error("Error deleting asset", {
      duration: 5000,
      description: `${error.message}`,
    });
    throw new Error(error.message);
  }

  return asset;
};