"use client"
import React, { useEffect, useState } from 'react';
import MainPageComponent from '../components/mainpage-components/mainpage';
import BrewCoffeeComponent from '../components/mainpage-components/brew-coffee-components';
import CurentlyBrewingComponent from '../components/CurentlyBrewingComponent/CurentlyBrewingComponent';
import { getEventsInProgress } from '../api/api';

interface Event {
  creatorId: string,
  eventId: string,
  firstName: string,
  lastName: string,
  status: string
}

export default function MainPage() {
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
    <div className="flex flex-col min-h-screen">
      <MainPageComponent /> {/* This component acts as a header */}
      <div className='flex-grow flex items-center justify-center py-8'>
        <BrewCoffeeComponent />
      </div>
      <div className='flex justify-center pb-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-100 bg-opacity-80 p-4 rounded-lg shadow-md max-h-[50vh] overflow-y-auto w-full max-w-7xl'>
          {currentlyBrewingUsers.length !== 0 && currentlyBrewingComps}
          {currentlyBrewingUsers.length === 0 && (
            <p className='text-lg font-semibold'>No one is brewing coffee at the moment. Try to refresh the page...</p>
          )}
        </div>
      </div>
    </div>
  );
}