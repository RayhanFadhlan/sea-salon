import { getBranches } from "@/app/actions/actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AddBranchForm } from "@/components/add-branch-form";
import { AddServiceForm } from "@/components/add-service-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  if (session.role !== "ADMIN") {
    redirect("/dashboard");
  }
  
  const branches = await getBranches();


  return (
    <div className="min-h-screen py-12 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-16">Admin Dashboard</h2>
      <div className="flex justify-center space-x-8  w-3/4">
        <div className="w-1/2 h-full flex flex-col">
          <AddBranchForm />
        </div>
        <div className="w-1/2 h-full flex flex-col">
          <AddServiceForm  branches={branches}/>
        </div>
      </div>
    </div>
  );
}
