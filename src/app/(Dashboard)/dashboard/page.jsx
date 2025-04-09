'use client'
import React, { useState } from 'react'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

// Utility function to convert 12h to 24h format
const convert12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours.padStart(2, '0')}:${minutes}`;
};

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

export default function Dashboard() {
  const defaultFormState = {
    eventName: '',
    dateRange: [{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }],
    timeRange: {
      startTime: '10:00',
      endTime: '12:00'
    },
    description: ''
  }

  // Form states
  const [eventName, setEventName] = useState(defaultFormState.eventName)
  const [dateRange, setDateRange] = useState(defaultFormState.dateRange)
  const [timeRange, setTimeRange] = useState(defaultFormState.timeRange)
  const [description, setDescription] = useState(defaultFormState.description)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!eventName.trim()) {
      newErrors.eventName = 'Event name is required'
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!timeRange.startTime || !timeRange.endTime) {
      newErrors.time = 'Both start and end time are required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleDateRangeChange = (item) => {
    setDateRange([item.selection])
  }

  const handleTimeChange = (type, value) => {
    setTimeRange(prev => ({
      ...prev,
      [type]: value
    }))
    if (errors.time) {
      setErrors(prev => ({ ...prev, time: '' }))
    }
  }

  const resetForm = () => {
    setEventName(defaultFormState.eventName)
    setDateRange(defaultFormState.dateRange)
    setTimeRange(defaultFormState.timeRange)
    setDescription(defaultFormState.description)
    setErrors({})
  }

  const handleSave = () => {
    if (validateForm()) {
      const formData = {
        eventName,
        date: {
          startDate: format(dateRange[0].startDate, 'yyyy-MM-dd'),
          endDate: format(dateRange[0].endDate, 'yyyy-MM-dd')
        },
        time: timeRange,
        description
      }
      console.log('Form Data:', formData)
      resetForm()
    }
  }

  return (
    <div className="p-8 pb-12 bg-white">
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Create Event</h1>
          
          {/* Search Bar */}
          <div className="w-80">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {/* <div className="absolute right-3 top-2.5 px-1 py-px text-xs text-gray-500 border border-gray-200 rounded">
                ⌘K
              </div> */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-6">
        {/* Event Info Header */}
        <div className="flex justify-between items-center pb-5 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Event info</h2>
            <p className="text-sm text-gray-600">Update your event details here.</p>
          </div>
        </div>

        {/* Event Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Event Name */}
          <div className="flex gap-8">
            <label className="w-[280px] text-sm font-semibold text-gray-700">
              Event Name
              <span className="text-purple-500">*</span>
            </label>
            <div className="flex-1 max-w-[512px]">
              <input 
                type="text"
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value)
                  if (errors.eventName) {
                    setErrors(prev => ({ ...prev, eventName: '' }))
                  }
                }}
                className={`w-full px-3.5 py-2.5 border ${errors.eventName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              />
              {errors.eventName && (
                <p className="mt-1 text-sm text-red-500">{errors.eventName}</p>
              )}
            </div>
          </div>

          {/* Date Selection */}
          <div className="flex gap-8 py-6">
            <label className="w-[280px] text-sm font-semibold text-gray-700">
              Date
            </label>
            <div className="flex-1 max-w-[512px]">
              <div>
                <div className="flex gap-3 items-center mb-4">
                  <input 
                    type="text"
                    value={format(dateRange[0].startDate, 'MMM dd, yyyy')}
                    className="w-[136px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                  <span className="text-gray-500">–</span>
                  <input 
                    type="text"
                    value={format(dateRange[0].endDate, 'MMM dd, yyyy')}
                    className="w-[136px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                  <DateRange
                    ranges={[{
                      startDate: dateRange[0].startDate,
                      endDate: dateRange[0].endDate,
                      key: 'selection'
                    }]}
                    onChange={handleDateRangeChange}
                    months={1}
                    direction="vertical"
                    className="border-0"
                    rangeColors={['#006198']}
                    showDateDisplay={false}
                    showMonthAndYearPickers={true}
                    showPreview={true}
                    moveRangeOnFirstSelection={false}
                    retainEndDateOnFirstSelection={true}
                    minDate={new Date()}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Time Selection */}
          <div className="flex gap-8">
            <label className="w-[280px] text-sm font-semibold text-gray-700 flex items-center gap-1">
              Time
              <span className="text-purple-500">*</span>
              <button className="w-4 h-4 text-gray-400 hover:text-gray-600" title="Select time range">
                ?
              </button>
            </label>
            <div className="flex-1 max-w-[512px]">
              <div className="flex gap-3 items-center">
                <input 
                  type="time"
                  value={timeRange.startTime}
                  onChange={(e) => handleTimeChange('startTime', e.target.value)}
                  className={`w-[136px] px-3 py-2 border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                />
                <span className="text-gray-500">–</span>
                <input 
                  type="time"
                  value={timeRange.endTime}
                  onChange={(e) => handleTimeChange('endTime', e.target.value)}
                  className={`w-[136px] px-3 py-2 border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                />
              </div>
              {errors.time && (
                <p className="mt-1 text-sm text-red-500">{errors.time}</p>
              )}
            </div>
          </div>

          {/* Event Description */}
          <div className="flex gap-8">
            <div className="w-[280px]">
              <label className="text-sm font-semibold text-gray-700">
                Event Description
                <span className="text-purple-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mt-1">Write a short introduction.</p>
            </div>
            <div className="flex-1 max-w-[512px]">
              <textarea 
                className={`w-full h-[154px] px-3.5 py-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg resize-none focus:outline-none focus:border-blue-500`}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                  if (errors.description) {
                    setErrors(prev => ({ ...prev, description: '' }))
                  }
                }}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
        </form>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button 
            className="px-3.5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={resetForm}
          >
            Cancel
          </button>
          <button 
            className="px-3.5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </main>
    </div>
  )
}
