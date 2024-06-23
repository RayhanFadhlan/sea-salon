import React from 'react';

const contacts = [
  {
    name: 'Thomas',
    phone: '08123456789'
  },
  {
    name: 'Sekar',
    phone: '08164829372'
  }
];

const ContactSection = () => {
    return (
        <section id="about" className="bg-muted py-16 px-6 md:px-12 bg-gray-100">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <ul>
            {contacts.map((contact, index) => (
              <li key={index} className="text-muted-foreground">
                {contact.name} - {contact.phone}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  };
  
  export default ContactSection;