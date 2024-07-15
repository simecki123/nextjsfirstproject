// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://46.101.127.179:8080', // Replace with your Spring Boot API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});




// On request from frontend we set token to header
api.interceptors.request.use(
  (config) => {
    console.log('Request interceptor called');
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Interceptor for responses from backend
api.interceptors.response.use(
  (response) => {
    console.log('Response interceptor called:', response);
    return response;
  },
  (error) => {
    console.log('Response interceptor error:', error);
    if (error.response?.status === 401) {
      // Unauthorized, redirect to login
      console.log('Unauthorized, redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
    } else if (error.response?.status === 403) {
      console.log('Forbidden, redirecting to login');
      
    }
    return Promise.reject(error);
  }
);


// Users requests
export const login = (loginData: any) => api.post('/api/auth/login', loginData);
export const register = (registerData: any) => api.post('api/auth/register', registerData);
export const fetchAllUsers = () => api.get('api/users');

// Orders
export const getUserOrders = (userId: any) => api.get(`/api/users/orders/${userId}`);
export const giveOrderRating = (orderDataUpdate: any) => api.patch(`/api/orders/edit`, orderDataUpdate );

// Events
export const getEventsInProgress = () => api.get(`api/events?status=IN_PROGRESS`);

// get one event
export const getUserEventInProgress = (userId: any) => api.get(`/api/users/${userId}/brew-events/orders`);

// Patch event to be done
export const patchEventToDone = (creatorId: any) => api.patch('api/events/complete-event', {creatorId});
  

export default api;
