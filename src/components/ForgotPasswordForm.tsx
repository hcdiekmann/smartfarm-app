import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }).min(1, "Email is required."),
});

type ForgotPasswordFormInputs = z.infer<typeof formSchema>;

export const ForgotPasswordForm = () => {
    const { resetPassword } = useAuth();
    const form = useForm<ForgotPasswordFormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: ForgotPasswordFormInputs) => {
        const { error } = await resetPassword(values.email);
        if (error) {
            console.log(error);
            toast.error('Password reset failed', { duration: 4000, description: `${error.message}` });
        } else {
           toast.info('Reset email sent', { duration: 5000, description: `Check your email for a password reset link.` });
        }
    };

    return (
        <div className="flex flex-col space-y-4 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-center text-3xl font-extrabold text-[#00431C] mb-4">Reset your password</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email input field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Account Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    {/* Submit button */}
                    <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md">Send Reset Link</Button>
                </form>
            </Form>
        </div>
    );
};
