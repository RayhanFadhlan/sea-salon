import React from "react";
import BranchesInfoCard from "../../components/branch-info";
import { getBranchesInfo } from "../actions/actions";
export const dynamic = "force-dynamic";
export default async function Services() {
  const branches = await getBranchesInfo();
 
  return (
    <div>
      <BranchesInfoCard branchesInfo={branches} />
    </div>
  );
}
