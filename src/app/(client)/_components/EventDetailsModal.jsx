'use client'
import React from 'react';
import format from 'date-fns/format';

const EventDetailsModal = ({ isOpen, onClose, events, date }) => {
  if (!isOpen) return null;

  return (
    <div className="box flex justify-center items-center">
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-lg w-full max-w-[500px] max-h-[90vh] shadow-lg"
          onClick={e => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#344053]">
                Events for {format(date, 'MMMM d, yyyy')}
              </h2>
              <button 
                onClick={onClose}
                className="text-[#344053] hover:text-[#006198] text-xl"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={event.id || index} className="p-3 rounded-lg bg-[#f8f9fb] last:mb-0">
                    <h3 className="text-base font-semibold text-[#006198] mb-1">
                      {event.title}
                    </h3>
                    <div className="text-[#4A4C56] text-sm mb-2">
                      {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                    </div>
                    {event.description && (
                      <p className="text-[#344053] text-sm whitespace-pre-wrap">
                        {event.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-[#344053] py-8">
                No events scheduled for this day
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-[#006198] text-white text-base rounded-lg hover:bg-[#004d7a]"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Scrollbar Styles */}
      <style jsx global>{`
        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default EventDetailsModal; 