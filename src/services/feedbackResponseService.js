import api from './api';
export const createFeedbackResponse = (data) => api.post('/feedback-responses', data);

export const getFeedbackResponses = () => api.get('/feedback-responses');
