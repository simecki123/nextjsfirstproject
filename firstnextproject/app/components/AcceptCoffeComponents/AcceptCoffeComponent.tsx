import React from 'react';
import coffeIcon from '@/public/coffeImage.png';

export default function AcceptCoffeComponent() {
    const user = {
        firstName: "Teo",
        lastName: "Jakšić",
        coffeNumber: 10,
        score: 4.5,
    };

    return (
        <div className='border max-w-sm border-gray-300 shadow-lg rounded-lg p-4 bg-white'>
            <div className='flex justify-between items-center mb-4'>
                <p className='text-lg font-semibold'>{user.firstName} is going to make coffee in 5 minutes. Do you want one too?</p>
                <img src={coffeIcon.src} alt="Coffee icon" className='h-11 w-11' />
            </div>
            <div className='flex justify-between'>
                <button className='bg-green-500 text-white py-3 px-5 rounded-lg hover:bg-green-600 transition duration-300 mx-1'>✅</button>
                <button className='bg-red-500 text-white py-3 px-5 rounded-lg hover:bg-red-600 transition duration-300 mx-1'>❌</button>
            </div>
        </div>
    );
}
