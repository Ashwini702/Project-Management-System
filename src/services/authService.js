import api from './api';
export const login = (credentials) => api.post('/auth/login', credentials);
export const me = () => api.get('/auth/me');
export const logout = () => api.post('/auth/logout');

export const uploadProfilePhoto = (formData) => api.post('/auth/profile-photo', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

