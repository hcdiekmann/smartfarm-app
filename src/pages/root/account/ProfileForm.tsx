import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ReactCountryFlag from "react-country-flag";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useUpdateProfile, Profile } from "@/hooks/account/useProfile";
import { useFetchCountries, Country } from "@/hooks/account/useCountries";


const formSchema = z.object({
  full_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  country: z.string().min(1, {
    message: "Please select a country.",
  }),
});

type ProfileFormProps = {
  profile: Profile;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const { data: countries } = useFetchCountries();
  const updateProfileMutation = useUpdateProfile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: profile.full_name,
      country: profile.country,
    },
  });

  useEffect(() => {
    form.reset({
      full_name: profile.full_name,
      country: profile.country,
    });
  }, [profile, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateProfileMutation.mutate({ id: profile.id, ...values });
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardDescription>Make changes to your account information here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled value={profile.email || ""} />
              </FormControl>
            </FormItem>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries?.map((country: Country) => (
                        <SelectItem key={country.id} value={country.name}>
                          <div className="flex items-center">
                            <ReactCountryFlag
                              countryCode={country.iso2}
                              svg
                              style={{
                                width: '1.5em',
                                height: '1.5em',
                                marginRight: '0.5em',
                              }}
                              title={country.name}
                            />
                            {country.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Input disabled value="English" />
              </FormControl>
            </FormItem>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save changes</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}