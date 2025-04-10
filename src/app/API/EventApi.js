import axiosClient from '../../utils/axiosClient';
import { toast } from 'react-hot-toast';

const EventApis = {
  /**
   * Create a new event
   * @param {Object} data - Event data
   * @param {string} data.name - Event name
   * @param {Object} data.date - Event date range
   * @param {string} data.date.startDate - Start date (YYYY-MM-DD)
   * @param {string} data.date.endDate - End date (YYYY-MM-DD)
   * @param {Object} data.time - Event time range
   * @param {string} data.time.startTime - Start time (HH:mm)
   * @param {string} data.time.endTime - End time (HH:mm)
   * @param {string} data.description - Event description
   * @returns {Promise<Object>} Created event data
   */
  createEvent: async (data) => {
    try {
      // Validate required fields
      if (!data.name || !data.date || !data.time || !data.description) {
        throw new Error('All fields are required');
      }

      // Format the data to match API expectations
      const eventData = {
        name: data.name,
        startDate: data.date.startDate,
        endDate: data.date.endDate,
        startTime: data.time.startTime,
        endTime: data.time.endTime,
        description: data.description
      };

      const response = await axiosClient.post('/event', eventData);
      
      toast.success('Event created successfully');
      return {
        success: true,
        message: 'Event created successfully',
        data: response
      };
    } catch (error) {
      console.error('Create event error:', error);
      toast.error(error.message);
      return {
        success: false,
        message: error.message
      };
    }
  },

  /**
   * Get all events with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Items per page (default: 10)
   * @returns {Promise<Object>} Paginated events data
   */
  getAllEvents: async (params = {}) => {
    try {
      // Set default pagination values
      const queryParams = new URLSearchParams({
        page: String(params.page || 1),
        limit: String(params.limit || 10)
      });

      console.log('Making request with params:', queryParams.toString());
      const response = await axiosClient.get(`/event?${queryParams.toString()}`);
      console.log('Raw API Response:', response);
      
      return {
        success: true,
        data: response.data || [],
        total: response.meta?.total || 0,
        currentPage: response.meta?.page || 1,
        totalPages: response.meta?.totalPages || 1,
        limit: response.meta?.limit || 10
      };
    } catch (error) {
      console.error('Get events error:', error);
      toast.error(error.message);
      return {
        success: false,
        message: error.message,
        data: [],
        total: 0,
        currentPage: 1,
        totalPages: 1,
        limit: 10
      };
    }
  },

  /**
   * Update an event
   * @param {string} id - Event ID
   * @param {Object} data - Updated event data
   * @returns {Promise<Object>} Updated event data
   */
  updateEvent: async (id, data) => {
    try {
      if (!id) {
        throw new Error('Event ID is required');
      }

      const response = await axiosClient.patch(`/event/${id}`, data);

      toast.success('Event updated successfully');
      return {
        success: true,
        message: 'Event updated successfully',
        data: response
      };
    } catch (error) {
      console.error('Update event error:', error);
      toast.error(error.message);
      return {
        success: false,
        message: error.message
      };
    }
  },

  /**
   * Delete an event
   * @param {string} id - Event ID
   * @returns {Promise<Object>} Delete operation result
   */
  deleteEvent: async (id) => {
    try {
      if (!id) {
        throw new Error('Event ID is required');
      }

      const response = await axiosClient.delete(`/event/${id}`);

      toast.success('Event deleted successfully');
      return {
        success: true,
        message: 'Event deleted successfully',
        data: response
      };
    } catch (error) {
      console.error('Delete event error:', error);
      toast.error(error.message);
      return {
        success: false,
        message: error.message
      };
    }
  }
};

export default EventApis;
