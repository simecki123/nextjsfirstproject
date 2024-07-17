'use client'

interface EndEventButtonProps {
  handleCoffeeDoneFunction: () => void;
}

export default function EndEventButton({ handleCoffeeDoneFunction }: EndEventButtonProps) {
  return (
    <div
      className="bg-black text-white cursor-pointer hover:scale-105 transition rounded-xl py-6 px-6 mb-12"
      onClick={handleCoffeeDoneFunction}
    >
      <p className="text-2xl">Coffee Done</p>
    </div>
  )
}
