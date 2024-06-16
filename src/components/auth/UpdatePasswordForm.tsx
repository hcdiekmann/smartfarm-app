import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";

const updatePasswordSchema = z.object({
    newPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters." })
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

type UpdatePasswordFormInputs = z.infer<typeof updatePasswordSchema>;

export const UpdatePasswordForm = () => {
    const { updatePassword } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<UpdatePasswordFormInputs>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: UpdatePasswordFormInputs) => {
        setIsLoading(true);
        const { data, error } = await updatePassword(values.newPassword);
        setIsLoading(false);
        if (error) {
            toast.error('Password update failed', { duration: 5000, description: `${error.message}` });
            return;
        }
        if (data) {
            toast.info('Password updated', { duration: 5000, description: `Your password has been updated successfully.` });
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col space-y-4 w-full max-w-md mx-auto bg-background p-8 rounded-lg shadow">
            <h1 className="text-center text-2xl md:text-3xl font-extrabold text-sfagreen dark:text-white mb-4">Update your password</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* New Password input field */}
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your new password" {...field} />
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    {/* Confirm Password input field */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm your new password" {...field} />
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    {/* Submit button */}
                    {!isLoading && (
                    <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md">Update</Button>
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
        </div>
    );
};
