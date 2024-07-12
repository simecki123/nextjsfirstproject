"use client";
import React, { useState, useEffect } from 'react';
import MyOrderComponent from './MyOrderComponents/MyOrderComponent';
import { getUserOrders } from '@/app/api/api';
import axios, { AxiosResponse } from 'axios';

// Define the OrderList interface outside the component
interface OrderList {
    coffeeOrderId: number;
    creatorId: number;
    type: string;
    sugarQuantity: number;
    milkQuantity: number;
    rating: number;
}

export default function OrdersPage() {
    // State to hold the list of orders
    const [orderList, setOrderList] = useState<OrderList[]>([]);

    // Fetch orders when the component mounts
    useEffect(() => {
        async function fetchOrders() {
            const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
            console.log('savedUser: ', savedUser);

            if (savedUser.userId) {
                try {
                    const response: AxiosResponse<OrderList[]> = await getUserOrders(savedUser.userId);
                    if (response && Array.isArray(response.data)) {
                        console.log('Response data is an array: ', response.data);
                        setOrderList(response.data); // Update the state with fetched orders
                    } else {
                        console.error('Response data is not an array');
                        setOrderList([]);
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                    setOrderList([]);
                }
            }
        }

        fetchOrders();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <div className='flex justify-center items-center min-h-screen bg-transparent'>
            <div className='w-full max-w-2xl bg-gray-500 bg-opacity-50 p-4 rounded-lg max-h-96 overflow-y-auto'>
                {orderList.map((order, index) => (
                    <MyOrderComponent key={index} order={order} />
                ))}
            </div>
        </div>
    );
}
