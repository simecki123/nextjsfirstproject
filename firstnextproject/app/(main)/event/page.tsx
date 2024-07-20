import { getUserEventInProgress, getOrderById } from "@/app/api/api";
import EndEventButton from "@/app/components/event/EndEventButton";
import OrderEvent from "@/app/components/event/OrderEvent";
import { cookies } from 'next/headers';

export interface User {
  firstName: string;
  lastName: string;
  sub: string;
  userId: string;
}

export interface Order {
  coffeeOrderId: string;
  type: string;
  sugarQuantity: number;
  milkQuantity: number;
  userId: string;
}

async function getUser() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');
  return userCookie ? JSON.parse(userCookie.value) : null;
}

async function fetchEventAndOrders(userId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const response = await getUserEventInProgress(token?.value, userId);
  const newOrders = [];
  for (let i = 0; i < response.data.orderIds.length; i++) {
    const databaseOrder = await getOrderById(token?.value, response.data.orderIds[i]);
    newOrders.push(databaseOrder.data);
  }
  return { event: response.data, orders: newOrders };
}

export default async function EventPage() {
  const user = await getUser();

  let event, orders;
  try {
    ({ event, orders } = await fetchEventAndOrders(user.userId));
  } catch (error) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <p className="text-lg text-gray-600 font-semibold bg-gray-100 p-4 rounded-md border border-gray-300 shadow-md">
          You don't have an event that is in progress
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center overflow-hidden">

      <div className="scrollbar scrollbar-thumb-stone-700 scrollbar-track-stone-400
        w-[40%] h-[65vh] bg-stone-300 mb-8 mt-12 rounded-xl overflow-y-scroll
        bg-opacity-20">

        {orders.length === 0 ? (
          <p className="text-center mt-4 text-white">No orders</p>
        ) : (
          orders.map((order) => (
            <div key={order.coffeeOrderId} className="flex flex-col w-[100%] items-center justify-center bg-stone-300 bg-opacity-5">
              <OrderEvent order={order} />
            </div>
          ))
        )}

      </div>
      <EndEventButton userId={user.userId} />
    </div>
  );
}

