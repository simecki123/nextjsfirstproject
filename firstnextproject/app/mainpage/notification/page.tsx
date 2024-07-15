'use client';
import AcceptCoffeComponent from '@/app/components/AcceptCoffeComponents/AcceptCoffeComponent';

export interface Event {
  eventId: string,
  firstName: string,
  lastName: string,
  status: string
}

export default async function Brew() {

  const url = `http://46.101.127.179:8080/api/events/ongoing/${JSON
    .parse(window.localStorage.getItem('user') || '{}').userId}`

  const response: Response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      "Content-Type": "application/json"
    }
  })

  const currentEvents: Event[] = await response.json();

  const notificationComps = currentEvents.map(event => (
    <div>
      <AcceptCoffeComponent event={event} />
    </div>
  ));

  return (
    <div className="flex items-center justify-center h-screen">
      {currentEvents &&
        notificationComps}
    </div>
  );
}

// 'use client'
// import { useRouter } from "next/navigation"
// export default function BrewButton({ eventData }: { eventData: number | null }) {
//
//   const router = useRouter();
//
//   function handleClick() {
//
//     const url = "http://46.101.127.179:8080/api/events/create";
//     console.log(JSON.parse(window.localStorage.getItem('user') || '{}'), ' --> user')
//
//     try {
//       fetch(url, {
//         method: "POST",
//         body: JSON.stringify({
//           creatorId: `${JSON.parse(window.localStorage.getItem('user') || '{}').userId}`,
//           pendingTime: eventData ? eventData : 10,
//         }),
//         headers: {
//           "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
//           "Content-Type": "application/json"
//         }
//       })
//     } catch (err) {
//       console.log('FAILED TO POST USER EVENT')
//       throw err
//     }
//
//     router.push('/mainpage')
//   }
//
//   return (
//     <button className="px-4 py-2 bg-gray-600 text-white rounded
//       hover:bg-black grow hover:scale-105 transition"
//       onClick={handleClick}>BREW</button>
//   )
// }
//
