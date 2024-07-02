import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../components/ui/card";

interface BranchesInfoCardProps {
  branchesInfo: BranchInfo[];
}

export default function BranchesInfoCard({
  branchesInfo,
}: BranchesInfoCardProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-8xl  items-center flex-col flex min-h-screen">
      <h1 className="text-3xl font-bold mb-8 pt-8">
        Services Across Our Branches
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {branchesInfo.map((branch, index) => (
          <Card key={index} className="max-w-md mx-auto w-full h-full">
            <CardHeader>
              <CardTitle>{branch.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold">Available Services:</h3>
              <ul className="list-disc pl-6 space-y-2">
                {branch.services.map((service, serviceIndex) => (
                  <li key={serviceIndex}>
                    {service.name}{" "}
                    <span className="text-muted-foreground">
                      ({service.time} minutes)
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Branch Location:</h3>
                <p>{branch.address}</p>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-semibold">Hours:</h3>
                <p>{branch.hours}</p>
              </div>
            </CardContent>
            <CardFooter>{/* Add any footer content if needed */}</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
