import api from './api';
export const uploadDocument = (data) => api.post('/documents/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getDocuments = (params) => api.get('/documents', { params });
export const getDocumentFile = (id, download = false) => api.get(`/documents/${id}/file${download ? '?download=1' : ''}`, { responseType: 'blob' });