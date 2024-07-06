import { POIDetails } from "@/map.types";
import { supabase } from "@/api/supabase/client";
import { useQuery } from "@tanstack/react-query";

const fetchPOIDetails = async (id: string): Promise<POIDetails> => {
    const { data, error } = await supabase
      .from('places')
      .select(`
        websites,
        socials,
        phones,
        addresses,
        source: sources->0->dataset
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as POIDetails;
  };

export const usePOIDetails = (id: string, isExpanded: boolean) => {
    return useQuery({
      queryKey: ["poi_details", id],
      queryFn: () => fetchPOIDetails(id),
      enabled: !!id && isExpanded,
    });
  };