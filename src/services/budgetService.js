import api from './api';

export const getBudgets = (params) => api.get('/budget', { params });
export const createBudget = (data) => api.post('/budget', data);
export const updateBudget = (id, data) => api.put(`/budget/${id}`, data);
export const deleteBudget = (id) => api.delete(`/budget/${id}`);

export const getExpenses = (params) => api.get('/expenses', { params });
export const createExpense = (data) => api.post('/expenses', data);
export const updateExpense = (id, data) => api.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);
