import { AddBranchForm } from "@/components/add-branch-form";
import { AddServiceForm } from "@/components/add-service-form";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen py-12 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-16">Admin Dashboard</h2>
      <div className="flex justify-center space-x-8  w-3/4" >
        <div className="w-1/2 h-full flex flex-col">
          <AddBranchForm />
        </div>
        <div className="w-1/2 h-full flex flex-col">
          <AddServiceForm />
        </div>
      </div>
    </div>
  );
}
