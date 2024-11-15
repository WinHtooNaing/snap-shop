"use client";

import { useAction } from "next-safe-action/hooks";
import AuthForm from "@/components/auth/auth-form";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/types/login-schema";
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
import Link from "next/link";
import { login } from "@/server/actions/login";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { execute, result, status } = useAction(login, {
    onSuccess({ data }) {
      if (data?.error) {
        toast.error(data?.error);
        form.reset();
      }
      if (data?.success) {
        toast.success(data?.success);
      }
    },
  });
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;
    execute({ email, password });
  };
  return (
    <AuthForm
      formTitle="Login to your account"
      footerHref="/auth/register"
      footerLabel="Don't have an account?"
      showProvider={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="snapshop@gmail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="********" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"sm"} variant={"link"}>
              <Link href={"/auth/forgot"} className="mb-2">
                Forgot Password?
              </Link>
            </Button>
          </div>
          <Button
            type="submit"
            className={cn(
              "w-full mb-4",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Login
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default Login;
