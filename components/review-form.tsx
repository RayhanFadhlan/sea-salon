"use client";
import React, { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
const ReviewForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    console.log("Form data:", formObject);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify(formObject),
      });
      if (response.ok) {
        console.log("Review submitted successfully");
        toast({ description: "Review submitted successfully" });
      } else {
        // Handle non-200 responses
        const errorResponse = await response.json();
        toast({ description: errorResponse.message, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error submitting review");
      toast({ description: "An error occurred", variant: "destructive" });
    }
    router.refresh();
    form.reset();
  };

  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
        <CardDescription>Share your feedback about our salon.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="rating">Rating</Label>
              <Select name="rating">
                <SelectTrigger id="rating">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Leave a comment"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Submit Review</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ReviewForm;
