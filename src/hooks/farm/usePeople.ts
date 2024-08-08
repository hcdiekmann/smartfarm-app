import { supabase } from "../../api/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "types/database.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type Person = Tables<'farm_members'>;
export type PersonInsert = TablesInsert<'farm_members'>;
export type PersonUpdate = TablesUpdate<'farm_members'>;

export const useFetchPeople = (farmId?: string ) => {
  return useQuery<Person[], Error>({
    queryKey: ["farm_members", farmId],
    queryFn: () => fetchPeople(farmId),
    enabled: !!farmId,
  });
};

export const useCreatePerson = () => {
    const queryClient = useQueryClient();
    return useMutation<Person, Error, PersonInsert>({
        mutationFn: createPerson,
        onSuccess: (data) => {
        queryClient.invalidateQueries({
            queryKey: ["farm_members", data.farm_id],
        });
        toast.success("Person added successfully", {
            duration: 5000,
        });
        },
    });
};

export const useDeletePerson = () => {
    const queryClient = useQueryClient();
    return useMutation<{ id: string; farm_id: string | null }, Error, { id: string; farm_id: string | null }>({
        mutationFn: deletePerson,
        onSuccess: (data) => {
        queryClient.invalidateQueries({
            queryKey: ["farm_members", data.farm_id],
        });
        toast.success("Person deleted successfully", {
            duration: 5000,
        });
        },
    });
};


const fetchPeople = async (farmId?: string) => {
    if (!farmId) return [];

    const { data, error } = await supabase
    .from("farm_members")
    .select()
    .eq("farm_id", farmId);

    if (error) {
      throw new Error(error.message);
    }
    return data as Person[];
}

const createPerson = async (newPerson: PersonInsert) => {
    const { data: person, error } = await supabase
    .from("farm_members")
    .insert(newPerson)
    .select()
    .single();

    if (error) {
      throw new Error(error.message);
    }
    return person;
}

const deletePerson = async (person: { id: string; farm_id: string | null }) => {
    const { error } = await supabase
    .from("farm_members")
    .delete()
    .eq("id", person.id);

    if (error) {
      throw new Error(error.message);
    }

    return person;
}
    