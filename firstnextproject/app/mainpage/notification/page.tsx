// 'use client';
// import AcceptCoffeComponent from '@/app/components/AcceptCoffeComponents/AcceptCoffeComponent';
//
// export interface Event {
//   eventId: string,
//   firstName: string,
//   lastName: string,
//   status: string
// }
//
// export default async function Brew() {
//
//   const url = `http://46.101.127.179:8080/api/events/ongoing/${JSON
//     .parse(window.localStorage.getItem('user') || '{}').userId}`
//
//   const response: Response = await fetch(url, {
//     headers: {
//       "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
//       "Content-Type": "application/json"
//     }
//   })
//
//   const currentEvents: Event[] = await response.json();
//
//   const notificationComps = currentEvents.map(event => (
//     <div>
//       <AcceptCoffeComponent event={event} />
//     </div>
//   ));
//
//   return (
//     <div className="flex items-center justify-center h-screen">
//       {currentEvents &&
//         notificationComps}
//     </div>
//   );
// }
//

'use client';

import { useState, useEffect } from 'react';
import AcceptCoffeComponent from '@/app/components/AcceptCoffeComponents/AcceptCoffeComponent';

export interface Event {
  eventId: string;
  firstName: string;
  lastName: string;
  status: string;
}

export default function Brew() {
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');

        if (!user.userId || !token) {
          throw new Error('User or token not found');
        }

        const url = `http://46.101.127.179:8080/api/events/pending/${user.userId}`;
        const response = await fetch(url, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data: Event[] = await response.json();
        setCurrentEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex items-center justify-center h-screen">
      {currentEvents.map(event => (
        <div key={event.eventId}>
          <AcceptCoffeComponent event={event} />
        </div>
      ))}
    </div>
  );
}
