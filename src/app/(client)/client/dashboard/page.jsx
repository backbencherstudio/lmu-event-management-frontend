// Utility function to convert 12-hour time to 24-hour time
const convert12to24 = (time12h) => {
  try {
    if (!time12h) return '00:00';
    
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    hours = parseInt(hours, 10);
    
    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  } catch (error) {
    console.error('Error converting time format:', error);
    return '00:00';
  }
};

// Utility function to convert 24-hour time to 12-hour time
const convert24to12 = (time24h) => {
  try {
    if (!time24h) return '12:00 AM';
    
    let [hours, minutes] = time24h.split(':');
    hours = parseInt(hours, 10);
    
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    
    return `${hours}:${minutes} ${period}`;
  } catch (error) {
    console.error('Error converting time format:', error);
    return '12:00 AM';
  }
};

// Format date and time with timezone consideration
const formatDateTime = (date, time, timezone = 'America/Cayman') => {
  try {
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    
    // Create date in specified timezone
    const dateTime = new Date(Date.UTC(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      parseInt(hours, 10),
      parseInt(minutes, 10)
    ));
    
    if (isNaN(dateTime.getTime())) {
      throw new Error('Invalid date or time');
    }
    
    return dateTime;
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return null;
  }
};

// Update the form submission handler
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    // Convert times to 24-hour format for storage
    const start24 = convert12to24(startTime);
    const end24 = convert12to24(endTime);
    
    // Validate the times
    if (!start24 || !end24) {
      toast.error('Invalid time format');
      return;
    }
    
    // Create full date-time objects
    const startDateTime = formatDateTime(startDate, start24);
    const endDateTime = formatDateTime(endDate, end24);
    
    if (!startDateTime || !endDateTime) {
      toast.error('Invalid date or time');
      return;
    }
    
    if (endDateTime <= startDateTime) {
      toast.error('End time must be after start time');
      return;
    }
    
    const eventData = {
      name: eventName,
      description: description,
      startDate: startDate,
      endDate: endDate,
      startTime: start24,
      endTime: end24,
      timezone: 'America/Cayman' // Store timezone for reference
    };
    
    const response = await EventApis.createEvent(eventData);
    
    if (response.success) {
      toast.success('Event created successfully!');
      router.push('/client/events');
    } else {
      toast.error(response.message || 'Failed to create event');
    }
  } catch (error) {
    console.error('Error creating event:', error);
    toast.error('Failed to create event. Please try again.');
  } finally {
    setIsLoading(false);
  }
}; 