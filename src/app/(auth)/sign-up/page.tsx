"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { User } from "@/model/User";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
const SignUp = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      console.log(data);
      const response = await axios.post<{ success: string; message: string }>(
        "/api/create-user",
        data
      );
      router.replace(`/dashboard`);
    } catch (error) {}
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Exponse Tracker
          </h1>
          <p className="mb-4">
            Your personal income and expenditure tracking system
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        // debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  {/* {isCheckingUsername && (
                                        <Loader2 className="animate-spin" />
                                    )} */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">SignUp</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
