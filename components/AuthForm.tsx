"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form
} from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";

const authFormSchema = ( type: FormType ) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) :  z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  // 1. Define your form.
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col items-center gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image
            src="/logo.svg"
            alt="logo"
            height={32}
            width={38} />
          <h2 className="text-primary-100">
            Mock<span className="text-yellow-400">Mate</span>
          </h2>
        </div>
        <p className="text-xl text-primary-100">Practice job interview aith AI</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
            {!isSignIn && <p>Name</p>}
            <p>Email</p>
            <p>Password</p>
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "No Account Yet ? " : "Already Have An Account"}
          <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1">
            {!isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
