import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";
import { useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { GoogleLogoIcon } from "../Icons";

const signupFormSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .min(1, "Email is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormInputs = z.infer<typeof signupFormSchema>;

interface SignupFormProps {
  OAuthCallback?: boolean;
}

export const SignupForm: React.FC<SignupFormProps> = ({ OAuthCallback=false}) => {
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormInputs>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignupFormInputs) => {
    setIsLoading(true);
    const { error, data } = await signUp(
      values.firstName,
      values.lastName,
      values.email,
      values.password
    );
    setIsLoading(false);
    if (error) {
      toast.error("Signup failed", {
        duration: 4000,
        description: `${error.message}`,
      });
    }
    if (data.user) {
      toast.info("Signup successful", {
        duration: 5000,
        description: "Check your email to confirm your account",
      });
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  const handleGoogleSignUp = async () => {
    const { error } = await signInWithGoogle(false);
    if (error) {
      toast.error("Google Signin failed", {
        duration: 4000,
        description: `${error.message}`,
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto bg-background p-8 rounded-lg shadow">
      <h1 className="text-center text-2xl md:text-3xl font-extrabold text-sfagreen dark:text-white mb-4">
        Create a new account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name fields row */}
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            {/* First name input field */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="text-md dark:bg-muted"
                      placeholder="Enter your first name"
                      {...field}
                    />
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
                    <Input
                      type="text"
                      className="text-md dark:bg-muted"
                      placeholder="Enter your last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
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
          {!isLoading ? (
            <Button
              type="submit"
              disabled={OAuthCallback}
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
      {!OAuthCallback ? (
      <Button onClick={handleGoogleSignUp} variant={"outline"}>
        <GoogleLogoIcon className="mr-2" />
        Sign up using Google
      </Button>
      ) : (
      <Button 
        disabled
        variant={"outline"}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
      >
        <IconLoader2 stroke={2} className="mr-2 h-4 w-4 animate-spin" />
        Sign up using Google
      </Button>)}

    </div>
  );
};
