// export const dynamic = "force-dynamic";
import { ReserveForm } from "@/components/reserve-form";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import {
  getBranches,
  getServiceBranches,
  getServices,
} from "../actions/actions";

export default async function Reserve() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }

  const services = await getServices();
  const branches = await getBranches();
  const servicebranches = await getServiceBranches();
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold">Reserve</h2>

      <div className="my-8">
        <ReserveForm
          user_id={session.id}
          branches={branches}
          services={services}
          servicebranches={servicebranches}
        />
      </div>
    </div>
  );
}
