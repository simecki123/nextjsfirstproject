// lib/api.ts
import axios, { AxiosInstance } from 'axios';
import { getCookie, deleteCookie } from '@/utils/cookieUtils';

const createApi = (serverToken?: string): AxiosInstance => {
  const api = axios.create({
    baseURL: 'http://46.101.127.179:8080',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });

  api.interceptors.request.use(
    (config) => {
      console.log('Request interceptor called');
      let token;
      if (typeof window !== 'undefined') {
        // Client-side
        token = getCookie('token');
      } else {
        // Server-side
        token = serverToken;
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log('Response interceptor called:', response);
      return response;
    },
    (error) => {
      console.log('Response interceptor error:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log('Unauthorized or Forbidden, redirecting to login');
        if (typeof window !== 'undefined') {
          deleteCookie('token');
          deleteCookie('user');
          // Redirect to login page (you may need to implement this part)
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};

const api = createApi();

// Authentication controller
export const login = (loginData: any) => api.post('/api/auth/login', loginData);
export const register = (registerData: any) => api.post('api/auth/register', registerData);

// User controller
export const fetchAllUsers = (tokenCookie: any) => createApi(tokenCookie).get('api/users');
export const getUserOrders = (serverToken: any, userId: any) => createApi(serverToken).get(`/api/users/${userId}/orders`);
export const getUserEventInProgress = (serverToken: any, userId: any) => createApi(serverToken).get(`/api/users/${userId}/events`);

// Coffee order controller
export const giveOrderRating = (coffeeData: any) => api.patch(`/api/orders/edit`, coffeeData);
export const getOrderById = (serverToken: any, orderId: any) => createApi(serverToken).get(`api/orders/${orderId}`);
export const createOrder = (orderData: any) => api.post(`api/orders/create`, orderData);

// Brew event controller
export const createEvent = (eventData: any) => api.post(`/api/events/create`, eventData);
export const getPendingEvents = (tokenCookie: any, userId: any) => createApi(tokenCookie).get(`/api/events/pending/${userId}`);
export const getEventsInProgress = (serverToken?: string) => createApi(serverToken).get(`api/events?status=IN_PROGRESS`);
export const patchEventToDone = (userId: any) => api.patch(`api/events/complete-event?userId=${userId}`);

export default api;