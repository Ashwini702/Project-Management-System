import api from './api';
export const getDashboardSummary=()=>api.get('/reports/dashboard-summary');
export const getProjectReport=()=>api.get('/reports/project-summary');
export const getTaskReport=()=>api.get('/reports/task-summary');
export const getEmployeePerformance=()=>api.get('/reports/employee-performance');
export const getDailyReports = (params) => api.get('/daily-reports', { params });
export const createDailyReport = (data) => api.post('/daily-reports', data);
export const updateDailyReport = (id, data) => api.put(`/daily-reports/${id}`, data);
export const deleteDailyReport = (id) => api.delete(`/daily-reports/${id}`);
