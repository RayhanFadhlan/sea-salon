import { ReservationTable } from "@/components/reservation-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { getReservationsByID } from "../actions/actions";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }
  if (session.role === "ADMIN") {
    redirect("/admin/dashboard");
  }
  const reservations = await getReservationsByID(session.id);

  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-8">
        <div className="w-full max-w-[1200px] text-center">
          <h2 className="text-3xl font-semibold mb-2">No Reservation Found</h2>
          <Link href="/reserve">
            <Button variant={"link"}>Book a reservation</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-8">
      <div className="w-full max-w-[1200px] text-center">
        <h2 className="text-3xl font-semibold mb-2">Your Past Reservations</h2>
        <Link href="/reserve">
          <Button variant={"link"}>Book a reservation</Button>
        </Link>
        <ReservationTable reservations={reservations} />
      </div>
    </div>
  );
}
