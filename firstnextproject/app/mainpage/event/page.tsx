"use client";
import { useEffect, useState } from "react";
import EndEventButton from "./end-event-button";
import OrderEvent from "./order-component";
import { getUserEventInProgress, patchEventToDone } from "@/app/api/api";
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
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      setUser(storedUser);
      fetchEventAndOrders(storedUser.userId);
    } else {
      setError("User not found in local storage");
    }
  }, []);

  useEffect(() => {
    console.log('Updated orders: ', orders);
  }, [orders]);

  const fetchEventAndOrders = async (userId: string) => {
    try {
      const response = await getUserEventInProgress(userId);
      
      setOrders(response.data.orders);
      setEvent(response.data);
    } catch (err) {
      setError("Failed to fetch event and orders");
      console.error(err);
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
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
    <div className="bg-stone-200 rounded-xl px-12 py-6 mx-4 my-4">
      <h1 className="text-6xl font-bold">Orders</h1>
    </div>
    <div className="flex-grow overflow-y-auto px-4">
      <div className="flex flex-col items-center space-y-4 pb-4">
        {orders.map((order) => (
          <OrderEvent key={order.coffeeOrderId} order={order} />
        ))}
      </div>
    </div>
    <div className="p-4">
      <EndEventButton handleCoffeeDoneFunction={handleCoffeeDoneFunction} />
    </div>
  </div>
  );
}