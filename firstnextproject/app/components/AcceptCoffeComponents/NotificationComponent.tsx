'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import AcceptCoffeComponent from '@/app/components/AcceptCoffeComponents/AcceptCoffeComponent';
import { getPendingEvents } from '@/app/api/api';
import { getCookie } from '@/utils/cookieUtils';


export interface Event {
  eventId: string;
  firstName: string;
  lastName: string;
  status: string;
}



export default function NotificationComponent() {
    const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const userCookie = getCookie('user');
          const user = JSON.parse(userCookie || '{}'); 
          
          const token = getCookie('token');
  
          if (!user.userId || !token) {
            throw new Error('User or token not found');
          }
          
          const response = await getPendingEvents(user.userId);
  
          
          console.log("response: ", response);
  
          if (!(response.status === 200)) {
            throw new Error('Failed to fetch events');
          }
  
          const data = response.data;
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
    if(currentEvents.length === 0) {
      return(
        <div className='flex items-center justify-center h-screen'>
          <p className='text-lg text-red-600 font-semibold bg-red-100 p-4 rounded-md border border-red-300 shadow-md'>
            You dont have any notifications, try to refresh the page
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
  
}
