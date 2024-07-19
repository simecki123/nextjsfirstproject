// OrdersPage.tsx
import { cookies } from 'next/headers';
import { getUserOrders } from '@/app/api/api';
import MyOrderComponent from './MyOrderComponents/MyOrderComponent';

interface OrderList {
    "coffeeOrderId": "string",
        "eventId": "string",
        "userId": "string",
        "type": "TURKISH",
        "sugarQuantity": number,
        "milkQuantity": number,
        "rating": number
}



export default async function OrdersPage() {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');
    const tokenCookie = cookieStore.get('token');

    if (!userCookie) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <p className='text-lg text-red-600 font-semibold bg-red-100 p-4 rounded-md border border-red-300 shadow-md'>
                    User not found. Please log in again.
                </p>
            </div>
        );
    }

    const savedUser = JSON.parse(userCookie.value);
    
    if (!savedUser.userId) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <p className='text-lg text-red-600 font-semibold bg-red-100 p-4 rounded-md border border-red-300 shadow-md'>
                    User ID not found. Please log in again.
                </p>
            </div>
        );
    }

    try {
        
        const response = await getUserOrders(tokenCookie?.value, savedUser.userId);
        const orderList: OrderList[] = response.data;

        if (!Array.isArray(orderList) || orderList.length === 0) {
            return (
                <div className='flex items-center justify-center h-screen'>
                    <p className='text-lg text-red-600 font-semibold bg-red-100 p-4 rounded-md border border-red-300 shadow-md'>
                        You don't have any saved orders. Try to refresh the page.
                    </p>
                </div>
            );
        } 

        return (
            <div className='flex justify-center items-center min-h-screen bg-transparent'>
                <div className='w-full max-w-2xl bg-gray-500 bg-opacity-50 p-4 rounded-lg max-h-96 overflow-y-auto'>
                    {orderList.map((order, index) => (
                        <MyOrderComponent key={index} order={order}  />
                    ))}
                </div>
            </div>
        );

    } catch (error) {
        console.error('Error fetching orders:', error);
        return (
            <div className='flex items-center justify-center h-screen'>
                <p className='text-lg text-red-600 font-semibold bg-red-100 p-4 rounded-md border border-red-300 shadow-md'>
                    An error occurred while fetching your orders. Please try again later.
                </p>
            </div>
        );
    }
}

export const revalidate = 1;