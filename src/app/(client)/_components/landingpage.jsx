'use client'
import React, { useState, useRef } from 'react';
import format from 'date-fns/format';
import bgimg from '../../../../public/client/background.png';
import { IoChevronDown } from 'react-icons/io5';
import DatePickerModal from './DatePickerModal';
import CalendarGrid from './CalendarGrid';

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
      <div className="w-full px-6 py-4 bg-[#f2f7fa] rounded-lg inline-flex justify-between items-center overflow-hidden mb-4">
        <div className="flex justify-start items-center gap-6">
          <div className="flex justify-start items-center gap-4">
            <div className="flex justify-start items-center gap-4">
              <div className="self-stretch rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#cfd4dc] flex justify-start items-start overflow-hidden">
                <button
                  onClick={goToPrevious}
                  className="self-stretch min-h-10 px-3 py-2 bg-white border-r border-[#cfd4dc] flex justify-center items-center gap-2 hover:bg-[#f8f9fb]"
                >
                  <div className="w-5 h-5 relative">
                    <div className="w-[7.50px] h-[13.33px] left-[5.83px] top-[3.33px] absolute bg-[#25314c]" />
                  </div>
                </button>
                <button
                  onClick={goToNext}
                  className="self-stretch min-h-10 px-3 py-2 bg-white border-r border-[#cfd4dc] flex justify-center items-center gap-2 hover:bg-[#f8f9fb]"
                >
                  <div className="w-5 h-5 relative">
                    <div className="w-[7.50px] h-[13.33px] left-[6.67px] top-[3.33px] absolute bg-[#25314c]" />
                  </div>
                </button>
              </div>
              <div className="relative">
                <button
                  ref={buttonRef}
                  onClick={() => setIsModalOpen(true)}
                  className="px-3.5 py-2.5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#cfd4dc] inline-flex justify-center items-center gap-1 overflow-hidden hover:bg-[#f8f9fb]"
                >
                  <div className="px-0.5 flex justify-center items-center">
                    <span className="text-[#344053] text-base font-normal font-['Outfit'] leading-normal">
                      {format(currentDate, 'MMMM yyyy')}
                    </span>
                  </div>
                  <IoChevronDown className={`w-5 h-5 text-[#344053] transition-transform ${isModalOpen ? 'rotate-180' : ''}`} />
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
          </div>
        </div>
        <div className="flex justify-start items-center gap-4">
          <div className="rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#cfd4dc] flex justify-start items-start overflow-hidden">
            <button
              onClick={() => handleViewChange('agenda')}
              className={`min-h-10 px-4 py-2 bg-white border-r border-[#cfd4dc] flex justify-center items-center gap-2 ${
                view === 'agenda' ? 'bg-[#f8f9fb] text-[#006198] font-semibold' : 'text-[#4a4c56]'
              }`}
            >
              <span className="text-sm font-['Outfit'] leading-tight">List</span>
            </button>
            <button
              onClick={() => handleViewChange('month')}
              className={`min-h-10 px-4 py-2 border-r border-[#cfd4dc] flex justify-center items-center gap-2 ${
                view === 'month' ? 'bg-[#f8f9fb] text-[#006198] font-semibold' : 'bg-white text-[#4a4c56]'
              }`}
            >
              <span className="text-sm font-['Outfit'] leading-tight">Month</span>
            </button>
            <button
              onClick={() => handleViewChange('day')}
              className={`min-h-10 px-4 py-2 flex justify-center items-center gap-2 ${
                view === 'day' ? 'bg-[#f8f9fb] text-[#006198] font-semibold' : 'bg-white text-[#4a4c56]'
              }`}
            >
              <span className="text-sm font-['Outfit'] leading-tight">Day</span>
            </button>
          </div>
          <button className="px-6 py-2 bg-[#006198] rounded-lg flex justify-center items-center gap-2 hover:bg-[#004d7a]">
            <span className="text-center text-white text-lg font-medium font-['Outfit'] leading-[28.80px]">
              Find Events
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        {/* Hero Section */}
        <div className="box">
          {/* Background container with responsive height */}
          <div className="background h-[338px] sm:h-[528px] rounded-3xl overflow-hidden">
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
              <div className="text flex flex-col items-center justify-start w-full mt-[135px]">
                <div className="w-[1280px] flex flex-col items-center justify-start gap-4">
                  {/* Main heading */}
                  <div className="text-center text-white text-[64px] font-bold font-['Figtree'] capitalize">
                    Welcome to Cayman Biz Events
                  </div>
                  {/* Subheading */}
                  <div className="w-[783px] text-center text-white text-2xl font-semibold font-['Figtree'] capitalize leading-[38.40px]">
                    the ultimate hub for corporate events and networking opportunities in the Cayman Islands!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="box mx-auto px-4 py-8">
          {/* Calendar container with max width and padding */}
          <div className="max-w-[1592px] bg-white rounded-2xl overflow-hidden mx-auto p-6">
            {/* Toolbar */}
            <CustomToolbar />
            
            {/* Calendar Grid */}
            {view === 'month' && (
              <div className="overflow-x-auto">
                <CalendarGrid
                  events={events}
                  currentDate={currentDate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}