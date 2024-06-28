import React from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
const services = [
  { id: 1, title: 'Haircuts and Styling', description: 'Offering the latest trends and techniques in hair cutting and styling.' },
  { id: 2, title: 'Manicure and Pedicure', description: 'Professional nail care services for beautiful and healthy nails.' },
  { id: 3, title: 'Facial Treatments', description: 'Customized facial treatments to rejuvenate and nourish your skin.' },
  { id: 4, title: 'Facial Treatments', description: 'Customized facial treatments to rejuvenate and nourish your skin.'},{ id: 1, title: 'Haircuts and Styling', description: 'Offering the latest trends and techniques in hair cutting and styling.' },
  { id: 2, title: 'Manicure and Pedicure', description: 'Professional nail care services for beautiful and healthy nails.' },
  { id: 3, title: 'Facial Treatments', description: 'Customized facial treatments to rejuvenate and nourish your skin.' },
  { id: 4, title: 'Facial Treatments', description: 'Customized facial treatments to rejuvenate and nourish your skin.'},
];

const ServicesSection = () => {
  return (
    <section className="services-section py-8">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-center mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map(service => (
            <Card key={service.id} className="service-card max-w-xl mx-auto shadow-md rounded-lg overflow-hidden">
              <CardHeader>
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              </CardHeader>
              <CardContent>
                <p>{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
