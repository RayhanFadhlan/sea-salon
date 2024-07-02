export const dynamic = "force-dynamic";
import React from "react";
import { ReviewList } from "@/components/review-list";
import ReviewForm from "@/components/review-form";
import { getAllReviews } from "../actions/actions";
import { Button } from "@/components/ui/button";
import { ReviewFormDialog } from "@/components/review-form-dialog";
export default async function Review() {
  const reviews = await getAllReviews();
  return (
    <div className="mx-auto max-w-2xl px-4 pt-16 py-8 sm:px-6 lg:px-8 min-h-screen">
      {/* <div className="flex justify-between pb-16">
        <ReviewForm />
      </div> */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <ReviewFormDialog />
      </div>

      <div className="my-8">
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}
