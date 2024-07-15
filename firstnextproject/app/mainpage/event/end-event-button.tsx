'use client'

interface EndEventButtonProps {
  handleCoffeeDoneFunction: () => void;
}

export default function EndEventButton({ handleCoffeeDoneFunction }: EndEventButtonProps) {
  return (
    <div 
      className="bg-stone-200 cursor-pointer hover:scale-105 transition rounded-xl py-6 px-6 mb-44" 
      onClick={handleCoffeeDoneFunction}
    >
      <p className="text-4xl">Coffee Done</p>
    </div>
  )
}