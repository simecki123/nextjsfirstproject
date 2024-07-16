'use client'
import { createEvent } from "@/app/api/api";
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function BrewButton({ eventData }: { eventData: number | null }) {
  const router = useRouter();
  const [notification, setNotification] = useState<string | null>(null);

  async function handleClick() {
    console.log(JSON.parse(window.localStorage.getItem('user') || '{}'), ' --> user')

    try {
      const userId = `${JSON.parse(window.localStorage.getItem('user') || '{}').userId}`;
      const pendingTime = eventData ? eventData : 10;
      const response = await createEvent( {userId, pendingTime })
      

      if (response.status === 409) {
        setNotification("You already have an event in progress.➡️");
        return;
      }

      if (!(response.status === 200)) {
        throw new Error('Failed to create event');
      }

      router.push('/mainpage');
    } catch (err) {
      console.log('FAILED TO POST USER EVENT', err);
    }
  }

  //Error message redirect functionality
  async function handleErrorMessageRedirect() {
    router.push('/mainpage')

  }

  return (
    <div>
      {notification && (
        <div className="flex items-center justify-center notification bg-red-500 text-white p-4 rounded mb-4">
          {notification}
          <div>
            <button className=" px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 grow hover:scale-105 transition"
              onClick={handleErrorMessageRedirect}>
              Go back</button>
          </div>
        </div>

      )}
      <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-black grow hover:scale-105 transition"
        onClick={handleClick}>BREW</button>
    </div>
  )
}
