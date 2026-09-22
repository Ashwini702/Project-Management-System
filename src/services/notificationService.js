import api from './api';

export const getNotifications = (params) => api.get('/notifications', { params });
export const createNotification = (data) => api.post('/notifications', data);
export const updateNotification = (id, data) => api.put(`/notifications/${id}`, data);
export const markNotificationRead = (id) => api.put(`/notifications/${id}/read`);
export const deleteNotification = (id) => api.delete(`/notifications/${id}`);
