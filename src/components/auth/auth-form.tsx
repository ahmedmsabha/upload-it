"use client";
import { authFormSchema } from "@/lib/features/auth/validation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import loader from "@/assets/icons/loader.svg";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/users.action";
import { OtpModel } from "./otp-model";

type FormType = "sign-in" | "sign-up";

export function AuthForm({ type }: { type: FormType }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              email: values.email,
              fullName: values.fullName || "",
            })
          : await signInUser({ email: values.email });
      setAccountId(user.accountId);
      setIsLoading(false);
    } catch {
      setErrorMessage("failed to create account, please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8"
        >
          <h1 className="text-center text-4xl font-bold leading-10 text-light-100 md:text-left">
            {type === "sign-in"
              ? "Sign in to your account"
              : "Create an account to get started"}
          </h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="w-full pt-2 text-sm font-normal leading-5 text-light-100">
                      Full Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="border-none p-0 text-sm font-normal leading-5 shadow-none outline-none ring-offset-transparent placeholder:text-light-200 focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="ml-4 text-sm font-normal leading-5 text-red" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="w-full pt-2 text-sm font-normal leading-5 text-light-100">
                    Email
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="border-none p-0 text-sm font-normal leading-5 shadow-none outline-none ring-offset-transparent placeholder:text-light-200 focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="ml-4 text-sm font-normal leading-5 text-red" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-16 rounded-full bg-brand text-sm font-medium leading-5 transition-all hover:bg-brand-100 "
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign in" : "Sign up"}
            {isLoading && (
              <Image
                src={loader}
                alt="loader"
                width={24}
                height={24}
                className="ms-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && (
            <p className="mx-auto w-fit rounded-xl bg-error/5 px-8 py-4 text-center text-sm font-normal leading-5 text-error">
              *{errorMessage}
            </p>
          )}

          <div className="flex justify-center text-sm font-normal leading-5">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ms-1 font-medium text-brand"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </form>
      </Form>
      {accountId && (
        <OtpModel email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
}
