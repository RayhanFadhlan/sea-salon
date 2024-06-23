/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5MBqDaA58ou
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Component() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8">
        <div>
          <h2 className="text-2xl font-bold">Write a Review</h2>
          <form className="mt-6 grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rating">Rating</Label>
              <div className="flex items-center gap-2">
                <StarIcon className="w-6 h-6 fill-primary" />
                <StarIcon className="w-6 h-6 fill-primary" />
                <StarIcon className="w-6 h-6 fill-primary" />
                <StarIcon className="w-6 h-6 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-6 h-6 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea id="comment" placeholder="Share your thoughts" />
            </div>
            <Button type="submit" className="justify-self-end">
              Submit Review
            </Button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold">All Reviews</h2>
          <div className="mt-6 grid gap-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    I've been experimenting with my LuminaCook Multi-Function Air Fryer for a few weeks now, and it's
                    been a versatile addition to my kitchen. It's great for making crispy fries, chicken wings, and even
                    some healthier options.
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Alex Smith</div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    I recently purchased the SparkleShine Home Cleaning Robot, and it has been a game-changer in my
                    life. I used to spend hours every weekend cleaning my house, but now I can simply turn on this
                    little robot and let it do the work. It's incredibly efficient, navigating around obstacles with
                    ease. The only reason I didn't give it a perfect 5-star rating is that it occasionally gets stuck
                    under low furniture. Overall, it's been a great addition to my home, saving me time and effort.
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Emily Parker</div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    The battery life is impressive, lasting me for long-haul flights without any issues. They are
                    comfortable to wear for extended periods, and I appreciate the sleek design. Worth every penny, and
                    I'd recommend these headphones to anyone who values high-quality audio and peace and quiet.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}