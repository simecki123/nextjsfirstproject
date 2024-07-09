import React from 'react';

export default function Brew() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="inline-block text-4xl mb-96">
        <h1>I will make coffee in</h1>
        <div className="flex flex-row justify-around my-4">
          <TimeButton time={5} />
          <TimeButton time={10} />
          <TimeButton time={15} />
        </div>
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">BREW</button>
        </div>
      </div>
    </div>
  );
}

function TimeButton({ time }: { time: number }) {
  return (
    <div className="w-16 px-4 py-2 bg-gray-200 rounded text-center cursor-pointer
      hover:bg-gray-400 hover:shadow-lg transform hover:scale-105">{time}</div>
  )
}
