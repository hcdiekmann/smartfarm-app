import { supabase } from "../../api/supabase/client";
import { Tables } from "types/database.types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export type Country = Tables<'countries'>;

export const useFetchCountries = () => {
  return useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
};

const fetchCountries = async () => {
  const { data, error } = await supabase
    .from("countries")
    .select()
    .eq("continent", "Africa");

  if (error) {
    toast.error("Error loading countries", {
      duration: 4000,
    });
    throw new Error(error.message);
  }

  return data as Country[];
}