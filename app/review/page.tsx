export const dynamic = "force-dynamic";
import React from "react";
import { ReviewList } from "@/components/review-list";
import ReviewForm from "@/components/review-form";
import { getAllReviews } from "../actions/actions";


export default async function Review() {
  const reviews = await getAllReviews();
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-center pb-16">
        <ReviewForm />
      </div>
      <h2 className="text-2xl font-bold">Reviews</h2>

      <div className="my-8">
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}
