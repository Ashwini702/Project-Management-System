import api from './api';
export const getFeedback = (params) => api.get('/feedback', { params });
export const createFeedback = (data) => api.post('/feedback', data);
