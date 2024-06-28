"use client";
import { ReservationTable } from "@/components/reservation-table";
import { Button } from "@/components/ui/button";  // Assuming you have a Button component in your UI library
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function Dashboard() {
  const { data: session, status } = useSession();
  if(status === "loading"){
    return <div>Loading...</div>
  }
  if(status !== "authenticated" ) {
    redirect("/signin");
  }
  if(session.role === "ADMIN"){
    redirect("/admin/dashboard");
  }
  // console.log(status);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-8">
      <div className="w-full max-w-[1200px] text-center">
        <h2 className="text-3xl font-semibold mb-2">Your Past Reservations</h2>
        <Link href="/reserve">
         <Button variant={"link"}>Book a reservation</Button>
        </Link>
        <ReservationTable userID={session.id} />
        
      </div>
    </div>
  );
}
