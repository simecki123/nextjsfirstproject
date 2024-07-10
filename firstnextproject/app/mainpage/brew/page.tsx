'use client'
import CoffeeTypeComponent from '@/app/components/brew_components/coffe-type-components';
import RateCoffee from '@/app/components/rating_components/rate-component';
import { useState } from 'react';

export default function Brew() {

  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="inline-block text-4xl mb-96 bg-gray-200 px-4 py-4 rounded-xl">
        <div className='px-14 py-14'>
          <div className='flex flex-row items-center mb-8'>
            <h1>Start making</h1>
            <img src='/coffeImage.png' width={50} height={30} className='mx-4 mb-2'></img>
            <h1>in minutes</h1>
          </div>
          <div className="flex flex-row justify-around my-4">
            <TimeButton time={5} isSelected={selectedButton === 5} onSelect={setSelectedButton} />
            <TimeButton time={10} isSelected={selectedButton === 10} onSelect={setSelectedButton} />
            <TimeButton time={15} isSelected={selectedButton === 15} onSelect={setSelectedButton} />
          </div>
          <div className="flex justify-center mt-8">
            <button className="px-4 py-2 bg-gray-600 text-white rounded
              hover:bg-black grow hover:scale-105 transition">BREW</button>
          </div>
        </div>
      </div>
      <div className='block'>
        <CoffeeTypeComponent />
        <RateCoffee />
      </div>
    </div>
  );
}

interface TimeButtonProps {
  time: number,
  isSelected: boolean;
  onSelect: (time: number) => void;
}

function TimeButton({ time, isSelected, onSelect }: TimeButtonProps) {
  return (
    <div
      className={`w-16 h-16 flex items-center justify-center rounded cursor-pointer
        hover:shadow-lg transform hover:scale-105 transition-all grow mx-2
        ${isSelected ? 'bg-stone-400 text-white' : 'bg-stone-300 hover:bg-stone-400'}`}
      onClick={() => onSelect(time)}
    >
      <span>{time}</span>
    </div>
  )
}
