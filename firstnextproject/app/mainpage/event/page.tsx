
import EndEventButton from "../../components/EventComponents/end-event-button";
import OrderEvent from "../../components/EventComponents/order-component";
import { getUserEventInProgress, getOrderById } from "@/app/api/api";
import { cookies } from 'next/headers';

interface User {
  firstName: string;
  lastName: string;
  sub: string;
  userId: string;
}

interface Event {
  id: string;
  // Add other event properties here
}

interface Order {
  coffeeOrderId: string;
  type: string;
  sugarQuantity: number;
  milkQuantity: number;
  // Add other properties as needed
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
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <p className="text-lg text-red-600 font-semibold bg-red-100 p-4 rounded-md border border-red-300 shadow-md">
          User not found in cookie storage
        </p>
      </div>
    );
  }

  let event, orders;
  try {
    ({ event, orders } = await fetchEventAndOrders(user.userId));
  } catch (error) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <p className="text-lg text-red-600 font-semibold bg-red-100 p-4 rounded-md border border-red-300 shadow-md">
          You don't have an event that is in progress
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center overflow-hidden">
      <div className="scrollbar scrollbar-thumb-stone-700 scrollbar-track-stone-400
        w-[40%] h-[80vh] bg-stone-300 mb-4 rounded-xl overflow-y-scroll
        pt-20 bg-opacity-20">
        <div className="absolute top-6 left-0 right-0 flex items-center
          justify-center mt-4">
          <p className="text-4xl px-4 py-4 bg-stone-700 text-white rounded-xl
            ">Orders</p>
        </div>

        {orders.length === 0 ? (
          <p className="text-center mt-4">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.coffeeOrderId} className="flex flex-col w-[100%] items-center justify-center bg-stone-300 bg-opacity-5">
              <OrderEvent order={order} />
            </div>
          ))
        )}

      </div>
      <div>
        <EndEventButton userId={user.userId} />
      </div>
    </div>
  );
}