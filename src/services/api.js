import axios from 'axios';

// Bas-URLs för våra API:er
const eventApiUrl = 'https://localhost:5177/api/events';
const userApiUrl = 'http://localhost:5253/api/users';

// Event Service
export const getEvents = async () => {
  try {
    const response = await axios.get(eventApiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${eventApiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(eventApiUrl, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// User Service - Vi behåller dessa för framtida bruk
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${userApiUrl}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${userApiUrl}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};