'use client'
import { createEvent } from "@/app/api/api";
import { getCookie } from "@/utils/cookieUtils";
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";

export default function BrewButton({ eventData }: { eventData: number | null }) {
  const router = useRouter();
  const [notification, setNotification] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push('/mainpage');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  async function handleClick() {
    const userCookie = getCookie('user');
    console.log(JSON.parse(userCookie || '{}'), ' --> user')
    try {
      const userId = `${JSON.parse(userCookie || '{}').userId}`;
      const pendingTime = eventData ? eventData : 10;
      const response = await createEvent({ userId, pendingTime })
     
      
      if (response.status === 200) {
        setNotification("Event created successfully!");
        setIsSuccess(true);
      } else {
        throw new Error('Failed to create event');
      }
    } catch (err) {
      setNotification("An error has occured, please try again!");
       return;
      
    }
  }

  function handleDismiss() {
    setNotification(null);
  }

  return (
    <div>
      {notification && (
        <div className={`flex items-center justify-between notification ${isSuccess ? 'bg-green-500' : 'bg-red-500'} text-white p-4 rounded mb-4`}>
          <span>{notification}</span>
          {!isSuccess && (
            <button 
              className="ml-4 px-2 py-1 bg-white text-red-500 rounded hover:bg-red-100 transition"
              onClick={handleDismiss}
            >
              Dismiss
            </button>
          )}
        </div>
      )}
      <button 
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-black grow hover:scale-105 transition"
        onClick={handleClick}
        disabled={isSuccess}
      >
        BREW
      </button>
    </div>
  )
}