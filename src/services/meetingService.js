import api from './api';

export const getMeetings = (params) => api.get('/meetings', { params });
export const createMeeting = (data) => api.post('/meetings', data);
export const updateMeeting = (id, data) => api.put(`/meetings/${id}`, data);
export const deleteMeeting = (id) => api.delete(`/meetings/${id}`);
