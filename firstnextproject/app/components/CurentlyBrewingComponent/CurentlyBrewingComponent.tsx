import React from 'react';
import coffeImage from '@/public/coffeImage.png';

export default function CurentlyBrewingComponent() {
    const user = {
        firstName: "Teo",
        lastName: "Jakšić",
        coffeNumber: 10,
        score: 4.5,
    };

    return (
        <div className='bg-white bg-opacity-60 shadow-lg rounded-lg p-4 text-center'>
            <p className='text-lg font-semibold'>
                Currently brewing {user.firstName}
            </p>
            <div className='inline-block animate-pulse'>
                <img src={coffeImage.src} alt="Coffee icon" className='h-11 w-11 mx-auto' />
            </div>
        </div>
    );
}
