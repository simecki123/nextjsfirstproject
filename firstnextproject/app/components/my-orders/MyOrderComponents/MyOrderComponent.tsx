import { getEventById, getUserById } from '@/app/api/api';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

// Define the props interface
interface OrderProps {
    order: {
        "coffeeOrderId": "string",
        "eventId": "string",
        "userId": "string",
        "type": "TURKISH",
        "sugarQuantity": number,
        "milkQuantity": number,
        "rating": number

    };
}

interface Event {

    "eventId": "string",
    "userId": "string",
    "startTime": "2024-07-19T06:36:20.392Z",
    "endTime": "2024-07-19T06:36:20.392Z",
    "status": "COMPLETED",
    "pendingTime": 0,
    "orderIds": [
        "string"
    ]

}

interface User {
    "userId": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "coffeeNumber": number,
    "score": number
}



export default async function MyOrderComponent({ order }: OrderProps) {
    const cookieStore = cookies();
    const cookieToken = cookieStore.get('token');

    const eventRes = await getEventById(cookieToken?.value, order.eventId);
    const event: Event = eventRes.data;

    const response = await getUserById(cookieToken?.value, event.userId);
    const user: User = response.data;

    return (
        <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
            <p className='text-gray-800 font-medium'>Order from: {user.firstName}</p>
            <p className='text-gray-800 font-medium'>Sugar: {order.sugarQuantity}</p>
            <p className='text-gray-800 font-medium'>Milk: {order.milkQuantity}</p>
            {order.rating === 0 ? <p className='text-gray-800 font-medium'>You haven't rated this order yet</p>
                : <p className='text-gray-800 font-medium'>You rated this order: {order.rating}</p>}

            <Link href={`/my-orders/rate/${order.coffeeOrderId}`}>
                <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
                    Rate
                </button>
            </Link>
        </div>
    );
}

