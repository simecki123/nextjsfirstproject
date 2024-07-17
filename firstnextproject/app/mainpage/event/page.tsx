"use client";
import { useEffect, useState } from "react";
import EndEventButton from "../../components/EventComponents/end-event-button";
import OrderEvent from "../../components/EventComponents/order-component";
import { getOrderById, getUserEventInProgress, patchEventToDone } from "@/app/api/api";
import { useRouter } from "next/navigation";

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

export default function EventPage() {
  const [user, setUser] = useState<User | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      setUser(storedUser);
      fetchEventAndOrders(storedUser.userId);
    } else {
      setError("User not found in local storage");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('Updated orders: ', orders);
  }, [orders]);

  const fetchEventAndOrders = async (userId: string) => {
    setLoading(true);
    try {
      const response = await getUserEventInProgress(userId);
      console.log("Response: ", response);
      
      const newOrders = [];
      for (let i = 0; i < response.data.orderIds.length; i++) {
        const databaseOrder = await getOrderById(response.data.orderIds[i]);
        console.log("Database order: ", databaseOrder);
        newOrders.push(databaseOrder.data);
      }
      console.log("Orders: ", newOrders);
      setOrders(newOrders);
      setEvent(response.data);
    } catch (err) {
      setError("Failed to fetch event and orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCoffeeDoneFunction = async () => {
    if (!user || !event) {
      setError("User or event data is missing");
      return;
    }
    try {
      await patchEventToDone(user.userId);
      console.log("Event updated successfully");
      router.push('/mainpage');
    } catch (err) {
      setError("Failed to update event");
      console.error(err);
    }
  };

  if (error) {
    if (error === "Failed to fetch event and orders") {
      return (
        <div className="flex items-center justify-center h-screen ">
          <p className="text-lg text-red-600 font-semibold bg-red-100 p-4 rounded-md border border-red-300 shadow-md">
            You don't have an event that is in progress
          </p>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-screen ">
        <p className="text-lg text-red-600 font-semibold bg-red-100 p-4 rounded-md border border-red-300 shadow-md">
          Error: {error}
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

        {loading ? (
          <p className="text-center mt-4">Loading orders...</p>
        ) : orders.length === 0 ? (
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
        <EndEventButton handleCoffeeDoneFunction={handleCoffeeDoneFunction} />
      </div>
    </div>
  );
}