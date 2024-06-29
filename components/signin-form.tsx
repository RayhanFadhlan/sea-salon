"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
export function SigninForm() {
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast({
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res || res.error) {
        toast({
          description: "Invalid Email or Password",
          variant: "destructive",
        });
        return;
      }
      toast({ description: "Logged in successfully" });
      router.push("/dashboard");
    } catch (error) {
      toast({ description: "An error occurred", variant: "destructive" });
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <form className="mx-auto grid w-[350px] gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign in</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
