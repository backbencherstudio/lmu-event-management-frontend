'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { MdArrowBack } from 'react-icons/md'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { dummyData } from '../../_components/dummyData'

export default function EventDetails({ params }) {
  const router = useRouter()
  const { id } = params

  // Find the event data based on the ID
  const eventData = dummyData.find(event => event.id === id)

  // If event not found, show error state
  if (!eventData) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Event Not Found</h1>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy')
  }

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
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-[#009432] text-white'
      case 'cancelled':
        return 'bg-[#F44336] text-white'
      default:
        return 'bg-[#e67e22] text-white'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'cancelled':
        return 'Cancelled'
      default:
        return 'Pending'
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="w-full bg-white border-b">
        <div className="max-w-[2000px] mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <MdArrowBack className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Event Details</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[2000px] mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Event Status */}
          <div className="mb-8">
            <div className={`inline-flex items-center px-3 py-1 rounded ${getStatusStyle(eventData.status)}`}>
              <span className="text-sm font-bold">{getStatusText(eventData.status)}</span>
            </div>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Event Name</label>
                    <p className="text-gray-900 font-bold">{eventData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Description</label>
                    <p className="text-gray-900 font-bold">{eventData.description}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Amount</label>
                    <p className="text-gray-900 font-bold">${eventData.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Expected Attendees</label>
                    <p className="text-gray-900 font-bold">{eventData.expectedAttendees}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Date & Time</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Start Date</label>
                    <p className="text-gray-900 font-bold">{formatDate(eventData.startDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">End Date</label>
                    <p className="text-gray-900 font-bold">{formatDate(eventData.endDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Start Time</label>
                    <p className="text-gray-900 font-bold">{convert24to12(eventData.startTime)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">End Time</label>
                    <p className="text-gray-900 font-bold">{convert24to12(eventData.endTime)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Duration</label>
                    <p className="text-gray-900 font-bold">
                      {convert24to12(eventData.startTime)} - {convert24to12(eventData.endTime)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Organizer Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Organizer Name</label>
                    <p className="text-gray-900 font-bold">{eventData.organizer}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="text-gray-900 font-bold">{eventData.email}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Venue & Requirements</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Venue</label>
                    <p className="text-gray-900 font-bold">{eventData.venue}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Requirements</label>
                    <p className="text-gray-900 font-bold">{eventData.requirements}</p>
                  </div>
                </div>
              </div>

              {eventData.status === 'pending' && (
                <div className="pt-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-md hover:bg-green-200">
                      <FaCheck className="text-green-600" size={16} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-md hover:bg-red-200">
                      <FaTimes className="text-red-600" size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 