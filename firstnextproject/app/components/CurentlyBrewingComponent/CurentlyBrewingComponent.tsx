import React from 'react';
import coffeImage from '@/public/coffeImage.png';
import { cookies } from 'next/headers';
import { getUserById } from '@/app/api/api';

interface User {
  "userId": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "coffeeNumber": number,
  "score": number
}

export default async function CurentlyBrewingComponent({ userId }: { userId: string }) {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token');
    const response = await getUserById(tokenCookie?.value, userId);
    const user: User = response.data;


    return (
        <div className='bg-white bg-opacity-60 shadow-lg rounded-lg p-4 text-center
            mx-2'>
            <p className='text-lg font-semibold'>
                Currently brewing {user.firstName} {user.lastName} 
            </p>
            <div className='inline-block animate-pulse'>
                <img src={coffeImage.src} alt="Coffee icon" className='h-11 w-11 mx-auto' />
            </div>
        </div>
    );
}
