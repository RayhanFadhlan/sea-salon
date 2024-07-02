"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
interface ServiceNBranch {
  serviceName: string;
  branchNames: string;
}

interface ServicesSectionProps {
  services: ServiceNBranch[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const plugin = React.useRef(
    AutoScroll({ speed: 1.5, stopOnInteraction: false, stopOnFocusIn: false })
  ); // Changed to autoScrollPlugin
  return (
    <div className="flex flex-col items-center my-32" id="servicesSection">
      <h2 className="text-5xl font-bold my-8 ">Our Services</h2>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-6xl"
        opts={{ loop: true }}
      >
        <CarouselContent className="-ml-1 flex">
          {services.map((service, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-4">
                <Card className="w-full h-full">
                  <CardContent className="flex flex-col aspect-w-4 aspect-h-3 items-center justify-center p-8 space-y-4 h-48">
                    <span className="text-3xl font-semibold text-center">
                      {service.serviceName}
                    </span>
                    <span className="text-sm text-secondary-foreground text-center">
                      Available on {service.branchNames}
                    </span>{" "}
                    {/* Smaller text */}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
