'use client'
import React from 'react';
import Image from 'next/image';
import coffeIcon from '@/public/coffeImage.png';
import { useRouter } from 'next/navigation';
import { Event } from './NotificationComponent';

export default function AcceptCoffeComponent({ event }: { event: Event }) {
    const router = useRouter();

    function pushMainpage() {
        router.push('/mainpage');
    }

    return (
        <div className='border max-w-sm border-gray-300 shadow-lg rounded-lg p-4 bg-stone-200'>
            <div className='flex justify-between items-center mb-4'>
                <p className='text-lg font-semibold'>{event.firstName} {event.lastName} is going to make coffee in 5 minutes. Do you want one too?</p>
                <Image src={coffeIcon} alt="Coffee icon" width={44} height={44} />
            </div>
            <div className='flex justify-between'>
                <button className='bg-green-500 text-white py-3 px-5 rounded-lg
                    hover:bg-green-600 transition duration-300 mx-1
                    hover:scale-105' onClick={() => router.push(`/mainpage/notification/${event.eventId}`)}>✔️</button>
                <button className='bg-red-500 text-white py-3 px-5 rounded-lg
                    hover:bg-red-600 transition duration-300 mx-1
                    hover:scale-105' onClick={pushMainpage}>❌</button>
            </div>
        </div>
    );
}