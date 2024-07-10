import React from 'react';
import coffeImage from '@/public/coffeImage.png';

export default function CurentlyBrewingComponent({ name }: { name: string }) {

    return (
        <div className='bg-white bg-opacity-60 shadow-lg rounded-lg p-4 text-center
            mx-2'>
            <p className='text-lg font-semibold'>
                Currently brewing {name}
            </p>
            <div className='inline-block animate-pulse'>
                <img src={coffeImage.src} alt="Coffee icon" className='h-11 w-11 mx-auto' />
            </div>
        </div>
    );
}
