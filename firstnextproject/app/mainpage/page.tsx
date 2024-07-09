'use client'
import React from 'react';
import MainPageComponent from '../components/mainpage-components/mainpage';
import BrewCoffeeComponent from '../components/mainpage-components/brew-coffee-components';
import { useRouter } from 'next/navigation';
import AcceptCoffeComponent from '../components/AcceptCoffeComponents/AcceptCoffeComponent';
import CurentlyBrewingComponent from '../components/CurentlyBrewingComponent/CurentlyBrewingComponent';

export default function MainPage() {

  const router = useRouter();

  return (
    <div>
      <MainPageComponent /> {/* This component acts as a header */}
      <div className="min-h-screen flex flex-col items-center justify-center">
        {/* Centering the BrewCoffeeComponent */}
        <div className="flex items-center justify-center mt-4">
          <div className="shadow hover:shadow-lg transform hover:scale-105
          p-4 bg-white transition duration-300 rounded-2xl cursor-pointer mb-96"
            onClick={() => { router.push('/mainpage/brew') }}>
            <BrewCoffeeComponent />
          </div>
        </div>
        <CurentlyBrewingComponent />
      </div>
    </div>
  );
}

