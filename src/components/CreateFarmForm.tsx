import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useCreateFarm } from "@/hooks/useFarms";
import {
  FormField,
  Form,
  FormItem,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Wiggle } from "react-subtle-nudge";
import { IconLoader2 } from "@tabler/icons-react";
import { useAuth } from "@/provider/AuthProvider";

const formSchema = z.object({
  name: z.string().min(1, "A name is required."),
});

type CreateFarmFormInputs = z.infer<typeof formSchema>;

export function CreateFarmForm() {
  const { user } = useAuth();
  const farmName = user?.user_metadata.full_name.split(' ')[0] + "'s Farm";
  const createFarm = useCreateFarm();
  const form = useForm<CreateFarmFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: farmName || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: CreateFarmFormInputs) => {
    setIsLoading(true);
    try {
      await createFarm.mutateAsync(values.name);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <h3 className="text-muted-foreground">
                Enter your farm name to get started.
              </h3>
              <FormControl>
                <Input
                  type="text"
                  className="text-md appearance-none"
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        {!isLoading ? (
          <Wiggle initialDelay="8s" iterationDelay="2.5s" >
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
              type="submit"
            >
              Create Farm
            </Button>
          </Wiggle>
        ) : (
          <Button disabled>
            <IconLoader2 stroke={2} className="mr-2 h-4 w-4 animate-spin" />
            Create
          </Button>
        )}
      </form>
    </Form>
  );
}
