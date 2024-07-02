"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createReview(formData: FormData) {
  await prisma.review.create({
    data: {
      name: formData.get("name") as string,
      rating: Number(formData.get("rating")),
      comment: formData.get("comment") as string,
    },
  });
  revalidatePath("/review");
}

export async function getAllReviews(){
try{
  const reviews = await prisma.review.findMany(
    // sort descending
    {
      orderBy: {
        id: "desc",
      },
    }
    
  );
  return reviews;
}
catch(e){
  console.log(e);
}
    
}

export async function getReservationsByID(id: number){
  try{
    const reservations = await prisma.reservation.findMany({
      where: {
        user_id: id,
      },
      include: {
        branch: true,
        service: true,
      },
    });
    const ret = reservations.map((reservation) => {
      return {
        id: reservation.id,
        user_name: reservation.name,
        phone: reservation.phone,
        branch_name: reservation.branch.name,
        service_name: reservation.service.name,
        duration: reservation.service.duration,
        time: reservation.time,
        date: reservation.date,
      };
    });
    return ret;
  }
  catch(e){
    console.log(e);
    return [];
  }
}

export async function getBranches(){
  try{
    const branches = await prisma.branch.findMany();
    return branches;
  }
  catch(e){
    console.log(e);
    return [];
  }
}

export async function getServices(){
  try{
    const services = await prisma.service.findMany();
    return services;
  }
  catch(e){
    console.log(e);
    return [];
  }
}

export async function getServiceBranches(){
  try{
    const servicebranches = await prisma.serviceBranch.findMany();
    return servicebranches;
  }
  catch(e){
    console.log(e);
    return [];
  }
}

export async function getServicesWithLoc() {
  try {
    const servicesWithBranches = await prisma.service.findMany({
      include: {
        branches: {
          include: {
            branch: true,
          },
        },
      },
    });

    const serviceMap = new Map<string, Set<string>>();

    servicesWithBranches.forEach(service => {
      service.branches.forEach(sb => {
        if (!serviceMap.has(service.name)) {
          serviceMap.set(service.name, new Set());
        }
        serviceMap.get(service.name)!.add(sb.branch.name);
      });
    });

    const formattedData = Array.from(serviceMap.entries()).map(([serviceName, branchSet]) => {
      return {
        serviceName,
        branchNames: Array.from(branchSet).join(', '),
      };
    });

    return formattedData;
  } catch (error) {
    console.log(error);
    return [];
  }
}


export async function getBranchesInfo(){
  const branches = await prisma.branch.findMany({
    include: {
      services: {
        include: {
          service: true,
        }
      }
    }
  });

  return branches.map(branch => ({
    name: branch.name,
    services: branch.services.map(serviceBranch => ({
      name: serviceBranch.service.name,
      time: serviceBranch.service.duration.toString()
    })),
    address: branch.location,
    hours: `${branch.open_time} - ${branch.close_time}`
  }));
}