import Link from 'next/link';
import React from 'react';

// Define the props interface
interface OrderProps {
    order: {
        coffeeOrderId: number;
        creatorId: number;
        type: string;
        sugarQuantity: number;
        milkQuantity: number;
        rating: number;
    };
}

export default function MyOrderComponent({ order }: OrderProps) {
    return (
        <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
            <p className='text-gray-800 font-medium'>Order for you</p>
            <p className='text-gray-800 font-medium'>Sugar: {order.sugarQuantity}</p>
            <p className='text-gray-800 font-medium'>Milk: {order.milkQuantity}</p>
            <p className='text-gray-800 font-medium'>Your rating: {order.rating}</p>

            <Link href={`/mainpage/myorders/rate/${order.coffeeOrderId}`}>
                <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
                    Rate
                </button>
            </Link>
        </div>
    );
}
