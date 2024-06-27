import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { IconLoader2 } from '@tabler/icons-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useLogin from "@/hooks/auth/useLogin";
import { GoogleLogoIcon } from "../Icons";

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

export const LoginForm: React.FC = () => {
  const { PasswordLogin, GoogleSignin } = useLogin();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: LoginFormInputs) => {
    setIsLoading(true);
    await PasswordLogin(values.email, values.password);
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await GoogleSignin(true);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto bg-background p-8 rounded-lg shadow">
      <h1 className="text-center text-2xl md:text-3xl font-extrabold text-sfagreen dark:text-white mb-4">
        Login to your account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
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
                    className="text-md appearance-none"
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
                    className="text-sm font-small text-sfagreen dark:text-white hover:underline"
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
      {!isLoading ? (
      <Button onClick={handleGoogleSignIn} variant={"outline"}>
        <GoogleLogoIcon className="w-5 h-5 mr-2" />
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
