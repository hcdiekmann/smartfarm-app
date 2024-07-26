import React from 'react';
import { useFetchAssets, useCreateAsset, Asset, AssetInsert } from '@/hooks/assets/useAssets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFarm } from '@/provider/FarmProvider';

const formSchema = z.object({
    name: z.string().min(1, "A name is required."),
    asset_type: z.enum(['land', 'animal', 'plant','equipment', 'structure', 'water', 'material', 'product', 'group'], {
      required_error: "Please select an asset type.",
    }),
  });
  
  type CreateAssetFormInputs = z.infer<typeof formSchema>;
  
  const AssetsPage: React.FC = () => {
    const { currentFarm } = useFarm();
    const { data: assets, isPending, isError, error } = useFetchAssets(currentFarm?.id);
    const { mutate: createAsset, isPending: isCreating } = useCreateAsset();
    
    const form = useForm<CreateAssetFormInputs>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        asset_type: "animal",
      },
    });
  
    const handleSubmit = async (values: CreateAssetFormInputs) => {
        if (!currentFarm) return;

        createAsset({
        ...values,
        farm_id: currentFarm.id,
      } as AssetInsert, {
        onSuccess: () => {
          form.reset();
        },
        onError: (error) => {
          console.error('Failed to create asset:', error);
          // message to the user here
        }
      });
    };
  
    if (isPending) return <div>Loading assets...</div>;
    if (isError) return <div>Error loading assets: {error.message}</div>;
  
    return (
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-bold">Assets</h1>
  
        <Card>
          <CardHeader>
            <CardTitle>Add new Asset</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
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
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="animal">Animal</SelectItem>
                    <SelectItem value="plant">Plant</SelectItem>
                    <SelectItem value="structure">Structure</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="material">Material</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="group">Group</SelectItem>

                </SelectContent>
              </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!isCreating ? (
                    <Button
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
                      type="submit"
                    >
                      Add Asset
                    </Button>
                ) : (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle>Asset List</CardTitle>
          </CardHeader>
          <CardContent>
            {assets && assets.length > 0 ? (
              <ul className="space-y-2">
                {assets.map((asset: Asset) => (
                  <li key={asset.id} className="flex justify-between items-center">
                    <span>{asset.name}</span>

                    <span className="text-sm text-gray-500">{asset.asset_type}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No assets found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default AssetsPage;