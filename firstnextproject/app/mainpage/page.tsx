import React from 'react';
import MainPageComponent from '../components/mainpage-components/mainpage';
import BrewCoffeeComponent from '../components/mainpage-components/brew-coffee-components';
import AcceptCoffeComponent from '../components/AcceptCoffeComponents/AcceptCoffeComponent';
import CurentlyBrewingComponent from '../components/CurentlyBrewingComponent/CurentlyBrewingComponent';

export default function MainPage() {

  const currentlyBrewingUsers = ['Karlo', 'Teo']

  const currentlyBrewingComps = currentlyBrewingUsers.map((name) => (
    <CurentlyBrewingComponent key={name} name={name} />
  ))

  return (
    <div>
      <MainPageComponent /> {/* This component acts as a header */}
      <div className='flex h-[80vh] items-center justify-center'>
        <BrewCoffeeComponent />
      </div>
      <div className='flex items-center'>
        {currentlyBrewingUsers.length !== 0 &&
          currentlyBrewingComps}
      </div >
    </div >
  );
}

