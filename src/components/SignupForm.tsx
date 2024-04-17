import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";

const signupFormSchema = z.object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    email: z.string().email({ message: "Invalid email address." }).min(1, "Email is required."),
    password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignupFormInputs = z.infer<typeof signupFormSchema>;

export const SignupForm = () => {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const form = useForm<SignupFormInputs>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: SignupFormInputs) => {
        const { error, data } = await signUp(values.firstName, values.lastName, values.email, values.password);
        if (error) {
            toast.error('Signup failed', { duration: 4000, description: `${error.message}` });
        }
        if (data.user) {
            toast.info('Signup successful', { duration: 5000, description: 'Check your email to confirm your account.' });
            navigate('/login');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col space-y-4 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-center text-3xl font-extrabold text-[#00431C] mb-4">Create your account</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name fields row */}
                    <div className="flex justify-between space-x-4">
                        {/* First name input field */}
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field, fieldState }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter your first name" {...field} />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        {/* Last name input field */}
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field, fieldState }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter your last name" {...field} />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Email and password fields */}
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
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your new password" {...field} />
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    {/* Submit button */}
                    <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md">Sign Up</Button>
                </form>
            </Form>
        </div>
    );
};
