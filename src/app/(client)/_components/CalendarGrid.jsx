import React from 'react';
import format from 'date-fns/format';

const CalendarDay = ({ day, events = [], isToday, isSelected, isHighlighted }) => {
  const getDateColor = () => {
    if (isHighlighted) return 'text-[#FF69B4]'; // Pink for highlighted dates
    if (isSelected) return 'text-[#006198]';    // Blue for selected dates
    return 'text-[#006198]';                    // Default blue
  };

  const getBackgroundColor = () => {
    if (isHighlighted) return 'bg-[#FFF0F5]';   // Light pink background
    if (isSelected) return 'bg-[#f2f7fa]';      // Selected day background
    return 'bg-[#f2f7fa]';                      // Default background
  };

  return (
    <div className={`w-full min-w-0 h-[200px] lg:h-[254px] p-2 lg:p-4 ${getBackgroundColor()} border-r border-b border-white flex flex-col justify-start items-start gap-2 lg:gap-[18px] overflow-hidden`}>
      <div className={`${getDateColor()} text-2xl lg:text-[32px] font-normal font-['Outfit'] leading-normal flex items-center`}>
        {day}
      </div>
      <div className="bg-white w-full flex-1 flex flex-col justify-center items-center gap-1 p-2 lg:p-4">
        <div className="flex flex-col justify-center items-center gap-2 lg:gap-4 w-full">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="w-full ">
                <div className={`${isHighlighted ? 'text-[#FF69B4]' : 'text-[#006198]'} text-base lg:text-lg font-normal font-['Outfit'] leading-snug truncate`}>
                  {event.title}
                </div>
                <div className="text-[#4A4C56] text-xs lg:text-sm font-normal font-['Outfit'] leading-snug">
                  {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                </div>
              </div>
            ))
          ) : (
            <div className={`${isHighlighted ? 'text-[#FF69B4]' : 'text-[#006198]'} text-base lg:text-lg font-normal font-['Outfit'] leading-snug text-center`}>
              No Events Today
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CalendarGrid = ({ events, currentDate }) => {
  // Get first day of month and number of days
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  // Create array for all days in month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Add empty cells for days before the first of the month
  const emptyCells = Array.from({ length: startDayOfWeek }, (_, i) => null);
  const allCells = [...emptyCells, ...days];

  // Get events for a specific day
  const getEventsForDay = (day) => {
    if (!day) return [];
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  // Check if a day is today
  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <div className="grid grid-cols-7 gap-0 w-full min-w-0 overflow-hidden">
      {/* Weekday headers */}
      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
        <div key={day} className="w-full min-w-0 py-2 text-[#4A4C56] text-xs lg:text-sm font-medium border-b border-white flex items-center truncate">
          {day}
        </div>
      ))}
      
      {/* Calendar days */}
      {allCells.map((day, index) => (
        <React.Fragment key={index}>
          {day !== null ? (
            <CalendarDay
              day={day}
              events={getEventsForDay(day)}
              isToday={isToday(day)}
              isSelected={false}
              isHighlighted={getEventsForDay(day).length > 0}
            />
          ) : (
            <div className="w-full min-w-0 h-[200px] lg:h-[254px] bg-[#f8f9fb] border-r border-b border-white" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CalendarGrid; 