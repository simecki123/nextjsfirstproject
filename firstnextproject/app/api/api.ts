// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://46.101.127.179:8080', // Replace with your Spring Boot API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});


// Users requests
export const login = (loginData: any) => api.post('/api/auth/login', loginData);

export default api;
