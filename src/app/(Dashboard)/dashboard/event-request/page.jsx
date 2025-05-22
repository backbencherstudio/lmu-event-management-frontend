'use client'
import React from 'react'
import { format } from 'date-fns'
import { MdDownload } from 'react-icons/md'
import * as XLSX from 'xlsx'
import { toast } from 'react-hot-toast'
import EventReqTable from '../_components/eventReqTable'

// Utility function to convert 24h to 12h format
const convert24to12 = (time24h) => {
  const [hours, minutes] = time24h.split(':');
  const hour = parseInt(hours, 10);
  
  if (hour === 0) {
    return `12:${minutes} AM`;
  } else if (hour < 12) {
    return `${hour}:${minutes} AM`;
  } else if (hour === 12) {
    return `12:${minutes} PM`;
  } else {
    return `${hour - 12}:${minutes} PM`;
  }
};

export default function EventRequest() {
  // Handle download function
  const handleDownload = () => {
    try {
      // Get the dummy data from EventReqTable's data
      const events = [
        {
          id: 'EVT001',
          name: 'Tech Conference 2024',
          startDate: '2024-07-15',
          endDate: '2024-07-16',
          startTime: '09:00',
          endTime: '17:00',
          description: 'Annual technology conference',
        },
        // ... more events from the dummy data
      ];

      // Prepare data for Excel
      const excelData = events.map(event => ({
        'Event Name': event.name,
        'Description': event.description,
        'Start Date': format(new Date(event.startDate), 'MMM dd, yyyy'),
        'End Date': format(new Date(event.endDate), 'MMM dd, yyyy'),
        'Start Time': convert24to12(event.startTime),
        'End Time': convert24to12(event.endTime)
      }));

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(excelData);
      
      // Create workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Event Requests");

      // Generate Excel file
      XLSX.writeFile(wb, `event_requests_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
      
      toast.success('Excel file downloaded successfully!');
    } catch (error) {
      console.error('Error downloading Excel file:', error);
      toast.error('Failed to download Excel file');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="w-full bg-white border-b">
        <div className="max-w-[2000px] mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Event Requests</h1>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MdDownload className="w-5 h-5" />
              <span>Download Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Event Request Table Component */}
      <div className="max-w-[2000px] mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm">
          <EventReqTable />
        </div>
      </div>
    </div>
  )
}
