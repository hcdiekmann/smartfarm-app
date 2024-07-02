import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { GoogleLogoIcon } from "../Icons";
import useSignup from "@/hooks/auth/useSignup";
import useLogin from "@/hooks/auth/useLogin";

const signupFormSchema = z
  .object({
    name: z.string().min(1, "Your name is required."),
    email: z
      .string()
      .email({ message: "Invalid email address." })
      .min(1, "Email is required."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormInputs = z.infer<typeof signupFormSchema>;

export const SignupForm: React.FC = () => {
  const PasswordSignup = useSignup();
  const { GoogleSignin } = useLogin();
  const [signupLoading, setSignupLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const form = useForm<SignupFormInputs>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUp = async (values: SignupFormInputs) => {
    setSignupLoading(true);
    await PasswordSignup(values.name, values.email, values.password);
    setSignupLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    await GoogleSignin(false);
    setGoogleLoading(false);
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto bg-background p-8 rounded-lg shadow">
      <h1 className="text-center text-2xl md:text-3xl font-extrabold text-sfagreen dark:text-white mb-4">
        Create a new account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-6">
          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="text-md dark:bg-muted"
                    placeholder="Enter your full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="text-md dark:bg-muted"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="text-md dark:bg-muted"
                    placeholder="Enter a new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          {/* Confirm Password field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="text-md dark:bg-muted"
                    placeholder="Confirm your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          {/* Submit button */}
          {!signupLoading ? (
            <Button
              disabled={googleLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
            >
              Sign up
            </Button>
          ) : (
            <Button
              disabled
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
            >
              <IconLoader2 stroke={2} className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          )}
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
      {!googleLoading ? (
        <Button
          disabled={signupLoading}
          onClick={handleGoogleSignUp}
          variant={"outline"}
        >
          <GoogleLogoIcon className="mr-2" />
          Continue with Google
        </Button>
      ) : (
        <Button
          disabled
          variant={"outline"}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
        >
          <IconLoader2 stroke={2} className="mr-2 h-4 w-4 animate-spin" />
          Continue with Google
        </Button>
      )}
    </div>
  );
};
