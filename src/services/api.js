import axios from 'axios';

const devProxyUrl = ['5173', '5175', '5176'].includes(window.location.port) ? '/api' : `http://${window.location.hostname}:5000/api`;
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || devProxyUrl
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pms_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('pms_token');
      localStorage.removeItem('pms_auth_user');
    }
    return Promise.reject(error);
  }
);

export const apiData = (response) => response.data?.data ?? response.data;
export default api;
