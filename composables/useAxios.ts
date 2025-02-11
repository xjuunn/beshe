import axios from 'axios';

let getToken = (): string => {
  if (import.meta.client) {
    let token = localStorage.getItem('token');
    if (token) return token;
  };
  return 'no token';
}

let axiosInstance = initAxios();
export function refreshAxios() { axiosInstance = initAxios() }

function initAxios() {
  let instance = axios.create({
    baseURL: '/serverapi',
    timeout: 10000,
    headers: {
      "Content-Type": 'application/json',
      "Authorization": getToken(),
      "ngrok-skip-browser-warning": "60000"
    },
  });

  instance.interceptors.response.use((response) => {
    return response;
  }, error => {
    if (error.response.data.code === 401) {
      createToast(error.response.data.message, { type: 'error', style: 'soft', icon: 'mingcute:safe-lock-fill' })
      navigateTo('/login')
    }

  })

  return instance;

}



export const useAxios = () => axiosInstance;
