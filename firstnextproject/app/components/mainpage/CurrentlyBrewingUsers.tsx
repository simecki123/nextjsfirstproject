import { cookies } from 'next/headers'
import { getEventsInProgress } from '@/app/api/api';
import CurentlyBrewingComponent from './CurentlyBrewingComponent';

interface Event {
  userId: string,
  eventId: string,
  status: string
}

export default async function CurrentlyBrewingUsers() {
  let currentlyBrewingUsers: Event[] = [];

  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    const response = await getEventsInProgress(token?.value);
    currentlyBrewingUsers = response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  const currentlyBrewingComps = currentlyBrewingUsers.map((user) => (
    <CurentlyBrewingComponent key={user.eventId} userId={user.userId} />
  ));

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 gap-4 bg-gray-100 bg-opacity-80 p-4 rounded-lg shadow-md
        max-h-[50vh] overflow-y-auto w-full max-w-7xl mb-4'>
      {currentlyBrewingUsers.length !== 0 && currentlyBrewingComps}
      {currentlyBrewingUsers.length === 0 && (
        <p className='text-lg font-semibold'>No one is brewing coffee at the moment. Try to refresh the page...</p>
      )}
    </div>
  )
}