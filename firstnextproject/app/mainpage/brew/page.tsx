'use client'
import CoffeeTypeComponent from '@/app/components/brew_components/coffe-type-components';
import { useState } from 'react';

export default function Brew() {

  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="inline-block text-4xl mb-96 bg-gray-200 px-4 py-4 rounded-xl">
        <h1>I will make coffee in</h1>
        <div className="flex flex-row justify-around my-4">
          <TimeButton time={5} isSelected={selectedButton === 5} onSelect={setSelectedButton} />
          <TimeButton time={10} isSelected={selectedButton === 10} onSelect={setSelectedButton} />
          <TimeButton time={15} isSelected={selectedButton === 15} onSelect={setSelectedButton} />
        </div>
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">BREW</button>
        </div>
      </div>
      <div className='block'>
        <CoffeeTypeComponent />
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
        hover:shadow-lg transform hover:scale-105 transition-all
        ${isSelected ? 'bg-green-400 text-white' : 'bg-green-300 hover:bg-green-400'}`}
      onClick={() => onSelect(time)}
    >
      <span>{time}</span>
    </div>
  )
}
