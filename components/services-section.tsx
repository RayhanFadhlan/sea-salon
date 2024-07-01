"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import AutoScroll from 'embla-carousel-auto-scroll'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const services = [
  {
    id: 1,
    title: "Haircuts and Styling",
    description:
      "Offering the latest trends and techniques in hair cutting and styling.",
  },
  {
    id: 2,
    title: "Manicure and Pedicure",
    description:
      "Professional nail care services for beautiful and healthy nails.",
  },
  {
    id: 3,
    title: "Facial Treatments",
    description:
      "Customized facial treatments to rejuvenate and nourish your skin.",
  },
  {
    id: 4,
    title: "Facial Treatments",
    description:
      "Customized facial treatments to rejuvenate and nourish your skin.",
  },
  {
    id: 1,
    title: "Haircuts and Styling",
    description:
      "Offering the latest trends and techniques in hair cutting and styling.",
  },
  {
    id: 2,
    title: "Manicure and Pedicure",
    description:
      "Professional nail care services for beautiful and healthy nails.",
  },
  {
    id: 3,
    title: "Facial Treatments",
    description:
      "Customized facial treatments to rejuvenate and nourish your skin.",
  },
  {
    id: 4,
    title: "Facial Treatments",
    description:
      "Customized facial treatments to rejuvenate and nourish your skin.",
  },
];

// export const ServicesSection = () => {
//   const autoplayPlugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

//   return (
//     <section className="services-section py-8">
//       <div className="container mx-auto">
//         <h2 className="text-5xl font-bold text-center mb-6">Our Services</h2>
//         <Carousel
//           plugins={[autoplayPlugin.current]}
//           className="w-full"
//           onMouseEnter={autoplayPlugin.current.stop}
//           onMouseLeave={autoplayPlugin.current.reset}
//         >
//           <CarouselContent>
//             {services.map((service, index) => (
//               <CarouselItem key={index}>
//                 <div className="p-1">
//                   <Card className="service-card max-w-xl mx-auto shadow-md rounded-lg overflow-hidden">
//                     <CardContent>
//                       <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
//                       <p>{service.description}</p>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;

export default function ServicesSection() {
  const plugin = React.useRef(AutoScroll({speed:1.5, stopOnInteraction:false, stopOnFocusIn:false,  })); // Changed to autoScrollPlugin
  return (
    <div className="flex flex-col items-center my-32"> {/* Changed to a column flex container */}
      <h2 className="text-5xl font-bold my-8 ">Our Services</h2> {/* Added heading */}
      <Carousel plugins={[plugin.current]} className="w-full max-w-6xl" opts={{loop: true}}>
        <CarouselContent className="-ml-1 flex">
          {services.map((service, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-4">
                <Card className="w-full h-full">
                  <CardContent className="flex flex-col aspect-w-4 aspect-h-3 items-center justify-center p-8 space-y-4 h-48">
                    <span className="text-3xl font-semibold text-center">{service.title}</span>
                    <span className="text-sm text-secondary-foreground text-center">Available on Maindawiawidjdawi Branch</span> {/* Smaller text */}
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