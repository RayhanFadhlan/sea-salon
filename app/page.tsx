import Link from "next/link";
import { Button } from "@/components/ui/button";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contacts-section";
import { ScissorsLineDashed } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <div className="w-full h-[90vh] relative overflow-hidden flex flex-col md:flex-row items-center bg-gradient-to-r from-background to-muted-foreground">
        <div className="w-full md:w-[60%] h-full px-6 sm:px-10 md:pl-24 space-y-4 flex items-center justify-between">
          <div>
            <h1 className="text-4xl pb-2 sm:text-5xl md:text-6xl font-bold text-secondary-foreground">
              Beauty and Elegance Redefined.
            </h1>
            <p className="text-lg pb-4 md:text-xl text-muted-foreground">
              Explore the Full Range of Our Exceptional Services
            </p>
            <div className="flex gap-4">
              <Button variant={"secondary"}>
                Our Reviews
              </Button>
              <Button>
                Reserve
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[40%] h-[60vh] md:h-[80vh]  flex justify-center items-center">
        <div className="max-w-full h-full">
            <Image src="/tes.png" alt="salon" width={600} height={400} layout="responsive" />
          </div>
        </div>
      </div>
      <ServicesSection />
    </div>
  );
}
