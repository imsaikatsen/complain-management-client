import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:5000/api';

// Axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dynamically add Authorization header using an Axios interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error(
      'Error logging in:',
      error.response?.data?.message || error.message
    );
    throw error; // Propagate error for UI handling
  }
};

// Fetch customer tickets
export const fetchCustomerTickets = async () => {
  try {
    const response = await apiClient.get('/tickets/customer');
    return response.data.tickets; // Return tickets array
  } catch (error) {
    console.error('Error fetching customer tickets:', error);
    throw error;
  }
};

export const createTicket = async (ticketData) => {
  try {
    const response = await apiClient.post('/tickets/create', ticketData); // Adjusted route
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      'Error creating ticket:',
      error.response?.data || error.message
    );
    throw error; // Propagate the error
  }
};

// Fetch all tickets (admin use)
export const fetchTickets = () => apiClient.get('/tickets');

// Fetch a single ticket by ID

export const fetchTicketById = (id) => apiClient.get(`/tickets/${id}`);

// Update the status of a ticket
export const updateTicketStatus = (id, status) =>
  apiClient.patch(`/tickets/${id}/status`, { status });

// Assign a ticket to an admin
export const assignTicket = (id, adminId) =>
  apiClient.patch(`/tickets/${id}/assign`, { adminId });

export const updateTicket = async (id, ticketData) => {
  const response = apiClient.put(`/tickets/updateTicket/${id}`, ticketData);
  return response.data;
};

// Delete a ticket by ID
export const deleteTicket = (id) => apiClient.delete(`/tickets/${id}`);

export const sendReplyToTicket = (ticketId, reply) =>
  apiClient.post(`/tickets/${ticketId}/reply`, { reply });

// Default export for apiClient (with interceptor)
export default apiClient;
