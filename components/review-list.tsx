"use client";
import React, {useState, useEffect} from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from 'lucide-react'; // Import Star icon for ratings
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
}
// const reviews = [
//   { id: 1, name: "John Doe", rating: 5, comment: "Great service, I'll be back!" },
//   { id: 2, name: "Jane Doe", rating: 4, comment: "Nice place, friendly staff." },
//   { id: 3, name: "Alice", rating: 3, comment: "It was okay, nothing special." },
//   { id: 4, name: "Bob", rating: 5, comment: "Best salon in town!" },
//   { id: 5, name: "Charlie", rating: 2, comment: "Not impressed, won't return." },

// ]

const ReviewList =  () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/review", {
          method: "GET",
        });
        const data = await response.json();
        setReviews(data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);
  
  return (
    <div className="mt-6 grid gap-6">
      {reviews.map((review : Review) => (
        <div key={review.id} className="grid gap-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <div className="font-medium">{review.name}</div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className={`w-5 h-5 ${index < review.rating ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`} />
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
  )
}

export default ReviewList;