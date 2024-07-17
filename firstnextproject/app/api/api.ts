// lib/api.ts
import axios from 'axios';
import { getCookie, deleteCookie } from '@/utils/cookieUtils';

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
    const token = getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('Unauthorized or Forbidden, redirecting to login');
      deleteCookie('token');
      deleteCookie('user');
      // Redirect to login page (you may need to implement this part)
    }
    return Promise.reject(error);
  }
);


// Authentification controller
export const login = (loginData: any) => api.post('/api/auth/login', loginData);
export const register = (registerData: any) => api.post('api/auth/register', registerData);

// User controller
export const fetchAllUsers = () => api.get('api/users');
export const getUserOrders = (userId: any) => api.get(`/api/users/${userId}/orders`);
export const getUserEventInProgress = (userId: any) => api.get(`/api/users/${userId}/events`);



// Coffee order controller
export const giveOrderRating = (coffeeData: any) => api.patch(`/api/orders/edit`, coffeeData );
export const getOrderById = (orderId: any) => api.get(`api/orders/${orderId}`);
export const createOrder = (orderData: any) => api.post(`api/orders/create`, orderData);

// Brew event controller
export const createEvent = (eventData: any) => api.post(`/api/events/create`, eventData);
export const getPendingEvents = (userId: any) => api.get(`/api/events/pending/${userId}`);
export const getEventsInProgress = () => api.get(`api/events?status=IN_PROGRESS`);
export const patchEventToDone = (userId: any) => api.patch(`api/events/complete-event?userId=${userId}`);
  

export default api;
