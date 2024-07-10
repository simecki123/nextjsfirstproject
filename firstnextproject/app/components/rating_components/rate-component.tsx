'use client'

import { useState } from "react"

export default function RateCoffee() {

  const [givenStars, setGivenStars] = useState<number | null>(null)
  // TODO: set the current star selected and then console log stars selected to console

  const starsValues = [1, 2, 3, 4, 5];

  const emptyStars = starsValues.map(value => (
    <EmptyStar key={value} value={value} handleClick={setGivenStars} />
  ))

  const fullStars = givenStars ? starsValues.slice(0, givenStars).map(value => (
    <FullStar key={value} value={value} handleClick={setGivenStars} />
  )) : null

  const empty2 = givenStars ? starsValues.slice(givenStars).map(value => (
    <EmptyStar key={value} value={value} handleClick={setGivenStars} />
  )) : null


  return (
    <div className="bg-gray-200 rounded-xl py-14 px-14 flex flex-col">
      <div className="flex justify-center">
        <h1 className="text-2xl">Please rate coffee</h1>
      </div>
      <div className="flex">
        {fullStars ? (
          <div className="flex">
            <div className="flex flex-row">
              {fullStars}
            </div>
            <div className="flex flex-row">
              {empty2}
            </div>
          </div>
        ) : emptyStars}
      </div>
      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded 
          hover:bg-blue-600 hover:scale-105 transition">Submit</button>
      </div>
    </div >
  )
}

interface EmptyStarProp {
  key: number,
  value: number,
  handleClick: (value: number) => void
}

function EmptyStar({ key, value, handleClick }: EmptyStarProp) {
  return (
    <img src="/empty_star.png" width={50} height={30}
      className="mx-1 cursor-pointer hover:scale-105 transition my-6"
      onClick={() => handleClick(value)} key={value}></img>
  )
}


function FullStar({ key, value, handleClick }: EmptyStarProp) {
  return (
    <img src="/full_star.png" width={50} height={30}
      className="mx-1 cursor-pointer hover:scale-105 transition my-6"
      onClick={() => handleClick(value)} key={value}></img>
  )
}

