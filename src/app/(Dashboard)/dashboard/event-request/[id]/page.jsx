'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { MdArrowBack } from 'react-icons/md'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Calendar, Clock, Mail, Phone, FileText } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
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
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (time24h) => {
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
          {/* Event Name */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{eventData.name}</h3>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              Request Date: {formatDate(eventData.submittedDate)}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center mb-2">
                <Mail className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-gray-900">Email</span>
              </div>
              <p className="text-gray-700 break-all">{eventData.email}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center mb-2">
                <Phone className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-gray-900">Phone Number</span>
              </div>
              <p className="text-gray-700">{eventData.phone}</p>
            </div>
          </div>

          {/* Event Schedule */}
          <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-purple-600 mr-2" />
              <span className="font-medium text-gray-900">Event Schedule</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Start Date</p>
                <p className="text-gray-900">{formatDate(eventData.startDate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">End Date</p>
                <p className="text-gray-900">{formatDate(eventData.endDate)}</p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Start Time</p>
                  <p className="text-gray-900">{formatTime(eventData.startTime)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-red-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-600">End Time</p>
                  <p className="text-gray-900">{formatTime(eventData.endTime)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
            <div className="flex items-center mb-3">
              <FileText className="w-5 h-5 text-orange-600 mr-2" />
              <span className="font-medium text-gray-900">Event Description</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{eventData.description}</p>
          </div>

          {/* Actions */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-end">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700"
                  onClick={() => {/* Add approve handler */}}
                >
                  <FaCheck className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700"
                  onClick={() => {/* Add reject handler */}}
                >
                  <FaTimes className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 