import React from 'react';
import { Truck, ShieldCheck, ArrowLeftRight, Clock } from 'lucide-react';

const features = [
  {
    icon: <Truck className="h-6 w-6" />,
    title: 'Free Shipping',
    description: 'On all orders over $50'
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Secure Payments',
    description: '100% secure checkout'
  },
  {
    icon: <ArrowLeftRight className="h-6 w-6" />,
    title: 'Easy Returns',
    description: '30-day return policy'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: '24/7 Support',
    description: 'Always here to help'
  }
];

const PromoSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-50 p-2 rounded-md text-blue-600">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;