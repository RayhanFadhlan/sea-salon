import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react"; // Import Star icon for ratings
import { prisma } from "@/lib/prisma"; // Import Prisma client

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
};

export async function ReviewList() {
  const reviews = await prisma.review.findMany();

  return (
    <div className="mt-6 grid gap-6">
      {reviews.map((review: Review) => (
        <div key={review.id} className="grid gap-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage />
              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <div className="font-medium">{review.name}</div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${index < review.rating ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {review.comment}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
