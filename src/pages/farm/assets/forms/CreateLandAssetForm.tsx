import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AssetInsert, useCreateAsset } from '@/hooks/farm/useAssets';
import { useFarm } from '@/provider/FarmProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, LandPlot, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { assets } from '../asset-types';
import { z } from 'zod';
import { Link } from 'react-router-dom';

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

const CreateLandAssetForm = () => {
  const { currentFarm } = useFarm();
  const { mutate: createAsset, isPending } = useCreateAsset();

  const form = useForm<CreateAssetFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      asset_type: "land",
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
    <div className="space-y-4">
      <div className="space-y-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link to=".." className="hover:text-primary hover:underline">Assets</Link>
          <ChevronRight className="mt-0.5 h-3.5 w-3.5" />
        </div>
        <div className="flex items-center space-x-2">
        <LandPlot className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Add Land</h1>

        </div>


      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-4 md:px-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
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
              "Add Land"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateLandAssetForm;