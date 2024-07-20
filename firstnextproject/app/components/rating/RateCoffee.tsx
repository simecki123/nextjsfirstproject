'use client'

import { useState } from "react";
import { giveOrderRating } from "@/app/api/api";
import { useRouter } from "next/navigation"

export default function RateCoffee({ coffeeOrderId }: any) {
  const router = useRouter();
  const [givenStars, setGivenStars] = useState<number | null>(null)
  const starsValues = [1, 2, 3, 4, 5];
  const [error, setError] = useState('')

  const fullStars = givenStars ? starsValues.slice(0, givenStars).map(value => (
    <FullStar key={value} value={value} handleClick={setGivenStars} />
  )) : null

  const emptyStars = givenStars ? starsValues.slice(givenStars).map(value => (
    <EmptyStar key={value} value={value} handleClick={setGivenStars} />
  )) : starsValues.map(value => (
    <EmptyStar key={value} value={value} handleClick={setGivenStars} />
  ))

  const handleRating = async () => {
    if (givenStars) {
      console.log("Zvijezde su dane", givenStars, "ID ", coffeeOrderId);
      try {
        const ratingUpdate = givenStars
        const res = await giveOrderRating({ coffeeOrderId: coffeeOrderId.toString(), ratingUpdate });
        console.log("Update order response: ", res);
        router.push('/my-orders');
      } catch (error) {
        console.error("Error updating order: ", error);
        setError('An error occurred while submitting your rating');
      }
    } else {
      setError('Please leave your star to give us your rating');
    }
  }

  return (
    <div className="bg-gray-200 rounded-xl py-14 px-14 flex flex-col">
      <div className="flex justify-center">
        <h1 className="text-2xl">Please rate coffee </h1>
      </div>
      <div className="flex justify-center">
        {fullStars ? (
          <>
            {fullStars}
            {emptyStars}
          </>
        ) : emptyStars}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={handleRating} className="px-4 py-2 bg-blue-500 text-white rounded 
          hover:bg-blue-600 hover:scale-105 transition">Submit</button>
      </div>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  )
}

interface StarProps {
  value: number,
  handleClick: (value: number) => void
}

function EmptyStar({ value, handleClick }: StarProps) {
  return (
    <img src="/empty_star.png" alt="Empty Star" width={50} height={30}
      className="mx-1 cursor-pointer hover:scale-105 transition my-6"
      onClick={() => handleClick(value)} />
  )
}

function FullStar({ value, handleClick }: StarProps) {
  return (
    <img src="/full_star.png" alt="Full Star" width={50} height={30}
      className="mx-1 cursor-pointer hover:scale-105 transition my-6"
      onClick={() => handleClick(value)} />
  )
}
