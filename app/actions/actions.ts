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
