'use client'
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function BrewButton({ eventData }: { eventData: number | null }) {
  const router = useRouter();
  const [notification, setNotification] = useState<string | null>(null);

  async function handleClick() {
    const url = "http://46.101.127.179:8080/api/events/create";
    console.log(JSON.parse(window.localStorage.getItem('user') || '{}'), ' --> user')

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          creatorId: `${JSON.parse(window.localStorage.getItem('user') || '{}').userId}`,
          pendingTime: eventData ? eventData : 10,
        }),
        headers: {
          "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 409) {
        setNotification("You already have an event in progress.➡️");
        return;
      }

      if (!response.ok) {
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
