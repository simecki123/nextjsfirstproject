'use client'
interface TimeButtonProps {
  time: number,
  isSelected: boolean;
  onSelect: (time: number) => void;
}

export default function TimeButton({ time, isSelected, onSelect }: TimeButtonProps) {
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
