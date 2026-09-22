import api from './api';
export const getState=(moduleKey)=>api.get(`/state/${moduleKey}`);
export const saveState=(moduleKey,payload)=>api.put(`/state/${moduleKey}`,payload);
