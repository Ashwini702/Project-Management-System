import api from './api';
export const getBackups = () => api.get('/backups');
export const createBackup = (data) => api.post('/backups', data);
export const deleteBackup = (id) => api.delete(`/backups/${id}`);
export const restoreBackup = (id, data) => api.post(`/backups/${id}/restore`, data);
export const getRestoreHistory = () => api.get('/restore-history');
