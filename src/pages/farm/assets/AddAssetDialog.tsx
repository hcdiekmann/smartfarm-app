import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
    Loader2,
    Wrench,
    LandPlot, 
    PawPrint, 
    Leaf, 
    Building, 
    Droplet, 
    Package, 
    Fence,
    Group 
  } from 'lucide-react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import { useCreateAsset, AssetInsert } from '@/hooks/assets/useAssets';
import { useFarm } from '@/provider/FarmProvider';

const formSchema = z.object({
  name: z.string().min(1, "A name is required."),
  asset_type: z.enum(['land', 'animal', 'plant', 'equipment', 'structure', 'water', 'material', 'product', 'group'], {
    required_error: "Please select an asset type.",
  }),
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

    createAsset({
      ...values,
      farm_id: currentFarm.id,
    } as AssetInsert, {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      },
      onError: (error) => {
        console.error('Failed to create asset:', error);
        // Add user-facing error message here
      }
    });
  };

  return (
    <ResponsiveDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="New Asset"
      description="Add a new asset for your farm"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-4 md:px-0">
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
    <FormControl>
      <SelectTrigger>
        <SelectValue placeholder="Select the asset type" />
      </SelectTrigger>
    </FormControl>
    <SelectContent>
      <SelectItem value="land" className="hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center">
          <LandPlot className="mr-2 h-4 w-4" />
          <span>Land</span>
        </div>
      </SelectItem>
      <SelectItem value="animal" className="hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center">
          <PawPrint className="mr-2 h-4 w-4" />
          <span>Animal</span>
        </div>
      </SelectItem>
      <SelectItem value="plant" className="hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center">
          <Leaf className="mr-2 h-4 w-4" />
          <span>Plant</span>
        </div>
      </SelectItem>
      <SelectItem value="equipment" className="hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center">
          <Wrench className="mr-2 h-4 w-4" />
          <span>Equipment</span>
        </div>
      </SelectItem>
      <SelectItem value="structure" className="hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center">
          <Building className="mr-2 h-4 w-4" />
          <span>Structure</span>
        </div>
      </SelectItem>
      <SelectItem value="water" className="hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center">
          <Droplet className="mr-2 h-4 w-4" />
          <span>Water</span>
        </div>
      </SelectItem>
      <SelectItem value="material" className="hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center">
          <Fence className="mr-2 h-4 w-4" />
          <span>Material</span>
        </div>
      </SelectItem>
      <SelectItem value="product" className="hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center">
          <Package className="mr-2 h-4 w-4" />
          <span>Product</span>
        </div>
      </SelectItem>
      <SelectItem value="group" className="hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center">
          <Group className="mr-2 h-4 w-4" />
          <span>Group</span>
        </div>
      </SelectItem>
    </SelectContent>
  </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Asset'
            )}
          </Button>
        </form>
      </Form>
    </ResponsiveDialog>
  );
};