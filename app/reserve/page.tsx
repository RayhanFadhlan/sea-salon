"use client";
import { ReserveForm } from "@/components/reserve-form";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
export default function Reserve() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status !== "authenticated") {
    redirect("/signin");
  }
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold">Reserve</h2>

      <div className="my-8">
        <ReserveForm user_id={session.id} />
      </div>
    </div>
  );
}