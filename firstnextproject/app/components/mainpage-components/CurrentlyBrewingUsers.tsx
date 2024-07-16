'use client'
import { getEventsInProgress } from '@/app/api/api';
import React, { useEffect, useState } from 'react';
import CurentlyBrewingComponent from '../CurentlyBrewingComponent/CurentlyBrewingComponent';

interface Event {
  creatorId: string,
  eventId: string,
  firstName: string,
  lastName: string,
  status: string
}

export default function CurrentlyBrewingUsers() {

  const [currentlyBrewingUsers, setCurentlyBrewingUsers] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getEventsInProgress();
      console.log("Events in progress: ", response.data);
      setCurentlyBrewingUsers(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const currentlyBrewingComps = currentlyBrewingUsers.map((user) => (
    <CurentlyBrewingComponent key={user.eventId} firstName={user.firstName} />
  ));
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 gap-4 bg-gray-100 bg-opacity-80 p-4 rounded-lg shadow-md
        max-h-[50vh] overflow-y-auto w-full max-w-7xl'>
      {currentlyBrewingUsers.length !== 0 && currentlyBrewingComps}
      {currentlyBrewingUsers.length === 0 && (
        <p className='text-lg font-semibold'>No one is brewing coffee at the moment. Try to refresh the page...</p>
      )}
    </div>
  )
}
