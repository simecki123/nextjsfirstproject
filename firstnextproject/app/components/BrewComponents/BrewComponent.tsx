// components/BrewComponent.jsx
'use client'
import { useState } from 'react';
import BrewButton from './brew-button';
import TimeButton from './time-button';

export default function BrewComponent() {
  const [selectedButton, setSelectedButton] = useState<number | null>(5);

  return (
    <div className="inline-block text-4xl bg-gray-200 px-4 py-4 rounded-xl">
      <div className='px-14 py-14'>
        <div className='flex flex-row items-center mb-8'>
          <h1>Start making</h1>
          <img src='/coffeImage.png' width={50} height={30} className='mx-4 mb-2' alt="Coffee" />
          <h1>in minutes</h1>
        </div>
        <div className="flex flex-row justify-around my-4">
          <TimeButton time={5} isSelected={selectedButton === 5} onSelect={setSelectedButton} />
          <TimeButton time={10} isSelected={selectedButton === 10} onSelect={setSelectedButton} />
          <TimeButton time={15} isSelected={selectedButton === 15} onSelect={setSelectedButton} />
        </div>
        <div className="flex justify-center mt-8">
          <BrewButton eventData={selectedButton} />
        </div>
      </div>
    </div>
  );
}