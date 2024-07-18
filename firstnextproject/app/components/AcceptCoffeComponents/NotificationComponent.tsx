// NotificationComponent.tsx
import { cookies } from 'next/headers';
import { getPendingEvents } from '@/app/api/api';
import AcceptCoffeComponent from '@/app/components/AcceptCoffeComponents/AcceptCoffeComponent';

export interface Event {
  eventId: string;
  firstName: string;
  lastName: string;
  status: string;
}

export default async function NotificationComponent() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');
  const tokenCookie = cookieStore.get('token');

  if (!userCookie || !tokenCookie) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-lg text-red-600 font-semibold bg-red-100 p-4 rounded-md border border-red-300 shadow-md'>
          User or token not found. Please log in again.
        </p>
      </div>
    );
  }

  const user = JSON.parse(userCookie.value);
  
  try {
    const response = await getPendingEvents(tokenCookie?.value, user.userId);

    if (response.status !== 200) {
      throw new Error('Failed to fetch events');
    }

    const currentEvents: Event[] = response.data;

    if (currentEvents.length === 0) {
      return (
        <div className='flex items-center justify-center h-screen'>
          <p className='text-lg text-red-600 font-semibold bg-red-100 p-4 rounded-md border border-red-300 shadow-md'>
            You don't have any notifications. Try to refresh the page.
          </p>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-screen">
        {currentEvents.map(event => (
          <div key={event.eventId}>
            <AcceptCoffeComponent event={event} />
          </div>
        ))}
      </div>
    );

  } catch (error) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-lg text-red-600 font-semibold bg-red-100 p-4 rounded-md border border-red-300 shadow-md'>
          Error: {error instanceof Error ? error.message : 'An error occurred'}
        </p>
      </div>
    );
  }
}