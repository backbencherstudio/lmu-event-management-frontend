'use client'
import React, { useState, useRef } from 'react';
import format from 'date-fns/format';
import bgimg from '../../../../public/client/background.png';
import { IoChevronDown } from 'react-icons/io5';
import DatePickerModal from './DatePickerModal';
import CalendarGrid from './CalendarGrid';
import leftarrow from '../../../../public/client/left.svg';
import rightarrow from '../../../../public/client/right.svg';

// Sample events data
const events = [
  {
    title: 'Fin Talks – Future Focused',
    start: new Date(2024, 2, 31, 17, 30), // March 31, 2024, 5:30 PM
    end: new Date(2024, 2, 31, 19, 30),   // March 31, 2024, 7:30 PM
  },
  {
    title: 'Business Networking Event',
    start: new Date(2024, 3, 5, 14, 0),   // April 5, 2024, 2:00 PM
    end: new Date(2024, 3, 5, 17, 0),     // April 5, 2024, 5:00 PM
  },
  {
    title: 'Corporate Workshop',
    start: new Date(2024, 3, 10, 9, 0),   // April 10, 2024, 9:00 AM
    end: new Date(2024, 3, 10, 16, 0),    // April 10, 2024, 4:00 PM
  }
];

export default function Landingpage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Custom toolbar component
  const CustomToolbar = () => {
    const goToPrevious = () => {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() - 1);
      setCurrentDate(newDate);
    };

    const goToNext = () => {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      setCurrentDate(newDate);
    };

    return (
      <div className="w-full px-6 sm:px-3 md:px-6 py-3 md:py-4 bg-[#f2f7fa] rounded-lg flex flex-row justify-between items-center mb-4 md:mb-10 gap-3 md:gap-4 overflow-hidden">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:flex items-center gap-2 md:gap-4">
            <div className="self-stretch rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#cfd4dc] flex justify-start items-start overflow-hidden">
              <button
                onClick={goToPrevious}
                className="self-stretch min-h-10 md:min-h-12 px-3 md:px-4 py-2 md:py-3 bg-white border-r border-[#cfd4dc] flex justify-center items-center gap-2 hover:bg-[#f8f9fb]"
              >
                <img src={leftarrow.src} alt="Previous" className="w-5 md:w-6 h-5 md:h-6" />
              </button>
              <button
                onClick={goToNext}
                className="self-stretch min-h-10 md:min-h-12 px-3 md:px-4 py-2 md:py-3 bg-white border-r border-[#cfd4dc] flex justify-center items-center gap-2 hover:bg-[#f8f9fb]"
              >
                <img src={rightarrow.src} alt="Next" className="w-5 md:w-6 h-5 md:h-6" />
              </button>
            </div>
          </div>
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setIsModalOpen(true)}
              className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-1 outline-offset-[-1px] outline-[#cfd4dc] inline-flex justify-center items-center gap-1 overflow-hidden hover:bg-[#f8f9fb]"
            >
              <div className="px-0.5 flex justify-center items-center">
                <span className="text-[#344053] text-sm sm:text-base md:text-lg font-normal font-['Outfit'] leading-normal">
                  {format(currentDate, 'MMM yyyy')}
                </span>
              </div>
              <IoChevronDown className={`w-5 sm:w-6 h-5 sm:h-6 text-[#344053] transition-transform ${isModalOpen ? 'rotate-180' : ''}`} />
            </button>

            <DatePickerModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSelect={(date) => {
                handleNavigate(date);
              }}
              currentDate={currentDate}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#cfd4dc] flex justify-start items-start overflow-hidden">
            <button
              onClick={() => handleViewChange('agenda')}
              className={`min-h-10 md:min-h-12 px-3 sm:px-4 md:px-5 py-2 md:py-3 bg-white border-r border-[#cfd4dc] flex justify-center items-center gap-1 md:gap-2 ${
                view === 'agenda' ? 'bg-[#f8f9fb] text-[#006198] font-semibold' : 'text-[#4a4c56]'
              }`}
            >
              <span className="text-xs sm:text-sm md:text-base font-['Outfit'] leading-tight">List</span>
            </button>
            <button
              onClick={() => handleViewChange('month')}
              className={`min-h-10 md:min-h-12 px-3 sm:px-4 md:px-5 py-2 md:py-3 border-r border-[#cfd4dc] flex justify-center items-center gap-1 md:gap-2 ${
                view === 'month' ? 'bg-[#f8f9fb] text-[#006198] font-semibold' : 'bg-white text-[#4a4c56]'
              }`}
            >
              <span className="text-xs sm:text-sm md:text-base font-['Outfit'] leading-tight">Month</span>
            </button>
            <button
              onClick={() => handleViewChange('day')}
              className={`hidden md:flex min-h-10 md:min-h-12 px-3 sm:px-4 md:px-5 py-2 md:py-3 justify-center items-center gap-1 md:gap-2 ${
                view === 'day' ? 'bg-[#f8f9fb] text-[#006198] font-semibold' : 'bg-white text-[#4a4c56]'
              }`}
            >
              <span className="text-xs sm:text-sm md:text-base font-['Outfit'] leading-tight">Day</span>
            </button>
          </div>
          <button className="hidden md:flex px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#006198] rounded-lg justify-center items-center gap-1 md:gap-2 hover:bg-[#004d7a]">
            <span className="text-center text-white text-sm sm:text-base md:text-lg font-medium font-['Outfit'] leading-normal">
              Find Events
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="overflow-x-hidden w-full">
        {/* Hero Section */}
        <div className="box px-5">
          {/* Background container with responsive height */}
          <div className="background h-[200px] sm:h-[338px] md:h-[528px] rounded-3xl overflow-hidden">
            {/* Content container with background image */}
            <div 
              className="content flex justify-center"
              style={{
                backgroundImage: `url(${bgimg.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%'
              }}
            >
              {/* Text content container */}
              <div className="text flex flex-col items-center justify-start w-full mt-[50px] md:mt-[135px] px-4">
                <div className="w-full max-w-[1280px] -mt-8 sm:-mt-0 flex flex-col items-center justify-start gap-2 md:gap-4">
                  {/* Main heading */}
                  <div className="text-center text-white text-2xl sm:text-4xl md:text-[64px] font-bold font-['Figtree'] capitalize">
                    Welcome to Cayman Biz Events
                  </div>
                  {/* Subheading */}
                  <div className="w-full md:w-[783px] text-center text-white text-sm sm:text-xl md:text-2xl font-semibold font-['Figtree'] capitalize leading-tight md:leading-[38.40px]">
                    the ultimate hub for corporate events and networking opportunities in the Cayman Islands!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="box mx-auto px-2 md:px-4 py-4 md:py-8">
          {/* Calendar container with max width and padding */}
          <div className="max-w-full mx-5 bg-white rounded-2xl overflow-hidden p-3 md:p-6 -mt-20 md:-mt-36">
            {/* Toolbar */}
            <CustomToolbar />
            
            {/* Calendar Grid */}
            {view === 'month' && (
              <div className="overflow-x-hidden">
                {/* Mobile Calendar View */}
                <div className="block md:hidden">
                  <div className="flex flex-col gap-3 px-1">
                    {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() }, (_, i) => {
                      const day = i + 1;
                      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                      const dayEvents = events.filter(event => {
                        const eventDate = new Date(event.start);
                        return eventDate.getDate() === day &&
                              eventDate.getMonth() === currentDate.getMonth() &&
                              eventDate.getFullYear() === currentDate.getFullYear();
                      });
                      
                      return (
                        <div key={i} className="bg-[#f2f7fa] rounded-lg overflow-hidden">
                          <div className="grid grid-cols-12">
                            {/* Day number and name column */}
                            <div className="col-span-4 p-5 flex flex-col justify-center">
                              <div className="text-[#006198] text-3xl font-normal leading-none">{day}</div>
                              <div className="text-[#4A4C56] text-sm font-normal mt-2">{format(date, 'EEEE')}</div>
                            </div>
                            
                            {/* Event content column */}
                            <div className="col-span-8 bg-white p-5 flex justify-center items-center min-h-[140px]">
                              {dayEvents.length > 0 ? (
                                <div className="w-full">
                                  {dayEvents.map((event, idx) => (
                                    <div key={idx} className="mb-2">
                                      <div className="text-[#006198] text-lg font-normal truncate">
                                        {event.title}
                                      </div>
                                      <div className="text-[#4A4C56] text-sm">
                                        {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-[#006198] text-lg font-normal text-center">
                                  No Events Today
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Desktop Calendar View */}
                <div className="hidden md:block">
                  <CalendarGrid
                    events={events}
                    currentDate={currentDate}
                  />
                </div>
              </div>
            )}
            {view === 'agenda' && (
              <div className="overflow-x-hidden">
                <div className="space-y-4">
                  {events
                    .sort((a, b) => a.start - b.start)
                    .map((event, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="font-semibold text-lg text-[#25314c] truncate">{event.title}</div>
                        <div className="text-sm text-gray-600">
                          {format(event.start, 'MMMM d, yyyy h:mm a')} - {format(event.end, 'h:mm a')}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {view === 'day' && (
              <div className="overflow-x-hidden">
                <div className="min-h-[600px] border rounded-lg">
                  <div className="text-center p-4 border-b bg-gray-50">
                    <h2 className="text-xl font-semibold text-[#25314c]">
                      {format(currentDate, 'MMMM d, yyyy')}
                    </h2>
                  </div>
                  <div className="divide-y">
                    {events
                      .filter(event => 
                        event.start.toDateString() === currentDate.toDateString()
                      )
                      .sort((a, b) => a.start - b.start)
                      .map((event, index) => (
                        <div key={index} className="p-4 hover:bg-gray-50">
                          <div className="font-semibold text-[#25314c] truncate">{event.title}</div>
                          <div className="text-sm text-gray-600">
                            {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}