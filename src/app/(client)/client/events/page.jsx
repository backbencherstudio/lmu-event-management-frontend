import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [userTimezone, setUserTimezone] = useState('');
  
  useEffect(() => {
    // Get user's timezone
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    fetchEvents();
  }, []);
  
  const formatEventTime = (date, time, sourceTimezone = 'America/Cayman') => {
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
      const userDate = utcToZonedTime(eventDate, userTimezone);
      
      return format(userDate, 'h:mm a');
    } catch (error) {
      console.error('Error formatting event time:', error);
      return time;
    }
  };
  
  const renderEvent = (event) => {
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
  
  // ... existing code ...
}; 