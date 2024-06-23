import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from 'lucide-react'; // Import Star icon for ratings
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const reviews = [
    { id: 1, name: "Thomas", rating: 5, comment: "I've been experimenting with my LuminaCook Multi-Function Air Fryer for a few weeks now, and it's been a versatile addition to my kitchen. It's great for making crispy fries, chicken wings, and even some healthier options." },
    { id: 2, name: "Sekar", rating: 4, comment: "I recently t." }
];

const ReviewList = () => {
  return (
    <div className="mt-6 grid gap-6">
      {reviews.map(review => (
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