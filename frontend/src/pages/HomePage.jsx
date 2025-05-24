import React from 'react';
import Hero from '../components/home/Hero';
import PromoSection from '../components/home/PromoSection';
import NewArrivals from '../components/home/NewArrivals';
import ShopByCategory from '../components/home/ShopByCategory';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <PromoSection />
      <ShopByCategory/>
      <NewArrivals />
    </div>
  );
};

export default HomePage;