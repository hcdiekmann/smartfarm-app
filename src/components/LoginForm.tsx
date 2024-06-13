import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { IconLoader2 } from '@tabler/icons-react';
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
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .min(1, "Email is required."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type LoginFormInputs = z.infer<typeof formSchema>;

interface LoginFormProps {
  OAuthCallback?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ OAuthCallback=false}) => {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormInputs) => {
    setIsLoading(true);
    const { error } = await signIn(values.email, values.password);
    setIsLoading(false);
    if (error) {
      toast.error("Login failed", {
        duration: 4000,
        description: `${error.message}`,
      });
    } else {
      navigate("/");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle(true);
    if (error) {
      toast.error("Google sign in failed", {
        duration: 4000,
        description: `${error.message}`,
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-center text-2xl md:text-3xl font-extrabold text-[#00431C] mb-4">
        Login to your account
      </h1>
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
                  <Input
                    type="email"
                    className="text-md"
                    placeholder="Enter your email"
                    {...field}
                  />
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
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-small text-[#00431C] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    className="text-md"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          {/* Login button */}
          {!isLoading ? (
          <Button
            type="submit"
            disabled={OAuthCallback}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
          >
            Login
          </Button> ) : (
          <Button 
            disabled
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
          >
            <IconLoader2 stroke={2} className="h-4 w-4 animate-spin" />
          </Button>)}
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      {!OAuthCallback ? (
      <Button onClick={handleGoogleSignIn} variant={"outline"}>
        <svg
          className="mr-2"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 48 48"
        >
          <path
            fill="#fbc02d"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#e53935"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4caf50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1565c0"
            d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
        Sign in with Google
      </Button>
      ) : (
      <Button 
        disabled
        variant={"outline"}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
      >
        <IconLoader2 stroke={2} className="mr-2 h-4 w-4 animate-spin" />
        Sign in with Google
      </Button>)}
    </div>
  );
};
