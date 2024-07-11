'use client'
import AcceptCoffeComponent from '@/app/components/AcceptCoffeComponents/AcceptCoffeComponent';
import { useState } from 'react';


export default function Brew() {

  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center h-screen">
      <AcceptCoffeComponent />
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

