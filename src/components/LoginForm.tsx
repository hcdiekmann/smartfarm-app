import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
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
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

type LoginFormInputs = z.infer<typeof formSchema>;

export const LoginForm = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const form = useForm<LoginFormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormInputs) => {
        const { error } = await signIn(values.email, values.password);
        if (error) {
            toast.error('Login failed', { duration: 4000, description: `${error.message}` });
        } else {
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col space-y-4 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-center text-3xl font-extrabold text-[#00431C] mb-4">Login to your account</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email input field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    {/* Password input field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                                <div className="text-right">
                                    <Link to="/forgot-password" className="text-sm font-small text-[#00431C] hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                            </FormItem>
                        )}
                    />
                    {/* Submit button */}
                    <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md">Login</Button>
                </form>
            </Form>
        </div>
    );
};
