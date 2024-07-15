'use client'
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CoffeeTypeComponent() {

  const params = useParams();
  const eventId = params.choose;

  const values = [0, 1, 2, 3, 4, 5];

  const [selectedAmountOfMilk, setAmountOfMilk] = useState<number | null>(0);
  const [selectedAmountOfSugar, setAmountOfSugar] = useState<number | null>(0);

  const router = useRouter();

  function handleClick(): void {

    const url = 'http://46.101.127.179:8080/api/orders/create';

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        eventId: `${eventId}`,
        creatorId: `${JSON.parse(window.localStorage.getItem('user') || '{}').userId}`,
        type: `TURKISH`,
        sugarQuantity: selectedAmountOfSugar,
        milkQuantity: selectedAmountOfMilk,
      }),
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
        "Content-Type": "application/json"
      }
    })

    router.push('/mainpage')
  }

  return (
    <div className="bg-gray-200 py-4 px-4 rounded-xl">
      <div className="flex flex-row">
        <div className="flex flex-col justify-around">
          <div className="flex flex-row items-center">
            <select className="text-xl bg-gray-50 border border-gray-300 text-gray-900
        rounded-lg focus:ring-blue-500 focus:border-blue-500 block
        w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="turkish">Turska</option>
              <option value="nescaffe">Nescaffe</option>
            </select>
          </div>

          <div className="flex flex-row items-center">
            {values.map((valueSugar) => (
              <SugarButton
                key={valueSugar} // Add key prop here
                value={valueSugar}
                isSelected={selectedAmountOfSugar === valueSugar}
                onSelect={setAmountOfSugar}
              />
            ))}
          </div>

          <div className="flex flex-row items-center">
            {values.map((valueMilk) => (
              <MilkButton
                key={valueMilk} // Add key prop here
                value={valueMilk}
                isSelected={selectedAmountOfMilk === valueMilk}
                onSelect={setAmountOfMilk}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <img src="/coffeImage.png" width={50} height={30} className="ml-6 pb-3" alt="coffee"></img>
          <img src="/sugar-cube.png" width={50} height={30} className="ml-6 mb-5 mt-3" alt="sugar"></img>
          <img src="/milk-carton.png" width={50} height={30} className="ml-6 mb-2" alt="milk"></img>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleClick}>Order</button>
      </div>
    </div>
  );
}

interface AmountProp {
  value: number;
  isSelected: boolean;
  onSelect: (value: number) => void;
}

function SugarButton({ value, isSelected, onSelect }: AmountProp) {
  return (
    <button
      key={value} // Ensure key prop is passed to the root JSX element
      className={`py-6 px-6 rounded-xl w-8 h-8 flex items-center justify-center cursor-pointer 
          m-1 hover:scale-105 transform transition shadow-xl 
          ${isSelected ? 'text-2xl bg-blue-500 text-white' : 'text-xl bg-blue-400 hover:bg-blue-500'}`}
      onClick={() => onSelect(value)}
    >
      {value}
    </button>
  );
}

function MilkButton({ value, isSelected, onSelect }: AmountProp) {
  return (
    <button
      key={value} // Ensure key prop is passed to the root JSX element
      className={`py-6 px-6 rounded-xl w-8 h-8 flex items-center justify-center cursor-pointer 
          m-1 hover:scale-105 transform transition shadow-xl 
          ${isSelected ? 'text-2xl bg-purple-500 text-white' : 'text-xl bg-purple-400 hover:bg-purple-500'}`}
      onClick={() => onSelect(value)}
    >
      {value}
    </button>
  );
}
