import { useState } from "react";

export default function CoffeeTypeComponent() {

  const values = [0, 1, 2, 3, 4, 5]

  const [selectedAmountOfMilk, setAmountOfMilk] = useState<number | null>(null);
  const [selectedAmountOfSugar, setAmountOfSugar] = useState<number | null>(null);

  return (
    <div className="bg-gray-200 py-4 px-4 rounded-xl">

      <div className="flex flex-row">
        <div className="flex flex-col justify-around">
          <div className="flex flex-row items-center">
            <select className="bg-gray-50 border border-gray-300 text-gray-900
        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
        w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="turkish">Turska</option>
              <option value="nescaffe">Nescaffe</option>
            </select>
          </div>

          <div className="flex flex-row items-center">
            {values.map(valueSugar => (
              <SugarButton value={valueSugar} isSelected={selectedAmountOfSugar === valueSugar}
                onSelect={setAmountOfSugar} />
            ))}
          </div>

          <div className="flex flex-row items-center">
            {values.map(valueMilk => (
              <MilkButton value={valueMilk} isSelected={selectedAmountOfMilk === valueMilk}
                onSelect={setAmountOfMilk} />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <img src="/coffeImage.png" width={50} height={30} className="ml-6 pb-3"></img>
          <img src="/sugar-cube.png" width={50} height={30} className="ml-6 mb-5 mt-3"></img>
          <img src="/milk-carton.png" width={50} height={30} className="ml-6 mb-2"></img>
        </div>

      </div>

      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Order</button>
      </div>

    </ div>
  );
}

interface AmountProp {
  value: number,
  isSelected: boolean,
  onSelect: (value: number) => void,
}

function SugarButton({ value, isSelected, onSelect }: AmountProp) {
  return (
    <button
      className={
        `rounded-xl w-8 h-8 flex items-center justify-center cursor-pointer 
          m-1 hover:scale-105 transform transition shadow-xl 
          ${isSelected ? 'bg-blue-500 text-white' : 'bg-blue-400 hover:bg-blue-500'}
        `}
      onClick={() => onSelect(value)}>{value}</button>
  )
}

function MilkButton({ value, isSelected, onSelect }: AmountProp) {
  return (
    <button
      className={
        `rounded-xl w-8 h-8 flex items-center justify-center cursor-pointer 
          m-1 hover:scale-105 transform transition shadow-xl 
          ${isSelected ? 'bg-purple-500 text-white' : 'bg-purple-400 hover:bg-purple-500'}
        `}
      onClick={() => onSelect(value)}>{value}</button>
  )
}

