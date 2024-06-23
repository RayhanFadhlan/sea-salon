/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YA7KcOtOSiY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ServicesSection from "@/components/services-section"
import ContactSection from "@/components/contacts-section"


export default function Home() {
  return (
    <div>
      <div className="w-full h-[90vh] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary-foreground">
            Sea Salon
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Beauty and Elegance Refefined.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button>
              Learn More
            </Button>
            <Button>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      <ServicesSection />
      <ContactSection />
    </div>
  )
}