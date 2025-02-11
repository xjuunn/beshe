import axios from 'axios';

let getToken = (): string => {
  if (import.meta.client) {
    let token = localStorage.getItem('token');
    if (token) return token;
  };
  return 'no token';
}

let axiosInstance = axios.create({
  baseURL: '/serverapi',
  timeout: 10000,
  headers: {
    "Content-Type": 'application/json',
    "Authorization": getToken(),
    "ngrok-skip-browser-warning": "60000"
  },
});
export function refreshAxios() {
  axiosInstance = axios.create({
    baseURL: '/serverapi',
    timeout: 10000,
    headers: {
      "Content-Type": 'application/json',
      "Authorization": getToken(),
      "ngrok-skip-browser-warning": "60000"
    },
  })
}

export const useAxios = () => axiosInstance;
