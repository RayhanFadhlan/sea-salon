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