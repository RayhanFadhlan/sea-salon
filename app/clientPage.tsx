"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ServicesSection from "@/components/services-section";
import Image from "next/image";
import Particles from "@/components/ui/particles";
import { useTheme } from "next-themes";
import TypingAnimation from "@/components/ui/typing-animation";

interface ServiceNBranch {
  serviceName: string;
  branchNames: string;
}


type ClientPageProps = {
  services: ServiceNBranch[];
};

export function ClientPage({ services }: ClientPageProps) {
  const { theme } = useTheme();

  return (
    <div className="relative">
      <Particles
        className="absolute inset-0"
        quantity={2000}
        ease={80}
        color={theme === "light" ? "#000000" : "#f0f0f0"}
        refresh={true}
      />

      <div className="z-10w-full h-[90vh] relative overflow-hidden flex flex-col md:flex-row items-center">
        <div className="w-full md:w-[60%] h-full px-6 sm:px-10 md:pl-24 space-y-4 flex items-center justify-between">
          <div>
            <TypingAnimation
              className="text-left text-4xl pb-2 sm:text-5xl md:text-6xl font-bold text-primary max-w-2xl"
              text="Beauty and Elegance Redefined."
            />

            <p className="text-lg pb-4 md:text-xl text-muted-foreground">
              Explore the Full Range of Our Exceptional Services
            </p>
            <div className="flex gap-4">
              <Link href="/review">
                <Button variant="secondary">Our Reviews</Button>
              </Link>
              <Link href="/reserve">
                <Button>Reserve</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[40%] h-[60vh] md:h-[80vh]  flex justify-center items-center">
          <div className="max-w-full h-full flex justify-center items-center">
            <Image
              src={theme === "light" ? "/hero.png" : "/invert-hero.png"}
              alt="salon"
              width={600}
              height={400}
              layout="responsive"
            />
          </div>
        </div>
      </div>
      <ServicesSection services={services} />
    </div>
  );
}
