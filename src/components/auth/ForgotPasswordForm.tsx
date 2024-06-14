import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IconLoader2, IconMailCheck } from '@tabler/icons-react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/provider/AuthProvider";
import { useState } from "react";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }).min(1, "Email is required."),
});

type ForgotPasswordFormInputs = z.infer<typeof formSchema>;

export const ForgotPasswordForm = () => {
    const { resetPassword } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const form = useForm<ForgotPasswordFormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: ForgotPasswordFormInputs) => {
        setIsLoading(true);
        const { error } = await resetPassword(values.email);
        setIsLoading(false);
        if (error) {
            console.log(error);
            toast.error('Password reset failed', { duration: 4000, description: `${error.message}` });
        } else {
            setEmailSent(true);
        }
    };

    return (
        <div className="flex flex-col space-y-4 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            {!emailSent ? (
                <>
                    <h1 className="text-center text-2xl md:text-3xl font-extrabold text-[#00431C]">Reset your password</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField control={form.control} name="email" render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )} />
                            {!isLoading && (
                            <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md">Send Link</Button>
                            )}
                            {isLoading && (
                                <Button 
                                disabled
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
                              >
                                <IconLoader2 stroke={2} className="h-4 w-4 animate-spin" />
                              </Button>
                            )}
                            </form>
                    </Form>
                </>
            ) : (
                <>
                    <h1 className="text-center text-2xl md:text-3xl font-extrabold text-[#00431C]">Password reset link sent!</h1>
                    <div className="flex flex-col items-center justify-center">
                        <IconMailCheck stroke={2} size={48} color="#00431C" />
                        <p className="pt-2 text-lg text-center">Please check your inbox to proceed with resetting your password.</p>

                    </div>
                </>
            )}
        </div>
    );
};
