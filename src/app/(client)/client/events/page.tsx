'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [userTimezone, setUserTimezone] = useState<string>('');
  
  useEffect(() => {
    // Get user's timezone
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    fetchEvents();
  }, []);
  
  const formatEventTime = (date: string, time: string, sourceTimezone: string = 'America/Cayman'): string => {
    try {
      const [year, month, day] = date.split('-');
      const [hours, minutes] = time.split(':');
      
      // Create date in Cayman timezone
      const eventDate = new Date(Date.UTC(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
        parseInt(hours, 10),
        parseInt(minutes, 10)
      ));
      
      // Convert to user's timezone
      const userDate = toZonedTime(eventDate, userTimezone);
      
      return format(userDate, 'h:mm a');
    } catch (error) {
      console.error('Error formatting event time:', error);
      return time;
    }
  };

  const fetchEvents = async () => {
    // Add your event fetching logic here
  };
  
  const renderEvent = (event: Event) => {
    const startTime = formatEventTime(event.startDate, event.startTime);
    const endTime = formatEventTime(event.endDate, event.endTime);
    
    return (
      <div key={event.id} className="event-card">
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <div className="event-time">
          <p>
            {format(new Date(event.startDate), 'MMMM d, yyyy')}
            <br />
            {startTime} - {endTime} ({userTimezone})
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Events</h1>
      <div className="grid gap-4">
        {events.map(renderEvent)}
      </div>
    </div>
  );
} 