import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,

} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import ReviewForm from "../components/review-form";
export function ReviewFormDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Review</Button>
      </DialogTrigger>
      <DialogContent>
        <ReviewForm />
      </DialogContent>
    </Dialog>
  );
}
