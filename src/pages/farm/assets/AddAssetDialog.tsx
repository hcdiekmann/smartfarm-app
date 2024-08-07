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
import { useCreateAsset, AssetInsert } from "@/hooks/farm/useAssets";
import { useFarm } from "@/provider/FarmProvider";
import { assets } from "./asset-types";

const formSchema = z.object({
  name: z.string().min(1, "A name is required."),
  asset_type: z.enum(
    assets.map(asset => asset.value) as [string, ...string[]],
    {
      required_error: "Please select an asset type.",
    }
  ),
});

type CreateAssetFormInputs = z.infer<typeof formSchema>;

interface AddAssetDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddAssetDialog: React.FC<AddAssetDialogProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { currentFarm } = useFarm();
  const { mutate: createAsset, isPending } = useCreateAsset();

  const form = useForm<CreateAssetFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      asset_type: "animal",
    },
  });

  const handleSubmit = (values: CreateAssetFormInputs) => {
    if (!currentFarm) return;

    createAsset(
      {
        ...values,
        farm_id: currentFarm.id,
      } as AssetInsert,
      {
        onSuccess: () => {
          setIsOpen(false);
          form.reset();
        },
        onError: (error) => {
          console.error("Failed to create asset:", error);
          // Add user-facing error message here and remove supabase error message from queryFn
        },
      }
    );
  };

  return (
    <ResponsiveDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="New Asset"
      description={`Add a new asset to ${currentFarm?.name}`}
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
                <FormLabel>Asset Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="asset_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asset Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the asset type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem
                        key={asset.value}
                        value={asset.value}
                        className="hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          {React.createElement(asset.icon, { className: "mr-2 h-4 w-4" })}
                          <span>{asset.label}</span>
                        </div>
                      </SelectItem>
                    ))}
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
              "Add Asset"
            )}
          </Button>
        </form>
      </Form>
    </ResponsiveDialog>
  );
};