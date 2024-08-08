import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { useFarm } from "@/provider/FarmProvider";
import { PersonInsert, useCreatePerson } from "@/hooks/farm/usePeople";

const formSchema = z.object({
  name: z.string().min(1, "A name is required."),
  role: z.enum(
    ["manager", "worker"] as const,
    {
      required_error: "Please select a role.",
    }
  ),
});

type AddPersonFormInputs = z.infer<typeof formSchema>;

interface AddPersonDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddPersonDialog: React.FC<AddPersonDialogProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { currentFarm } = useFarm();
  const { mutate: createPerson, isPending } = useCreatePerson();

  const form = useForm<AddPersonFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "worker",
    },
  });

  const handleSubmit = (values: AddPersonFormInputs) => {
    if (!currentFarm) return;

    createPerson(
      {
        ...values,
        farm_id: currentFarm.id,
      } as PersonInsert,
      {
        onSuccess: () => {
          setIsOpen(false);
          form.reset();
        },
        onError: (error) => {
          console.error("Failed to add person", error);
          // Add user-facing error message here and remove supabase error message from queryFn
        },
      }
    );
  };

  return (
    <ResponsiveDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="New Person"
      description={`Add a new person to ${currentFarm?.name}`}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 px-4 md:px-0"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose the role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="worker">Worker</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Person"
            )}
          </Button>
        </form>
      </Form>
    </ResponsiveDialog>
  );
};