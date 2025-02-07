import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    "Content-Type": 'application/json',
    "Authorization": getToken(),
    "ngrok-skip-browser-warning": "60000"
  },
})
export const useAxios = () => {
  return axiosInstance;
}

function getToken(): string {
  if (import.meta.client) return localStorage.getItem('token') ?? '';
  return '';
}
